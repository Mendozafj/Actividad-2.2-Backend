import crypto from 'crypto';
import { BaseModelo } from '../config/BaseModelo.js';

export class Materia extends BaseModelo {
    static materias = [];

    constructor(materia, descripcion, profesorId) {
        super();
        this.id = crypto.randomUUID();
        this.materia = materia;
        this.descripcion = descripcion;
        this.profesorId = profesorId;
    }

    static agregar(materia) {
        return Materia.materias.push(materia);
    }

    static listar() {
        return Materia.materias;
    }

    static buscarPorId(id) {
        return Materia.materias.find(materia => materia.id === id);
    }

    static actualizar(id, datos) {
        const materia = Materia.buscarPorId(id);
        if (materia) {
            Object.assign(materia, datos);
            return materia;
        }
    }
    
    static eliminar(id) {
        const index = Materia.materias.findIndex(materia => materia.id === id);
        if (index !== -1) {
            return Materia.materias.splice(index, 1);
        }
    }
}
