import {Injectable} from '@angular/core';

interface User {
mejl: string;
userID: string;
// ime: string;
// prezime: string;
sifra: string;
// slika: string;
}
@Injectable()

export class UserService {
    private user: User;

    constructor() {
    }

    setUser(user: User) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    getUserID() {
        return this.user.userID;
    }

    getUserMail() {
        return this.user.mejl;
    }
}


