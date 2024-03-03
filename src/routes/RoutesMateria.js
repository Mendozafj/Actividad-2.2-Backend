import express from 'express';
import { MateriaController } from '../controllers/MateriaController.js';

const router = express.Router();

router.post('/materias', MateriaController.agregar); // Funciona con la base de datos
router.get('/materias', MateriaController.listar); // Funciona con la base de datos
router.get('/materias/:id', MateriaController.buscarPorId); // Funciona con la base de datos
router.get('/materias/:id/eventos-por-semana', MateriaController.eventosPorSemana);
router.put('/materias/:id/profesor', MateriaController.editarAsociacionProfesorMateria); // Funciona con la base de datos
router.put('/materias/:id', MateriaController.actualizar); // Funciona con la base de datos
router.delete('/materias/:id', MateriaController.eliminar); // Funciona con la base de datos

export default router;
