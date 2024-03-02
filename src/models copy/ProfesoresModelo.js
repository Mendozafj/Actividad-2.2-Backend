import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProfesoresSchema = new Schema({
  id: ObjectId,
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

const ProfesoresModel = mongoose.model('profesores', ProfesoresSchema)
module.exports = ProfesoresModel