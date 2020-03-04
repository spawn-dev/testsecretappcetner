import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import LoginInput from "../components/input"
import LoginButton from "../components/button"
import { UserStore } from '../stores/UserStore';
import { getUIConstantFromFirebaseError } from '../components/error/auth';
import { RNFirebase } from 'react-native-firebase';

interface Props {
    userStore: UserStore;
}

interface State {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}
export class SignUp extends React.Component<Props, State> {
    private onPressSignUpButton = (): void => {
        if (false === this.validateInputs()) {
            return;
        }

        const { email, password, firstName, lastName, phoneNumber } = this.state;
        const displayName: string = `${firstName} ${lastName}`;
        const userStore: UserStore = new UserStore()
        userStore.signUp(email!, password!, displayName, phoneNumber).catch(error => {
            const alertString = getUIConstantFromFirebaseError(error);
            Alert.alert(alertString);
        })
            .then((user: RNFirebase.UserCredential) => {
                Alert.alert('User signed up successfully')
            });
    };

    private validateInputs(): boolean {
        if (this.state == null) {
            Alert.alert(signUpUIStrings.ALERT_ENTER_EMAIL_AND_PASS);
            return false;
        }

        const { email, password, firstName, lastName } = this.state;

        if (email === '' || null == email) {
            Alert.alert(signUpUIStrings.ALERT_ENTER_EMAIL);
            return false;
        }

        if (password === '' || null == email) {
            Alert.alert(signUpUIStrings.ALERT_ENTER_PASS);
            return false;
        }

        if (!firstName || firstName === '' || !lastName || lastName === '') {
            Alert.alert(signUpUIStrings.ALERT_ENTER_FIRST_AND_LAST);
            return false;
        }

        return true;
    }
    public render(): JSX.Element {
        return (
            <View style={styles.container}>
                <LoginInput
                    placeholder='first name*'
                    onChangeText={(firstName: string) => {
                        this.setState({ firstName: firstName })
                    }}
                />
                <LoginInput
                    placeholder='last name*'
                    onChangeText={(lastName: string) => {
                        this.setState({ lastName: lastName })
                    }}
                />
                <LoginInput
                    placeholder='email*'
                    onChangeText={(email: string) => {
                        this.setState({ email: email })
                    }}
                    keyboardType="email-address"
                />
                <LoginInput
                    secureTextEntry={true}
                    placeholder='password*'
                    onChangeText={(password: string) => {
                        this.setState({ password: password })
                    }}
                />
                <LoginInput
                    placeholder='phone number'
                    onChangeText={(phoneNumber: string) => {
                        this.setState({ phoneNumber: phoneNumber })
                    }}
                    keyboardType="phone-pad"
                />
                <LoginButton onPress={this.onPressSignUpButton}>
                    <Text>Sign Up</Text>
                </LoginButton>
            </View>
        )
    }
}

const signUpUIStrings = {
    APP_NAME: 'myapp',
    EMAIL_INPUT_PLACEHOLDER: 'Email',
    PASSWORD_INPUT_PLACEHOLDER: 'Password',
    ALERT_ENTER_EMAIL_AND_PASS: 'You must enter an email and a password',
    ALERT_ENTER_EMAIL: 'You must enter an email and a password',
    ALERT_ENTER_PASS: 'You must enter an email and a password',
    ALERT_ENTER_FIRST_AND_LAST: 'You must enter an first and last name',
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

