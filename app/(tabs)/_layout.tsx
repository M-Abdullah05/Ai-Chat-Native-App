import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const backgroundColor = colorScheme === 'dark' 
    ? '#0f0f0f' 
    : '#f5f5f7';
  
  const activeIndicatorColor = Colors[colorScheme ?? 'light'].tabIconSelected;

  return (
    <View style={styles.wrapper}>
      <View 
        style={[
          styles.tabBarContainer,
          { 
            backgroundColor,
            paddingBottom: insets.bottom + 8,
          }
        ]}
      >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = route.name === 'chat' ? 'message.fill' : 'gearshape.fill';
        const iconColor = isFocused
          ? Colors[colorScheme ?? 'light'].tabIconSelected
          : Colors[colorScheme ?? 'light'].tabIconDefault;

        const labelColor = isFocused
          ? Colors[colorScheme ?? 'light'].tabIconSelected
          : Colors[colorScheme ?? 'light'].tabIconDefault;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            activeOpacity={0.6}
          >
            <View style={styles.tabContent}>
              <View style={styles.iconWrapper}>
                <IconSymbol
                  name={iconName}
                  size={26}
                  color={iconColor}
                />
                {isFocused && (
                  <View
                    style={[
                      styles.activeIndicator,
                      { backgroundColor: activeIndicatorColor },
                    ]}
                  />
                )}
              </View>
              {typeof label === 'string' && (
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: labelColor,
                      opacity: isFocused ? 1 : 0.5,
                    },
                  ]}
                >
                  {label}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 32,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 32,
    height: 3,
    borderRadius: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.1,
    marginTop: 2,
  },
});
