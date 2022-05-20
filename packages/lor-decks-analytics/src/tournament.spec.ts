import { expect } from "chai";
import { Tournament, Lineup } from "./tournament";
import { Deck, Card, Region } from "@lor-tournament-analytics/lor-decks-data";
describe("Tournament", () => {
  it("should load tournament info from csv", () => {
    const csvInput = [
      "CMBQEAIFFAYQGBAFGU3DOBQEA4ATMO2MM5WQEAIBAUAQEBAHKF4QCAIBAUMQ",
      "CQDACAIABEAQGAAOAECAAAYBAUFB2AQDBENSGAYFBEBQKBQDAEAQAGQBAUAAYAQDBEZVYBABAEAA2AICAAAQCBAAAIBAGCIT24AQ",
      "CMBAGBIHA4FQ4BYEA4BQ2HBFEY3G2AIDAQDUQWLGAECAIBZ3HZGHS",
    ];
    const csv = csvInput.join(",");
    const target = Tournament.fromCSV(csv);
    const expected = [csvInput.map((i) => new Deck(i)) as Lineup];
    expect(target.lineups).to.deep.equal(expected);
  });

  it("should group", () => {
    const csvInput = [
      "CMBQEAIFFAYQGBAFGU3DOBQEA4ATMO2MM5WQEAIBAUAQEBAHKF4QCAIBAUMQ",
      "CQDACAIABEAQGAAOAECAAAYBAUFB2AQDBENSGAYFBEBQKBQDAEAQAGQBAUAAYAQDBEZVYBABAEAA2AICAAAQCBAAAIBAGCIT24AQ",
      "CMBAGBIHA4FQ4BYEA4BQ2HBFEY3G2AIDAQDUQWLGAECAIBZ3HZGHS",
    ];
    const csv = csvInput.join(",");
    const target = Tournament.fromCSV(csv);
    const group = target.countBy((l: Lineup) =>
      l.map((deck) => {
        const champions = deck.champions
          .map((c: Card) => c.name)
          .sort()
          .join("/");
        const regions = deck.regions
          .map((r: Region) => r.shortName)
          .sort()
          .join("/");
        return `${champions} [${regions}]`;
      })
    );

    expect(group).to.be.deep.equal({
      "Azir/Xerath [SH]": 1,
      "Pantheon/Yuumi [DE/MT]": 1,
      "Viego [SH/SI]": 1,
    });
  });
});
