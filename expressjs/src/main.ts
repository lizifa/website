import { SERVERPORT } from './config/index'
import express, { Application } from 'express'
import { register } from './xiaoshubao'
import { useMysql } from './utils/mysql'
import UserModule from './modules/user/controller'
import WelcomeModule from './modules/welcome/controller'

const app: Application = express()
async function bootstrap(): Promise<any> {
  await useMysql()
  await register(app, [WelcomeModule, UserModule])
  app.listen(SERVERPORT, () =>
    console.log(`server app listening at http://localhost:${SERVERPORT}`)
  )
}

bootstrap()
