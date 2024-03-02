import crypto from 'crypto';
import { BaseModelo } from '../config/BaseModelo.js';

export class Evento extends BaseModelo {
    static eventos = [];

    constructor(tipo, descripcion, fecha, detalles, materiaId) {
        super();
        this.id = crypto.randomUUID();
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.detalles = detalles;
        this.materiaId = materiaId;
    }

    static agregar(evento) {
        Evento.eventos.push(evento);
    }

    static listar() {
        return Evento.eventos;
    }

    static buscarPorId(id) {
        return Evento.eventos.find(evento => evento.id === id);
    }

    static actualizar(id, datos) {
        const index = Evento.eventos.findIndex(evento => evento.id === id);
        if (index !== -1) {
            Evento.eventos[index] = { ...Evento.eventos[index], ...datos };
            return Evento.eventos[index];
        }
        return null;
    }

    static eliminar(id) {
        const index = Evento.eventos.findIndex(evento => evento.id === id);
        if (index !== -1) {
            return Evento.eventos.splice(index, 1);
        }
        return null;
    }
}