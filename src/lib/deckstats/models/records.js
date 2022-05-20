import { Map, Record, List } from 'immutable'

const DeckRecord = Record({ "champions": [], "regions": [] })

class Records {
  constructor(lineups) {
    this.lineups = lineups
  }

  get countByRegions() {
    const regions = List(this.decks.map(d => List(d.regions)))
    return regions.reduce(acc, Map()).sort().reverse()
  }

  get countByUniqueRegion() {
    return this.regions.flat().reduce(acc, Map()).sort().reverse()
  }

  get countByArchetypes() {
    return this.archetypes.reduce(acc, Map()).sort().reverse()
  }

  get countByUniqueChampions() {
    return this.champions.reduce(acc, Map()).sort().reverse()
  }

  get countByLineups() {
    return List(this.lineups.map(lineup => {
      return List(lineup.map(deckToDeckRecord)).sortBy(deck => {
        return deck.get("champions").get(0)
      })
    })).reduce(acc, Map()).sort().reverse()
  }

  get countByLineups2by2() {
    const deckGroup = []
    this.lineups.forEach(lineup => {
      [
        [lineup[0], lineup[1]],
        [lineup[0], lineup[2]],
        [lineup[1], lineup[2]]
      ].forEach(group => deckGroup.push(group))
    })
    return List(deckGroup.map(group => {
      return List(group.map(deckToDeckRecord)).sortBy(deck => {
        return deck.get("champions").get(0)
      })
    })).reduce(acc, Map()).sort().reverse()
  }

  get cards() {
    const cards = this.decks.map(d => {
      return d.cards.map(c => {
        return { "name": c.name, "count": c.count }
      })
    }).flat()
    return cards.reduce((acc, it) => {
      const value = it["count"] || 1
      acc[it.name] = acc[it.name] + value || value
      return acc
    }, {})
  }

  get regions() {
    return this.decks.map(d => d.regions)
  }


  get champions() {
    return this.decks.map(deck => {
      return deck.champions.map(c => c.name).sort()
    }).flat()
  }

  get decks() {
    return this.lineups.flat()
  }

  get archetypes() {
    return this.decks.map(deckToDeckRecord)
  }
}

function acc(accumulator, it) {
  const value = accumulator.get(it) || 0
  return accumulator.set(it, value + 1)
}

function deckToDeckRecord(deck) {
  if (deck == undefined) {
    return DeckRecord({})
  }
  return DeckRecord({
    "champions": List(deck.champions.map(c => c.name).sort()),
    "regions": List(deck.regions.sort())
  })
}

export { Records }
