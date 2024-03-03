import { SeccionesModelo } from '../models-copy/SeccionesModelo.js';

export class SeccionController {
    static async agregar(req, res) {
        try {
            const { seccion, descripcion } = req.body;
            const seccionNueva = new SeccionesModelo({
                seccion, descripcion
            })
            await seccionNueva.save();
            res.status(201).json({ message: "Sección agregada con éxito", seccionNueva });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async listar(req, res) {

        try {
            const secciones = await SeccionesModelo.find();
            res.status(200).json(secciones)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    static async buscarPorId(req, res) {
        const seccion = await SeccionesModelo.findById(req.params.id);
        if (seccion) {
            res.status(200).json(seccion);
        } else {
            res.status(404).json({ message: "Sección no encontrada" });
        }
    }

    static async actualizar(req, res) {
        const seccionActualizada = await SeccionesModelo.findByIdAndUpdate(
            req.params.id,
            {
                seccion: req.body.seccion,
                descripcion: req.body.descripcion
            },
            { new: true }
        );
        if (seccionActualizada) {
            res.status(200).json({ message: "Sección actualizada con éxito", seccion: seccionActualizada });
        } else {
            res.status(404).json({ message: "Sección no encontrada" });
        }
    }

    static async eliminar(req, res) {
        const seccionEliminada = await SeccionesModelo.findByIdAndDelete(req.params.id);
        if (seccionEliminada) {
            res.status(200).json({ message: "Sección eliminada con éxito" });
        } else {
            res.status(404).json({ message: "Sección no encontrada" });
        }
    }
}