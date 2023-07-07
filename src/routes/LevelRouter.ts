import { Router } from 'express'
import LevelController from '../controllers/LevelController'

const router = Router()

router.get('/level', LevelController.getAllLevels)
router.get('/level/:id', LevelController.getLevelById)
router.post('/level', LevelController.createLevel)
router.put('/level/:id', LevelController.updateLevel)
router.delete('/level/:id', LevelController.deleteLevel)

export default router
