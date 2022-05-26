import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import { v4 as uuid } from "uuid";

const redisURL: string = String(process.env.REDIS_URL);
const redis = new Redis(redisURL);

const api = (req: NextApiRequest, res: NextApiResponse) => {
  const id = uuid();
  const value = req.body;

  if (req.method === "POST") {
    redis
      .set(id, value)
      .then((result) => {
        res.status(200).end(id);
      })
      .catch((e) => {
        res.status(500).end();
      });
  }
};

export default api;
