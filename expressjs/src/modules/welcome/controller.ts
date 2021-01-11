import { Get, Controller } from '../../xiaoshubao'
import { Request, Response } from 'express'
import { httpResponse } from '../../utils/common'

@Controller('/')
class WelcomeController {
  @Get('/')
  async index(req: Request, res: Response): Promise<any> {
    if (req) {
      console.log(1)
    }
    await httpResponse(res, { data: 1 })
  }
}

export default WelcomeController
