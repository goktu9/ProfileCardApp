import {View, Text, StyleSheet} from 'react-native';
import { useState } from 'react';
// +++ Import Ionicons from the vector icons library.
import {Ionicons} from '@expo/vector-icons';
import {COLORS, SPACING, RADII, FONTS} from '../theme';

export default function ProfileScreen() {
  const [theme, setTheme] = useState('light');
  const currentTheme = COLORS[theme];

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      {/* +++ Profile Card Container with dynamic background. */}
      <View style={[
        styles.card,
        { backgroundColor: currentTheme.card }
      ]}>
        {/* +++ Profile Icon. */}
        <Ionicons
          name="person-circle-outline"
          size={80}
          color={currentTheme.text}
        />
        
        {/* +++ Name Text. */}
        <Text style={[styles.name, { color: currentTheme.text }]}>
          John Doe
        </Text>
        
        {/* +++ Role Text. */}
        <Text style={[styles.role, { color: currentTheme.text }]}>
          Mobile Developer
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    borderRadius: RADII.md,
    alignItems: 'center',
    padding: SPACING.lg,
    // +++ iOS Shadow properties. / iOS Gölge özellikleri.
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // +++ Android Shadow property (Elevation). / Android Gölge özelliği (Yükselti).
    elevation: 6,
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    marginTop: SPACING.md,
  },
  role: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    marginTop: SPACING.sm,
    opacity: 0.7,
  },
});