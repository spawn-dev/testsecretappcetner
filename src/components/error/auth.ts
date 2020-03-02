export function getUIConstantFromFirebaseError(error: any): string {
    switch (error.code + '') {
        case FirebaseAuthErrorStrings.BAD_CREDENTIALS:
            return `No account for the email you entered exists`;
        case FirebaseAuthErrorStrings.BAD_EMAIL_FORMAT:
            return 'The email you entered was badly formatted';
        case FirebaseAuthErrorStrings.BAD_PASSWORD:
            return 'The password you entered is incorrect';
        default:
            throw new Error('Unaccounted error string : `' + error + '`. Please update enum FirebaseAuthErrorStrings');
    }
}
export enum FirebaseAuthErrorStrings {
    BAD_CREDENTIALS = 'auth/user-not-found',
    BAD_EMAIL_FORMAT = 'auth/invalid-email',
    BAD_PASSWORD = 'auth/wrong-password'
}
