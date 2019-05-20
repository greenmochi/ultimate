# kabedon-electron

# Setup
```bash
git clone https://github.com/greenmochi/kabedon-electron
cd kabedon-electron
yarn install
```

# Running development
```bash
yarn run start      # Runs React server and Electron application concurrently
```

# Building
React build files will be in /build. Electron build files will be in /out.

Build everything:
```bash
yarn run build
```

Build separately:
```bash
yarn run react-build
yarn run electron-build
```
