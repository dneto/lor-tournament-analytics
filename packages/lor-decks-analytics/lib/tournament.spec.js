"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var tournament_1 = require("./tournament");
var lor_decks_data_1 = require("@lor-tournament-analytics/lor-decks-data");
describe("Tournament", function () {
    it("should load tournament info from csv", function () {
        var csvInput = [
            "CMBQEAIFFAYQGBAFGU3DOBQEA4ATMO2MM5WQEAIBAUAQEBAHKF4QCAIBAUMQ",
            "CQDACAIABEAQGAAOAECAAAYBAUFB2AQDBENSGAYFBEBQKBQDAEAQAGQBAUAAYAQDBEZVYBABAEAA2AICAAAQCBAAAIBAGCIT24AQ",
            "CMBAGBIHA4FQ4BYEA4BQ2HBFEY3G2AIDAQDUQWLGAECAIBZ3HZGHS",
        ];
        var csv = csvInput.join(",");
        var target = tournament_1.Tournament.fromCSV(csv);
        var expected = [csvInput.map(function (i) { return new lor_decks_data_1.Deck(i); })];
        (0, chai_1.expect)(target.lineups).to.deep.equal(expected);
    });
    it("should group", function () {
        var csvInput = [
            "CMBQEAIFFAYQGBAFGU3DOBQEA4ATMO2MM5WQEAIBAUAQEBAHKF4QCAIBAUMQ",
            "CQDACAIABEAQGAAOAECAAAYBAUFB2AQDBENSGAYFBEBQKBQDAEAQAGQBAUAAYAQDBEZVYBABAEAA2AICAAAQCBAAAIBAGCIT24AQ",
            "CMBAGBIHA4FQ4BYEA4BQ2HBFEY3G2AIDAQDUQWLGAECAIBZ3HZGHS",
        ];
        var csv = csvInput.join(",");
        var target = tournament_1.Tournament.fromCSV(csv);
        var group = target.countBy(function (l) {
            return l.map(function (deck) {
                var champions = deck.champions
                    .map(function (c) { return c.name; })
                    .sort()
                    .join("/");
                var regions = deck.regions
                    .map(function (r) { return r.shortName; })
                    .sort()
                    .join("/");
                return "".concat(champions, " [").concat(regions, "]");
            });
        });
        (0, chai_1.expect)(group).to.be.deep.equal({
            "Azir/Xerath [SH]": 1,
            "Pantheon/Yuumi [DE/MT]": 1,
            "Viego [SH/SI]": 1,
        });
    });
});
