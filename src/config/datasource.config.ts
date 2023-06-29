import * as mysqlDriver from 'mysql2'
import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  driver: mysqlDriver,
  type: 'mysql',
  host: 'localhost',
  username: 'lena',
  password: '007',
  database: 'english_school',
  entities: ['src/entity/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  logging: true,
  synchronize: true,
})

export default dataSource
