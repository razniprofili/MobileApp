import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import { auth } from 'firebase/app'
// import * as firebase from 'firebase';
import {emailVerified} from "@angular/fire/auth-guard";

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

    constructor(private afAuth: AngularFireAuth) {
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

    getUserPass() {
        return this.user.sifra;
    }


    reAuth(email: string, password: string){
        // var user = firebase.auth().currentUser;
        // const credential = firebase.auth.EmailAuthProvider.credential(
        //     email,
        //     password
        // );
        // console.log(user.reauthenticateWithCredential(credential))
        // return user.reauthenticateWithCredential(credential)
        return this.afAuth.signInWithEmailAndPassword(email, password);

    }

    async updatePassword(newpassword: string) {

        var user= await this.afAuth.currentUser;

        if(user === null){
            const res = await this.afAuth.signInWithEmailAndPassword(this.user.mejl, this.user.sifra);
            console.log(res)
            user= await this.afAuth.currentUser;
            console.log(user.email)
        }
        await user.updatePassword(newpassword);

        return this.afAuth.updateCurrentUser(user)
    }

   async updateEmail(newemail: string) {

        let user= await this.afAuth.currentUser;

        if(user === null){
            const res = await this.afAuth.signInWithEmailAndPassword(this.user.mejl, this.user.sifra);
            console.log(res)
            user= await this.afAuth.currentUser;
            console.log(user.email)
        }
        await user.updateEmail(newemail);

        return this.afAuth.updateCurrentUser(user)
    }
}


