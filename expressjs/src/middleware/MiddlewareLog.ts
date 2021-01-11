import { Application, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export async function useLog(app: Application) {
  app.use((req: Request, res: Response, next: () => void) => {
    const log = `
            ---------------------------------
            1)请求方式：${req.method},\n
            2)请求路径：${req.url},\n
            3)请求时间：${new Date()},\n
            ---------------------------------
         `
    // console.log(res);
    if (req && res) {
    }
    // 写入文件
    fs.appendFile(path.join(__dirname, '../../', 'req.log'), log, (err) => {
      if (err) throw err
      next()
    })
  })
}
