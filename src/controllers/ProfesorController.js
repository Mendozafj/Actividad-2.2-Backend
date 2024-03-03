import { MateriasModelo } from '../models/MateriasModelo.js';
import { ProfesoresModelo } from '../models/ProfesoresModelo.js';

export class ProfesorController {

  //Actualizado
  static async agregar(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const { nombre, apellido } = req.body;

        const profesor = new ProfesoresModelo({
          nombre, apellido
        })
        await profesor.save();
        resolve(profesor);
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async listar(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const profesores = await ProfesoresModelo.find()
        resolve(profesores);
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async buscarPorId(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = req.params;
        const profesor = await ProfesoresModelo.findById(id);
        if (profesor) {
          resolve(profesor);
        } else {
          reject("Profesor no encontrado");
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
        const profesorActualizado = await ProfesoresModelo.findByIdAndUpdate(
          id,
          {
            nombre: datos.nombre,
            apellido: datos.apellido
          },
          { new: true }
        );
        if (!profesorActualizado) {
          return reject("Profesor no encontrado");
        }
        resolve(profesorActualizado);
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async eliminar(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = req.params;
        const profesor = await ProfesoresModelo.findByIdAndDelete(id);
        if (!profesor) {
          return reject("Profesor no encontrado");
        }
        resolve("Profesor eliminado con éxito");
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async listarProfesoresConMaterias(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const profesores = await ProfesoresModelo.find();
        const profesoresConMaterias = []

        for (let i = 0; i < profesores.length; i++) {
          const materiasAsociadas = await MateriasModelo.find({ profesorId: profesores[i]._id })
          const relacion = {
            profesorAsociado: profesores[i],
            materiasAsociadas
          }

          profesoresConMaterias.push(relacion)
        }

        resolve(profesoresConMaterias);
      } catch (error) {
        reject(error.message);
      }
    })
  }

  static async eliminarAsociacionProfesorMateria(req, res) {
    return new Promise(async (resolve, reject) => {
      const { id } = req.params;

      try {
        const materiasAsociadas = await MateriasModelo.find({ profesorId: id })

        if (materiasAsociadas.length === 0) {
          return reject("Profesor no encontrado en Materias Asociadas.");
        }

        for (let i = 0; i < materiasAsociadas.length; i++) {
          await MateriasModelo.findByIdAndDelete(materiasAsociadas[i]._id);
        }

        const profesorEliminado = await ProfesoresModelo.findByIdAndDelete(id);
        if (!profesorEliminado) {
          return reject("Profesor no encontrado.");
        }

        resolve("Asociación y profesor eliminados con éxito.");
      } catch (error) {
        reject(error.toString());
      }
    })
  }
}
