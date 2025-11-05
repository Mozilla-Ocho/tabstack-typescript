/**
 * Basic usage example for TABStack AI TypeScript SDK
 *
 * This example demonstrates the basic operations: extract, generate, and automate.
 */

import {
  TABStack,
  Schema,
  StringType,
  NumberType,
  ArrayType,
  ObjectType,
} from '@tabstack/sdk';

async function main() {
  // Initialize the client
  const tabs = new TABStack({
    apiKey: process.env.TABSTACK_API_KEY!,
  });

  console.log('TABStack AI SDK - Basic Usage Examples\n');

  // Example 1: Extract markdown
  console.log('1. Extracting markdown from URL...');
  const markdownResult = await tabs.extract.markdown({
    url: 'https://example.com',
    metadata: true,
  });
  console.log('Title:', markdownResult.metadata?.title);
  console.log('Content length:', markdownResult.content.length, 'characters\n');

  // Example 2: Extract structured data
  console.log('2. Extracting structured data...');
  const hackerNewsSchema = new Schema({
    stories: ArrayType(
      ObjectType({
        title: StringType(),
        points: NumberType(),
        author: StringType(),
        url: StringType(),
      })
    ),
  });

  const extractResult = await tabs.extract.json({
    url: 'https://news.ycombinator.com',
    schema: hackerNewsSchema,
  });
  console.log('Extracted stories:', extractResult.data.stories?.length);
  console.log('First story:', extractResult.data.stories?.[0]?.title, '\n');

  // Example 3: Generate transformed content
  console.log('3. Generating transformed content...');
  const summarySchema = new Schema({
    summaries: ArrayType(
      ObjectType({
        title: StringType(),
        category: StringType(),
        oneLineSummary: StringType(),
      })
    ),
  });

  const generateResult = await tabs.generate.json({
    url: 'https://news.ycombinator.com',
    schema: summarySchema,
    instructions: 'Categorize each top story and write a one-sentence summary',
  });
  console.log('Generated summaries:', generateResult.data.summaries?.length);
  if (generateResult.data.summaries?.[0]) {
    console.log('Example:', generateResult.data.summaries[0]);
  }
  console.log();

  // Example 4: Automate browser tasks
  console.log('4. Running browser automation...');
  for await (const event of tabs.automate.execute({
    task: 'Find the top trending repository and extract its name and stars',
    url: 'https://github.com/trending',
    guardrails: 'browse and extract only',
    maxIterations: 10,
  })) {
    console.log(`[${event.type}]`);

    if (event.type === 'agent:thinking') {
      console.log('  Thought:', event.data.get('thought'));
    } else if (event.type === 'agent:action') {
      console.log('  Action:', event.data.get('action'));
    } else if (event.type === 'task:completed') {
      console.log('  Result:', event.data.get('finalAnswer'));
    }
  }

  console.log('\nAll examples completed successfully!');
}

main().catch(console.error);
