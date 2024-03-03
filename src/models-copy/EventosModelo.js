import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EventosSchema = new Schema({
  id: ObjectId,
  tipo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  detalles: {
    type: String,
    required: true,
  },
  materiaId: {
    type: String,
    required: true,
  }
});

export const EventosModelo = mongoose.model('eventos', EventosSchema);