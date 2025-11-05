/**
 * JavaScript Example using ESM (import/export)
 *
 * This example shows how to use the TABStack SDK in a pure JavaScript
 * project using ES modules.
 */

import { TABStack, Schema, StringType, NumberType, ArrayType, ObjectType } from '@tabstack/sdk';

async function main() {
  // Initialize the client
  const tabs = new TABStack({
    apiKey: process.env.TABSTACK_API_KEY || 'your-api-key-here',
  });

  console.log('TABStack SDK - JavaScript (ESM) Example\n');

  // Example 1: Extract markdown
  console.log('Example 1: Extract markdown');
  try {
    const result = await tabs.extract.markdown({
      url: 'https://example.com',
      metadata: true,
    });
    console.log('Title:', result.metadata?.title);
    console.log('URL:', result.url);
  } catch (error) {
    console.log('(Skipped - requires API key)');
  }

  // Example 2: Create a user registration schema
  console.log('\nExample 2: User registration schema');
  const userSchema = new Schema({
    username: StringType('Unique username'),
    email: StringType('Email address'),
    age: NumberType('User age'),
    interests: ArrayType(StringType('Interest/hobby')),
    profile: ObjectType({
      bio: StringType('Biography'),
      website: StringType('Personal website'),
    }),
  });

  console.log('Schema created with fields:', Object.keys(userSchema.toJSONSchema().properties));

  // Example 3: Browser automation
  console.log('\nExample 3: Browser automation');
  try {
    for await (const event of tabs.automate.execute({
      task: 'Find the top trending repository on GitHub',
      url: 'https://github.com/trending',
      guardrails: 'browse and extract only',
      maxIterations: 5,
    })) {
      if (event.type === 'task:completed') {
        console.log('Task completed:', event.data.get('finalAnswer'));
      }
    }
  } catch (error) {
    console.log('(Skipped - requires API key)');
  }

  // Example 4: Schema deserialization
  console.log('\nExample 4: Working with JSON schemas');
  const jsonSchema = {
    type: 'object',
    properties: {
      title: { type: 'string' },
      views: { type: 'number' },
      tags: { type: 'array', items: { type: 'string' } },
    },
  };

  const schema = Schema.fromJSONSchema(jsonSchema);
  console.log('Loaded schema from JSON:', schema.toJSONSchema());

  console.log('\nAll examples completed!');
}

// Run examples
main().catch(console.error);

export { main };
