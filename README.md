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

- `packages/lor-decks-data`: Provide modules to parse deck and card codes to a more detailed model
- `packages/lor-deck-analytics`: Provide an abstraction to tournament and lineups
- `packages/ui`: The web interface that is accessible in https://lor.dne.to

## Running Locally

1. Run `yarn download` to download the dependencies
2. Go to `packages/ui/` folder
3. Run `yarn dev`
4. Go to `http://localhost:3000` on your browser

## Deployment

The deploy is made using Vercel, as it's a free PaaS for a hobby project
You can access the current production environment by acessing https://lor.dne.to
