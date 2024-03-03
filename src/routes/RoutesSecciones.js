import express from 'express';
import { SeccionController } from '../controllers/SeccionController.js';

const router = express.Router();

router.post('/secciones', SeccionController.agregar); // Funcionan con la base de datos
router.get('/secciones', SeccionController.listar); // Funcionan con la base de datos
router.get('/secciones/:id', SeccionController.buscarPorId); // Funcionan con la base de datos
router.put('/secciones/:id', SeccionController.actualizar); // Funcionan con la base de datos
router.delete('/secciones/:id', SeccionController.eliminar); // Funcionan con la base de datos

export default router;