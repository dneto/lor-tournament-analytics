"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var deck_1 = require("./deck");
var card_1 = require("./card");
var region_1 = require("./region");
describe("Deck", function () {
    var deck, multiregionDeck, runeterraDeck;
    before(function () {
        deck = new deck_1.Deck("CEBAIAIFB4WDANQIAEAQGDAUDAQSIJZUAIAQCBIFAEAQCBAA");
        multiregionDeck = new deck_1.Deck("CQDACAIABEAQGAAOAECAAAYBAUFB2AYDBENTGXADAUEQGBIGAMAQCAA2AEBAAAIBAMESGAYBAEAA2AIFBEFAEAYJCNKQ");
        runeterraDeck = new deck_1.Deck("CEDACAIDFAAQCBBWAEBAGBABAMCQMAIGAMEQMAQGAQLB6LJ2HQBQCBIGAEAQCAZOAEBAMGQBAEDAYAQ");
    });
    context("cards", function () {
        it("should load cards data", function () {
            var expected = [
                '01SI015', '01SI044',
                '01SI048', '01SI054',
                '01FR003', '01FR012',
                '01FR020', '01FR024',
                '01FR033', '01FR036',
                '01FR039', '01FR052',
                '01SI005', '01FR004'
            ].map(card_1.cardFromCode);
            (0, chai_1.expect)(deck.cards).to.deep.equal(expected);
        });
    });
    context("regions", function () {
        it("should load correct regions for standard format", function () {
            (0, chai_1.expect)(deck.regions).to.deep.equal([region_1.regions["Freljord"], region_1.regions["ShadowIsles"]]);
            (0, chai_1.expect)(multiregionDeck.regions).to.deep.equal([region_1.regions["Targon"], region_1.regions["Demacia"]]);
            (0, chai_1.expect)(runeterraDeck.regions).to.deep.equal([region_1.regions["Bilgewater"], region_1.regions["Runeterra"]]);
        });
    });
    context("champions", function () {
        it("should load correct champions for standard format", function () {
            var expected = ["01FR024", "01FR039"].map(card_1.cardFromCode);
            (0, chai_1.expect)(deck.champions).to.deep.equal(expected);
        });
    });
});
