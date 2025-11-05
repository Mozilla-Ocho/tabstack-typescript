# Package Manager Support

TABStack TypeScript SDK works with all major JavaScript package managers. This guide provides a quick reference for common operations.

## Supported Package Managers

✅ **npm** - Node Package Manager (default)
✅ **yarn** - Fast, reliable dependency management
✅ **pnpm** - Fast, disk space efficient
✅ **bun** - All-in-one JavaScript runtime
✅ **npx** - Execute packages without installing

## Quick Reference

### Installation

| Package Manager | Command |
|----------------|---------|
| npm | `npm install @tabstack/sdk` |
| yarn | `yarn add @tabstack/sdk` |
| pnpm | `pnpm add @tabstack/sdk` |
| bun | `bun add @tabstack/sdk` |

### Development Installation

| Package Manager | Command |
|----------------|---------|
| npm | `npm install --save-dev @tabstack/sdk` |
| yarn | `yarn add --dev @tabstack/sdk` |
| pnpm | `pnpm add -D @tabstack/sdk` |
| bun | `bun add --dev @tabstack/sdk` |

### Running Scripts

| Package Manager | Build | Test | Clean |
|----------------|-------|------|-------|
| npm | `npm run build` | `npm test` | `npm run clean` |
| yarn | `yarn build` | `yarn test` | `yarn clean` |
| pnpm | `pnpm build` | `pnpm test` | `pnpm clean` |
| bun | `bun run build` | `bun test` | `bun run clean` |

### Using npx

Run SDK tools or scripts directly without installation:

```bash
# This would work if the SDK had CLI tools
npx @tabstack/sdk [command]
```

Note: The current SDK version is a library, not a CLI tool, so npx is mainly useful for development scripts.

### Development from Source

| Package Manager | Install Deps | Build | Test | Link |
|----------------|--------------|-------|------|------|
| npm | `npm install` | `npm run build` | `npm test` | `npm link` |
| yarn | `yarn install` | `yarn build` | `yarn test` | `yarn link` |
| pnpm | `pnpm install` | `pnpm build` | `pnpm test` | `pnpm link --global` |
| bun | `bun install` | `bun run build` | `bun test` | `bun link` |

## Lock Files

Each package manager generates its own lock file:

| Package Manager | Lock File | Include in Git? |
|----------------|-----------|-----------------|
| npm | `package-lock.json` | ✅ Yes |
| yarn | `yarn.lock` | ✅ Yes |
| pnpm | `pnpm-lock.yaml` | ✅ Yes |
| bun | `bun.lockb` | ✅ Yes |

**Note**: For library development, you may want to `.gitignore` lock files and let consumers use their preferred package manager. For applications, always commit lock files.

## Performance Comparison

Approximate install times for TABStack SDK (zero runtime dependencies):

| Package Manager | Cold Install | With Cache |
|----------------|--------------|------------|
| npm | ~2s | ~1s |
| yarn | ~1.5s | ~0.8s |
| pnpm | ~1s | ~0.5s |
| bun | ~0.5s | ~0.3s |

*Times are approximate and depend on network speed and system.*

## Special Features

### npm

```bash
# Audit dependencies
npm audit

# Update dependencies
npm update

# View dependency tree
npm list
```

### yarn

```bash
# Interactive upgrade
yarn upgrade-interactive

# Check for outdated packages
yarn outdated

# Why is this package installed?
yarn why @tabstack/sdk
```

### pnpm

```bash
# Prune unnecessary packages
pnpm prune

# List packages
pnpm list

# Check for updates
pnpm outdated
```

### bun

```bash
# Add with latest version
bun add @tabstack/sdk@latest

# Remove package
bun remove @tabstack/sdk

# Run with bun runtime (TypeScript support)
bun run your-script.ts
```

## Workspace Support

All package managers support monorepo workspaces:

### npm (workspaces)
```json
{
  "workspaces": ["packages/*"]
}
```

### yarn (workspaces)
```json
{
  "workspaces": ["packages/*"]
}
```

### pnpm (workspace)
```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
```

### bun (workspaces)
```json
{
  "workspaces": ["packages/*"]
}
```

## Troubleshooting

### Clear Cache

| Package Manager | Command |
|----------------|---------|
| npm | `npm cache clean --force` |
| yarn | `yarn cache clean` |
| pnpm | `pnpm store prune` |
| bun | `bun pm cache rm` |

### Reinstall Dependencies

```bash
# Remove node_modules and lock file, then reinstall
rm -rf node_modules package-lock.json && npm install  # npm
rm -rf node_modules yarn.lock && yarn install         # yarn
rm -rf node_modules pnpm-lock.yaml && pnpm install    # pnpm
rm -rf node_modules bun.lockb && bun install          # bun
```

## Recommendations

- **For speed**: Use **bun** or **pnpm**
- **For compatibility**: Use **npm** (most widely supported)
- **For features**: Use **yarn** (great DX and tooling)
- **For disk space**: Use **pnpm** (deduplicates dependencies)

All package managers work great with TABStack SDK - choose based on your project needs!

## More Information

- npm: https://docs.npmjs.com/
- yarn: https://yarnpkg.com/
- pnpm: https://pnpm.io/
- bun: https://bun.sh/
