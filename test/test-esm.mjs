/**
 * Test ESM module import
 *
 * This file tests that the SDK works with ESM imports
 */

import { Tabstack } from '../dist/esm/index.js';

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log('\n=== Testing ESM Module Import ===\n');

// Test 1: Basic imports work
console.log('Testing ESM imports...');
assert(typeof Tabstack === 'function', 'Tabstack should be a function');
console.log('✓ ESM imports work correctly');

// Test 2: Client creation
console.log('Testing client creation with ESM...');
const client = new Tabstack({ apiKey: 'test-key-esm' });
assert(client.extract !== undefined, 'Client should have extract operator');
assert(client.generate !== undefined, 'Client should have generate operator');
assert(client.automate !== undefined, 'Client should have automate operator');
console.log('✓ Client creation works with ESM');

console.log('\n=== All ESM tests passed! ✓ ===\n');
