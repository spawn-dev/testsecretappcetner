import { AppRegistry, Platform } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('testsecretappcetner', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('testsecretappcetner', { rootTag });
}
