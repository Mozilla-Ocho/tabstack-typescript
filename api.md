# Shared

Types:

- <code><a href="./src/resources/shared.ts">GeotargetGeoTarget</a></code>

# Agent

Types:

- <code><a href="./src/resources/agent.ts">AutomateEvent</a></code>
- <code><a href="./src/resources/agent.ts">ResearchEvent</a></code>
- <code><a href="./src/resources/agent.ts">V1GlobalBuffer</a></code>
- <code><a href="./src/resources/agent.ts">V1ResearchQuestionAssessment</a></code>
- <code><a href="./src/resources/agent.ts">AgentAutomateInputResponse</a></code>

Methods:

- <code title="post /automate">client.agent.<a href="./src/resources/agent.ts">automate</a>({ ...params }) -> AutomateEvent</code>
- <code title="post /automate/{requestID}/input">client.agent.<a href="./src/resources/agent.ts">automateInput</a>(requestID, { ...params }) -> AgentAutomateInputResponse</code>
- <code title="post /research">client.agent.<a href="./src/resources/agent.ts">research</a>({ ...params }) -> ResearchEvent</code>

# Extract

Types:

- <code><a href="./src/resources/extract.ts">ExtractJsonResponse</a></code>
- <code><a href="./src/resources/extract.ts">ExtractMarkdownResponse</a></code>

Methods:

- <code title="post /extract/json">client.extract.<a href="./src/resources/extract.ts">json</a>({ ...params }) -> ExtractJsonResponse</code>
- <code title="post /extract/markdown">client.extract.<a href="./src/resources/extract.ts">markdown</a>({ ...params }) -> ExtractMarkdownResponse</code>

# Generate

Types:

- <code><a href="./src/resources/generate.ts">GenerateJsonResponse</a></code>

Methods:

- <code title="post /generate/json">client.generate.<a href="./src/resources/generate.ts">json</a>({ ...params }) -> GenerateJsonResponse</code>
