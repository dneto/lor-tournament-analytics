import { connectMongo } from "../dbconnect";
import { Schema, model, models } from "mongoose";
import { ResultAsync } from "neverthrow";

interface counter {
  qty: number;
  percent: number;
}

export interface IArchetypeCount extends counter {
  championsCode: string[];
  regions: string[];
}

const archetypeSchema = new Schema<IArchetypeCount>({
  championsCode: [String],
  regions: [String],
  qty: Number,
  percent: Number,
});

export interface IChampionsCount extends counter {
  championCode: string;
}

const championSchema = new Schema<IChampionsCount>({
  championCode: String,
  qty: Number,
  percent: Number,
});

export interface IRegionSetCount extends counter {
  regions: string[];
}

const regionsSchema = new Schema<IRegionSetCount>({
  regions: [String],
  qty: Number,
  percent: Number,
});

export interface IRegionCount extends counter {
  region: string;
}

const regionSchema = new Schema<IRegionCount>({
  region: String,
  qty: Number,
  percent: Number,
});

export interface ICardCounter extends counter {
  cardCode: string;
}

const cardsSchema = new Schema<ICardCounter>({
  cardCode: String,
  qty: Number,
  percent: Number,
});

export interface ILineupCounter extends counter {
  decks: {
    championsCode: string[];
    regions: string[];
  }[];
}
const lineupSchema = new Schema<ILineupCounter>({
  decks: [archetypeSchema],
  qty: Number,
  percent: Number,
});

export interface ITournament {
  id: string;
  datetime: Date;
  title: string;
  region: string;
  season: string;
  logo_url: string;
  background_card_code: string;
  slug: string;
  old_id: string;
  archetypes: IArchetypeCount[];
  champions: IChampionsCount[];
  regionSet: IRegionSetCount[];
  regionUnique: IRegionCount[];
  cards: ICardCounter[];
  lineups: ILineupCounter[];
  deckpair: ILineupCounter[];
}

const tournamentSchema = new Schema({
  datetime: {
    type: Date,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
    index: true,
  },
  logo_url: String,
  background_card_code: String,
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  old_id: {
    type: String,
  },

  archetypes: [archetypeSchema],
  champions: [championSchema],
  regionSet: [regionsSchema],
  regionUnique: [regionSchema],
  cards: [cardsSchema],
  lineups: [lineupSchema],
  deckpair: [lineupSchema],
  public: {
    type: Boolean,
    index: true,
  },
});

const Tournament = models.Tournament || model("Tournament", tournamentSchema);

export default Tournament;
