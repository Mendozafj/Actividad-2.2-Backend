import { SeccionesModelo } from '../models/SeccionesModelo.js';

export class SeccionController {
    static async agregar(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                const { seccion, descripcion } = req.body;
                const seccionNueva = new SeccionesModelo({
                    seccion, descripcion
                })
                await seccionNueva.save();
                resolve(seccionNueva);
            } catch (error) {
                reject(error.message);
            }
        })
    }

    static async listar(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                const secciones = await SeccionesModelo.find();
                resolve(secciones)
            } catch (error) {
                reject(error.message);
            }
        })
    }

    static async buscarPorId(req, res) {
        return new Promise(async (resolve, reject) => {
            const seccion = await SeccionesModelo.findById(req.params.id);
            if (seccion) {
                resolve(seccion);
            } else {
                reject("Sección no encontrada");
            }
        })
    }

    static async actualizar(req, res) {
        return new Promise(async (resolve, reject) => {
            const seccionActualizada = await SeccionesModelo.findByIdAndUpdate(
                req.params.id,
                {
                    seccion: req.body.seccion,
                    descripcion: req.body.descripcion
                },
                { new: true }
            );
            if (seccionActualizada) {
                resolve(seccionActualizada);
            } else {
                reject("Sección no encontrada");
            }
        })
    }

    static async eliminar(req, res) {
        return new Promise(async (resolve, reject) => {
            const seccionEliminada = await SeccionesModelo.findByIdAndDelete(req.params.id);
            if (seccionEliminada) {
                resolve(seccionEliminada);
            } else {
                reject("Sección no encontrada");
            }
        })
    }
}