import Queue from 'bull';
import redisConfig from '../config/redis';

import * as jobs from '../jobs/MailRegister';
// const audioQueue = new Queue('audio transcoding', ); // Specify Redis connection using object

const queues = Object.values(jobs).map(job => ({
  bull: Queue(job.key , { redis: { port: 6379, host: '127.0.0.1', password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81' } }),
  name: job.key,
  handle: job.handle,
  options: job.options,
}))

export default {
  queues,
  add(name:string, data:any) {
    const queue = this.queues.find(queue => queue.name === name);
    
    return queue!.bull.add(data, queue!.options);
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.name, job.data);
        console.log(err);
      });
    })
  }
};