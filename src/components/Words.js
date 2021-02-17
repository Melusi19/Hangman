var games = [
	"overwatch",
    "battlefield",
    "minecraft",
    "payday",
    "fortnite",
    "fifa",
    "uncharted",
    "injustice",
    "valorant"
]

function randomWord() {
  return games[Math.floor(Math.random() * games.length)]
}

export { randomWord }