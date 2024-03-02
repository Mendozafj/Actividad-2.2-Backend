import crypto from 'crypto';
import { BaseModelo } from '../config/BaseModelo.js';

export class Profesor extends BaseModelo {
    static profesores = [];

    constructor(nombre, apellido, ) {
        super();
        this.id = crypto.randomUUID();
        this.nombre = nombre;
        this.apellido = apellido;

    }

    static agregar(profesor) {
        Profesor.profesores.push(profesor);
    }

    static listar() {
        return Profesor.profesores;
    }

    static buscarPorId(id) {
        return Profesor.profesores.find(profesor => profesor.id === id);
    }

    static actualizar(id, datos) {
        const profesor = Profesor.buscarPorId(id);
        if (profesor) {
            Object.assign(profesor, datos);
            return profesor;
        }
    }
    
    static eliminar(id) {
        const profesor = Profesor.buscarPorId(id);
        if (profesor) {
            Profesor.profesores = Profesor.profesores.filter(profesor => profesor.id !== id);
            return profesor;
        }
    }

}