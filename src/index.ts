import 'dotenv/config';
import express from 'express';
import BullBoard from 'bull-board';
import MailController from './controllers/MailController';
import Queue from './lib/Queue';

const app = express();


app.use(express.json());
app.post('/users', MailController.store);

app.use('/admin/queues', (req , res)=>{
  res.send('o que q ha velhinho')
});




app.listen(3333, () => {
  console.log('Server running on localhost:3003');
});