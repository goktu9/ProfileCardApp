// +++ Import the useFonts hook from expo-font.
import {useFonts} from 'expo-font';
import {View, Text, StyleSheet} from 'react-native';

export default function App() {
  // +++ Load custom fonts using the useFonts hook.
  const [fontsLoaded] = useFonts({
    // +++ Map the 'Montserrat' name to the regular font file.
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    // +++ Map the 'MontserratBold' name to the bold font file.
    'MontserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  // +++ Check if fonts are still loading.
  if (!fontsLoaded) {
    // +++ Return null while waiting for fonts to load.
    return null;
  }

  return (
    <View style={styles.container}>
      {/* +++ Display a test text using the custom font. */}
      <Text style={styles.text}>Fonts Loaded!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // +++ Apply the loaded custom font family (Bold).
    fontFamily: 'MontserratBold', 
    fontSize: 24,
  },
});