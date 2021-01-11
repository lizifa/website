import redis from 'redis'
import { REDISCONFIG } from '../config'
const { port, host, opts } = REDISCONFIG

export async function useRedis(): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    const client = redis.createClient(port, host, opts)
    client.on('ready', (res: any) => {
      console.log('ready', res)
    })

    client.on('end', (err: any) => {
      console.log('end', err)
    })

    client.on('error', (err) => {
      console.log('error', err)
      reject()
    })

    client.on('connect', () => {
      console.log('redis connect success!')
      resolve(client)
    })
  })
}
