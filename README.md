# backend-maps-challenge

A node module coding challenge for retrieving google maps results based on string input

## Challenge master guide

1. Modify `.env` to include your Google Maps API Key.

2. `npm ci` clean install build and runtime dependencies.

3. `npm run build:debug` to build the debugging wrapper for the main node module.

4. `npm run start:debug` to run the debug wrapper app once.

> You can configure what the search criteria is in [debug.ts](./debug.ts).

## Development

`npm install` all dependencies

### Dev

This command will watch for changes on the source code and automatically recompile.

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Test

This will run the Jest unit and integration tests

```bash
npm run test
```

This will watch for changes in any test files and automatically re-test

```bash
npm run test:watch
```

### Committing

Before committing, the application will automatically run lint and test checks against your changes.
