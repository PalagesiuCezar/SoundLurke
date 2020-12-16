export class resetPassword {
    email: string;
    uid: string;
    token: string;
    new_password: string;
    re_new_password: string;

    constructor(rawData){
        this.email = rawData.user.email;
        this.uid = rawData.user.uid;
        this.token = rawData.user.token;
        this.new_password = rawData.user.new_password;
        this.re_new_password = rawData.user.re_new_password;
    }
}
