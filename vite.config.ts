import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // exclude build and other generated folders so vitest doesn't try to run
    // compiled artifacts that may not contain test suites.
    exclude: ['build/**', 'node_modules/**', 'coverage/**'],
  },
})
