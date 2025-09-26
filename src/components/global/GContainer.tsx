import { Colors, useTheme } from "@/context/ThemeProvider";
import { cn } from "@/utils/cn";
import React, { ReactNode, useMemo } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StatusBarStyle = "light-content" | "dark-content" | "default";

export interface GContainerProps {
  children?: ReactNode;
  className?: string;
  /** Layout */
  scroll?: boolean; // Use ScrollView when true, View otherwise
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  centered?: boolean; // center children (axis-aware)
  padding?: number; // uniform padding
  backgroundColor?: string;

  /** Safe area + keyboard */
  safe?: boolean; // wrap in SafeAreaView
  keyboardAvoiding?: boolean; // enable KeyboardAvoidingView
  keyboardOffset?: number; // extra offset for headers etc.
  dismissKeyboardOnTap?: boolean; // tap outside to dismiss

  /** Status bar */
  statusBarStyle?: StatusBarStyle;
  statusBarBg?: string;
  translucentStatusBar?: boolean;

  /** Loading overlay */
  loading?: boolean;

  /** Pull to refresh (only when scroll = true) */
  refreshing?: boolean;
  onRefresh?: () => void;

  /** Optional header/footer areas */
  header?: ReactNode;
  footer?: ReactNode;

  /** Testing */
  testID?: string;
}

export const GContainer: React.FC<GContainerProps> = ({
  children,
  scroll = false,
  contentContainerStyle,
  style,
  centered = false,
  padding,
  backgroundColor,
  safe = true,
  keyboardAvoiding = true,
  keyboardOffset = 0,
  dismissKeyboardOnTap = true,
  statusBarStyle = "dark-content",
  statusBarBg,
  translucentStatusBar = false,
  loading = false,
  refreshing = false,
  onRefresh,
  header,
  footer,
  testID,
  className,
}) => {
  const { theme } = useTheme();
  const ContainerBg = useMemo(
    () => [{ backgroundColor }, style, centered && styles.centered, padding != null && { padding }],
    [backgroundColor, style, centered, padding]
  );

  const ContentWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    if (scroll) {
      return (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.scrollContent, centered && styles.centered, contentContainerStyle]}
          refreshControl={onRefresh ? <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} /> : undefined}
        >
          {children}
        </ScrollView>
      );
    }
    return <View style={[styles.flex, contentContainerStyle]}>{children}</View>;
  };

  const Body = (
    <>
      {header}
      <ContentWrapper>{children}</ContentWrapper>
      {footer}
      {loading && (
        <View style={styles.loadingOverlay} pointerEvents="auto">
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );

  const maybeTappable = dismissKeyboardOnTap ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.flex, ContainerBg]}>{Body}</View>
    </TouchableWithoutFeedback>
  ) : (
    <View style={[styles.flex, ContainerBg]}>{Body}</View>
  );

  const withKeyboard = keyboardAvoiding ? (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ ios: "padding", android: undefined })}
      keyboardVerticalOffset={keyboardOffset}
    >
      {maybeTappable}
    </KeyboardAvoidingView>
  ) : (
    maybeTappable
  );

  const content = safe ? (
    <SafeAreaView
      style={[styles.flex, { backgroundColor: statusBarBg ?? backgroundColor }]}
      edges={["top", "right", "bottom", "left"]} // cover all sides
    >
      {withKeyboard}
    </SafeAreaView>
  ) : (
    <View style={[styles.flex, { backgroundColor: statusBarBg ?? backgroundColor }]}>{withKeyboard}</View>
  );

  return (
    <View className={cn("bg-background", className)} style={styles.flex} testID={testID}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : theme === "light" ? "dark-content" : statusBarStyle}
        backgroundColor={statusBarBg ?? backgroundColor}
        translucent={translucentStatusBar}
      />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centered: { justifyContent: "center", alignItems: "center" },
  scrollContent: { flexGrow: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GContainer;
