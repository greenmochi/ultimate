# kabedon-electron

# Setup
```bash
$ git clone https://github.com/greenmochi/kabedon-electron
$ cd kabedon-electron
$ yarn install
```

# Running development
```bash
$ yarn run start      # Runs React server and Electron application concurrently
```

# Building
React build files will be in a /build folder. Electron build files will be in a /build_electron.

Build everything (React and Electron application) and create production build, placed in /release:
```bash
$ yarn run build
```

Build separately:

This will build the React application and place the files in a /build folder.
```bash
$ yarn run react:build
```

This will build the Electron application by compiling the Typescript files into Javascript files, then
it will package the React build files and Electron build files together into a /release folder. 
```bash
$ yarn run electron:build
```

# Test
```bash
$ yarn test
```