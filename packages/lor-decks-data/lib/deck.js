"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
var runeterra_1 = require("runeterra");
var card_1 = require("./card");
var region_1 = require("./region");
var MAX_REGIONS = 2;
var Deck = /** @class */ (function () {
    function Deck(code) {
        var cards = runeterra_1.DeckEncoder.decode(code).map(function (card) {
            return { card: (0, card_1.cardFromCode)(card.code), count: card.count };
        });
        this.cardEntries = cards;
        this.code = code;
    }
    Object.defineProperty(Deck.prototype, "cards", {
        get: function () {
            if (this._cards == undefined) {
                this._cards = this.cardEntries.map(function (ce) { return ce.card; });
            }
            return this._cards;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Deck.prototype, "regions", {
        get: function () {
            if (this._regions == undefined) {
                var runeterraChampionsCount = this.champions.filter(function (champion) {
                    return champion.isFromRegion("Runeterra");
                }).length;
                this._regions = Object.entries(this.cards
                    .map(function (c) { return c.regionRefs; })
                    .flat()
                    .reduce(function (acc, curr) {
                    acc[curr] = acc[curr] + 1 || 1;
                    return acc;
                }, {}))
                    .map(function (r) { return [region_1.regions[r[0]], r[1]]; })
                    .sort(function (a, b) { return b[1] - a[1]; })
                    .slice(0, MAX_REGIONS - runeterraChampionsCount)
                    .map(function (r) { return r[0]; });
                if (runeterraChampionsCount > 0) {
                    this._regions.push(region_1.regions["Runeterra"]);
                }
            }
            return this._regions.sort(function (a, b) { return a.ref.localeCompare(b.ref); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Deck.prototype, "champions", {
        get: function () {
            return this.cards.filter(function (c) { return c.isChampion(); }).sort();
        },
        enumerable: false,
        configurable: true
    });
    return Deck;
}());
exports.Deck = Deck;
