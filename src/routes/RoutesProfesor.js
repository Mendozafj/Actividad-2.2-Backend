import express from 'express';
import { ProfesorController } from '../controllers/ProfesorController.js';

const router = express.Router();


router.post('/profesores', ProfesorController.agregar);

router.get('/profesores/materias', ProfesorController.listarProfesoresConMaterias);

router.get('/profesores', ProfesorController.listar);

router.get('/profesores/:id', ProfesorController.buscarPorId);

router.put('/profesores/:id', ProfesorController.actualizar);

router.delete('/profesores/:id', ProfesorController.eliminar);

router.delete('/profesores/:id/asociado/materias', ProfesorController.eliminarAsociacionProfesorMateria);

export default router;
