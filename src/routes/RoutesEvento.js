import express from 'express';
import { EventoController } from '../controllers/EventoController.js';

const router = express.Router();

router.post('/eventos', EventoController.agregar); // Funciona con la base de datos
router.get('/eventos', EventoController.listar); // Funciona con la base de datos
router.get('/eventos/proximos', EventoController.listarEventosProximos); // Funciona con la base de datos
router.get('/eventos/:id', EventoController.buscarPorId); // Funciona con la base de datos
router.put('/eventos/:id', EventoController.actualizar); // Funciona con la base de datos
router.delete('/eventos/:id', EventoController.eliminar); // Funciona con la base de datos

export default router;