import { EventosModelo } from '../models-copy/EventosModelo.js';
import { ProfesoresModelo } from '../models-copy/ProfesoresModelo.js';
import { MateriasModelo } from '../models-copy/MateriasModelo.js';

export class EventoController {
  static async agregar(req, res) {
    try {
      const { tipo, descripcion, fecha, detalles, materiaId } = req.body;
      const materia = await MateriasModelo.findById(materiaId);
      if (!materia) {
        return res.status(404).json({ message: "Materia no encontrada, debe existir una materia" });
      }
      const evento = new EventosModelo({
        tipo,
        descripcion,
        fecha,
        detalles,
        materiaId: materia._id
      })
      await evento.save();
      res.status(201).json({ message: "Evento agregado con éxito", evento });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listar(req, res) {
    try {
      const eventos = await EventosModelo.find();
      res.status(200).json(eventos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const evento = await EventosModelo.findById(req.params.id);
      if (evento) {
        res.status(200).json(evento);
      } else {
        res.status(404).json({ message: "Evento no encontrado" });
      }

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async actualizar(req, res) {
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
        res.status(200).json({ message: "Evento actualizado con éxito", evento: eventoActualizado });
      } else {
        res.status(404).json({ message: "Evento no encontrado" });
      }

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async eliminar(req, res) {
    try {
      const eventoEliminado = await EventosModelo.findByIdAndDelete(req.params.id);
      if (eventoEliminado) {
        res.status(200).json({ message: "Evento eliminado con éxito" });
      } else {
        res.status(404).json({ message: "Evento no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
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
    try {
      const eventos = await EventosModelo.find();

      const eventosProximos = await EventoController.filtrarEventosProximos(eventos);
      const eventosProximosConMateriasYProfesores = []

      for (let i = 0; i < eventosProximos.length; i++) {
        const materia = await MateriasModelo.findById(eventosProximos[i].materiaId);
        const profesor = await ProfesoresModelo.findById(materia.profesorId);
        if (!materia || !profesor) {
          return res.status(404).json({ message: "No existe evento asociado con materia o profesor" });
        }

        const eventoProximo = {
          evento: eventosProximos[i],
          materia,
          profesor
        }

        eventosProximosConMateriasYProfesores.push(eventoProximo)
      }

      res.status(200).json(eventosProximosConMateriasYProfesores);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener eventos próximos", error: error.message });
    }
  }
}