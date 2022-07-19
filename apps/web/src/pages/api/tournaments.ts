import type { NextApiRequest, NextApiResponse } from "next";
import { getTournaments } from "lib/google_sheets";

const api = (req: NextApiRequest, res: NextApiResponse) => {
  const database = req.query.season as string;
  if (req.method === "GET") {
    getTournaments(database)
      .then((tournaments) => {
        res.status(200).json({
          tournaments: tournaments,
        });
      })
      .catch((e) => {
        res.status(500).end();
      });
  }
};

export default api;
