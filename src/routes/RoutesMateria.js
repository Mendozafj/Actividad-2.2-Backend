import express from 'express';
import { MateriaController } from '../controllers/MateriaController.js';

const router = express.Router();

router.post('/materias', MateriaController.agregar);
router.get('/materias', MateriaController.listar);
router.get('/materias/:id', MateriaController.buscarPorId);
router.get('/materias/:id/eventos-por-semana', MateriaController.eventosPorSemana);
router.put('/materias/:id/profesor', MateriaController.editarAsociacionProfesorMateria);
router.put('/materias/:id', MateriaController.actualizar);
router.delete('/materias/:id', MateriaController.eliminar);

export default router;
