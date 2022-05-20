import { expect } from "chai"
import { cardFromCode } from "./card";

describe("cardFromCode", () => {
  it("should load card data from code", () => {
    const card = cardFromCode("06RU002")
    expect(card.name).to.equal("Jhin")
    expect(card.associatedCards).to.deep.equal([])
    expect(card.associatedCardRefs).to.deep.equal([
      "06RU002T6",
      "06RU002T5",
      "06RU002T4",
      "06RU002T2",
      "06RU002T1",
      "06RU002T13",
      "06RU002T12"
    ])
    expect(card.assets).to.deep.equal([{
      "gameAbsolutePath": "http://dd.b.pvp.net/3_8_0/set6/en_us/img/cards/06RU002.png",
      "fullAbsolutePath": "http://dd.b.pvp.net/3_8_0/set6/en_us/img/cards/06RU002-full.png"
    }])
    expect(card.regions).to.deep.equal(["Runeterra"])
    expect(card.regionRefs).to.deep.equal(["Runeterra"])
    expect(card.attack).to.equal(4)
    expect(card.cost).to.equal(4)
    expect(card.health).to.equal(4)
    expect(card.description).to.equal("<link=vocab.Origin><style=Vocab>Origin</style></link>: <link=card.origin><style=AssociatedCard>The Virtuoso</style></link>. <style=Variable></style>\r\n<link=keyword.AttackSkillMark><sprite name=SkillMark><style=Keyword>Attack</style></link>: Deal 2 to all <link=keyword.Stun><sprite name=Stunned><style=Keyword>Stunned</style></link> enemies.")
    expect(card.descriptionRaw).to.equal("Origin: The Virtuoso. \r\nAttack: Deal 2 to all Stunned enemies.")
    expect(card.levelupDescription).to.equal("You've played 12+ <link=keyword.Fast><sprite name=Fast><style=Keyword>Fast</style></link> spells, <link=keyword.Slow><sprite name=Slow><style=Keyword>Slow</style></link> spells, or <link=keyword.Skill><sprite name=SkillMark><style=Keyword>Skills</style></link>.<style=Variable></style>")
    expect(card.levelupDescriptionRaw).to.equal("You've played 12+ Fast spells, Slow spells, or Skills.")
    expect(card.flavorText).to.equal("\"Overture: We open on the city of Qayanvi, where an old master summons a young pupil. He is tasked with disposing a group of nefarious villains and recovering stolen sacred artifacts. The actor is keen, but he does not as yet take his place. For now he simply prepares, waiting in the wings.\"")
    expect(card.artistName).to.equal("Alessandro Poli")
    expect(card.name).to.equal("Jhin")
    expect(card.cardCode).to.equal("06RU002")
    expect(card.keywords).to.deep.equal([])
    expect(card.keywordRefs).to.deep.equal([])
    expect(card.spellSpeed).to.equal("")
    expect(card.spellSpeedRef).to.equal("")
    expect(card.rarity).to.equal("Champion")
    expect(card.rarityRef).to.equal("Champion")
    expect(card.subtypes).to.deep.equal([])
    expect(card.supertype).to.equal("Champion")
    expect(card.type).to.equal("Unit")
    expect(card.collectible).to.equal(true)
    expect(card.set).to.equal("Set6")
    expect(card.regionsShort).to.deep.equal(["RU"])
  });
});

describe("Card", () => {
  context("isChampion", () => {
    it("should return true for champion", () => {
      const jhin = cardFromCode("06RU002")
      expect(jhin.isChampion()).to.be.true
    })

    it("should return false for non-champion", () => {
      const cithriaTheBold = cardFromCode("01DE051")
      expect(cithriaTheBold.isChampion()).to.be.false
    })
  })
})
