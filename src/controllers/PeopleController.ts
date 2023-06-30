import { Request, Response } from 'express'
import dataSource from '../config/datasource.config'
import { People } from '../entity/People'
import { z } from 'zod'

export default class PeopleController {
  static async getAllPeople(req: Request, res: Response) {
    try {
      const allPeople = await dataSource.getRepository(People).find()

      return res.status(200).json(allPeople)
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
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
      return res.status(500).send(err.message)
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
      return res.status(500).send(err.message)
    }
  }

  static async getAPersonById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const person = await dataSource
        .getRepository(People)
        .findOneBy({ id: Number(id) })

      if (person === null) {
        return res.status(404).json({
          error: `Could not find person with id: ${id}`,
        })
      }

      return res.status(200).json(person)
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }

  static async createPerson(req: Request, res: Response) {
    try {
      const createPersonBody = z.object({
        name: z.string(),
        role: z.enum(['student', 'professor']),
        email: z.string().email(),
      })

      const personBody = createPersonBody.parse(req.body)

      const personWithThisEmail = await dataSource
        .getRepository(People)
        .findOneBy({ email: personBody.email })

      if (personWithThisEmail !== null) {
        return res.status(400).json({
          message: 'This email has already been used.',
        })
      }

      await dataSource
        .createQueryBuilder()
        .insert()
        .into(People)
        .values(personBody)
        .execute()

      return res.status(200).json(personBody)
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }

  static async deletePerson(req: Request, res: Response) {
    try {
      const { id } = req.params

      const person = await dataSource
        .createQueryBuilder()
        .delete()
        .from(People)
        .where('id = :id', { id: Number(id) })
        .execute()

      if (person.affected === 0) {
        return res.status(404).json({
          error: `Could not find person with id: ${id}`,
        })
      }

      return res.status(200).json({ status: 'OK' })
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }
}
