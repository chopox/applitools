module.exports = {
  testConcurrency: 5,
  apiKey: process.env.APPLITOOLS_API_KEY,
  appName: 'SauceDemo',
  batchName: 'Playwright Visual Tests',
  batchId: process.env.APPLITOOLS_BATCH_ID || `local-batch-${Date.now()}`,

  browser: [
    { width: 1920, height: 1080, name: 'chrome' },
    { width: 1920, height: 1080, name: 'firefox' },
    { width: 1920, height: 1080, name: 'safari' },
    { width: 768, height: 1024, name: 'chrome' },
    {
      deviceName: 'iPhone X',
      screenOrientation: 'portrait'
    }
  ],
  showLogs: false,
};