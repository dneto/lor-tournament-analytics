import { DeckEncoder } from 'runeterra'
import { Card } from './card.js'
class Deck {
  constructor(deckcode) {
    let deck = DeckEncoder.decode(deckcode)
    this.cards = deck.map(c => new Card(c.code, c.count))
  }

  get archetype() {
    return {
      "champions": this.champions.map(c => c.name),
      "regions": this.regions
    }
  }

  get champions() {
    return this.cards.filter(c => c.isChampion())
  }

  get regions() {
    let cardsPerRegion = {};
    this.cards.forEach((card) => {
      card.regions.forEach(region => {
        if (!cardsPerRegion.hasOwnProperty(region)) {
          cardsPerRegion[region] = 0
        }
        cardsPerRegion[region] = cardsPerRegion[region] += 1
      })
    })

    let allRegions = Object.keys(cardsPerRegion).map((region) => [region, cardsPerRegion[region]]);
    let deckRegions = allRegions
      .sort((a, b) => (b[1] - a[1]))
      .slice(0, 2).map(r => r[0])

    return deckRegions.sort();
  }
}
export { Deck }
