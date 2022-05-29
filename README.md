## LoR Tournament Analytics

A place where you can extract data for your tournaments, like:

- Archetypes
- Number of decks containing a champion
- Number of decks containing a region combination
- Number of decks containing a singular region

All you need is a CSV file containing the **deck codes** (URL from
other sites are not supported by now).

## Contributing

Currently, the project have three packages:

- `packages/deck-utils`: Provide modules to parse deck and card codes to a more detailed model
- `packages/data-extractior`: Provide an abstraction to tournament and lineups
- `apps/web`: The web interface that is accessible in https://lor.dne.to
