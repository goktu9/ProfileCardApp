import {View, Text, StyleSheet, Pressable} from 'react-native'; // +++ Import Pressable for interaction.
import {useState } from 'react';
import {Ionicons } from '@expo/vector-icons';
import {COLORS, SPACING, RADII, FONTS} from '../theme';

export default function ProfileScreen() {
  const [theme, setTheme] = useState('light');
  const currentTheme = COLORS[theme];

  // +++ Function to toggle between light and dark themes.
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.bg}]}>
      
      {/* +++ Theme Toggle Button (Top Right). */}
      <Pressable 
        onPress={toggleTheme}
        style={styles.themeToggle}
      >
        {/* +++ Change icon based on current theme (moon/sunny). */}
        <Ionicons 
          name={theme === 'light' ? 'moon' : 'sunny'} 
          size={28} 
          color={currentTheme.text} 
        />
      </Pressable>

      <View style={[
        styles.card,
        {backgroundColor: currentTheme.card}
      ]}>
        <Ionicons
          name="person-circle-outline"
          size={80}
          color={currentTheme.text}
        />
        
        <Text style={[styles.name, {color: currentTheme.text}]}>
          John Doe
        </Text>
        
        <Text style={[styles.role, {color: currentTheme.text}]}>
          Mobile Developer
        </Text>

        {/* +++ Like Button with press feedback. */}
        <Pressable
          // +++ Change background color when pressed using the 'pressed' state.
          style={({ pressed }) => [
            styles.likeButton,
            { backgroundColor: pressed ? '#e63946' : '#ff6b6b' }
          ]}
          onPress={() => console.log('Profile Liked!')}
        >
          <Ionicons name="heart" size={24} color="#fff" />
          <Text style={styles.likeText}>Like</Text>
        </Pressable>

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
  // +++ Styles for the absolute positioned theme toggle.
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: SPACING.sm,
  },
  card: {
    width: '85%',
    borderRadius: RADII.md,
    alignItems: 'center',
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
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
  // +++ Styles for the Like button container.
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 50,
    marginTop: SPACING.md,
  },
  // +++ Styles for the Like button text.
  likeText: {
    color: '#fff',
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginLeft: SPACING.sm,
  },
});