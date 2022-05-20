import cards from "./assets/cards.json"
import { regions } from "./region"

class Card {
  associatedCards: string[]
  associatedCardRefs: string[]
  assets: { gameAbsolutePath: string, fullAbsolutePath: string }[]
  regions: string[]
  regionRefs: string[]
  attack: number
  cost: number
  health: number
  description: string
  descriptionRaw: string
  levelupDescription: string
  levelupDescriptionRaw: string
  flavorText: string
  artistName: string
  name: string
  cardCode: string
  keywords: string[]
  keywordRefs: string[]
  spellSpeed: string
  spellSpeedRef: string
  rarity: string
  rarityRef: string
  subtypes: string[]
  supertype: string
  type: string
  collectible: boolean
  set: string

  regionsShort: string[]

  isChampion(): boolean {
    return this.rarityRef == "Champion"
  }

  isFromRegion(region: string): boolean {
    return this.regionRefs.includes(region)
  }
}

function cardFromCode(code: string): Card {
  const cardFromDatabase = cards.find(card => {
    return card.cardCode == code
  })

  if (cardFromDatabase != undefined) {
    const card = Object.assign(new Card(), cardFromDatabase)
    card.regionsShort = card.regionRefs.map((r) => regions[r].shortName)

    return card
  }
}

export { Card, cardFromCode } 
