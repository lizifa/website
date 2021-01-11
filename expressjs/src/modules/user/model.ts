import { db } from '../../utils/mysql'

// const sql = {
//   insert: "INSERT INTO user(id, name, age) VALUES('小书包')",
//   update: "UPDATE user SET name=?, age=? WHERE id=?",
//   delete: "DELETE FROM user WHERE id=?",
//   queryById: "SELECT * FROM user WHERE id=?",
//   queryAll: "select * from user limit (page - 1 )*size, size",
// };

interface IParams {
  page: number
  size: number
}

interface IInsertData {
  user_name: string
  age?: number
}

export default class UserModel {
  async insert(insertData: IInsertData): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const keys: string[] = []
      const values: any[] = []
      Object.entries(insertData).map((arr) => {
        keys.push(arr[0])
        values.push(arr[1])
      })
      const sql: string = `INSERT INTO user(${String(keys)}) VALUES(?,?)`
      db.query(
        sql,
        values,
        async (err: any, results: any): Promise<any> => {
          if (err) {
            reject(err)
          }
          resolve(results)
        }
      )
    })
  }
  async update(id: number, insertData: IInsertData): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      let keysString: string = ''
      const values: any[] = []
      Object.entries(insertData).map((arr: string[]): void => {
        keysString += arr[0] + '= ?,'
        values.push(arr[1])
      })
      keysString = keysString.slice(0, -1)
      const sql: string = `UPDATE user SET ${keysString} WHERE id = ${id}`
      db.query(
        sql,
        values,
        async (err: any, results: any): Promise<any> => {
          if (err) {
            reject(err)
          }
          resolve(results)
        }
      )
    })
  }
  async delete(id: number): Promise<any> {
    return new Promise((resolve: any) => {
      db.query(
        `DELETE FROM user WHERE id=${id}`,
        async (err: any, results: any): Promise<any> => {
          if (err) {
            resolve(err)
          }
          resolve(results)
        }
      )
    })
  }
  async queryById(id: number): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const sql = `SELECT * FROM user WHERE id = ${id}`
      db.query(
        sql,
        async (err: any, results: any): Promise<any> => {
          if (err) {
            console.log(err)
            reject(err)
          }
          resolve(results)
        }
      )
    })
  }
  async queryAll(params: IParams): Promise<any> {
    return new Promise((resolve: any) => {
      const { page, size } = params
      db.query(
        `select * from user limit ${(page - 1) * size}, ${size}`,
        async (err: any, results: any): Promise<any> => {
          if (err) {
            resolve(err)
          }
          resolve(results)
        }
      )
    })
  }
  async queryByUserName({ userName = '', userPassword = '' }): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const sql = `SELECT * FROM user WHERE user_name = '${userName}' AND password = '${userPassword}'`
      db.query(
        sql,
        async (err: any, results: any): Promise<any> => {
          if (err) {
            reject(err)
          }
          resolve(results)
        }
      )
    })
  }
}
