import type { NextApiRequest, NextApiResponse } from "next";
import { Tournament } from "@lor-analytics/data-extractor/tournament";

import { Tournament as TournamentDB, connectMongo } from "@lor-analytics/db";
import urlSlug from "url-slug";
import { ITournament } from "../../../../../../packages/db/src/models/tournament";
import { DateTime } from "luxon";
const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const value = JSON.parse(req.body);
  try {
    if (req.method === "POST") {
      const tournament = Tournament.fromCSV(value.csv);
      tournament.title = value.title;
      tournament.region = value.region;
      tournament.season = "Domination";
      tournament.startDate = DateTime.fromMillis(value.date).toJSDate();

      await connectMongo();
      const createdTournament: ITournament = await TournamentDB.create({
        datetime: tournament.startDate,
        title: tournament.title,
        slug: urlSlug(tournament.title),
        region: tournament.region,
        season: tournament.season,
        logo_url: tournament.logoURL,
        background_card_code: tournament.cardImage,
        archetypes: tournament.archetypes.map((a) => ({
          championsCode: a.archetype.championsCode,
          regions: a.archetype.regions,
          qty: a.qty,
          percent: a.percent,
        })),
        champions: tournament.champions,
        regionSet: tournament.regionSet,
        regionUnique: tournament.regions,
        cards: tournament.cardCount,
        lineups: tournament.lineupCount.map((lc) => ({
          decks: lc.archetypes,
          qty: lc.qty,
          percent: lc.percent,
        })),
        public: false,
      });
      res.status(200).end(createdTournament.slug);
    }
  } catch (err) {
    console.log(err);
  }
};

export default api;
