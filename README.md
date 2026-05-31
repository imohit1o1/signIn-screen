# Build a React Native Sign In Screen
## Mobile Development Cohort

A pixel-perfect, premium mobile authentication flow recreated using **React Native**, **Expo (v55.0.0)**, and only **core React Native components** for the **Mobile Development Cohort** assignment.

This interface is inspired by the premium Dribbble design for **[Osler AI Telehealth Telemedicine App](https://dribbble.com/shots/24783022-osler-AI-Telehealth-Telemedicine-App-Sign-In-Sign-Up-UI)**.

---

## 📺 Demonstration & Video Walkthrough

We have captured the full interaction, keyboard responsiveness, input validation, and smooth screen transitions on an emulator. You can view the demo video below:

### Play Demo Video

https://github.com/user-attachments/assets/b30223f4-eb78-4388-bb4d-70387b5fa711
---

## 🚀 The Approach & Methodology

To build a premium UI that feels indistinguishable from a custom production-ready mobile app without importing external UI kits (like NativeBase, Paper, or UI Kitten), the development process was structured into **four distinct phases**:

### 1. Design Tokenization (Theme Design)
We established a strict design system under `src/theme` before writing any layout code. This guarantees high cohesion across margins, border radiuses, font weights, and color scales:
* **Color Palette (`src/theme/colors.ts`):** Defined a signature telehealth color system—featuring a vibrant brand primary green (`#80C31C`), premium soft warm background off-white (`#F4F6F2`), clean text colors, and exact social brand color HEX definitions (Google, Facebook, Instagram).
* **Typography (`src/theme/typography.ts`):** Set proportional font scale dimensions and system font-weight mappings (`regular`, `medium`, `bold`) to preserve consistent legibility.
* **Layout Spacing & Corners (`src/theme/radius.ts`, `src/theme/spacing.ts`):** Standardized spacing multipliers (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`) and rounded card borders to align with the soft, modern aesthetics.

### 2. Crafting Primitive Reusable UI Components
Instead of scattering ad-hoc style configurations across pages, we built robust, flexible, primitive wrappers in `src/components/ui/`:
* **`Screen`:** Handles safe areas (`SafeAreaView`), custom `StatusBar` configuration, standardizes keyboard-avoidance logic (`KeyboardAvoidingView`), and wraps screen layers in a configurable `ScrollView` optimized for varying screen heights.
* **`Button`:** A unified touch controller implementing custom active-opacity styling, loading spinner states, outline/link variants, and a round `iconOnly` prop specifically tuned for social sign-in buttons.
* **`Input`:** Handles validation-bound focus ring color adjustments (`borderActive`), secure password visibility toggling, error boundaries, and prefix icons.
* **`Text`, `Card`, `Label`, `Divider`:** Atomic primitives enforcing standard margins, elevations, and semantic hierarchies.

### 3. Assembling Layout Structures with Pure Core Components
* Spacing, alignment, and grid systems are designed using `Flexbox` within React Native's `StyleSheet`.
* Absolute layout sizing was avoided to prevent cutoffs; we used clean percentage bounds, auto-alignments (`alignSelf: 'center'`), and responsive container maximum widths (`maxWidth: 400`) to guarantee compatibility across diverse iOS and Android screens.

### 4. Interactive States, Transitions & Form Validation
* Implemented form validation logic (verifying valid email syntax, minimum password boundaries) with real-time field error banners.
* Embedded smooth transitions between authentication screens (Sign In, Sign Up, and Forgot Password options) powered by Expo Router's file-based navigation structure.

---

## 📂 Project Architecture

```
.
├── demo-walkthrough.mp4                          # Attached Demo Video
├── app.json
├── package.json
└── src
    ├── app
    │   ├── (auth)
    │   │   ├── forgot-password.tsx  # Forgot password viewport route
    │   │   ├── login.tsx            # Sign In viewport route
    │   │   └── signup.tsx           # Sign Up viewport route
    │   ├── _layout.tsx              # Expo Navigation Stack layout configuration
    │   └── index.tsx                # App entrypoint router
    ├── components
    │   ├── auth
    │   │   ├── forgotpassword
    │   │   │   └── ForgotPasswordOptions.tsx  # Custom options selection layout
    │   │   ├── logo
    │   │   │   └── Logo.tsx                   # Elegant Telecare Vector/SVG logo
    │   │   ├── signin
    │   │   │   └── SignInForm.tsx             # Interactive Sign-in layout and actions
    │   │   └── signup
    │   │       └── SignUpForm.tsx             # Responsive Sign-up fields
    │   └── ui
    │       ├── Button.tsx           # Configurable Button element
    │       ├── Card.tsx             # Soft elevation card block
    │       ├── Divider.tsx          # OR-separator with clean text alignment
    │       ├── Input.tsx            # High-fidelity field inputs (active rings, hide/show text)
    │       ├── Label.tsx            # Inline form typography labels
    │       ├── Screen.tsx           # Responsive KeyboardAvoidingView + ScrollView container
    │       └── Text.tsx             # Scaled typography component
    └── theme
        ├── colors.ts                # Telehealth color palette config
        ├── index.ts                 # Aggregated design configurations
        ├── radius.ts                # Corner radius tokens
        ├── spacing.ts               # Spacing tokens (sm, md, lg, xl)
        └── typography.ts            # Font size and weight specifications
```

---

## 🔧 Installation & Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```
   
2. **Start the Development Server:**
   ```bash
   npx expo start
   ```

3. **Run on Simulators or Physical Devices:**
   * Press `i` to launch the iOS Simulator.
   * Press `a` to launch the Android Emulator.
   * Scan the terminal QR code using the **Expo Go** app on your physical iOS or Android device.

---

## 💎 Design and Quality Highlights

* **Perfect Typography Hierarchy:** Clean text styles scale naturally without breaking on smaller viewport screens.
* **Fully Accessible Input Fields:** Standard placeholder colors, focus borders, and custom field toggles are fully intuitive.
* **Responsive Card Wrapper:** Wraps input layers gracefully on phone viewports while staying centered and bounded on tablet layouts.
* **No UI Libraries:** Leveraged pure `StyleSheet.create`, native state hooks (`useState`), and native layout rendering to ensure rapid boot times and clean rendering.
