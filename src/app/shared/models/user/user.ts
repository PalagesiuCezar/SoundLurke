import {Token} from "./token"

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: string;
  phone: string;
  lastOnline: Date;
  country: string;
  town: string;
  county: string;
  token?: Token;

  constructor(rawData) {
    this.id = rawData.user.id;
    this.email = rawData.user.email;
    this.password = rawData.user.password;
    this.firstName = rawData.user.firstName;
    this.lastName = rawData.user.lastName;
    this.userType = rawData.user.userType;
    this.phone = rawData.user.phone;
    this.lastOnline = rawData.user.lastOnline;
    this.country = rawData.user.country;
    this.town = rawData.user.town;
    this.county = rawData.user.county;
    if(rawData.token){
      this.token = new Token(rawData.expiry, rawData.token);
    }
  }
}
