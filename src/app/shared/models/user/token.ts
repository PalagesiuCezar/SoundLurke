export class Token {
    expiry: Date;
    token: string;
  
    constructor(expiry: Date, token: string) {
      this.expiry = expiry;
      this.token = token;
    }
  }
  