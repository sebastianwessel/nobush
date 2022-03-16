export type OAuthServiceOptions = {
  token: {
    privateKey: string
    publicKey: string
    algorithm: string
    issuer: string
    audience: string
    expireIn: number | string
  }
  refreshToken: {
    privateKey: string
    publicKey: string
    algorithm: string
    issuer: string
    audience: string
    expireIn: number | string
  }
}
