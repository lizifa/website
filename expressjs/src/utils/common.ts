import { Response } from 'express'

const responseJson: IResponse = {
  data: null,
  code: 200,
  serverTime: new Date().getTime(),
  msg: '获取数据成功',
}

export async function httpResponse(
  res: Response,
  data?: any,
  code: number = 200
): Promise<any> {
  const result = { ...responseJson, ...data, code }
  res.json(result)
}

export async function renderTemplate(res: Response): Promise<any> {
  res.json(responseJson)
}
