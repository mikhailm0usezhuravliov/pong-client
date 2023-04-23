export interface Game {
  status: 'action' | 'pause',
  ballX: number,
  ballY: number,
  paddleLx: number,
  paddleRx: number,
  playerR:Player,
  playerL:Player    
}
export interface Player {
  name: string,
  score: number
}