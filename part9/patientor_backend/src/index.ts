import express from 'express';
import diagnoses from './routes/diagnoses';
import patients from './routes/patients';

const app = express();

app.use(express.json());

import cors from 'cors';


// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());


app.get('/api/ping',(_req, res) => {

  res.send('pong');

});

app.use('/api/diagnoses',diagnoses);
app.use('/api/patients',patients);

const PORT=3001;

app.listen(PORT, () => {  
  console.log('listening on port '+PORT);
});