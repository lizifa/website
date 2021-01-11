import { Request, Response } from 'express'
import { httpResponse } from '../../utils/common'
import Model from './model'

export default class UserServices {
  constructor(private readonly model: Model = new Model()) {}
  async add(req: Request, res: Response): Promise<any> {
    const body: any = req.body
    const params = {
      user_name: body.userName,
      age: body.age,
    }
    const results: any = await this.model.insert(params)
    await httpResponse(res, results, 201)
  }

  async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const results: any = await this.model.delete(Number(id))
    await httpResponse(res, results, 201)
  }

  async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const body: any = req.body
    const params = {
      user_name: body.userName,
      age: body.age,
    }
    const results: any = await this.model.update(Number(id), params)
    await httpResponse(res, results, 201)
  }

  async find(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const results: any = await this.model.queryById(Number(id))
    await httpResponse(res, results, 200)
  }

  async getLists(req: Request, res: Response): Promise<any> {
    const { query } = req
    const params: any = {
      page: query.page || 1,
      size: query.size || 20,
    }
    const results: any = await this.model.queryAll(params)
    await httpResponse(res, results)
  }

  async login(req: Request, res: Response): Promise<any> {
    const { userName, userPassword } = req.body
    if (!userName || !userPassword) {
    }
    const results: any = await this.model.queryByUserName({
      userName,
      userPassword,
    })
    if (results && results.length) {
      await httpResponse(res, results, 200)
    } else {
      await httpResponse(res, {msg: '用户不存在~'}, 401)
    }
  }
}
