import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear.js";
dayjs.extend(weekOfYear);

import { EventosModelo } from "../models/EventosModelo.js";
import { ProfesoresModelo } from '../models/ProfesoresModelo.js';
import { MateriasModelo } from '../models/MateriasModelo.js';

export class MateriaController {
  static async agregar(req, res) {
    try {
      const { materia, descripcion, profesorId } = req.body;
      const profesor = await ProfesoresModelo.findById(profesorId);

      if (!profesor) {
        return res.status(404).json({
          message: "Profesor no encontrado, debe existir un profesor",
        });
      }
      const materiaNueva = new MateriasModelo({
        materia,
        descripcion,
        profesorId: profesor._id
      })
      await materiaNueva.save();
      res
        .status(201)
        .json({ message: "Materia agregada con éxito", materiaNueva });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listar(req, res) {
    try {
      const materias = await MateriasModelo.find();
      res.status(200).json(materias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const materia = await MateriasModelo.findById(id);
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
      const materiaActualizada = await MateriasModelo.findByIdAndUpdate(
        id,
        {
          materia: datos.materia, descripcion: datos.descripcion, profesorId: datos.profesorId
        },
        { new: true }
      );
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
      const materiaEliminada = await MateriasModelo.findByIdAndDelete(id);
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

      const profesorExistente = await ProfesoresModelo.findById(profesorId);
      if (!profesorExistente) {
        return res.status(404).json({ message: "Profesor no encontrado" });
      }

      if (nombre && apellido) {
        const datosProfesor = { nombre, apellido };
        await ProfesoresModelo.findByIdAndUpdate(
          profesorId,
          datosProfesor,
          { new: true }
        );
      } else {
        return res.status(400).json({
          message: "Debe proporcionar nombre y apellido del profesor",
        });
      }

      const materiaExistente = await MateriasModelo.findById(id);
      if (!materiaExistente) {
        return res.status(404).json({ message: "Materia no encontrada" });
      }

      if (materia && descripcion && profesorId) {
        const datosMateria = { materia, descripcion };
        await MateriasModelo.findByIdAndUpdate(
          id,
          datosMateria,
          { new: true }
        );
      } else {
        return res.status(400).json({
          message: "Debe proporcionar materia, descripción y profesorId",
        });
      }

      const materiaActualizada = await MateriasModelo.findById(id);
      const profesorActualizado = await ProfesoresModelo.findById(profesorId);

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

      const materiaExistente = await MateriasModelo.findById(id);
      if (!materiaExistente) {
        return res.status(404).json({ message: "Materia no encontrada." });
      }

      const eventos = await EventosModelo.find();
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
