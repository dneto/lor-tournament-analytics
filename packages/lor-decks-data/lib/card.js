"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardFromCode = exports.Card = void 0;
var cards_json_1 = __importDefault(require("./assets/cards.json"));
var region_1 = require("./region");
var Card = /** @class */ (function () {
    function Card() {
    }
    Card.prototype.isChampion = function () {
        return this.rarityRef == "Champion";
    };
    Card.prototype.isFromRegion = function (region) {
        return this.regionRefs.includes(region);
    };
    return Card;
}());
exports.Card = Card;
function cardFromCode(code) {
    var cardFromDatabase = cards_json_1.default.find(function (card) {
        return card.cardCode == code;
    });
    if (cardFromDatabase != undefined) {
        var card = Object.assign(new Card(), cardFromDatabase);
        card.regionsShort = card.regionRefs.map(function (r) { return region_1.regions[r].shortName; });
        return card;
    }
}
exports.cardFromCode = cardFromCode;
