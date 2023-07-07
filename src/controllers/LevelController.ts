import { Request, Response } from 'express'
import dataSource from '../config/datasource.config'
import { Level } from '../entity/Level'
import { z } from 'zod'

export default class LevelController {
  static async getAllLevels(req: Request, res: Response) {
    try {
      const allLevels = await dataSource.getRepository(Level).find()

      return res.status(200).json(allLevels)
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }

  static async getLevelById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const level = await dataSource
        .getRepository(Level)
        .findOneBy({ id: Number(id) })

      if (level === null) {
        return res.status(404).json({
          error: `Could not find level with id: ${id}`,
        })
      }

      return res.status(200).json(level)
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }

  static async createLevel(req: Request, res: Response) {
    try {
      const createLevelBody = z.object({
        level_description: z.string(),
      })
      const levelBody = createLevelBody.parse(req.body)

      const levelWithThisName = await dataSource
        .getRepository(Level)
        .findOneBy({ level_description: levelBody.level_description })

      if (levelWithThisName !== null) {
        return res.status(400).json({
          message: 'This level already exists.',
        })
      }

      await dataSource
        .createQueryBuilder()
        .insert()
        .into(Level)
        .values(levelBody)
        .execute()

      return res.status(200).json(levelBody)
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }

  static async deleteLevel(req: Request, res: Response) {
    try {
      const { id } = req.params

      const level = await dataSource
        .createQueryBuilder()
        .delete()
        .from(Level)
        .where('id = :id', { id: Number(id) })
        .execute()

      if (level.affected === 0) {
        return res.status(404).json({
          error: `Could not find level with id: ${id}`,
        })
      }

      return res.status(200).json({ status: 'OK' })
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }

  static async updateLevel(req: Request, res: Response) {
    try {
      const { id } = req.params
      const updateLevelBody = z.object({
        level_description: z.string(),
      })

      const levelBody = updateLevelBody.parse(req.body)

      const levelWithThisEmail = await dataSource
        .getRepository(Level)
        .findOneBy({ level_description: levelBody.level_description })

      if (levelWithThisEmail !== null) {
        return res.status(400).json({
          message: 'This level already exists.',
        })
      }

      const level = await dataSource
        .createQueryBuilder()
        .update(Level)
        .set(levelBody)
        .where('id = :id', { id: Number(id) })
        .execute()

      if (level.affected === 0) {
        return res.status(404).json({
          error: `Could not find level with id: ${id}`,
        })
      }

      const levelUpdated = await dataSource
        .getRepository(Level)
        .findOneBy({ id: Number(id) })

      return res.status(200).json(levelUpdated)
    } catch (err: any) {
      console.log(err)
      return res.status(500).send(err.message)
    }
  }
}
