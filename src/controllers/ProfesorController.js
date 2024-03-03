import { Profesor } from "../models/ProfesorModelo.js";
import { Materia } from "../models/MateriaModelo.js";
import { ProfesoresModelo } from '../models-copy/ProfesoresModelo.js';

export class ProfesorController {

  //Actualizado
  static async agregar(req, res) {
    try {
      const { nombre, apellido } = req.body;

      const profesor = new ProfesoresModelo({
        nombre, apellido
      })
      await profesor.save();
      res
        .status(201)
        .json({ message: "Profesor agregado con éxito", profesor });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listar(req, res) {
    try {
      const profesores = await ProfesoresModelo.find()
      res.status(200).json(profesores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const profesor = await ProfesoresModelo.findById(id);
      if (profesor) {
        res.status(200).json(profesor);
      } else {
        res.status(404).json({ message: "Profesor no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async actualizar(req, res) {
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
        return res.status(404).json({ message: "Profesor no encontrado" });
      }
      res
        .status(200)
        .json({
          message: "Profesor actualizado con éxito",
          profesorActualizado,
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      const profesor = await ProfesoresModelo.findByIdAndDelete(id);
      if (!profesor) {
        return res.status(404).json({ message: "Profesor no encontrado" });
      }
      res.status(200).json({ message: "Profesor eliminado con éxito" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static listarProfesoresConMaterias(req, res) {
    try {
      const profesoresConMaterias = Profesor.profesores.map((profesor) => {
        const materias = Materia.listar().filter(
          (materia) => materia.profesorId === profesor.id
        );
        return { ...profesor, materias };
      });
      res.render('profesoresMaterias', { profesores: profesoresConMaterias });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async eliminarAsociacionProfesorMateria(req, res) {
    const { id } = req.params;

    try {
      const materiasAsociadas = Materia.listar().filter(
        (materia) => materia.profesorId === id
      );

      if (materiasAsociadas.length === 0) {
        return res.status(404).json({ message: "Profesor no encontrado en Materias Asociadas." });
      }

      materiasAsociadas.forEach((materia) => {
        Materia.eliminar(materia.id);
      });

      const profesorEliminado = Profesor.eliminar(id);
      if (!profesorEliminado) {
        return res.status(404).json({ message: "Profesor no encontrado." });
      }

      res
        .status(200)
        .json({ message: "Asociación y profesor eliminados con éxito." });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al eliminar la asociación y el profesor.",
          error: error.toString(),
        });
    }
  }
}
