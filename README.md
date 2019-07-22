# ultimate

**note:** The current ui design is purely for functional and testing purposes. An actual ui design will come later when all
service binaries are complete and an official release nears.

## preview 0.1.0
![alpha.0.1.0](https://raw.githubusercontent.com/greenmochi/ultimate/master/screenshots/alpha.0.1.0.png)

# gulp

Quickstart:

```bash
$ gulp install
$ gulp start
```

Production build:
```bash
$ gulp build
```

Cleanup:

```bash
$ gulp clean
$ gulp install
```

## gulp install

Install node modules for the ui and electron.

```bash
$ gulp install
```

## gulp start

Runs development server for the ui. Bundles electron files and run electron. Also runs all the service binaries from their build directory.

```bash
$ gulp start
```

## gulp build

Builds bundle for the ui and electron in production mode.

```bash
$ gulp build
```

## gulp clean

Removes build files for ui and electron.

```bash
$ gulp clean
```

## gulp uninstall

Removes node modules for the ui and electron.

```bash
$ gulp unistall
```

# notes
If you're crazy enough to get this build to work on your own, then you're a god.