import { Request, Response } from 'express'
import dataSource from '../config/datasource.config'
import { People } from '../entity/People'

export default class PeopleController {
  static async getAllPeople(req: Request, res: Response) {
    try {
      const allPeople = await dataSource.getRepository(People).find()

      return res.status(200).json(allPeople)
    } catch (err: any) {
      console.log(err)
      return res.status(200).send(err.message)
    }
  }

  static async getAllProfessors(req: Request, res: Response) {
    try {
      const allProfessors = await dataSource.getRepository(People).find({
        where: {
          role: 'professor',
        },
      })

      return res.status(200).json(allProfessors)
    } catch (err: any) {
      console.log(err)
      return res.status(200).send(err.message)
    }
  }

  static async getAllStudents(req: Request, res: Response) {
    try {
      const allStudents = await dataSource.getRepository(People).find({
        where: {
          role: 'student',
        },
      })

      return res.status(200).json(allStudents)
    } catch (err: any) {
      console.log(err)
      return res.status(200).send(err.message)
    }
  }
}
