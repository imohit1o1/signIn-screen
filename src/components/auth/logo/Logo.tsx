import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "../../../theme";

interface LogoProps {
  size?: number;
}

export function Logo({ size = 64 }: LogoProps) {
  // Compute scale ratios based on standard 64px base size
  const scale = size / 64;
  const leafVWidth = 14 * scale;
  const leafVHeight = 24 * scale;
  const leafHWidth = 24 * scale;
  const leafHHeight = 14 * scale;
  const centerSize = 12 * scale;
  const offset = 4 * scale;

  return (
    <View style={[styles.flowerLogo, { width: size, height: size }]}>
      {/* Top Leaf */}
      <View
        style={[
          styles.leaf,
          {
            width: leafVWidth,
            height: leafVHeight,
            borderRadius: leafVWidth / 2,
            top: offset,
            alignSelf: "center",
          },
        ]}
      />
      {/* Bottom Leaf */}
      <View
        style={[
          styles.leaf,
          {
            width: leafVWidth,
            height: leafVHeight,
            borderRadius: leafVWidth / 2,
            bottom: offset,
            alignSelf: "center",
          },
        ]}
      />
      {/* Left Leaf */}
      <View
        style={[
          styles.leaf,
          {
            width: leafHWidth,
            height: leafHHeight,
            borderRadius: leafHHeight / 2,
            left: offset,
            top: "50%",
            marginTop: -leafHHeight / 2,
          },
        ]}
      />
      {/* Right Leaf */}
      <View
        style={[
          styles.leaf,
          {
            width: leafHWidth,
            height: leafHHeight,
            borderRadius: leafHHeight / 2,
            right: offset,
            top: "50%",
            marginTop: -leafHHeight / 2,
          },
        ]}
      />
      {/* Center Core cutout gap */}
      <View
        style={[
          styles.logoCenter,
          {
            width: centerSize,
            height: centerSize,
            borderRadius: centerSize / 2,
            marginTop: -centerSize / 2,
            marginLeft: -centerSize / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flowerLogo: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  leaf: {
    position: "absolute",
    backgroundColor: theme.colors.primary,
  },
  logoCenter: {
    backgroundColor: theme.colors.background, // Matches screen background overlay
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 10,
  },
});
