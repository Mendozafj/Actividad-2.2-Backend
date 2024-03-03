import express from 'express';
import { EventoController } from '../controllers/EventoController.js';

const router = express.Router();

router.post('/eventos', function (req, res, next) {
    EventoController.agregar(req, res)
    .then((resultado) => {
        res.status(201).json({"status": 201, "mensaje": "Evento agregado con éxito", evento: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.get('/eventos', function (req, res, next) {
    EventoController.listar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, eventos: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.get('/eventos/proximos', function (req, res, next) {
    EventoController.listarEventosProximos(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, eventos: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.get('/eventos/:id', function (req, res, next) {
    EventoController.buscarPorId(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, evento: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.put('/eventos/:id', function (req, res, next) {
    EventoController.actualizar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, mensaje: "Evento actualizado con éxito", eventoActualizado: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

router.delete('/eventos/:id', function (req, res, next) {
    EventoController.eliminar(req, res)
    .then((resultado) => {
        res.status(200).json({"status": 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, "mensaje": error})
    })
}); // Funciona con la base de datos

export default router;