
import { expect } from "chai";
import { Deck } from "./deck";
import { cardFromCode } from "./card"
import { regions } from "./region";

describe("Deck", () => {
  let deck: Deck, multiregionDeck: Deck, runeterraDeck: Deck
  before(() => {
    deck = new Deck("CEBAIAIFB4WDANQIAEAQGDAUDAQSIJZUAIAQCBIFAEAQCBAA")
    multiregionDeck = new Deck("CQDACAIABEAQGAAOAECAAAYBAUFB2AYDBENTGXADAUEQGBIGAMAQCAA2AEBAAAIBAMESGAYBAEAA2AIFBEFAEAYJCNKQ")
    runeterraDeck = new Deck("CEDACAIDFAAQCBBWAEBAGBABAMCQMAIGAMEQMAQGAQLB6LJ2HQBQCBIGAEAQCAZOAEBAMGQBAEDAYAQ")
  })
  context("cards", () => {
    it("should load cards data", () => {
      const expected = [
        '01SI015', '01SI044',
        '01SI048', '01SI054',
        '01FR003', '01FR012',
        '01FR020', '01FR024',
        '01FR033', '01FR036',
        '01FR039', '01FR052',
        '01SI005', '01FR004'
      ].map(cardFromCode)
      expect(deck.cards).to.deep.equal(expected)
    });
  });

  context("regions", () => {
    it("should load correct regions for standard format", () => {
      expect(deck.regions).to.deep.equal([regions["Freljord"], regions["ShadowIsles"]])
      expect(multiregionDeck.regions).to.deep.equal([regions["Targon"], regions["Demacia"]])
      expect(runeterraDeck.regions).to.deep.equal([regions["Bilgewater"], regions["Runeterra"]])
    });
  });

  context("champions", () => {
    it("should load correct champions for standard format", () => {
      const expected = ["01FR024", "01FR039"].map(cardFromCode)
      expect(deck.champions).to.deep.equal(expected)
    });
  });
});

