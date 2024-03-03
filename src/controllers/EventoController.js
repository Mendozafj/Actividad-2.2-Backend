import { EventosModelo } from '../models/EventosModelo.js';
import { ProfesoresModelo } from '../models/ProfesoresModelo.js';
import { MateriasModelo } from '../models/MateriasModelo.js';
import { response } from 'express';

export class EventoController {
  static async agregar(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const { tipo, descripcion, fecha, detalles, materiaId } = req.body;
        const materia = await MateriasModelo.findById(materiaId);
        if (!materia) {
          return reject("Materia no encontrada, debe existir una materia");
        }
        const evento = new EventosModelo({
          tipo,
          descripcion,
          fecha,
          detalles,
          materiaId: materia._id
        })
        await evento.save();
        response(evento)
      } catch (error) {
        return reject(error.message);
      }
    })
  }

  static async listar(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const eventos = await EventosModelo.find();
        resolve(eventos);
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async buscarPorId(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const evento = await EventosModelo.findById(req.params.id);
        if (evento) {
          resolve(evento);
        } else {
          reject("Evento no encontrado");
        }

      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async actualizar(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const eventoActualizado = await EventosModelo.findByIdAndUpdate(
          req.params.id,
          {
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            detalles: req.body.detalles,
          },
          { new: true }
        );
        if (eventoActualizado) {
          resolve(eventoActualizado);
        } else {
          reject("Evento no encontrado");
        }

      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async eliminar(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const eventoEliminado = await EventosModelo.findByIdAndDelete(req.params.id);
        if (eventoEliminado) {
          resolve("Evento eliminado con éxito");
        } else {
          reject("Evento no encontrado");
        }
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async filtrarEventosProximos(eventos) {
    try {
      const hoy = new Date();
      const dosSemanasMasTarde = new Date(hoy.getTime() + 14 * 24 * 60 * 60 * 1000);
      const eventosFiltrados = []

      eventos.forEach(evento => {
        const fechaEvento = new Date(evento.fecha);
        if (fechaEvento >= hoy && fechaEvento <= dosSemanasMasTarde) {
          eventosFiltrados.push(evento)
        }
      });

      return eventosFiltrados
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listarEventosProximos(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const eventos = await EventosModelo.find();

        const eventosProximos = await EventoController.filtrarEventosProximos(eventos);
        const eventosProximosConMateriasYProfesores = []

        for (let i = 0; i < eventosProximos.length; i++) {
          const materia = await MateriasModelo.findById(eventosProximos[i].materiaId);
          const profesor = await ProfesoresModelo.findById(materia.profesorId);
          if (!materia || !profesor) {
            reject("No existe evento asociado con materia o profesor");
          }

          const eventoProximo = {
            evento: eventosProximos[i],
            materia,
            profesor
          }

          eventosProximosConMateriasYProfesores.push(eventoProximo)
        }

        resolve(eventosProximosConMateriasYProfesores);
      } catch (error) {
        reject(error.message);
      }
    })
  }

}