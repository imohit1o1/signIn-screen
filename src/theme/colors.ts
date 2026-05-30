export const colors = {
  // Brand Accent Colors
  primary: "#80C31C",       // Telecare bright lime/green
  primaryDark: "#6AA615",   // Darker shade for tap active states
  primaryLight: "#F2F9E8",  // Subtle green tint for highlights / active cards

  // Neutral Tones
  background: "#F4F6F2",    // Premium, soft warm green-tinted off-white
  card: "#FFFFFF",          // White base for cards and forms
  border: "#E9EBE6",        // Soft border separating sections
  borderActive: "#80C31C",  // Green border outline for active/focused inputs

  // Typography
  text: "#1E2219",          // Deep dark charcoal-olive for elegant readability
  textMuted: "#6E7368",     // Soft sage grey for secondary subtitles and labels
  textLight: "#A0A59B",     // Faded gray for placeholders
  textInverse: "#FFFFFF",   // White text for primary buttons

  // Status & Validation
  error: "#E53935",         // Crimson red for error text/icons
  errorBorder: "#F8D7DA",   // Soft red outline
  errorBg: "#FDF2F2",       // Soft pink-red background for alert banners
  success: "#2E7D32",       // Pine green for success actions

  // Social Brands
  google: "#EA4335",
  facebook: "#1877F2",
  instagram: "#E1306C",
};

export type ColorsType = typeof colors;
