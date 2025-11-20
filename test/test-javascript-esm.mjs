/**
 * Test pure JavaScript with ESM
 *
 * This demonstrates that the SDK works in pure JavaScript projects
 * using ESM (import/export)
 */

import { Tabstack } from '../dist/esm/index.js';

console.log('\n=== Testing Pure JavaScript (ESM) ===\n');

// Example 1: Client usage
console.log('\nExample 3: Initialize Tabstack client');
const tabs = new Tabstack({
  apiKey: process.env.TABSTACK_API_KEY || 'demo-key',
});

console.log('Client initialized:', tabs.toString());
console.log('Available operators:', {
  extract: typeof tabs.extract,
  generate: typeof tabs.generate,
  automate: typeof tabs.automate,
});

// Example 2: Demonstrate async/await compatibility
console.log('\nExample 4: Async/await compatibility');
async function demonstrateAsync() {
  try {
    // This would normally make an API call
    console.log('SDK is ready for async operations');
    console.log('Example: await tabs.extract.markdown("https://example.com")');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

await demonstrateAsync();

console.log('\n=== All JavaScript (ESM) examples completed! ✓ ===\n');
