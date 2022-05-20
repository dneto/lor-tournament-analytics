declare class Region {
    readonly ref: string;
    readonly shortName: string;
    readonly code: number;
    constructor(ref: string, shortName: string, code: number);
}
declare const regions: {
    Demacia: Region;
    Freljord: Region;
    Ionia: Region;
    Noxus: Region;
    PiltoverZaun: Region;
    ShadowIsles: Region;
    Bilgewater: Region;
    Targon: Region;
    Shurima: Region;
    BandleCity: Region;
    Runeterra: Region;
};
declare function regionFromShortName(shortName: string): Region;
export { Region, regions, regionFromShortName };
