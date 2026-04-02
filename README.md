## FlagIT

FlagIT Puzzle is a daily geography game inspired by “Connections.” Each day you get a set of 16 flags and must group them into 4 hidden categories. Challenge mode obscures the flags and time pressure gradually tightens the signal, so there’s strategy beyond simple recognition.

### Features
- Multi-game daily arcade
- Connections (flag groupings) with challenge + time pressure modes
- Border Builder (neighbor chain) with timer and no-repeats mode
- Clue-to-Country (progressive hints with scoring)
- Odd One Out (logic-based elimination puzzles)
- Hint system, stats, streaks, and shareable results

## Getting Started

First, install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Build and Run Production
```bash
npm run build
npm start
```

## Project Structure
- `src/app` — Next.js app entry and global styles
- `src/components` — UI components (board, cards, modals)
- `src/hooks` — game state and persistence
- `src/data` — puzzle data and country list

## Contributing
Contributions are welcome. If you’d like to help:
1. Fork the repo and create a feature branch.
2. Keep changes focused and easy to review.
3. Open a PR with a clear summary and screenshots if UI changes are involved.

If you’re planning something bigger (new modes, data tooling, or major UX changes), open an issue first so we can align on direction.

## License
MIT
