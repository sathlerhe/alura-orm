import express, { Express } from 'express'
import PeopleRouter from './PeopleRouter'
import LevelRouter from './LevelRouter'
import SchoolClassRouter from './SchoolClassRouter'

export default function Routes(app: Express) {
  app.use(express.json(), PeopleRouter, LevelRouter, SchoolClassRouter)
}
