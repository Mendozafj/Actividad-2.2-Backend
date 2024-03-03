import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MateriasSchema = new Schema({
  id: ObjectId,
  materia: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  profesorId: {
    type: String,
    required: true,
  }
});

export const MateriasModelo = mongoose.model('materias', MateriasSchema);