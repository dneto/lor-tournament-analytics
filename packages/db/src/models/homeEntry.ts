import { Schema, model, models } from "mongoose";

export interface IHomeEntry {
  datetime: Date;
  title: string;
  url: string;
  region: string;
  season: string;
  logo: string;
  background_card_code: string;
}

const homeEntrySchema = new Schema<IHomeEntry>(
  {
    datetime: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
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
    },
    logo: String,
    background_card_code: String,
  },
  {
    collection: "home",
  }
);

const HomeEntry = models.HomeEntry || model("HomeEntry", homeEntrySchema);

export default HomeEntry;
