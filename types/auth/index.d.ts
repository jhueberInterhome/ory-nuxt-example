interface LoginData {
  csrf_token?: string
  method: string
  identifier: string
  password: string
}

interface RegistrationData {
  csrf_token?: string
  method: string
  password: string // TODO:
  traits: any
}
