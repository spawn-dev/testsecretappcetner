import { User } from '../model/User'

export class UserStore {
    private _user: User | null;
    public constructor() {
        this._user = null;
    }

    public get isAuthenticated(): boolean {
        return null != this._user;
    }

    // public async login(email: string, password: string): Promise<RNFirebase.UserCredential> {
    //     return Auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
    // }
}