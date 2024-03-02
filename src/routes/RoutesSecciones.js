import express from 'express';
import { SeccionController } from '../controllers/SeccionController.js';

const router = express.Router();

router.post('/secciones', SeccionController.agregar);
router.get('/secciones', SeccionController.listar);
router.get('/secciones/:id', SeccionController.buscarPorId);
router.put('/secciones/:id', SeccionController.actualizar);
router.delete('/secciones/:id', SeccionController.eliminar);

export default router;