"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tournament = void 0;
var lor_decks_data_1 = require("@lor-tournament-analytics/lor-decks-data");
var sync_1 = require("csv-parse/sync");
var lodash_1 = __importDefault(require("lodash"));
var Tournament = /** @class */ (function () {
    function Tournament(lineups) {
        this.lineups = lineups;
    }
    Tournament.fromCSV = function (csvData) {
        var records = (0, sync_1.parse)(csvData);
        var lineup = records
            .map(function (r) {
            return r
                .map(function (code) {
                try {
                    return new lor_decks_data_1.Deck(code);
                }
                catch (e) {
                    return undefined;
                }
            })
                .filter(Boolean);
        })
            .filter(function (l) { return l.length > 0; });
        return new Tournament(lineup);
    };
    Tournament.prototype.countBy = function (fn, flatDepth) {
        if (flatDepth === void 0) { flatDepth = 1; }
        var lineups = this.lineups.map(fn).flat(flatDepth).sort();
        return Object.entries(lodash_1.default.countBy(lineups)).sort(function (a, b) { return b[1] - a[1]; });
    };
    return Tournament;
}());
exports.Tournament = Tournament;
