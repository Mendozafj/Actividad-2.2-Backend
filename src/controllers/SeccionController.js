import { Seccion } from '../models/SeccionesModelo.js';

export class SeccionController {
    static async agregar(req, res) {
        try {
            const { seccion, descripcion } = req.body;
            const seccionNueva = new Seccion(seccion, descripcion);
            Seccion.agregar(seccionNueva);
            res.status(201).json({ message: "Sección agregada con éxito", seccionNueva });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async listar(req, res) {

        try {
            const secciones = Seccion.listar();
            res.status(200).json(secciones)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    static async buscarPorId(req, res) {
        const seccion = Seccion.buscarPorId(req.params.id);
        if (seccion) {
            res.status(200).json(seccion);
        } else {
            res.status(404).json({ message: "Sección no encontrada" });
        }
    }

    static async actualizar(req, res) {
        const seccionActualizada = Seccion.actualizar(req.params.id, req.body);
        if (seccionActualizada) {
            res.status(200).json({ message: "Sección actualizada con éxito", seccion: seccionActualizada });
        } else {
            res.status(404).json({ message: "Sección no encontrada" });
        }
    }

    static async eliminar(req, res) {
        const seccionEliminada = Seccion.eliminar(req.params.id);
        if (seccionEliminada) {
            res.status(200).json({ message: "Sección eliminada con éxito"});
        } else {
            res.status(404).json({ message: "Sección no encontrada" });
        }
    }
}