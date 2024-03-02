import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import profesorRoutes from "./src/routes/RoutesProfesor.js";
import materiaRoutes from "./src/routes/RoutesMateria.js";
import seccionRoutes from "./src/routes/RoutesSecciones.js";
import eventoRoutes from "./src/routes/RoutesEvento.js";

/* Agregamos Nuevo */
import 'dotenv/config'
import './src/database/conexion.js'

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());

app.set('view engine', 'ejs');

app.set('views', path.resolve(__dirname, 'src', 'views'));

app.use('/api', profesorRoutes);
app.use('/api', materiaRoutes);
app.use('/api', seccionRoutes);
app.use('/api', eventoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en la ruta http://localhost:${PORT}`);
  });