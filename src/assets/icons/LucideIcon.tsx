import { icons } from "lucide-react-native";

const LucideIcon = ({ name, color, size }: { name: keyof typeof icons; color?: string; size?: number }) => {
  const LIcon = icons[name] as any;

  return <LIcon color={color} size={size} />;
};

export default LucideIcon;
