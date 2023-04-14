export interface IClientToken {
    access_token: string,
    token_type: "bearer",
    expires_in: 3600,
    scope: "read write"
  }