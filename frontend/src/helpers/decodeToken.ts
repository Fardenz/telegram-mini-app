import jwt from "jwt-decode"
import { JSONRecord } from "../infrastructure/superFetch"

export function decode(jwtToken: string): JSONRecord {
  const authData = jwt(jwtToken)
  return authData as JSONRecord
}
