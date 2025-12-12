// +++ Import the useFonts hook from expo-font.
import { useFonts } from 'expo-font';
// +++ Import the ProfileScreen component.
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  // +++ Load custom fonts.
  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'MontserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  // +++ Wait for fonts to load.
  if (!fontsLoaded) {
    return null;
  }

  // +++ Render the ProfileScreen.
  return <ProfileScreen />;
}