import express, { Express } from 'express'
import PeopleRouter from './PeopleRouter'

export default function Routes(app: Express) {
  app.use(express.json())

  app.use(PeopleRouter)
}
