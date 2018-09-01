class TokenData {
  accessToken: string;
  expiresAt: number;
  constructor(token: string = null, expiresAt: number = null) {
    this.accessToken = token;
    this.expiresAt = expiresAt;
  }
}

export { TokenData }
