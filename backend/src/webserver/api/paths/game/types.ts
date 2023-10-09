import { ErrorResponse } from "../../../types"

export type PostGameResult = PostGameResultSuccess | ErrorResponse

export enum GameType {
  DICE = "dice",
  COINFLIP = "coinflip",
}

export interface PostGameBody {
  choice: number[]
  type: GameType
}

interface PostGameResultSuccess {
  result: number
}
