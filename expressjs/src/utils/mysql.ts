import mysql from 'mysql'
import { DBCONFIG } from '../config'
const db = mysql.createConnection(DBCONFIG)

async function useMysql(): Promise<any> {
  await db.connect((err: any) => {
    if (err) {
      console.error('error connecting: ' + err.stack)
      return
    }
    console.log('数据库已连接成功：===> connected as id ' + db.threadId)
  })
}

export { db, useMysql }
