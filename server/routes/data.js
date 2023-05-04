import express from 'express'
import { CreateData, DeleteData, UpdateData, getData } from '../controllers/data.js'

const router = express.Router()

router.get('/', getData)
router.post('/', CreateData)
router.put('/:id', UpdateData)
router.delete('/:id', DeleteData)

export default router
