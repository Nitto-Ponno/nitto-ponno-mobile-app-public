// src/components/CustomTabBar.tsx
import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Platform, Dimensions, Vibration } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, runOnJS } from "react-native-reanimated";
import { useTheme } from "../context/ThemeProvider";
import { gGap } from "@/utils/Sizes";
import { Home, User } from "lucide-react-native";

const { width: screenWidth } = Dimensions.get("window");

interface TabIconProps {
  routeName: string;
  isFocused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ routeName, isFocused }) => {
  const { theme, Colors } = useTheme();
  const iconColor = isFocused
    ? theme === "dark"
      ? Colors.dark.primary
      : Colors.light.primary
    : theme === "dark"
    ? Colors.dark.heading
    : Colors.light.heading; // orange-500 : gray-400
  const contentColor = isFocused ? "#FFFFFF" : "#4B5563"; // white : gray-600
  const getIconContent = () => {
    switch (routeName) {
      case "HomeStack":
      case "Home":
        return <Home size={20} color={iconColor} />;
      case "ProfileStack":
        return <User size={20} color={iconColor} />;
      default:
        return (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 8,
              backgroundColor: iconColor,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 4,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: contentColor,
                borderRadius: 2,
              }}
            />
          </View>
        );
    }
  };

  const getTabLabel = () => {
    switch (routeName) {
      case "HomeStack":
      case "Home":
        return "Home";
      case "ProfileStack":
        return "Account";
      default:
        return routeName;
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {getIconContent()}
      <Text
        className="font-okra font-semibold"
        style={{
          fontSize: 10,
          color: isFocused
            ? theme === "dark"
              ? Colors.dark.primary
              : Colors.light.primary
            : theme === "dark"
            ? Colors.dark.heading
            : Colors.light.heading, // orange-500 : gray-500
        }}
      >
        {getTabLabel()}
      </Text>
    </View>
  );
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const tabWidth = screenWidth / state.routes.length;
  const indicatorPosition = useSharedValue(0);
  const indicatorOpacity = useSharedValue(0);

  const { theme, Colors } = useTheme();

  useEffect(() => {
    // Animate indicator position
    indicatorPosition.value = withSpring(state.index * tabWidth, {
      damping: 20,
      stiffness: 150,
    });

    // Animate indicator opacity
    indicatorOpacity.value = withTiming(1, { duration: 300 });
  }, [indicatorOpacity, indicatorPosition, state.index, tabWidth]);

  // Memoize animated styles
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
    opacity: indicatorOpacity.value,
  }));

  const triggerVibration = () => {
    if (Platform.OS === "android") {
      Vibration.vibrate(50);
    }
  };

  return (
    <View
      className="bg-background "
      style={{
        flexDirection: "row",
        paddingBottom: Platform.OS === "ios" ? gGap(20) : gGap(10),
        paddingTop: gGap(5),
        shadowColor: theme === "dark" ? Colors.dark.foreground : Colors.light.foreground,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderTopWidth: 1,
        borderTopColor: theme === "dark" ? Colors.dark.border : Colors.light.border,
      }}
    >
      {/* Animated Indicator */}
      <Animated.View
        style={[
          indicatorStyle,
          {
            position: "absolute",
            bottom: Platform.OS === "ios" ? gGap(15) : gGap(3),
            width: tabWidth * 0.6,
            marginLeft: tabWidth * 0.2,
            height: 3,
            backgroundColor: theme === "dark" ? Colors.dark.primary : Colors.light.primary, // orange-500
            borderRadius: 1.5,
          },
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const handlePress = () => {
          runOnJS(triggerVibration)();

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const handleLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={handlePress}
            onLongPress={handleLongPress}
            style={{
              width: screenWidth / state.routes.length,
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.7}
          >
            <TabIcon routeName={route.name} isFocused={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
