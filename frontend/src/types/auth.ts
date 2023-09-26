export type LoginData = {
  email: string
  password: string
}

export type RegisterData = {
  name: string
  surname: string
  email: string
  password: string
}

export type AuthFieldsErrors = {
  name: string
  surname: string
  email: string
  password: string
}

export type AuthInfo = {
  jwtToken: string
  name: string
  email: string
  locale: string
}
