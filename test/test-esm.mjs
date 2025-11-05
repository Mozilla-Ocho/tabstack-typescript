/**
 * Test ESM module import
 *
 * This file tests that the SDK works with ESM imports
 */

import {
  TABStack,
  Schema,
  StringType,
  NumberType,
  BooleanType,
  ObjectType,
  ArrayType,
} from '../dist/esm/index.js';

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log('\n=== Testing ESM Module Import ===\n');

// Test 1: Basic imports work
console.log('Testing ESM imports...');
assert(typeof TABStack === 'function', 'TABStack should be a function');
assert(typeof Schema === 'function', 'Schema should be a function');
assert(typeof StringType === 'function', 'StringType should be a function');
console.log('✓ ESM imports work correctly');

// Test 2: Create schema with factory functions
console.log('Testing schema creation with ESM...');
const schema = new Schema({
  name: StringType(),
  age: NumberType(),
  active: BooleanType(),
  tags: ArrayType(StringType()),
  profile: ObjectType({
    bio: StringType(),
    score: NumberType(),
  }),
});

const jsonSchema = schema.toJSONSchema();
assert(jsonSchema.type === 'object', 'Schema should be object type');
assert(jsonSchema.properties.name.type === 'string', 'Name should be string');
assert(jsonSchema.properties.age.type === 'number', 'Age should be number');
console.log('✓ Schema creation works with ESM');

// Test 3: Client creation
console.log('Testing client creation with ESM...');
const client = new TABStack({ apiKey: 'test-key-esm' });
assert(client.extract !== undefined, 'Client should have extract operator');
assert(client.generate !== undefined, 'Client should have generate operator');
assert(client.automate !== undefined, 'Client should have automate operator');
console.log('✓ Client creation works with ESM');

console.log('\n=== All ESM tests passed! ✓ ===\n');
