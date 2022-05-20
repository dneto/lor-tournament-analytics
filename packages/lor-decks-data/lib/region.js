"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionFromShortName = exports.regions = exports.Region = void 0;
var Region = /** @class */ (function () {
    function Region(ref, shortName, code) {
        this.ref = ref;
        this.shortName = shortName;
        this.code = code;
    }
    return Region;
}());
exports.Region = Region;
var regions = {
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
exports.regions = regions;
function regionFromShortName(shortName) {
    var find = Object.entries(regions).find(function (r) {
        return r[1].shortName == shortName;
    });
    if (find !== undefined) {
        return find[1];
    }
}
exports.regionFromShortName = regionFromShortName;
