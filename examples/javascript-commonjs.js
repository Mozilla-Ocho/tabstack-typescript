/**
 * JavaScript Example using CommonJS (require/module.exports)
 *
 * This example shows how to use the TABStack SDK in a pure JavaScript
 * project using CommonJS module system (Node.js default).
 */

const { TABStack, Schema, StringType, NumberType, ArrayType, ObjectType } = require('@tabstack/sdk');

async function main() {
  // Initialize the client
  const tabs = new TABStack({
    apiKey: process.env.TABSTACK_API_KEY || 'your-api-key-here',
  });

  console.log('TABStack SDK - JavaScript (CommonJS) Example\n');

  // Example 1: Extract markdown from a webpage
  console.log('Example 1: Extract markdown');
  try {
    const result = await tabs.extract.markdown({
      url: 'https://example.com',
      metadata: true,
    });
    console.log('Title:', result.metadata?.title);
    console.log('Content preview:', result.content.substring(0, 100) + '...');
  } catch (error) {
    console.log('(Skipped - requires API key)');
  }

  // Example 2: Define a schema for data extraction
  console.log('\nExample 2: Define a product schema');
  const productSchema = new Schema({
    name: StringType('Product name'),
    price: NumberType('Price in USD'),
    description: StringType('Product description'),
    images: ArrayType(StringType('Image URL')),
    specifications: ObjectType({
      weight: StringType('Weight'),
      dimensions: StringType('Dimensions'),
    }),
  });

  console.log('Schema defined:');
  console.log(JSON.stringify(productSchema.toJSONSchema(), null, 2));

  // Example 3: Extract structured data
  console.log('\nExample 3: Extract structured data');
  const newsSchema = new Schema({
    articles: ArrayType(ObjectType({
      title: StringType(),
      author: StringType(),
      summary: StringType(),
    })),
  });

  try {
    const data = await tabs.extract.json({
      url: 'https://news.ycombinator.com',
      schema: newsSchema,
    });
    console.log('Extracted', data.data.articles?.length || 0, 'articles');
  } catch (error) {
    console.log('(Skipped - requires API key)');
  }

  // Example 4: Generate transformed content
  console.log('\nExample 4: Generate transformed content');
  const summarySchema = new Schema({
    summary: StringType('Brief summary'),
    keyPoints: ArrayType(StringType('Key point')),
  });

  try {
    const result = await tabs.generate.json({
      url: 'https://example.com/article',
      schema: summarySchema,
      instructions: 'Summarize the article and extract key points',
    });
    console.log('Generated summary:', result.data.summary);
  } catch (error) {
    console.log('(Skipped - requires API key)');
  }

  console.log('\nAll examples completed!');
}

// Run examples
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
