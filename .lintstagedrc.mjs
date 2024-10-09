export default {
  // Lint & Prettify TS and JS files
  "**/*.(ts|tsx|js)": () => [`pnpm lint:write `, `pnpm format:write`],
  // Type check TypeScript files
  "**/*.(ts|tsx)": () => "pnpm check",
};
