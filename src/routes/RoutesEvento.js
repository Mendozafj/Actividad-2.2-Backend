import express from 'express';
import { EventoController } from '../controllers/EventoController.js';

const router = express.Router();

router.post('/eventos', EventoController.agregar);
router.get('/eventos', EventoController.listar);
router.get('/eventos/proximos', EventoController.listarEventosProximos);
router.get('/eventos/:id', EventoController.buscarPorId);
router.put('/eventos/:id', EventoController.actualizar);
router.delete('/eventos/:id', EventoController.eliminar);

export default router;