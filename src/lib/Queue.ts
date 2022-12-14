import Queue from "bull";
import redisConfig from "../config/redis";

import * as jobs from "../jobs/MailRegister";
// const audioQueue = new Queue('audio transcoding', ); // Specify Redis connection using object
const host:string  = process.env.REDIS_HOST || '127.0.0.1';
const port: string  = process.env.REDIS_PORT || '6379';
const password: string  = process.env.REDIS_PASSWORD || '';

const queues = Object.values(jobs).map((job) => ({
  bull: Queue(job.key, {
    redis: {
      port: parseInt(port),
      host: host,
      password: password,
    },
  }),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

export default {
  queues,
  add(name: string, data: any) {
    const queue = this.queues.find((queue) => queue.name === name);

    return queue!.bull.add(data, queue!.options);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on("failed", (job, err) => {
        console.log("Job failed", queue.name, job.data);
        console.log(err);
      });
    });
  },
};
