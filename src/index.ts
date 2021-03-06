import express from 'express';
import errorHandler from './middlewares/error-handler-middleware';
import authRoute from './routes/auth-route';
import statusRoute from './routes/status-route';
import usersRoute from './routes/users-route';
import jwtAuthMiddleware from './middlewares/jwt-auth-middleware';
const app = express();

//App config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes config

app.use(statusRoute);
app.use(authRoute);
app.use(jwtAuthMiddleware);
app.use(usersRoute);

// Handle errors config
app.use(errorHandler);

//Init server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
