// src/components/auth/AuthGate.tsx
import SignInScreen from "@/screens/auth/SigninScreen";
import { useAppSelector } from "@/store";
import React from "react";

type AuthGateProps = {
  children: React.ReactNode;
};

const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.accessToken);

  if (!token) {
    return <SignInScreen />;
  }

  return <>{children}</>;
};

export default AuthGate;
