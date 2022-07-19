import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import { getTournaments } from "lib/google_sheets";

const redisURL: string = String(process.env.REDIS_URL);
const redis = new Redis(redisURL);

const api = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const range = req.query.range as string;
  if (req.method === "GET") {
    redis
      .get(id)
      .then((result) => {
        getTournaments(range)
          .then((tournaments) => {
            const tournament = tournaments?.find((tournament) =>
              tournament.url.startsWith(`/csv/${id}`)
            );
            res.status(200).json({
              title: tournament?.title || "",
              timestamp: tournament?.timestamp,
              logoURL: tournament?.logoURL,
              data: result,
            });
          })
          .catch((e) => {
            res.status(200).json({
              title: "",
              data: result,
            });
          });
      })
      .catch((e) => {
        res.status(500).end();
      });
  }
};

export default api;
