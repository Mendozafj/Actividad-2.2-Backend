import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear.js";
dayjs.extend(weekOfYear);

import { EventosModelo } from "../models/EventosModelo.js";
import { ProfesoresModelo } from '../models/ProfesoresModelo.js';
import { MateriasModelo } from '../models/MateriasModelo.js';

export class MateriaController {
  static async agregar(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const { materia, descripcion, profesorId } = req.body;
        const profesor = await ProfesoresModelo.findById(profesorId);

        if (!profesor) {
          return reject("Profesor no encontrado, debe existir un profesor");
        }
        const materiaNueva = new MateriasModelo({
          materia,
          descripcion,
          profesorId: profesor._id
        })
        await materiaNueva.save();
        resolve(materiaNueva);
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async listar(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const materias = await MateriasModelo.find();
        resolve(materias);
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async buscarPorId(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = req.params;
        const materia = await MateriasModelo.findById(id);
        if (materia) {
          resolve(materia);
        } else {
          reject("Materia no encontrada");
        }
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async actualizar(req, res) {
    return new Promise(async (resolve, reject) => {
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
          resolve(materiaActualizada);
        } else {
          reject("Materia no encontrada");
        }
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async eliminar(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = req.params;
        const materiaEliminada = await MateriasModelo.findByIdAndDelete(id);
        if (materiaEliminada) {
          resolve("Materia eliminada con éxito");
        } else {
          reject("Materia no encontrada");
        }
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async editarAsociacionProfesorMateria(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = req.params;
        const { nombre, apellido, materia, descripcion, profesorId } = req.body;
  
        const profesorExistente = await ProfesoresModelo.findById(profesorId);
        if (!profesorExistente) {
          return reject("Profesor no encontrado");
        }
  
        if (nombre && apellido) {
          const datosProfesor = { nombre, apellido };
          await ProfesoresModelo.findByIdAndUpdate(
            profesorId,
            datosProfesor,
            { new: true }
          );
        } else {
          return reject("Debe proporcionar nombre y apellido del profesor");
        }
  
        const materiaExistente = await MateriasModelo.findById(id);
        if (!materiaExistente) {
          return reject("Materia no encontrada");
        }
  
        if (materia && descripcion && profesorId) {
          const datosMateria = { materia, descripcion };
          await MateriasModelo.findByIdAndUpdate(
            id,
            datosMateria,
            { new: true }
          );
        } else {
          return reject("Debe proporcionar materia, descripción y profesorId");
        }
  
        const materiaActualizada = await MateriasModelo.findById(id);
        const profesorActualizado = await ProfesoresModelo.findById(profesorId);
  
        resolve({
          materia: materiaActualizada,
          profesor: profesorActualizado,
        });
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async eventosPorSemana(req, res) {
    return new Promise(async (resolve, reject) => {
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
        return reject("Materia no encontrada.");
      }

      const eventos = await EventosModelo.find();
      if (eventos.length === 0) {
        return reject("No hay eventos registrados.");
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
        return reject("No se encontraron eventos para la materia en la semana especificada.");
      }

      resolve({
        materiaExistente,
        semanaConsulta,
        eventosFiltrados,
        fechaInicioSemana,
        fechaFinSemana
      });

      //res
      //.status(200)
      //.json({ eventos: eventosFiltrados, materia: materiaExistente });
    } catch (error) {
      reject(error.toString());
    }
    })
  }
}
