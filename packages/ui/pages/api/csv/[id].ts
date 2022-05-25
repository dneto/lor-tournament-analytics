import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

const redisURL: string = String(process.env.REDIS_URL);
const redis = new Redis(redisURL);

const api = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  if (req.method === "GET") {
    redis
      .get(id)
      .then((result) => {
        res.status(200).end(result);
      })
      .catch((e) => {
        res.status(500).end();
      });
  }
};

export default api;
