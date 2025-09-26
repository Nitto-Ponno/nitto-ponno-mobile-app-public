/* eslint-disable no-useless-escape */
import Toast from "react-native-toast-message";
import { Linking, Share } from "react-native";

interface ToastOptions {
  message?: string;
  color?: string;
  background?: string;
  type?: "default" | "success" | "warning" | "error";
}

export const showToast = ({ message, color, background, type }: ToastOptions): void => {
  Toast.show({
    type: "errorToast",
    text1: message,
    position: "bottom",
    props: { color, background, type: type || "default" },
  });
};
export const showSuccessAlert = ({ message, color, background, type }: ToastOptions): void => {
  Toast.show({
    type: "successToast",
    text1: message,
    position: "bottom",
    props: { color, background, type: type || "default" },
  });
};
export const showWarningToast = ({ message, color, background, type }: ToastOptions): void => {
  Toast.show({
    type: "warningToast",
    text1: message,
    position: "bottom",
    props: { color, background, type: type || "default" },
  });
};
export const showErrorToast = ({ message, color, background, type }: ToastOptions): void => {
  Toast.show({
    type: "errorToast",
    text1: message,
    position: "bottom",
    props: { color, background, type: type || "default" },
  });
};
export const showAlert = ({ message, color, background, type }: ToastOptions): void => {
  Toast.show({
    type: "warningToast",
    text1: message,
    position: "bottom",
    props: { color, background, type: type || "default" },
  });
};

export const maskEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;

  // Show first 2 characters, then mask the rest before the @
  const visible = local.slice(0, 2);
  const masked = "*".repeat(Math.max(1, local.length - 2));

  return `${visible}${masked}@${domain}`;
};

export const handleOpenLink = (url: string) => {
  Linking.openURL(url);
};

export const onShare = async (message: string) => {
  try {
    const result = await Share.share({
      message,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    console.log("error.message", JSON.stringify(error.message, null, 2));
  }
};
export function getCategoryStats(categories: any[]): {
  totalCategories: number;
  totalCourses: number;
  totalSubcategories: number;
  maxLevel: number;
} {
  let totalCategories = 0;
  let totalCourses = 0;
  let totalSubcategories = 0;
  let maxLevel = 0;

  function traverse(category: any, currentLevel: number) {
    // Count the current category
    totalCategories++;

    // Add course count for the current category
    totalCourses += category.courseCount || 0;

    // Update max level if current level is higher
    if (currentLevel > maxLevel) {
      maxLevel = currentLevel;
    }

    // Count subcategories and traverse children
    if (category.children && category.children.length > 0) {
      totalSubcategories += category.children.length;
      category.children.forEach((child: any) => traverse(child, currentLevel + 1));
    }
  }

  // Traverse all top-level categories
  categories.forEach((category) => traverse(category, 0));

  return {
    totalCategories,
    totalCourses,
    totalSubcategories,
    maxLevel,
  };
}
