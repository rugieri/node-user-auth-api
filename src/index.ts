import express from 'express';
import statusRoute from './routes/status-route';
import usersRoute from './routes/users-route';
const app = express();

//App config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes config
app.use(usersRoute);

app.use(statusRoute);

//Init server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
