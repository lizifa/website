import { Router, Request, Response } from 'express'
import bodyParser from 'body-parser'
import {
  AccessControlAllowOrigin,
  AccessControlAllowHeaders,
  AccessControlAllowMethods,
} from './config'
type TPRoute = {
  baseUrl: string
  routes: any
}

type TCRoute = {
  subUrl: string
  httpMethod: string
  params: any[]
}

type Param = {
  name: string
  type: string
  index: number
}

type TRMethod = 'get' | 'post' | 'delete' | 'put' | 'patch'

function getAttributes(target: any): TPRoute {
  return (target.$Meta = target.$Meta || { baseUrl: '', routes: {} })
}

function getHttpMethod(target: any, methodName: string): TCRoute {
  const meta = getAttributes(target)
  const methodMeta =
    meta.routes[methodName] ||
    (meta.routes[methodName] = {
      subUrl: '',
      httpMethod: '',
      params: [],
    })
  return methodMeta
}

function MFactory(httpMehod: string) {
  return (pathName: string) => {
    return (target: any, methodName: string) => {
      const meta = getHttpMethod(target, methodName)
      meta.subUrl = pathName
      meta.httpMethod = httpMehod
    }
  }
}

export function register(app: any, modules?: any[]): void {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.all('*', (req: Request, res: Response, next: any) => {
    if (req) {
    }
    res.header('Access-Control-Allow-Origin', AccessControlAllowOrigin)
    res.header('Access-Control-Allow-Headers', AccessControlAllowHeaders)
    res.header('Access-Control-Allow-Methods', AccessControlAllowMethods)
    next()
  })
  modules!.forEach((module) => {
    const router = Router()
    const meta = getAttributes(module.prototype)
    const serviceInstance = new module()
    const routes = meta.routes

    for (const methodName in routes) {
      if (routes.hasOwnProperty(methodName)) {
        const methodMeta: any = routes[methodName]
        const httpMethod: TRMethod = methodMeta.httpMethod
        const fn = async (req: Request, res: Response): Promise<any> => {
          const params = extractParameters(req, res, methodMeta.params)
          await module.prototype[methodName].apply(serviceInstance, [
            req,
            res,
            params,
          ])
        }

        const callParams: any = [methodMeta.subUrl, fn]
        router[httpMethod].apply(router, callParams)
      }
    }
    app.use.apply(app, [module.prototype.baseUrl, router])
  })
}

function ParamFactory(paramType: string, paramName?: string) {
  return (target: any, methodName: string, paramIndex: number) => {
    const meta = getHttpMethod(target, methodName)
    meta.params.push({
      name: paramName ? paramName : paramType,
      index: paramIndex,
      type: paramType,
    })
  }
}

function MethodParamFactory(paramType: string) {
  return (paramName: string) => {
    return ParamFactory(paramType, paramName)
  }
}

function extractParameters(req: Request, res: Response, params: Param[]) {
  if (!params) return
  const args: any[] = []
  const paramHandlerTpe: any = {
    query: (paramName: string) => req.query[paramName],
    path: (paramName: string) => req.params[paramName],
    cookie: (paramName: string) => req.cookies[paramName],
    header: (paramName: string) => req.get(paramName),
    request: (): any => req,
    response: (): any => res,
  }

  params.forEach((param) => {
    args.push(paramHandlerTpe[param.type](param.name))
  })

  return args
}

export function Controller(pathName: string): any {
  return (target: new () => void) => {
    target.prototype.baseUrl = pathName
  }
}

export const Get = MFactory('get')
export const Post = MFactory('post')
export const Delete = MFactory('delete')
export const Put = MFactory('put')
export const Params = MethodParamFactory('path')
export const Query = MethodParamFactory('query')
export const Form = MethodParamFactory('form')
export const Cookie = MethodParamFactory('cookie')
