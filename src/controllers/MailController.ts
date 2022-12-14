import { Request, Response } from 'express';
import Queue from '../lib/Queue';

export default {
  async store(req:any, res:any) {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password,
    };

    await Queue.add('RegistrationMail', { user });
  
    return res.json(user);
  },
  sum(a:number, b:number){
    return a + b;
  }
};


