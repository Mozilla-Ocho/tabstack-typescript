/**
 * Test pure JavaScript with CommonJS
 *
 * This demonstrates that the SDK works in pure JavaScript projects
 * using CommonJS (require/module.exports)
 */

const { TABStack, Schema, StringType, NumberType, ArrayType, ObjectType } = require('../dist/cjs/index');

console.log('\n=== Testing Pure JavaScript (CommonJS) ===\n');

// Example 1: Basic usage
console.log('Example 1: Create a simple schema');
const userSchema = new Schema({
  username: StringType('User login name'),
  email: StringType('Email address'),
  age: NumberType('User age'),
});

console.log(JSON.stringify(userSchema.toJSONSchema(), null, 2));

// Example 2: Nested schema
console.log('\nExample 2: Create a nested schema');
const blogSchema = new Schema({
  title: StringType(),
  author: ObjectType({
    name: StringType(),
    email: StringType(),
  }),
  tags: ArrayType(StringType()),
  comments: ArrayType(ObjectType({
    author: StringType(),
    text: StringType(),
  })),
});

console.log('Blog schema created successfully');

// Example 3: Client usage (without actually making API calls)
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

// Example 4: Schema deserialization
console.log('\nExample 4: Deserialize JSON Schema');
const jsonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    count: { type: 'number' },
  },
};

const schema = Schema.fromJSONSchema(jsonSchema);
console.log('Deserialized schema:', schema.toJSONSchema());

console.log('\n=== All JavaScript (CommonJS) examples completed! ✓ ===\n');
