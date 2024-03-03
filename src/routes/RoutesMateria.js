import express from 'express';
import { MateriaController } from '../controllers/MateriaController.js';

const router = express.Router();

router.post('/materias', function (req, res, next) {
    MateriaController.agregar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, mensaje: "Materia agregada con éxito", materia: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.get('/materias', function (req, res, next) {
    MateriaController.listar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, materias: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.get('/materias/:id', function (req, res, next) {
    MateriaController.buscarPorId(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, materia: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.get('/materias/:id/eventos-por-semana', function (req, res, next) {
    MateriaController.eventosPorSemana(req, res)
    .then((resultado) => {
        res.render("eventosPorSemana", {
            materia: resultado.materiaExistente,
            semana: resultado.semanaConsulta,
            eventos: resultado.eventosFiltrados,
            fechaInicio: resultado.fechaInicioSemana,
            fechaFin: resultado.fechaFinSemana
          });
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.put('/materias/:id/profesor', function (req, res, next) {
    MateriaController.editarAsociacionProfesorMateria(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, actualizacion: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.put('/materias/:id', function (req, res, next) {
    MateriaController.actualizar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, mensaje: "Materia actualizada con éxito", materiaActualizada: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.delete('/materias/:id', function (req, res, next) {
    MateriaController.eliminar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

export default router;
