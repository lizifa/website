import { Get, Post, Controller, Put, Params, Delete } from '../../xiaoshubao'
import { Request, Response } from 'express'
import Services from './services'

@Controller('/user')
class UserController {
  constructor(private readonly services: Services = new Services()) {}

  @Get('/list')
  async index(req: Request, res: Response): Promise<any> {
    // curl -X GET -s "http://localhost:3000/user/list?page=1&size=10"
    await this.services.getLists(req, res)
  }

  @Post('/create')
  async create(req: Request, res: Response): Promise<any> {
    // curl -X POST -s "http://localhost:3000/user/create" -d "userName=xiaoshubao&age=58"
    await this.services.add(req, res)
  }

  @Put('/update/:id')
  async update(
    req: Request,
    res: Response,
    @Params('id') [id]: any[]
  ): Promise<any> {
    // curl -X PUT -s "http://localhost:3000/user/update/40" -d "userName=xiaoshubao&age=508"
    if (!id) {
      return
    }
    await this.services.update(req, res)
  }

  @Get('/:id')
  async detail(
    req: Request,
    res: Response,
    @Params('id') [id]: any[]
  ): Promise<any> {
    if (!id) {
      return
    }
    // curl -X GET -s "http://localhost:3000/user/1"
    await this.services.find(req, res)
  }

  @Delete('/:id')
  async delete(
    req: Request,
    res: Response,
    @Params('id') [id]: any[]
  ): Promise<any> {
    if (!id) {
      return
    }
    // curl -X DELETE -s "http://localhost:3000/user/1"
    await this.services.delete(req, res)
  }

  @Post('/login')
  async login(req: Request, res: Response): Promise<any> {
    // curl -X GET -s "http://localhost:3000/user/list?page=1&size=10"
    await this.services.login(req, res)
  }
}

export default UserController
