# Mine Sweeper Game

#### Technologies: TypeScript, React 19, SCSS, Vite, Vitest

## Index

- [Installation and Run](#Install)
- [Scripts](#Scripts)
- [Screen Shots](#Shots)
- [Play Mine Sweeper](#Play)

## <a name="Install">Installation and Run</a>

Requires Node 26 or later.

- To clone the repo and run the game

```shell
$ git clone https://github.com/adrianeyre/mine-sweeper
$ cd mine-sweeper
$ npm install
$ npm start
```

## <a name="Scripts">Scripts</a>

| Script                 | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm start`            | Vite dev server on http://localhost:3000            |
| `npm run build`        | Production build into `dist-web/`                   |
| `npm run preview`      | Serve the production build locally                  |
| `npm run typecheck`    | `tsc --noEmit`                                      |
| `npm run lint`         | ESLint                                              |
| `npm run format:check` | Prettier, check only (`npm run format` to fix)      |
| `npm test`             | Vitest, single run (`npm run test:watch` for watch) |

## <a name="Shots">Screen Shots</a>

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/mine-sweeper/master/src/images/screenshot1.png)](https://raw.githubusercontent.com/adrianeyre/mine-sweeper/master/src/images/screenshot1.png 'Game View')

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/mine-sweeper/master/src/images/screenshot2.png)](https://raw.githubusercontent.com/adrianeyre/mine-sweeper/master/src/images/screenshot2.png 'Game View')

## <a name="Play">Play Mine Sweeper</a>

- [Mine Sweeper](https://adrianeyre.github.io/mine-sweeper/)

Every push to `master` cuts a release with semantic-release and publishes the
built site to GitHub Pages.
