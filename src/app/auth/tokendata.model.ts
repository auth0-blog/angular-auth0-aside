class TokenData {
  accessToken: string;
  expiresAt: number;
  constructor(token: string, expiresAt: number) {
    this.accessToken = token;
    this.expiresAt = expiresAt;
  }
}

export { TokenData }
