# Expo Troubleshooting Guide

## Common Issues and Solutions

### 1. TypeScript Syntax Error: "unexpected token after assignment expression"

**Problem**: Metro bundler encounters TypeScript syntax in JavaScript context
```
ERROR SyntaxError: unexpected token after assignment expression (313:2)
} as ReactNativePublicAPI;
```

**Solution**:
```bash
# Update Babel preset to handle newer React Native versions
npm install @react-native/babel-preset --save-dev
```

Update `babel.config.js`:
```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'], // Changed from metro-react-native-babel-preset
  plugins: [
    'react-native-reanimated/plugin',
  ],
};
```

### 2. Port Already in Use

**Problem**: 
```
Port 8081 is being used by another process
```

**Solutions**:
```bash
# Option 1: Use a different port
npx expo start --port 8082

# Option 2: Kill the process using the port (Windows)
netstat -ano | findstr :8081
taskkill /PID [PID_NUMBER] /F

# Option 3: Accept Expo's suggestion to use another port
# Just press Y when prompted
```

### 3. Metro Configuration Conflicts

**Problem**: 
```
Cannot find module 'metro/src/ModuleGraph/worker/importLocationsPlugin'
```

**Solution**:
```bash
# Install compatible Metro version
npm install metro@^0.81.0 --legacy-peer-deps
```

### 4. Legacy Peer Dependencies Issues

**Solutions**:
```bash
# Method 1: Global npm config
npm config set legacy-peer-deps true
npx expo install package-name

# Method 2: Create .npmrc file in project root
echo "legacy-peer-deps=true" > .npmrc

# Method 3: Use npm directly
npm install package-name --legacy-peer-deps
npx expo install --fix
```

### 5. Cache Issues

**Problem**: Stale cache causing build errors

**Solutions**:
```bash
# Clear Expo cache
npx expo start --clear

# Clear npm cache
npm cache clean --force

# Reset everything
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### 6. Asset Loading Errors

**Problem**: Cannot load app icons or splash screen

**Solution**:
- Ensure all assets referenced in `app.json` exist in the `assets/` folder
- Check file names match exactly (case-sensitive)
- Use proper image formats (PNG recommended)
- Verify image dimensions meet requirements

### 7. Platform-Specific Issues

**Android**:
```bash
# If Android build fails
npx expo run:android --clear

# Check Java/Android SDK setup
npx expo doctor
```

**iOS**:
```bash
# If iOS build fails  
npx expo run:ios --clear

# Make sure Xcode is installed and up to date
```

### 8. Version Compatibility Issues

**Check compatibility**:
```bash
# See what versions Expo recommends
npx expo install --fix

# Check current versions
npm list react react-native expo
```

### 9. Network Issues

**Problem**: Cannot connect to development server

**Solutions**:
```bash
# Use localhost
npx expo start --localhost

# Use tunnel (bypasses network restrictions)
npx expo start --tunnel

# Use LAN
npx expo start --lan
```

### 10. General Reset Procedure

When all else fails:
```bash
# 1. Kill all Node processes
# Windows: Ctrl+C in terminal, then check Task Manager
# Mac/Linux: killall node

# 2. Clear everything
rm -rf node_modules package-lock.json
npm cache clean --force

# 3. Set legacy peer deps
npm config set legacy-peer-deps true

# 4. Reinstall
npm install

# 5. Start fresh
npx expo start --clear --localhost
```

## Need More Help?

- Check Expo documentation: https://docs.expo.dev/
- Expo Discord community: https://discord.gg/expo
- Stack Overflow with 'expo' tag
- GitHub issues in Expo CLI repo
