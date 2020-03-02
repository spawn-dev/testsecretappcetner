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
}