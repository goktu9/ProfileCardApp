import {View, Text, StyleSheet} from 'react-native';
import {useState} from 'react';
// +++ Import theme constants.
import {COLORS, SPACING, RADII, FONTS} from '../theme';

export default function ProfileScreen() {
  // +++ State to manage current theme (light/dark).
  const [theme, setTheme] = useState('light');
  
  // +++ Get the colors for the current theme.
  const currentTheme = COLORS[theme];

  return (
    // +++ Main container with dynamic background color.
    <View style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      {/* +++ Title text with dynamic text color. */}
      <Text style={[styles.title, { color: currentTheme.text }]}>
        Profile Card
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    // +++ Use the bold font defined in the theme.
    fontFamily: FONTS.bold,
    fontSize: 24,
  },
});