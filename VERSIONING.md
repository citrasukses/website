# Versioning and releases

This repository uses [Semantic Versioning](https://semver.org/):

- **Patch** (`0.1.0` to `0.1.1`) for fixes and content changes that do not change public behavior.
- **Minor** (`0.1.0` to `0.2.0`) for backward-compatible features.
- **Major** (`0.1.0` to `1.0.0`) for incompatible behavior or major product milestones.

## Day-to-day Git workflow

1. Start work from an up-to-date `main` branch.
2. Create a focused branch named `feature/<topic>`, `fix/<topic>`, or `chore/<topic>`.
3. Make small commits with imperative messages. Conventional prefixes such as `feat:`, `fix:`, `docs:`, and `chore:` are encouraged.
4. Open a pull request. The SEO verification workflow must pass before merging.
5. Prefer squash merging so `main` keeps one clear commit per change.

Do not commit secrets, `.env` files, dependencies, build output, local reports, or temporary files. The repository's `.gitignore` covers these paths.

## Create a release

Releases must be made from a clean `main` branch after the intended changes and `CHANGELOG.md` entry have been merged.

```bash
git switch main
git pull --ff-only
npm run version:check
```

Choose exactly one version increment:

```bash
npm run release:patch
npm run release:minor
npm run release:major
```

The release command runs lint and type checking, updates both package version fields, creates a release commit, and creates an annotated `vX.Y.Z` Git tag. Review the result, then publish it explicitly:

```bash
git show --stat
git push origin main --follow-tags
```

The release commands deliberately do not push. This keeps publishing as an explicit, reviewable action.

## Recover from an unpushed version command

If a version command succeeded but must be undone, do not rewrite shared history. Before anything is pushed, delete the new local tag and revert the release commit using normal Git commands. If it has already been pushed, create a new corrective version instead.
