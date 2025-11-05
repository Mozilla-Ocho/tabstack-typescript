/**
 * Test pure JavaScript with ESM
 *
 * This demonstrates that the SDK works in pure JavaScript projects
 * using ESM (import/export)
 */

import { TABStack, Schema, StringType, NumberType, ArrayType, ObjectType } from '../dist/esm/index.js';

console.log('\n=== Testing Pure JavaScript (ESM) ===\n');

// Example 1: Basic usage
console.log('Example 1: Create a simple schema');
const productSchema = new Schema({
  name: StringType('Product name'),
  price: NumberType('Price in USD'),
  inStock: NumberType('Quantity in stock'),
});

console.log(JSON.stringify(productSchema.toJSONSchema(), null, 2));

// Example 2: Complex nested structure
console.log('\nExample 2: Create a complex schema');
const orderSchema = new Schema({
  orderId: StringType(),
  customer: ObjectType({
    name: StringType(),
    email: StringType(),
    address: ObjectType({
      street: StringType(),
      city: StringType(),
      country: StringType(),
    }),
  }),
  items: ArrayType(ObjectType({
    productName: StringType(),
    quantity: NumberType(),
    price: NumberType(),
  })),
});

console.log('Order schema created successfully');

// Example 3: Client usage
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

// Example 4: Demonstrate async/await compatibility
console.log('\nExample 4: Async/await compatibility');
async function demonstrateAsync() {
  try {
    // This would normally make an API call
    console.log('SDK is ready for async operations');
    console.log('Example: await tabs.extract.markdown({ url: "..." })');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

await demonstrateAsync();

console.log('\n=== All JavaScript (ESM) examples completed! ✓ ===\n');
