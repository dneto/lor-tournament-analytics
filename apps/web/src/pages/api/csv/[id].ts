import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import { getRecentTournaments } from "lib/google_sheets";

const redisURL: string = String(process.env.REDIS_URL);
const redis = new Redis(redisURL);

const api = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  if (req.method === "GET") {
    redis
      .get(id)
      .then((result) => {
        getRecentTournaments().then(tournaments =>{
          const tournament = tournaments?.find(tournament=>tournament.url == `/csv/${id}`)
          res.status(200).json({
            title: tournament?.title || "",
            timestamp: tournament?.timestamp,
            logoURL: tournament?.logoURL,
            data: result
          })
        }).catch(e=>{
          res.status(200).json({
            title: "",
            data: result
          })
        } )

      })
      .catch((e) => {
        res.status(500).end();
      });
  }
};

export default api;
