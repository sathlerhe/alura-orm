import { Router } from 'express'
import PeopleController from '../controllers/PeopleController'

const router = Router()

router.get('/people', PeopleController.getAllPeople)
router.get('/people/:id', PeopleController.getAPersonById)
router.get('/professors', PeopleController.getAllProfessors)
router.get('/students', PeopleController.getAllStudents)
router.post('/people', PeopleController.createPerson)
router.put('/people/:id', PeopleController.updatePerson)
router.delete('/people/:id', PeopleController.deletePerson)

export default router
