# Assets

This folder contains the app icons and splash screen for your Expo app.

## Required Files

Please add the following files to this directory:

- `icon.png` - App icon (1024x1024px)
- `splash.png` - Splash screen image (1242x2436px or similar)
- `adaptive-icon.png` - Android adaptive icon foreground (1024x1024px)
- `favicon.png` - Web favicon (32x32px or 16x16px)

These files are referenced in the app.json configuration and are required for proper Expo functionality.

You can generate these assets using the Expo CLI:
```bash
npx expo install expo-splash-screen
npx expo install expo-app-icon
```

Or use online tools like:
- https://appicon.co/
- https://icon.kitchen/
