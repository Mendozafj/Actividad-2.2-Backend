import { Evento } from '../models/EventoModelo.js';
import { Materia } from '../models/MateriaModelo.js';
import { Profesor } from '../models/ProfesorModelo.js';
export class EventoController {
    static async agregar(req, res) {
        try {
            const { tipo, descripcion, fecha, detalles, materiaId } = req.body;
            const materia = Materia.buscarPorId(materiaId);
            if (!materia) {
                return res.status(404).json({ message: "Materia no encontrada, debe existir una materia" });
            }
            const evento = new Evento(tipo, descripcion, fecha, detalles, materia.id);
            Evento.agregar(evento);
            res.status(201).json({ message: "Evento agregado con éxito", evento });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async listar(req, res) {
        res.status(200).json(Evento.listar());
    }

    static async buscarPorId(req, res) {
        const evento = Evento.buscarPorId(req.params.id);
        if (evento) {
            res.status(200).json(evento);
        } else {
            res.status(404).json({ message: "Evento no encontrado" });
        }
    }

    static async actualizar(req, res) {
        const eventoActualizado = Evento.actualizar(req.params.id, req.body);
        if (eventoActualizado) {
            res.status(200).json({ message: "Evento actualizado con éxito", evento: eventoActualizado });
        } else {
            res.status(404).json({ message: "Evento no encontrado" });
        }
    }

    static async eliminar(req, res) {
        const eventoEliminado = Evento.eliminar(req.params.id);
        if (eventoEliminado) {
            res.status(200).json({ message: "Evento eliminado con éxito"});
        } else {
            res.status(404).json({ message: "Evento no encontrado" });
        }
    }

    static async filtrarEventosProximos(eventos) {
        const hoy = new Date();
        const dosSemanasMasTarde = new Date(hoy.getTime() + 14 * 24 * 60 * 60 * 1000);
        return eventos.filter(evento => {
          const fechaEvento = new Date(evento.fecha);
          return fechaEvento >= hoy && fechaEvento <= dosSemanasMasTarde;
        });
      }

      static async listarEventosProximos(req, res) {
        try {
          const eventos = await Evento.listar(); 
          const materias = await Materia.listar(); 
          const profesores = await Profesor.listar(); 

          const eventosProximos = await EventoController.filtrarEventosProximos(eventos);

          const eventosProximosConMateriasYProfesores = eventosProximos.map(evento => {
            const materia = materias.find(materia => materia.id === evento.materiaId);
            const profesor = profesores.find(profesor => profesor.id === materia.profesorId);
            if (!materia || !profesor) {
              return res.status(404).json({ message: "No existe evento asociado con materia o profesor" });
            }
            return {
              ...evento,
              materia,
              profesor
            };
          });
          res.status(200).json(eventosProximosConMateriasYProfesores);
        } catch (error) {
          res.status(500).send({ message: "Error al obtener eventos próximos", error: error.message });
        }
      }
}