import express from 'express';
import { ProfesorController } from '../controllers/ProfesorController.js';

const router = express.Router();


router.post('/profesores', ProfesorController.agregar); // Funciona con la base de datos

router.get('/profesores/materias', ProfesorController.listarProfesoresConMaterias);

router.get('/profesores', ProfesorController.listar); // Funciona con la base de datos

router.get('/profesores/:id', ProfesorController.buscarPorId); // Funciona con la base de datos

router.put('/profesores/:id', ProfesorController.actualizar); // Funciona con la base de datos

router.delete('/profesores/:id', ProfesorController.eliminar); // Funciona con la base de datos

router.delete('/profesores/:id/asociado/materias', ProfesorController.eliminarAsociacionProfesorMateria); // Funciona con la base de datos

export default router;
