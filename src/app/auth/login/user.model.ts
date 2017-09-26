export class User{
    constructor(public username : string,
                public password : string,
                public role :string[],
                public loginstatus : string
    ){}

    getBTOA():string{
        console.log("username "+this.username)
        return btoa(this.username+":"+this.password);
    }
}