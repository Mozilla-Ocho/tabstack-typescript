/**
 * Test suite for TABStack AI TypeScript SDK
 *
 * This file tests the basic functionality of the SDK to ensure it works correctly.
 */

const {
  TABStack,
  Schema,
  StringType,
  NumberType,
  BooleanType,
  ObjectType,
  ArrayType,
} = require('../dist/cjs/index');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function testSchemaCreation() {
  console.log('Testing schema creation...');

  // Test basic schema types
  const stringType = StringType('A string field');
  const numberType = NumberType('A number field');
  const booleanType = BooleanType('A boolean field');

  assert(stringType.toJSONSchema().type === 'string', 'StringType should have type "string"');
  assert(numberType.toJSONSchema().type === 'number', 'NumberType should have type "number"');
  assert(booleanType.toJSONSchema().type === 'boolean', 'BooleanType should have type "boolean"');

  console.log('✓ Basic types work correctly');
}

function testComplexSchema() {
  console.log('Testing complex schema...');

  // Test object type
  const objectType = ObjectType({
    street: StringType(),
    city: StringType(),
    zipCode: NumberType(),
  });

  const objectSchema = objectType.toJSONSchema();
  assert(objectSchema.type === 'object', 'ObjectType should have type "object"');
  assert(objectSchema.properties.street.type === 'string', 'Object property should be correct');

  // Test array type
  const arrayType = ArrayType(StringType());
  const arraySchema = arrayType.toJSONSchema();
  assert(arraySchema.type === 'array', 'ArrayType should have type "array"');
  assert(arraySchema.items.type === 'string', 'Array items type should be correct');

  console.log('✓ Complex types work correctly');
}

function testSchemaClass() {
  console.log('Testing Schema class...');

  const schema = new Schema({
    name: StringType(),
    age: NumberType(),
    isActive: BooleanType(),
    tags: ArrayType(StringType()),
    address: ObjectType({
      street: StringType(),
      city: StringType(),
    }),
  });

  const jsonSchema = schema.toJSONSchema();
  assert(jsonSchema.type === 'object', 'Schema should be object type');
  assert(jsonSchema.properties.name.type === 'string', 'Name property should be string');
  assert(jsonSchema.properties.age.type === 'number', 'Age property should be number');
  assert(jsonSchema.properties.isActive.type === 'boolean', 'IsActive property should be boolean');
  assert(jsonSchema.properties.tags.type === 'array', 'Tags property should be array');
  assert(jsonSchema.properties.address.type === 'object', 'Address property should be object');

  console.log('✓ Schema class works correctly');
}

function testSchemaDeserialization() {
  console.log('Testing Schema.fromJSONSchema...');

  const jsonSchema = {
    type: 'object',
    properties: {
      title: { type: 'string' },
      count: { type: 'number' },
      active: { type: 'boolean' },
      items: {
        type: 'array',
        items: { type: 'string' },
      },
      metadata: {
        type: 'object',
        properties: {
          author: { type: 'string' },
        },
      },
    },
  };

  const schema = Schema.fromJSONSchema(jsonSchema);
  const reconstructed = schema.toJSONSchema();

  assert(reconstructed.type === 'object', 'Reconstructed schema should be object');
  assert(reconstructed.properties.title.type === 'string', 'Title should be string');
  assert(reconstructed.properties.count.type === 'number', 'Count should be number');
  assert(reconstructed.properties.active.type === 'boolean', 'Active should be boolean');
  assert(reconstructed.properties.items.type === 'array', 'Items should be array');
  assert(reconstructed.properties.metadata.type === 'object', 'Metadata should be object');

  console.log('✓ Schema deserialization works correctly');
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

  // Verify our types work
  const obj = ObjectType({ name: StringType() });
  const arr = ArrayType(StringType());

  assert(obj.toJSONSchema !== undefined, 'ObjectType should have toJSONSchema');
  assert(arr.toJSONSchema !== undefined, 'ArrayType should have toJSONSchema');

  console.log('✓ No conflicts with JavaScript built-ins');
}

// Run all tests
async function runTests() {
  console.log('\n=== Running TABStack TypeScript SDK Tests ===\n');

  try {
    testSchemaCreation();
    testComplexSchema();
    testSchemaClass();
    testSchemaDeserialization();
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
