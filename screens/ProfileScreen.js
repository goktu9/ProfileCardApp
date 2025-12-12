import {View, Text, StyleSheet, Pressable, useWindowDimensions, LayoutAnimation, Platform, UIManager, FlatList} from 'react-native';
import {useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {COLORS, SPACING, RADII, FONTS} from '../theme';

// +++ Enable LayoutAnimation for Android.
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// +++ Bonus 5: Dummy Data for Multiple Profiles.
const PROFILES = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Mobile Developer',
    location: 'London, UK',
    bio: 'Passionate about React Native and building awesome mobile apps.'
  },
  {
    id: '2',
    name: 'Göktuğ Varan',
    role: 'UI/UX Designer',
    location: 'Istanbul, Turkiye',
    bio: 'Designing intuitive and beautiful user interfaces for mobile.'
  },
  {
    id: '3',
    name: 'Taha Yılmaz',
    role: 'Backend Engineer',
    location: 'Rize, Turkiye',
    bio: 'Node.js enthusiast.'
  },
];

// +++ Reusable Profile Card Component.
const ProfileCard = ({data, currentTheme, isLargeScreen}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  // +++ Toggle Expand Animation.
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
    setExpanded(!expanded);
  };

  // +++ Handle Like Logic with Logs.
  const handleLike = () => {
    const newState = !liked;
    setLiked(newState);
    if (newState) {
      console.log(`User liked ${data.name}`);
    } else {
      console.log(`User unliked ${data.name}`);
    }
  };

  // +++ Handle Follow Logic with Logs.
  const handleFollow = () => {
    const newState = !isFollowing;
    setIsFollowing(newState);
    if (newState) {
      console.log(`User followed ${data.name}`);
    } else {
      console.log(`User unfollowed ${data.name}`);
    }
  };

  return (
    // +++ Outer Container for Shadow only.
    <View style={[
      styles.cardShadowContainer,
      { 
        width: isLargeScreen ? '60%' : '90%', 
        shadowColor: currentTheme.cardShadow,
      }
    ]}>
      {/* +++ Inner Container for Content. */}
      <View style={[
        styles.cardContent,
        { 
          backgroundColor: currentTheme.card,
          padding: isLargeScreen ? SPACING.xl : SPACING.lg,
        }
      ]}>
        
        <Ionicons
          name="person-circle-outline"
          size={isLargeScreen ? 100 : 80}
          color={currentTheme.text}
        />
        
        <Text style={[styles.name, { color: currentTheme.text }]}>
          {data.name}
        </Text>
        
        <Text style={[styles.role, { color: currentTheme.text }]}>
          {data.role}
        </Text>

        {/* +++ Buttons Row. */}
        <View style={styles.buttonRow}>
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: (pressed || liked) ? '#e63946' : '#ff6b6b' }
            ]}
            onPress={handleLike}
          >
            <Ionicons name={liked ? "heart" : "heart-outline"} size={20} color="#fff" />
            <Text style={styles.btnText}>{liked ? 'Liked' : 'Like'}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: isFollowing ? '#457b9d' : '#1d3557', marginLeft: SPACING.md }
            ]}
            onPress={handleFollow}
          >
            <Ionicons name={isFollowing ? "checkmark" : "person-add"} size={20} color="#fff" />
            <Text style={styles.btnText}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </Pressable>
        </View>

        {/* +++ Expand Trigger. */}
        <Pressable onPress={toggleExpand} style={styles.expandButton}>
           <Text style={[styles.expandText, {color: currentTheme.text}]}>
             {expanded ? 'Hide Details' : 'View Details'}
           </Text>
           <Ionicons 
             name={expanded ? "chevron-up" : "chevron-down"} 
             size={20} 
             color={currentTheme.text} 
           />
        </Pressable>

        {/* +++ Extra Info Area. */}
        {expanded && (
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={20} color={currentTheme.text} />
              <Text style={[styles.detailText, { color: currentTheme.text }]}>
                {data.location}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="information-circle-outline" size={20} color={currentTheme.text} />
              <Text style={[styles.detailText, { color: currentTheme.text }]}>
                {data.bio}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default function ProfileScreen() {
  const [theme, setTheme] = useState('light');
  const currentTheme = COLORS[theme];
  
  const {width} = useWindowDimensions();
  const isLargeScreen = width > 500;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.bg}]}>
      
      {/* +++ Header area for Theme Toggle. */}
      <View style={styles.headerContainer}>
         <Pressable onPress={toggleTheme} style={styles.themeToggle}>
          <Ionicons 
            name={theme === 'light' ? 'moon' : 'sunny'} 
            size={28} 
            color={currentTheme.text} 
          />
        </Pressable>
      </View>

      <FlatList
        data={PROFILES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProfileCard 
            data={item} 
            currentTheme={currentTheme} 
            isLargeScreen={isLargeScreen} 
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // +++ Header Style (Updated for Status Bar).
  headerContainer: {
    width: '100%',
    // +++ Added padding top to push icon down from status bar.
    paddingTop: 60, 
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    zIndex: 1,
  },
  themeToggle: {
    // +++ Optional: extra touch area padding.
    padding: 5,
  },
  listContent: {
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.sm,
  },
  cardShadowContainer: {
    alignSelf: 'center',
    marginBottom: SPACING.lg,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    backgroundColor: 'transparent',
  },
  cardContent: {
    borderRadius: RADII.md,
    alignItems: 'center',
    overflow: 'hidden', 
    width: '100%',
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  role: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    marginTop: SPACING.sm,
    opacity: 0.7,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: SPACING.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 50,
  },
  btnText: {
    color: '#fff',
    fontFamily: FONTS.bold,
    fontSize: 14,
    marginLeft: SPACING.sm,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.lg,
    padding: SPACING.sm,
  },
  expandText: {
    fontFamily: FONTS.regular,
    marginRight: 4,
  },
  detailsContainer: {
    marginTop: SPACING.md,
    width: '100%',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  detailText: {
    fontFamily: FONTS.regular,
    marginLeft: SPACING.sm,
    flex: 1, 
  }
});