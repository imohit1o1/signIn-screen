import React, { useRef, useContext, createContext } from "react";
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

// -------------------------------------------------------------------
// Context: lets Input.Field reach up and animate the wrapper border
// without any useState / re-renders.
// -------------------------------------------------------------------
const InputWrapperRefContext = createContext<React.RefObject<View | null> | null>(null);

// -------------------------------------------------------------------
// Props
// -------------------------------------------------------------------
interface InputProps extends TextInputProps {
  error?: boolean | string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

interface InputFieldProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

// -------------------------------------------------------------------
// Helpers: manipulate native border without React state
// -------------------------------------------------------------------
function applyFocusStyle(ref: React.RefObject<View | null> | null) {
  ref?.current?.setNativeProps({
    style: {
      borderColor: theme.colors.borderActive,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 2,
      backgroundColor: theme.colors.card,
    },
  });
}

function applyBlurStyle(
  ref: React.RefObject<View | null> | null,
  hasError: boolean
) {
  ref?.current?.setNativeProps({
    style: {
      borderColor: hasError ? theme.colors.error : theme.colors.border,
      shadowOpacity: 0,
      elevation: 0,
      backgroundColor: hasError ? theme.colors.errorBg : theme.colors.card,
    },
  });
}

// -------------------------------------------------------------------
// Input.Field — bare TextInput that reads the wrapper ref from context
// -------------------------------------------------------------------
function InputField({ style, onFocus, onBlur, ...props }: InputFieldProps) {
  const wrapperRef = useContext(InputWrapperRefContext);

  const handleFocus = (e: any) => {
    applyFocusStyle(wrapperRef);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    applyBlurStyle(wrapperRef, false);
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

// -------------------------------------------------------------------
// Input — wrapper with icon slots + optional compound children
// -------------------------------------------------------------------
function InputBase({
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  onFocus,
  onBlur,
  children,
  ...props
}: InputProps) {
  const wrapperRef = useRef<View>(null);

  const handleFocus = (e: any) => {
    applyFocusStyle(wrapperRef);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    applyBlurStyle(wrapperRef, !!error);
    if (onBlur) onBlur(e);
  };

  const errorStyle: ViewStyle = error
    ? { borderColor: theme.colors.error, backgroundColor: theme.colors.errorBg }
    : {};

  // Compound usage: <Input error={...}><Icon /><Input.Field ... /></Input>
  if (children) {
    return (
      <InputWrapperRefContext.Provider value={wrapperRef}>
        <View
          ref={wrapperRef}
          style={[styles.inputWrapper, errorStyle, containerStyle]}
        >
          {children}
        </View>
      </InputWrapperRefContext.Provider>
    );
  }

  // Standalone usage: <Input leftIcon={...} rightIcon={...} value={...} />
  return (
    <View
      ref={wrapperRef}
      style={[styles.inputWrapper, errorStyle, containerStyle]}
    >
      {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={theme.colors.textLight}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoCapitalize="none"
        {...props}
      />

      {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
    </View>
  );
}

// Attach Field as a sibling export via Object.assign — TypeScript-safe
// and guaranteed to survive React Compiler / Metro bundling.
export const Input = Object.assign(InputBase, { Field: InputField });

// -------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------
const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.xxl,
    height: 56,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
    width: "100%",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    fontWeight: theme.typography.weights.medium,
    padding: 0,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
