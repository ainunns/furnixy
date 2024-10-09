export default {
  // Type check TypeScript files
  "**/*.(ts|tsx)": () => "pnpm typecheck",

  // Check TS and JS files
  "**/*.(ts|tsx)": () => "pnpm check",

  // Lint & Prettify TS and JS files
  "**/*.(ts|tsx|js)": () => [`pnpm lint:write`, `pnpm format:write`],
};
