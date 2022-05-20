i  mport { cards } from './cards.js'
class Card {
  constructor(code, count) {
    this.code = code
    this.count = count
    cards.forEach(c => {
      if (c.cardCode == code) {
        this.name = c.name
        this.regions = c.regions
        this.rarity = c.rarityRef
        return
      }
      return
    })
  }
 
  isChampion() {
    return this.rarity == "Champion"
  }
}

export { Card }
