export type region =
  | "Demacia"
  | "Freljord"
  | "Ionia"
  | "Noxus"
  | "PiltoverZaun"
  | "ShadowIsles"
  | "Bilgewater"
  | "Targon"
  | "Shurima"
  | "BandleCity"
  | "Runeterra";

class Region {
  readonly ref!: string;
  readonly shortName!: string;
  readonly code!: number;

  constructor(ref: string, shortName: string, code: number) {
    this.ref = ref;
    this.shortName = shortName;
    this.code = code;
  }
}

const regions: Record<region, Region> = {
  Demacia: new Region("Demacia", "DE", 0),
  Freljord: new Region("Freljord", "FR", 1),
  Ionia: new Region("Ionia", "IO", 2),
  Noxus: new Region("Noxus", "NX", 3),
  PiltoverZaun: new Region("PiltoverZaun", "PZ", 4),
  ShadowIsles: new Region("ShadowIsles", "SI", 5),
  Bilgewater: new Region("Bilgewater", "BW", 6),
  Targon: new Region("Targon", "MT", 9),
  Shurima: new Region("Shurima", "SH", 7),
  BandleCity: new Region("BandleCity", "BC", 10),
  Runeterra: new Region("Runeterra", "RU", 12),
};

function regionFromShortName(shortName: string): Region | undefined {
  const find = Object.entries(regions).find((r) => {
    return r[1].shortName == shortName;
  });
  if (find !== undefined) {
    return find[1];
  }
}
export { Region, regions, regionFromShortName };
