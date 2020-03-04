import firebase, { RNFirebase } from 'react-native-firebase';
import { User } from '../model/User'
export const Firebase = firebase;
export const Auth = firebase.auth();

export class UserStore {
    private _user: User | null;
    public constructor() {
        this._user = null;
    }

    public get isAuthenticated(): boolean {
        return null != this._user;
    }

    public logout(): Promise<void> {
        return Auth.signOut();
    }

    public async login(email: string, password: string): Promise<RNFirebase.UserCredential> {
        return Auth.signInWithEmailAndPassword(email, password);
    }

    public async signUp(email: string, password: string, displayName: string, phoneNumber?: string): Promise<RNFirebase.UserCredential> {
        return Auth.createUserWithEmailAndPassword(email, password).then(function (response) {
            const user = Auth.currentUser;
            user!.updateProfile({ displayName: displayName });
            if (phoneNumber) {
                // TODO
                // Send verification code to user's phone
                // Auth.PhoneAuthProvider.verifyPhoneNumber(phoneNumber, recaptchVerifier).then(function (verificationId) {
                //     // verification code from user
                //     const cred = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
                // });
            }
            return response;
        }).catch(function (error) {
            throw error;
        });
    };
}