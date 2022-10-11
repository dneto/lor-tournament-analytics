import type { NextApiRequest, NextApiResponse } from "next";
import { Tournament, connectMongo } from "@lor-analytics/db/index";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const season = req.query.season as string;
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
  if (req.method === "GET") {
    try {
      await connectMongo();
      const tournaments = await Tournament.find(
        { season: season, public: true },
        {
          datetime: 1,
          title: 1,
          slug: 1,
          region: 1,
          season: 1,
          background_card_code: 1,
          logo_url: 1,
        }
      )
        .sort({ datetime: -1 })
        .exec();
      res.status(200).json(tournaments);
    } catch (err) {
      res.status(500).end();
      throw "could not load data";
    }
  }
};

export default api;
