import mongoose from 'mongoose';

const {MONGODB_HOST, MONGODB_DATABASE} = process.env

const MONGODB_URL = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`

mongoose.connect(MONGODB_URL)
.then(() => console.log('Conectado a la Base de Datos: ' + MONGODB_DATABASE))
.catch((error) => console.log('No se pudo conectar a Mongo por el siguiente error: ' + error))