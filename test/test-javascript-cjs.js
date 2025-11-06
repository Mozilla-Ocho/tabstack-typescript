/**
 * Test pure JavaScript with CommonJS
 *
 * This demonstrates that the SDK works in pure JavaScript projects
 * using CommonJS (require/module.exports)
 */

const { TABStack } = require('../dist/cjs/index');

console.log('\n=== Testing Pure JavaScript (CommonJS) ===\n');

// Example 1: Client usage (without actually making API calls)
console.log('\nExample 3: Initialize TABStack client');
const tabs = new TABStack({
  apiKey: process.env.TABSTACK_API_KEY || 'demo-key',
});

console.log('Client initialized:', tabs.toString());
console.log('Available operators:', {
  extract: typeof tabs.extract,
  generate: typeof tabs.generate,
  automate: typeof tabs.automate,
});
