import crypto from 'crypto';
import { BaseModelo } from '../config/BaseModelo.js';

export class Seccion extends BaseModelo {
    static secciones = [];

    constructor(seccion, descripcion) {
        super();
        this.id = crypto.randomUUID();
        this.seccion = seccion;
        this.descripcion = descripcion;
    }

    static agregar(seccion) {
        Seccion.secciones.push(seccion);
    }

    static listar() {
        return Seccion.secciones;
    }

    static buscarPorId(id) {
        return Seccion.secciones.find(seccion => seccion.id === id);
    }

    static actualizar(id, datos) {
        const seccion = Seccion.buscarPorId(id);
        if (seccion) {
            Object.assign(seccion, datos);
            return seccion;
        }
    }
    
    static eliminar(id) {
        const seccionesFiltradas = Seccion.secciones.filter(seccion => seccion.id !== id);
        if (seccionesFiltradas.length < Seccion.secciones.length) {
            Seccion.secciones = seccionesFiltradas;
            return true; // O devolver un objeto o mensaje más informativo
        }
        return false; // O manejar de otra manera la no existencia de la seccion
    }
}
