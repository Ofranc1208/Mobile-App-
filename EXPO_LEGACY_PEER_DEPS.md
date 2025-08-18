# Using Legacy Peer Deps with Expo

When working with Expo and encountering peer dependency conflicts, you have several options:

## Method 1: Global npm Configuration (Recommended)
```bash
# Set npm to use legacy peer deps globally
npm config set legacy-peer-deps true

# Now expo install will use legacy peer deps
npx expo install package-name

# To revert back later:
npm config set legacy-peer-deps false
```

## Method 2: Project-specific .npmrc File
Create a `.npmrc` file in your project root:
```
legacy-peer-deps=true
```

## Method 3: Use npm instead of expo install
```bash
# Install packages with npm using legacy peer deps
npm install package-name --legacy-peer-deps

# Then use expo install to sync versions
npx expo install --fix
```

## Method 4: Environment Variable
```bash
# Set environment variable for the session
set NPM_CONFIG_LEGACY_PEER_DEPS=true

# Then use expo install
npx expo install package-name
```

## Method 5: Create an npm script
Add to your `package.json`:
```json
{
  "scripts": {
    "expo-install": "npm install --legacy-peer-deps"
  }
}
```

## Current Project Setup

I've already configured your project to use legacy peer deps globally and installed the correct Metro version. Your Expo development server should now work properly.

## Troubleshooting

If you still encounter issues:

1. **Clear cache:**
   ```bash
   npx expo start --clear
   ```

2. **Reset npm config:**
   ```bash
   npm config delete legacy-peer-deps
   npm config set legacy-peer-deps true
   ```

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

4. **Check Metro version compatibility:**
   ```bash
   npm list metro
   ```

The key is that `npx expo install` inherits npm's configuration, so setting the global npm config is the most reliable approach.
