import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SeccionesSchema = new Schema({
  id: ObjectId,
  seccion: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
});

export const SeccionesModelo = mongoose.model('secciones', SeccionesSchema)