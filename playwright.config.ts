import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  timeout: 60000,
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['html', { open: 'always' }]],
  use: {
    headless: false,
    screenshot: 'on',
    video: 'on',
    ...devices['Desktop Chrome']
  },
  projects: [
    {
      name: 'ui-tests',
      testMatch: ['ui.spec.ts'],
      use: {
        baseURL: 'https://drpt-external-dev.myshopify.com'
      },
    },
    {
      name: 'api-tests',
      testMatch: ['api.spec.ts'],
      use: {
        baseURL: 'https://petstore.swagger.io',
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'api_key': `gal_testing`
        }
      }
    }
  ]
});
