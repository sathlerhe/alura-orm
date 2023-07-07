import { Router } from 'express'
import SchoolClassController from '../controllers/SchoolClassController'

const router = Router()

router.get('/class', SchoolClassController.getAllSchoolClass)
router.get('/class/:id', SchoolClassController.getSchoolClassById)
router.post('/class', SchoolClassController.createSchoolClass)
router.put('/class/:id', SchoolClassController.updateSchoolClass)
router.delete('/class/:id', SchoolClassController.deleteSchoolClass)

export default router
