import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear.js";
dayjs.extend(weekOfYear);

import { Materia } from "../models/MateriaModelo.js";
import { Profesor } from "../models/ProfesorModelo.js";
import { Evento } from "../models/EventoModelo.js";

export class MateriaController {
  static async agregar(req, res) {
    try {
      const { materia, descripcion, profesorId } = req.body;
      const profesor = Profesor.buscarPorId(profesorId);

      if (!profesor) {
        return res.status(404).json({
          message: "Profesor no encontrado, debe existir un profesor",
        });
      }
      const profesorIdExistente = profesor.id;
      const materiaNueva = new Materia(
        materia,
        descripcion,
        profesorIdExistente
      );
      Materia.agregar(materiaNueva);
      res
        .status(201)
        .json({ message: "Materia agregada con éxito", materiaNueva });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listar(req, res) {
    try {
      res.status(200).json(Materia.listar());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const materia = Materia.buscarPorId(id);
      if (materia) {
        res.status(200).json(materia);
      } else {
        res.status(404).json({ message: "Materia no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const datos = req.body;
      const materiaActualizada = Materia.actualizar(id, datos);
      if (materiaActualizada) {
        res.status(200).json({
          message: "Materia actualizada con éxito",
          materiaActualizada,
        });
      } else {
        res.status(404).json({ message: "Materia no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      const materiaEliminada = Materia.eliminar(id);
      if (materiaEliminada) {
        res.status(200).json({ message: "Materia eliminada con éxito" });
      } else {
        res.status(404).json({ message: "Materia no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async editarAsociacionProfesorMateria(req, res) {
    try {
      const { id } = req.params;
      const { nombre, apellido, materia, descripcion, profesorId } = req.body;

      const profesorExistente = await Profesor.buscarPorId(profesorId);
      if (!profesorExistente) {
        return res.status(404).json({ message: "Profesor no encontrado" });
      }

      if (nombre && apellido) {
        const datosProfesor = { nombre, apellido };
        await Profesor.actualizar(profesorId, datosProfesor);
      } else {
        return res.status(400).json({
          message: "Debe proporcionar nombre y apellido del profesor",
        });
      }

      const materiaExistente = await Materia.buscarPorId(id);
      if (!materiaExistente) {
        return res.status(404).json({ message: "Materia no encontrada" });
      }

      if (materia && descripcion && profesorId) {
        const datosMateria = { materia, descripcion };
        await Materia.actualizar(id, datosMateria);
      } else {
        return res.status(400).json({
          message: "Debe proporcionar materia, descripción y profesorId",
        });
      }

      const materiaActualizada = await Materia.buscarPorId(id);
      const profesorActualizado = await Profesor.buscarPorId(profesorId);

      res.status(200).json({
        message: "Asociación de materia a profesor actualizada con éxito",
        materia: materiaActualizada,
        profesor: profesorActualizado,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar la asociación de materia a profesor",
        error: error.message,
      });
    }
  }

  static async eventosPorSemana(req, res) {
    const { id } = req.params;
    const fechaConsulta = req.query.fecha; // OJO: formato YYYY-MM-DD
    const fechaReferencia = dayjs(fechaConsulta);
    const semanaConsulta = fechaReferencia.week();
    const anoConsulta = fechaReferencia.year();

    try {
      if (!fechaConsulta) {
        return res.status(400).json({
          error: "Se requiere una fecha válida en formato 'YYYY-MM-DD'.",
        });
      }
      const fechaInicioSemana = dayjs(fechaConsulta)
        .startOf("week")
        .format("YYYY-MM-DD");
      const fechaFinSemana = dayjs(fechaConsulta).endOf("week").format("YYYY-MM-DD");

      const materiaExistente = await Materia.buscarPorId(id);
      if (!materiaExistente) {
        return res.status(404).json({ message: "Materia no encontrada." });
      }

      const eventos = await Evento.listar();
      if (eventos.length === 0) {
        return res.status(404).json({ message: "No hay eventos registrados." });
      }

      const eventosFiltrados = eventos.filter((evento) => {
        const fechaEvento = dayjs(evento.fecha);
        return (
          evento.materiaId === id &&
          fechaEvento.week() === semanaConsulta &&
          fechaEvento.year() === anoConsulta
        );
      });

      if (eventosFiltrados.length === 0) {
        return res.status(404).json({
          message:
            "No se encontraron eventos para la materia en la semana especificada.",
        });
      }

      res.render("eventosPorSemana", {
        materia: materiaExistente,
        semana: semanaConsulta,
        eventos: eventosFiltrados,
        fechaInicio: fechaInicioSemana, 
        fechaFin: fechaFinSemana 
      });

      //res
      //.status(200)
      //.json({ eventos: eventosFiltrados, materia: materiaExistente });
    } catch (error) {
      res.status(500).send({
        message: "Error al obtener eventos por semana para la materia",
        error: error.toString(),
      });
    }
  }
}
