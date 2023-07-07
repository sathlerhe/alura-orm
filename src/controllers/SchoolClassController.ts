import { Request, Response } from 'express'
import dataSource from '../config/datasource.config'
import { SchoolClass } from '../entity/SchoolClass'
import { z } from 'zod'
import { People } from '../entity/People'
import { Level } from '../entity/Level'

export default class SchoolClassController {
  static async getAllSchoolClass(req: Request, res: Response) {
    try {
      const allSchoolClass = await dataSource.getRepository(SchoolClass).find()

      return res.status(200).json(allSchoolClass)
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }

  static async getSchoolClassById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const schoolClass = await dataSource
        .getRepository(SchoolClass)
        .findOneBy({ id: Number(id) })

      if (schoolClass === null) {
        return res.status(404).json({
          error: `Could not find schoolClass with id: ${id}`,
        })
      }

      return res.status(200).json(schoolClass)
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }

  static async createSchoolClass(req: Request, res: Response) {
    try {
      const createSchoolClassBody = z.object({
        initial_date: z.coerce.date(),
        levelId: z.number(),
        professorId: z.number(),
      })
      const schoolClassBody = createSchoolClassBody.parse(req.body)

      const professor = await dataSource.getRepository(People).findOne({
        where: { id: schoolClassBody.professorId, role: 'professor' },
      })

      if (professor === null || !professor) {
        return res.status(400).json({
          error: `Could not find any professor with this id: ${schoolClassBody.professorId}`,
        })
      }

      const level = await dataSource.getRepository(Level).findOne({
        where: { id: schoolClassBody.levelId },
      })

      if (level === null || !level) {
        return res.status(400).json({
          error: `Could not find any level with this id: ${schoolClassBody.levelId}`,
        })
      }

      await dataSource
        .createQueryBuilder()
        .insert()
        .into(SchoolClass)
        .values(schoolClassBody)
        .execute()

      return res.status(200).json(schoolClassBody)
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }

  static async deleteSchoolClass(req: Request, res: Response) {
    try {
      const { id } = req.params

      const schoolClass = await dataSource
        .createQueryBuilder()
        .delete()
        .from(SchoolClass)
        .where('id = :id', { id: Number(id) })
        .execute()

      if (schoolClass.affected === 0) {
        return res.status(404).json({
          error: `Could not find schoolClass with id: ${id}`,
        })
      }

      return res.status(200).json({ status: 'OK' })
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }

  static async updateSchoolClass(req: Request, res: Response) {
    try {
      const { id } = req.params
      const createSchoolClassBody = z.object({
        initial_date: z.coerce.date().optional(),
        levelId: z.number().optional(),
        professorId: z.number().optional(),
      })
      const schoolClassBody = createSchoolClassBody.parse(req.body)

      if (schoolClassBody?.professorId) {
        const professor = await dataSource.getRepository(People).findOne({
          where: { id: schoolClassBody.professorId, role: 'professor' },
        })

        if (professor === null || !professor) {
          return res.status(400).json({
            error: `Could not find any professor with this id: ${schoolClassBody.professorId}`,
          })
        }
      }

      if (schoolClassBody?.levelId) {
        const level = await dataSource.getRepository(Level).findOne({
          where: { id: schoolClassBody.levelId },
        })

        if (level === null || !level) {
          return res.status(400).json({
            error: `Could not find any level with this id: ${schoolClassBody.levelId}`,
          })
        }
      }

      const schoolClass = await dataSource
        .createQueryBuilder()
        .update(SchoolClass)
        .set(schoolClassBody)
        .where('id = :id', { id: Number(id) })
        .execute()

      if (schoolClass.affected === 0) {
        return res.status(404).json({
          error: `Could not find schoolClass with id: ${id}`,
        })
      }

      const schoolClassUpdated = await dataSource
        .getRepository(SchoolClass)
        .findOneBy({ id: Number(id) })

      return res.status(200).json(schoolClassUpdated)
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }
}
