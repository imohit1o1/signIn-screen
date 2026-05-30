import React, { createContext, useContext, useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { theme } from "../../theme";

// 1. Create a local context to share focus and error states between parent and field
interface InputContextProps {
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  error?: boolean;
}

const InputContext = createContext<InputContextProps>({
  isFocused: false,
  setIsFocused: () => {},
});

interface InputProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  error?: boolean | string;
}

// 2. Outer Capsule Container
export function Input({ children, style, error = false }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Determine border styles dynamically based on focus and error context states
  let borderStyle: ViewStyle = {
    borderColor: theme.colors.border,
  };

  if (isFocused) {
    borderStyle = {
      borderColor: theme.colors.borderActive,
      // Focus outline glow shadow
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 2,
    };
  } else if (error) {
    borderStyle = {
      borderColor: theme.colors.error,
      backgroundColor: theme.colors.errorBg,
    };
  }

  return (
    <InputContext.Provider value={{ isFocused, setIsFocused, error: !!error }}>
      <View style={[styles.inputWrapper, borderStyle, style]}>
        {children}
      </View>
    </InputContext.Provider>
  );
}

interface InputFieldProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

// 3. Inner TextInput Component
export function InputField({
  onFocus,
  onBlur,
  style,
  ...props
}: InputFieldProps) {
  const { setIsFocused } = useContext(InputContext);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={theme.colors.textLight}
      onFocus={handleFocus}
      onBlur={handleBlur}
      autoCapitalize="none"
      {...props}
    />
  );
}

// 4. Attach Field sub-component to the Root Input container
Input.Field = InputField;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderWidth: 1.5,
    borderRadius: theme.radius.xxl, // Pill shape capsule
    height: 56,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm, // Automatic horizontal spacing for left/right icons
    width: "100%",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    fontWeight: theme.typography.weights.medium,
    padding: 0, // Reset default OS text paddings
  },
});
