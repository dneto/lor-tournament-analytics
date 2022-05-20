"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var card_1 = require("./card");
describe("cardFromCode", function () {
    it("should load card data from code", function () {
        var card = (0, card_1.cardFromCode)("06RU002");
        (0, chai_1.expect)(card.name).to.equal("Jhin");
        (0, chai_1.expect)(card.associatedCards).to.deep.equal([]);
        (0, chai_1.expect)(card.associatedCardRefs).to.deep.equal([
            "06RU002T6",
            "06RU002T5",
            "06RU002T4",
            "06RU002T2",
            "06RU002T1",
            "06RU002T13",
            "06RU002T12"
        ]);
        (0, chai_1.expect)(card.assets).to.deep.equal([{
                "gameAbsolutePath": "http://dd.b.pvp.net/3_8_0/set6/en_us/img/cards/06RU002.png",
                "fullAbsolutePath": "http://dd.b.pvp.net/3_8_0/set6/en_us/img/cards/06RU002-full.png"
            }]);
        (0, chai_1.expect)(card.regions).to.deep.equal(["Runeterra"]);
        (0, chai_1.expect)(card.regionRefs).to.deep.equal(["Runeterra"]);
        (0, chai_1.expect)(card.attack).to.equal(4);
        (0, chai_1.expect)(card.cost).to.equal(4);
        (0, chai_1.expect)(card.health).to.equal(4);
        (0, chai_1.expect)(card.description).to.equal("<link=vocab.Origin><style=Vocab>Origin</style></link>: <link=card.origin><style=AssociatedCard>The Virtuoso</style></link>. <style=Variable></style>\r\n<link=keyword.AttackSkillMark><sprite name=SkillMark><style=Keyword>Attack</style></link>: Deal 2 to all <link=keyword.Stun><sprite name=Stunned><style=Keyword>Stunned</style></link> enemies.");
        (0, chai_1.expect)(card.descriptionRaw).to.equal("Origin: The Virtuoso. \r\nAttack: Deal 2 to all Stunned enemies.");
        (0, chai_1.expect)(card.levelupDescription).to.equal("You've played 12+ <link=keyword.Fast><sprite name=Fast><style=Keyword>Fast</style></link> spells, <link=keyword.Slow><sprite name=Slow><style=Keyword>Slow</style></link> spells, or <link=keyword.Skill><sprite name=SkillMark><style=Keyword>Skills</style></link>.<style=Variable></style>");
        (0, chai_1.expect)(card.levelupDescriptionRaw).to.equal("You've played 12+ Fast spells, Slow spells, or Skills.");
        (0, chai_1.expect)(card.flavorText).to.equal("\"Overture: We open on the city of Qayanvi, where an old master summons a young pupil. He is tasked with disposing a group of nefarious villains and recovering stolen sacred artifacts. The actor is keen, but he does not as yet take his place. For now he simply prepares, waiting in the wings.\"");
        (0, chai_1.expect)(card.artistName).to.equal("Alessandro Poli");
        (0, chai_1.expect)(card.name).to.equal("Jhin");
        (0, chai_1.expect)(card.cardCode).to.equal("06RU002");
        (0, chai_1.expect)(card.keywords).to.deep.equal([]);
        (0, chai_1.expect)(card.keywordRefs).to.deep.equal([]);
        (0, chai_1.expect)(card.spellSpeed).to.equal("");
        (0, chai_1.expect)(card.spellSpeedRef).to.equal("");
        (0, chai_1.expect)(card.rarity).to.equal("Champion");
        (0, chai_1.expect)(card.rarityRef).to.equal("Champion");
        (0, chai_1.expect)(card.subtypes).to.deep.equal([]);
        (0, chai_1.expect)(card.supertype).to.equal("Champion");
        (0, chai_1.expect)(card.type).to.equal("Unit");
        (0, chai_1.expect)(card.collectible).to.equal(true);
        (0, chai_1.expect)(card.set).to.equal("Set6");
        (0, chai_1.expect)(card.regionsShort).to.deep.equal(["RU"]);
    });
});
describe("Card", function () {
    context("isChampion", function () {
        it("should return true for champion", function () {
            var jhin = (0, card_1.cardFromCode)("06RU002");
            (0, chai_1.expect)(jhin.isChampion()).to.be.true;
        });
        it("should return false for non-champion", function () {
            var cithriaTheBold = (0, card_1.cardFromCode)("01DE051");
            (0, chai_1.expect)(cithriaTheBold.isChampion()).to.be.false;
        });
    });
});
