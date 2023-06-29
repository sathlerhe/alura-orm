import { Router } from 'express'
import PeopleController from '../controllers/PeopleController'

const router = Router()

router.get('/people', PeopleController.getAllPeople)
router.get('/professors', PeopleController.getAllProfessors)
router.get('/students', PeopleController.getAllStudents)

export default router
