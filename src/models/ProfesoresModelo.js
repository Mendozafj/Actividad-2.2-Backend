import mongoose from 'mongoose';

const ProfesoresSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  nombre: {
    type: String,
    required: true,
    match: /[a-z]/
  },
  apellido: {
    type: String,
    required: true,
    match: /[a-z]/
  }
});

export const ProfesoresModelo = mongoose.model('profesores', ProfesoresSchema)