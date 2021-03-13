# backend-maps-challenge

## Requirements

- [Node Version Manager](https://github.com/nvm-sh/nvm)
  1. Install nvm according to the link above.
  2. `cd` to project directory
  3. Install the matching node version for this application with `nvm install`
  4. Activate that version for use in this terminal session with `nvm use`.

## Development

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
