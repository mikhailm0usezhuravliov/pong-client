export interface Game {
  status: 'action' | 'pause',
  ballX: number,
  ballY: number,
  paddleLx: number,
  paddleRx: number,
  playerR:Player,
  playerL:Player,
  goal: ''| 'goalR' | 'goalL'
}
export interface Player {
  name: string,
  score: number
}
