import * as mysqlDriver from 'mysql2'
import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  driver: mysqlDriver,
  type: 'mysql',
  host: 'localhost',
  username: 'lena',
  password: '007',
  database: 'english_school',
  entities: ['build/entity/*.js'],
  migrations: ['build/migrations/**/*.js'],
  logging: true,
  synchronize: true,
})

export default dataSource
