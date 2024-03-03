import express from 'express';
import { ProfesorController } from '../controllers/ProfesorController.js';

const router = express.Router();


router.post('/profesores', function (req, res, next) {
    ProfesorController.agregar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, mensaje: "Profesor agregado con éxito", profesor: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.get('/profesores/materias', function (req, res, next) {
    ProfesorController.listarProfesoresConMaterias(req, res)
    .then((resultado) => {
        res.render('profesoresMaterias', { profesores: resultado })
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
});

router.get('/profesores', function (req, res, next) {
    ProfesorController.listar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, profesores: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.get('/profesores/:id', function (req, res, next) {
    ProfesorController.buscarPorId(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, profesor: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.put('/profesores/:id', function (req, res, next) {
    ProfesorController.actualizar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, mensaje: "Profesor Actualizado con exito", profesorActualizado: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.delete('/profesores/:id', function (req, res, next) {
    ProfesorController.eliminar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.delete('/profesores/:id/asociado/materias', function (req, res, next) {
    ProfesorController.eliminarAsociacionProfesorMateria(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

export default router;
