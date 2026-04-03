# FlagIT Arcade

A daily geography game hub with five puzzle modes — from flag grouping to border chains, progressive clues, and map precision challenges. New puzzles drop every day.

**Live at:** [flagit.vercel.app](https://flagit.vercel.app) *(update with your actual URL)*

---

## Games

**Connections** — Group 16 flags into 4 hidden categories. Challenge mode adds fog and a tightening time limit.

**Border Builder** — Start from a country and build the longest chain of bordering neighbors without repeating.

**Clue-to-Country** — Identify a country from progressive clues. Fewer clues used = higher score.

**Odd One Out** — Four countries, one doesn't belong. Find the logic behind the odd one.

**Map Click Challenge** — A country is named, you click it on a blank map. Precision matters.

---

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Production build

```bash
npm run build
npm start
```

---

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- Streak tracking and shareable results via local state + URL encoding

---

## Project Structure

```
src/
├── app/          # Next.js app entry and global styles
├── components/   # UI components (board, cards, modals)
├── hooks/        # Game state and persistence
└── data/         # Puzzle data and country list
```

---

## Contributing

Fork the repo, create a feature branch, and open a PR with a clear summary. Screenshots help for UI changes. For larger additions (new game modes, data tooling), open an issue first.

---

## License

MIT
