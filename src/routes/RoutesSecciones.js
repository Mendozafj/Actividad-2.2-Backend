import express from 'express';
import { SeccionController } from '../controllers/SeccionController.js';

const router = express.Router();

router.post('/secciones', function (req, res, next) {
    SeccionController.agregar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, mensaje: "Sección agregada con éxito", seccion: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funcionan con la base de datos

router.get('/secciones', function (req, res, next) {
    SeccionController.listar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, secciones: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funcionan con la base de datos

router.get('/secciones/:id', function (req, res, next) {
    SeccionController.buscarPorId(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, seccion: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funcionan con la base de datos

router.put('/secciones/:id', function (req, res, next) {
    SeccionController.actualizar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, mensaje: "Seccion Actualizada con exito", seccionActualizada: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funcionan con la base de datos

router.delete('/secciones/:id', function (req, res, next) {
    SeccionController.eliminar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, mensaje: "Seccion Eliminada con exito"})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funcionan con la base de datos

export default router;