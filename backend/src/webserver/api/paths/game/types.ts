import { ErrorResponse } from "../../../types"

export type PostGameResult = PostGameResultSuccess | ErrorResponse

interface PostGameResultSuccess {
  result: number
}
