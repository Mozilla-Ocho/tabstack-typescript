/**
 * Test suite for TABStack AI TypeScript SDK
 *
 * This file tests the basic functionality of the SDK to ensure it works correctly.
 */

const { TABStack } = require('../dist/cjs/index');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function testClientCreation() {
  console.log('Testing TABStack client creation...');

  try {
    new TABStack({ apiKey: '' });
    throw new Error('Should have thrown error for empty API key');
  } catch (error) {
    assert(error.message === 'apiKey is required', 'Should reject empty API key');
  }

  const client = new TABStack({ apiKey: 'test-key' });
  assert(client.extract !== undefined, 'Client should have extract operator');
  assert(client.generate !== undefined, 'Client should have generate operator');
  assert(client.automate !== undefined, 'Client should have automate operator');

  console.log('✓ Client creation works correctly');
}

function testNoBuiltInConflicts() {
  console.log('Testing for built-in conflicts...');

  // Verify that JavaScript built-ins are not shadowed
  assert(typeof Object.keys === 'function', 'Object.keys should work');
  assert(typeof Object.entries === 'function', 'Object.entries should work');
  assert(typeof Object.values === 'function', 'Object.values should work');
  assert(typeof Array.isArray === 'function', 'Array.isArray should work');

  console.log('✓ No conflicts with JavaScript built-ins');
}

// Run all tests
async function runTests() {
  console.log('\n=== Running TABStack TypeScript SDK Tests ===\n');

  try {
    testClientCreation();
    testNoBuiltInConflicts();

    console.log('\n=== All tests passed! ✓ ===\n');
    process.exit(0);
  } catch (error) {
    console.error('\n=== Test failed! ✗ ===');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

runTests();
