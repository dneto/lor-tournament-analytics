import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo, Tournament } from "@lor-analytics/db";
const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  if (req.method === "GET") {
    try {
      await connectMongo();
      const tournament = await Tournament.findOne({
        slug: id,
      });
      res.status(200).json(tournament);
    } catch (err) {
      res.status(500).end();
      throw "could not load data";
    }
  }
};

export default api;
