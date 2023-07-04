import express from 'express'
import Routes from './routes'
import dataSource from './config/datasource.config'

const app = express()

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err)
  })

Routes(app)

const port = 2121

app.listen(port, () => console.log(`Listening to port: ${port}`))

export default app
