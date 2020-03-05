const admin = require('firebase-admin');
const fs = require('fs');

const IOS_CONFIG_FILE = "./ios/testsecretappcetner/GoogleService-Info.plist";
const ANDROID_CONFIG_FILE = "./android/app/google-services.json";
const iosAppName = process.argv.slice(2)[0];
const androidAppName = process.argv.slice(2)[1];

try {
    var serviceAccount = require("./serviceAccountKey.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    if(!iosAppName || !androidAppName){
        console.log('Ios and Android app names much not be null.  Got Ios and Android names: ', iosAppName, androidAppName)
    }
}
catch (error) {
    console.log("Error generation Firebase config files for IOS and Android.  Ensure that you have downloaded the serviceAccountKey.json file from https://console.firebase.google.com/project/testsecretappcetner-22b6f/settings/serviceaccounts/adminsdk  it is at the root of your project directory, and named serviceAccountKey.json")
    process.exit(1)
}


const createAndroidGoogleConfigFile = async () => {
    return new Promise(async (resolve, reject) => {
        try {

            const androidApp = admin.projectManagement().androidApp(androidAppName);
            const metadata = await androidApp.getConfig();
            fs.writeFileSync(ANDROID_CONFIG_FILE, metadata)
            console.log('succesfully generated Android config file')
            resolve()
        }
        catch (error) {
            reject(error)
        }
    })
}

const createIOSGoogleConfigFile = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const iosApp = admin.projectManagement().iosApp(iosAppName)
            const metadata = await iosApp.getConfig();
            fs.writeFileSync(IOS_CONFIG_FILE, metadata)
            console.log('succesffuly generated IOS config file')
            resolve()
        }
        catch (error) {
            reject(error)
        }
    })

}
try {

    createIOSGoogleConfigFile()
        .then(() => {
            createAndroidGoogleConfigFile()
                .then(() => {
                    process.exit()
                })
        })
}
catch (error) {
    console.log('Error creating Android and IOS configuration files ', error)
    process.exit(1)
}

