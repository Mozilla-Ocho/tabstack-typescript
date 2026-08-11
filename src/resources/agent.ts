// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AgentAPI from './agent';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { Stream } from '../core/streaming';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Agent extends APIResource {
  /**
   * Execute AI-powered browser automation tasks using natural language with optional
   * geotargeting. This endpoint **always streams** responses using Server-Sent
   * Events (SSE).
   *
   * **Streaming Response:**
   *
   * - All responses are streamed using Server-Sent Events (`text/event-stream`)
   * - Real-time progress updates and results as they're generated
   *
   * **Geotargeting:**
   *
   * - Optionally specify a country code for geotargeted browsing
   *
   * **Use Cases:**
   *
   * - Web scraping and data extraction
   * - Form filling and interaction
   * - Navigation and information gathering
   * - Multi-step web workflows
   * - Content analysis from web pages
   *
   * @example
   * ```ts
   * const automateEvent = await client.agent.automate({
   *   task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts',
   *   guardrails:
   *     "browse and extract only, don't interact with repositories",
   *   url: 'https://github.com/trending',
   * });
   * ```
   */
  automate(body: AgentAutomateParams, options?: RequestOptions): APIPromise<Stream<AutomateEvent>> {
    return this._client.post('/automate', {
      body,
      timeout: (this._client as any)._options.timeout ?? 600000,
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
      __synthesizeEventData: true,
    }) as APIPromise<Stream<AutomateEvent>>;
  }

  /**
   * Submit a response to an interactive form data request from an in-progress
   * automation task. When the AI agent encounters a form requiring user data, it
   * emits an `interactive:form_data:request` or `interactive:form_data:error` SSE
   * event containing a `requestId`. Use this endpoint to provide the requested data
   * or cancel the request.
   *
   * **Lifecycle:**
   *
   * - Input requests expire after 2 minutes by default
   * - Expired or already-answered requests return `410 Gone`
   * - Successful submissions return `202 Accepted` (fire-and-forget from caller's
   *   perspective)
   *
   * @example
   * ```ts
   * const response = await client.agent.automateInput(
   *   'requestID',
   * );
   * ```
   */
  automateInput(
    requestID: string,
    body: AgentAutomateInputParams,
    options?: RequestOptions,
  ): APIPromise<AgentAutomateInputResponse> {
    return this._client.post(path`/automate/${requestID}/input`, { body, ...options });
  }

  /**
   * Execute AI-powered research queries that search the web, analyze sources, and
   * synthesize comprehensive answers. This endpoint **always streams** responses
   * using Server-Sent Events (SSE).
   *
   * **Streaming Response:**
   *
   * - All responses are streamed using Server-Sent Events (`text/event-stream`)
   * - Real-time progress updates as research progresses through phases
   *
   * **Research Modes:**
   *
   * - `fast` - Quick answers with minimal web searches (default)
   * - `balanced` - Standard research with multiple iterations
   *
   * **Use Cases:**
   *
   * - Answering complex questions with cited sources
   * - Synthesizing information from multiple web sources
   * - Research reports on specific topics
   * - Fact-checking and verification tasks
   *
   * @example
   * ```ts
   * const researchEvent = await client.agent.research({
   *   query:
   *     'What are the latest developments in quantum computing?',
   * });
   * ```
   */
  research(body: AgentResearchParams, options?: RequestOptions): APIPromise<Stream<ResearchEvent>> {
    return this._client.post('/research', {
      body,
      timeout: (this._client as any)._options.timeout ?? 600000,
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
      __synthesizeEventData: true,
    }) as APIPromise<Stream<ResearchEvent>>;
  }
}

/**
 * A Server-Sent Event from /v1/automate. Typed discriminated union keyed on event.
 */
export type AutomateEvent =
  | AutomateEvent.V1AutomateEventAgentAction
  | AutomateEvent.V1AutomateEventAgentExtracted
  | AutomateEvent.V1AutomateEventAgentProcessing
  | AutomateEvent.V1AutomateEventAgentReasoned
  | AutomateEvent.V1AutomateEventAgentStatus
  | AutomateEvent.V1AutomateEventAgentStep
  | AutomateEvent.V1AutomateEventAgentWaiting
  | AutomateEvent.V1AutomateEventAIGeneration
  | AutomateEvent.V1AutomateEventAIGenerationError
  | AutomateEvent.V1AutomateEventBrowserActionCompleted
  | AutomateEvent.V1AutomateEventBrowserActionStarted
  | AutomateEvent.V1AutomateEventBrowserNavigated
  | AutomateEvent.V1AutomateEventBrowserReconnected
  | AutomateEvent.V1AutomateEventBrowserScreenshotCaptured
  | AutomateEvent.V1AutomateEventBrowserScreenshotCapturedImage
  | AutomateEvent.V1AutomateEventCdpEndpointConnected
  | AutomateEvent.V1AutomateEventCdpEndpointCycle
  | AutomateEvent.V1AutomateEventComplete
  | AutomateEvent.V1AutomateEventDone
  | AutomateEvent.V1AutomateEventError
  | AutomateEvent.V1AutomateEventInteractiveFormDataError
  | AutomateEvent.V1AutomateEventInteractiveFormDataRequest
  | AutomateEvent.V1AutomateEventSystemDebugCompression
  | AutomateEvent.V1AutomateEventSystemDebugMessage
  | AutomateEvent.V1AutomateEventTaskAborted
  | AutomateEvent.V1AutomateEventTaskCompleted
  | AutomateEvent.V1AutomateEventTaskMetrics
  | AutomateEvent.V1AutomateEventTaskMetricsIncremental
  | AutomateEvent.V1AutomateEventTaskSetup
  | AutomateEvent.V1AutomateEventTaskStarted
  | AutomateEvent.V1AutomateEventTaskTraceContext
  | AutomateEvent.V1AutomateEventTaskValidated
  | AutomateEvent.V1AutomateEventTaskValidationError;

export namespace AutomateEvent {
  /**
   * Envelope for the "agent:action" event from /v1/automate.
   */
  export interface V1AutomateEventAgentAction {
    /**
     * Event data for action execution
     */
    data: V1AutomateEventAgentAction.Data;

    event: 'agent:action';
  }

  export namespace V1AutomateEventAgentAction {
    /**
     * Event data for action execution
     */
    export interface Data {
      action: string;

      iterationId: string;

      timestamp: number;

      ref?: string | null;

      value?: string | null;
    }
  }

  /**
   * Envelope for the "agent:extracted" event from /v1/automate.
   */
  export interface V1AutomateEventAgentExtracted {
    /**
     * Event data for extracted data
     */
    data: V1AutomateEventAgentExtracted.Data;

    event: 'agent:extracted';
  }

  export namespace V1AutomateEventAgentExtracted {
    /**
     * Event data for extracted data
     */
    export interface Data {
      extractedData: string;

      iterationId: string;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "agent:processing" event from /v1/automate.
   */
  export interface V1AutomateEventAgentProcessing {
    /**
     * Event data for when the agent is waiting for model generation
     */
    data: V1AutomateEventAgentProcessing.Data;

    event: 'agent:processing';
  }

  export namespace V1AutomateEventAgentProcessing {
    /**
     * Event data for when the agent is waiting for model generation
     */
    export interface Data {
      hasScreenshot: boolean;

      iterationId: string;

      operation: string;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "agent:reasoned" event from /v1/automate.
   */
  export interface V1AutomateEventAgentReasoned {
    /**
     * Event data for agent reasoning
     */
    data: V1AutomateEventAgentReasoned.Data;

    event: 'agent:reasoned';
  }

  export namespace V1AutomateEventAgentReasoned {
    /**
     * Event data for agent reasoning
     */
    export interface Data {
      iterationId: string;

      reasoning: string;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "agent:status" event from /v1/automate.
   */
  export interface V1AutomateEventAgentStatus {
    /**
     * Event data for status messages
     */
    data: V1AutomateEventAgentStatus.Data;

    event: 'agent:status';
  }

  export namespace V1AutomateEventAgentStatus {
    /**
     * Event data for status messages
     */
    export interface Data {
      iterationId: string;

      message: string;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "agent:step" event from /v1/automate.
   */
  export interface V1AutomateEventAgentStep {
    /**
     * Event data for agent step tracking (each loop iteration)
     */
    data: V1AutomateEventAgentStep.Data;

    event: 'agent:step';
  }

  export namespace V1AutomateEventAgentStep {
    /**
     * Event data for agent step tracking (each loop iteration)
     */
    export interface Data {
      currentIteration: number;

      iterationId: string;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "agent:waiting" event from /v1/automate.
   */
  export interface V1AutomateEventAgentWaiting {
    /**
     * Event data for waiting notifications
     */
    data: V1AutomateEventAgentWaiting.Data;

    event: 'agent:waiting';
  }

  export namespace V1AutomateEventAgentWaiting {
    /**
     * Event data for waiting notifications
     */
    export interface Data {
      iterationId: string;

      seconds: number;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "ai:generation" event from /v1/automate.
   */
  export interface V1AutomateEventAIGeneration {
    /**
     * Event data when AI generation occurs
     */
    data: V1AutomateEventAIGeneration.Data;

    event: 'ai:generation';
  }

  export namespace V1AutomateEventAIGeneration {
    /**
     * Event data when AI generation occurs
     */
    export interface Data {
      finishReason: 'stop' | 'length' | 'content-filter' | 'tool-calls' | 'error' | 'other';

      iterationId: string;

      prompt: string;

      schema: unknown;

      timestamp: number;

      usage: Data.Usage;

      messages?: Array<Data.System | Data.User | Data.Assistant | Data.Tool>;

      object?: unknown;

      providerMetadata?: { [key: string]: unknown };

      temperature?: number;

      warnings?: Array<unknown>;
    }

    export namespace Data {
      export interface Usage {
        inputTokens?: number;

        outputTokens?: number;

        totalTokens?: number;
      }

      /**
       * A system message. It can contain system information.
       *
       * Note: using the "system" part of the prompt is strongly preferred to increase
       * the resilience against prompt injection attacks, and because not all providers
       * support several system messages.
       */
      export interface System {
        content: string;

        role: 'system';

        /**
         * Additional provider-specific metadata. They are passed through to the provider
         * from the AI SDK and enable provider-specific functionality that can be fully
         * encapsulated in the provider.
         */
        providerOptions?: {
          [key: string]: {
            [key: string]:
              | string
              | number
              | boolean
              | { [key: string]: string | number | boolean | unknown | Array<unknown> }
              | Array<string | number | boolean | unknown | Array<unknown> | null>;
          };
        };
      }

      /**
       * A user message. It can contain text or a combination of text and images.
       */
      export interface User {
        /**
         * Content of a user message. It can be a string or an array of text and image
         * parts.
         */
        content: string | Array<User.Text | User.Image | User.File>;

        role: 'user';

        /**
         * Additional provider-specific metadata. They are passed through to the provider
         * from the AI SDK and enable provider-specific functionality that can be fully
         * encapsulated in the provider.
         */
        providerOptions?: {
          [key: string]: {
            [key: string]:
              | string
              | number
              | boolean
              | { [key: string]: string | number | boolean | unknown | Array<unknown> }
              | Array<string | number | boolean | unknown | Array<unknown> | null>;
          };
        };
      }

      export namespace User {
        /**
         * Text content part of a prompt. It contains a string of text.
         */
        export interface Text {
          /**
           * The text content.
           */
          text: string;

          type: 'text';

          /**
           * Additional provider-specific metadata. They are passed through to the provider
           * from the AI SDK and enable provider-specific functionality that can be fully
           * encapsulated in the provider.
           */
          providerOptions?: {
            [key: string]: {
              [key: string]:
                | string
                | number
                | boolean
                | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                | Array<string | number | boolean | unknown | Array<unknown> | null>;
            };
          };
        }

        /**
         * Image content part of a prompt. It contains an image.
         */
        export interface Image {
          /**
           * Image data. Can either be:
           *
           * - data: a base64-encoded string, a Uint8Array, an ArrayBuffer, or a Buffer
           * - URL: a URL that points to the image
           */
          image: string | Image.UnionMember1 | Image.ByteLength | AgentAPI.V1GlobalBuffer;

          type: 'image';

          /**
           * Optional IANA media type of the image.
           */
          mediaType?: string;

          /**
           * Additional provider-specific metadata. They are passed through to the provider
           * from the AI SDK and enable provider-specific functionality that can be fully
           * encapsulated in the provider.
           */
          providerOptions?: {
            [key: string]: {
              [key: string]:
                | string
                | number
                | boolean
                | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                | Array<string | number | boolean | unknown | Array<unknown> | null>;
            };
          };
        }

        export namespace Image {
          export interface UnionMember1 {
            buffer: UnionMember1.Buffer;

            byteLength: number;

            byteOffset: number;

            BYTES_PER_ELEMENT: number;

            length: number;

            [k: string]: number | UnionMember1.Buffer | undefined;
          }

          export namespace UnionMember1 {
            export interface Buffer {
              byteLength: number;
            }
          }

          export interface ByteLength {
            byteLength: number;
          }
        }

        /**
         * File content part of a prompt. It contains a file.
         */
        export interface File {
          /**
           * File data. Can either be:
           *
           * - data: a base64-encoded string, a Uint8Array, an ArrayBuffer, or a Buffer
           * - URL: a URL that points to the image
           */
          data: string | File.UnionMember1 | File.ByteLength | AgentAPI.V1GlobalBuffer;

          /**
           * IANA media type of the file.
           */
          mediaType: string;

          type: 'file';

          /**
           * Optional filename of the file.
           */
          filename?: string;

          /**
           * Additional provider-specific metadata. They are passed through to the provider
           * from the AI SDK and enable provider-specific functionality that can be fully
           * encapsulated in the provider.
           */
          providerOptions?: {
            [key: string]: {
              [key: string]:
                | string
                | number
                | boolean
                | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                | Array<string | number | boolean | unknown | Array<unknown> | null>;
            };
          };
        }

        export namespace File {
          export interface UnionMember1 {
            buffer: UnionMember1.Buffer;

            byteLength: number;

            byteOffset: number;

            BYTES_PER_ELEMENT: number;

            length: number;

            [k: string]: number | UnionMember1.Buffer | undefined;
          }

          export namespace UnionMember1 {
            export interface Buffer {
              byteLength: number;
            }
          }

          export interface ByteLength {
            byteLength: number;
          }
        }
      }

      /**
       * An assistant message. It can contain text, tool calls, or a combination of text
       * and tool calls.
       */
      export interface Assistant {
        /**
         * Content of an assistant message. It can be a string or an array of text, image,
         * reasoning, redacted reasoning, and tool call parts.
         */
        content:
          | string
          | Array<
              | Assistant.Text
              | Assistant.File
              | Assistant.Reasoning
              | Assistant.ToolCall
              | Assistant.ToolResult
              | Assistant.ToolApprovalRequest
            >;

        role: 'assistant';

        /**
         * Additional provider-specific metadata. They are passed through to the provider
         * from the AI SDK and enable provider-specific functionality that can be fully
         * encapsulated in the provider.
         */
        providerOptions?: {
          [key: string]: {
            [key: string]:
              | string
              | number
              | boolean
              | { [key: string]: string | number | boolean | unknown | Array<unknown> }
              | Array<string | number | boolean | unknown | Array<unknown> | null>;
          };
        };
      }

      export namespace Assistant {
        /**
         * Text content part of a prompt. It contains a string of text.
         */
        export interface Text {
          /**
           * The text content.
           */
          text: string;

          type: 'text';

          /**
           * Additional provider-specific metadata. They are passed through to the provider
           * from the AI SDK and enable provider-specific functionality that can be fully
           * encapsulated in the provider.
           */
          providerOptions?: {
            [key: string]: {
              [key: string]:
                | string
                | number
                | boolean
                | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                | Array<string | number | boolean | unknown | Array<unknown> | null>;
            };
          };
        }

        /**
         * File content part of a prompt. It contains a file.
         */
        export interface File {
          /**
           * File data. Can either be:
           *
           * - data: a base64-encoded string, a Uint8Array, an ArrayBuffer, or a Buffer
           * - URL: a URL that points to the image
           */
          data: string | File.UnionMember1 | File.ByteLength | AgentAPI.V1GlobalBuffer;

          /**
           * IANA media type of the file.
           */
          mediaType: string;

          type: 'file';

          /**
           * Optional filename of the file.
           */
          filename?: string;

          /**
           * Additional provider-specific metadata. They are passed through to the provider
           * from the AI SDK and enable provider-specific functionality that can be fully
           * encapsulated in the provider.
           */
          providerOptions?: {
            [key: string]: {
              [key: string]:
                | string
                | number
                | boolean
                | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                | Array<string | number | boolean | unknown | Array<unknown> | null>;
            };
          };
        }

        export namespace File {
          export interface UnionMember1 {
            buffer: UnionMember1.Buffer;

            byteLength: number;

            byteOffset: number;

            BYTES_PER_ELEMENT: number;

            length: number;

            [k: string]: number | UnionMember1.Buffer | undefined;
          }

          export namespace UnionMember1 {
            export interface Buffer {
              byteLength: number;
            }
          }

          export interface ByteLength {
            byteLength: number;
          }
        }

        /**
         * Reasoning content part of a prompt. It contains a reasoning.
         */
        export interface Reasoning {
          /**
           * The reasoning text.
           */
          text: string;

          type: 'reasoning';

          /**
           * Additional provider-specific metadata. They are passed through to the provider
           * from the AI SDK and enable provider-specific functionality that can be fully
           * encapsulated in the provider.
           */
          providerOptions?: {
            [key: string]: {
              [key: string]:
                | string
                | number
                | boolean
                | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                | Array<string | number | boolean | unknown | Array<unknown> | null>;
            };
          };
        }

        /**
         * Tool call content part of a prompt. It contains a tool call (usually generated
         * by the AI model).
         */
        export interface ToolCall {
          /**
           * Arguments of the tool call. This is a JSON-serializable object that matches the
           * tool's input schema.
           */
          input: unknown;

          /**
           * ID of the tool call. This ID is used to match the tool call with the tool
           * result.
           */
          toolCallId: string;

          /**
           * Name of the tool that is being called.
           */
          toolName: string;

          type: 'tool-call';

          /**
           * Whether the tool call was executed by the provider.
           */
          providerExecuted?: boolean;

          /**
           * Additional provider-specific metadata. They are passed through to the provider
           * from the AI SDK and enable provider-specific functionality that can be fully
           * encapsulated in the provider.
           */
          providerOptions?: {
            [key: string]: {
              [key: string]:
                | string
                | number
                | boolean
                | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                | Array<string | number | boolean | unknown | Array<unknown> | null>;
            };
          };
        }

        /**
         * Tool result content part of a prompt. It contains the result of the tool call
         * with the matching ID.
         */
        export interface ToolResult {
          /**
           * Result of the tool call. This is a JSON-serializable object.
           */
          output:
            | ToolResult.Text
            | ToolResult.Json
            | ToolResult.ExecutionDenied
            | ToolResult.ErrorText
            | ToolResult.ErrorJson
            | ToolResult.Content;

          /**
           * ID of the tool call that this result is associated with.
           */
          toolCallId: string;

          /**
           * Name of the tool that generated this result.
           */
          toolName: string;

          type: 'tool-result';

          /**
           * Additional provider-specific metadata. They are passed through to the provider
           * from the AI SDK and enable provider-specific functionality that can be fully
           * encapsulated in the provider.
           */
          providerOptions?: {
            [key: string]: {
              [key: string]:
                | string
                | number
                | boolean
                | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                | Array<string | number | boolean | unknown | Array<unknown> | null>;
            };
          };
        }

        export namespace ToolResult {
          export interface Text {
            /**
             * Text tool output that should be directly sent to the API.
             */
            type: 'text';

            value: string;

            /**
             * Provider-specific options.
             */
            providerOptions?: {
              [key: string]: {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                  | Array<string | number | boolean | unknown | Array<unknown> | null>;
              };
            };
          }

          export interface Json {
            type: 'json';

            /**
             * A JSON value can be a string, number, boolean, object, array, or null. JSON
             * values can be serialized and deserialized by the JSON.stringify and JSON.parse
             * methods.
             */
            value:
              | string
              | number
              | boolean
              | {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                }
              | Array<string | number | boolean | unknown | Array<unknown> | null>
              | null;

            /**
             * Provider-specific options.
             */
            providerOptions?: {
              [key: string]: {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                  | Array<string | number | boolean | unknown | Array<unknown> | null>;
              };
            };
          }

          export interface ExecutionDenied {
            /**
             * Type when the user has denied the execution of the tool call.
             */
            type: 'execution-denied';

            /**
             * Provider-specific options.
             */
            providerOptions?: {
              [key: string]: {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                  | Array<string | number | boolean | unknown | Array<unknown> | null>;
              };
            };

            /**
             * Optional reason for the execution denial.
             */
            reason?: string;
          }

          export interface ErrorText {
            type: 'error-text';

            value: string;

            /**
             * Provider-specific options.
             */
            providerOptions?: {
              [key: string]: {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                  | Array<string | number | boolean | unknown | Array<unknown> | null>;
              };
            };
          }

          export interface ErrorJson {
            type: 'error-json';

            /**
             * A JSON value can be a string, number, boolean, object, array, or null. JSON
             * values can be serialized and deserialized by the JSON.stringify and JSON.parse
             * methods.
             */
            value:
              | string
              | number
              | boolean
              | {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                }
              | Array<string | number | boolean | unknown | Array<unknown> | null>
              | null;

            /**
             * Provider-specific options.
             */
            providerOptions?: {
              [key: string]: {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                  | Array<string | number | boolean | unknown | Array<unknown> | null>;
              };
            };
          }

          export interface Content {
            type: 'content';

            value: Array<
              | Content.Text
              | Content.Media
              | Content.FileData
              | Content.FileURL
              | Content.FileID
              | Content.ImageData
              | Content.ImageURL
              | Content.ImageFileID
              | Content.Custom
            >;
          }

          export namespace Content {
            export interface Text {
              /**
               * Text content.
               */
              text: string;

              type: 'text';

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface Media {
              data: string;

              mediaType: string;

              /**
               * @deprecated Deprecated by the upstream schema.
               */
              type: 'media';
            }

            export interface FileData {
              /**
               * Base-64 encoded media data.
               */
              data: string;

              /**
               * IANA media type.
               */
              mediaType: string;

              type: 'file-data';

              /**
               * Optional filename of the file.
               */
              filename?: string;

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface FileURL {
              type: 'file-url';

              /**
               * URL of the file.
               */
              url: string;

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface FileID {
              /**
               * ID of the file.
               *
               * If you use multiple providers, you need to specify the provider specific ids
               * using the Record option. The key is the provider name, e.g. 'openai' or
               * 'anthropic'.
               */
              fileId: string | { [key: string]: string };

              type: 'file-id';

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface ImageData {
              /**
               * Base-64 encoded image data.
               */
              data: string;

              /**
               * IANA media type.
               */
              mediaType: string;

              /**
               * Images that are referenced using base64 encoded data.
               */
              type: 'image-data';

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface ImageURL {
              /**
               * Images that are referenced using a URL.
               */
              type: 'image-url';

              /**
               * URL of the image.
               */
              url: string;

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface ImageFileID {
              /**
               * Image that is referenced using a provider file id.
               *
               * If you use multiple providers, you need to specify the provider specific ids
               * using the Record option. The key is the provider name, e.g. 'openai' or
               * 'anthropic'.
               */
              fileId: string | { [key: string]: string };

              /**
               * Images that are referenced using a provider file id.
               */
              type: 'image-file-id';

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface Custom {
              /**
               * Custom content part. This can be used to implement provider-specific content
               * parts.
               */
              type: 'custom';

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }
          }
        }

        /**
         * Tool approval request prompt part.
         */
        export interface ToolApprovalRequest {
          /**
           * ID of the tool approval.
           */
          approvalId: string;

          /**
           * ID of the tool call that the approval request is for.
           */
          toolCallId: string;

          type: 'tool-approval-request';
        }
      }

      /**
       * A tool message. It contains the result of one or more tool calls.
       */
      export interface Tool {
        /**
         * Content of a tool message. It is an array of tool result parts.
         */
        content: Array<Tool.ToolResult | Tool.ToolApprovalResponse>;

        role: 'tool';

        /**
         * Additional provider-specific metadata. They are passed through to the provider
         * from the AI SDK and enable provider-specific functionality that can be fully
         * encapsulated in the provider.
         */
        providerOptions?: {
          [key: string]: {
            [key: string]:
              | string
              | number
              | boolean
              | { [key: string]: string | number | boolean | unknown | Array<unknown> }
              | Array<string | number | boolean | unknown | Array<unknown> | null>;
          };
        };
      }

      export namespace Tool {
        /**
         * Tool result content part of a prompt. It contains the result of the tool call
         * with the matching ID.
         */
        export interface ToolResult {
          /**
           * Result of the tool call. This is a JSON-serializable object.
           */
          output:
            | ToolResult.Text
            | ToolResult.Json
            | ToolResult.ExecutionDenied
            | ToolResult.ErrorText
            | ToolResult.ErrorJson
            | ToolResult.Content;

          /**
           * ID of the tool call that this result is associated with.
           */
          toolCallId: string;

          /**
           * Name of the tool that generated this result.
           */
          toolName: string;

          type: 'tool-result';

          /**
           * Additional provider-specific metadata. They are passed through to the provider
           * from the AI SDK and enable provider-specific functionality that can be fully
           * encapsulated in the provider.
           */
          providerOptions?: {
            [key: string]: {
              [key: string]:
                | string
                | number
                | boolean
                | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                | Array<string | number | boolean | unknown | Array<unknown> | null>;
            };
          };
        }

        export namespace ToolResult {
          export interface Text {
            /**
             * Text tool output that should be directly sent to the API.
             */
            type: 'text';

            value: string;

            /**
             * Provider-specific options.
             */
            providerOptions?: {
              [key: string]: {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                  | Array<string | number | boolean | unknown | Array<unknown> | null>;
              };
            };
          }

          export interface Json {
            type: 'json';

            /**
             * A JSON value can be a string, number, boolean, object, array, or null. JSON
             * values can be serialized and deserialized by the JSON.stringify and JSON.parse
             * methods.
             */
            value:
              | string
              | number
              | boolean
              | {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                }
              | Array<string | number | boolean | unknown | Array<unknown> | null>
              | null;

            /**
             * Provider-specific options.
             */
            providerOptions?: {
              [key: string]: {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                  | Array<string | number | boolean | unknown | Array<unknown> | null>;
              };
            };
          }

          export interface ExecutionDenied {
            /**
             * Type when the user has denied the execution of the tool call.
             */
            type: 'execution-denied';

            /**
             * Provider-specific options.
             */
            providerOptions?: {
              [key: string]: {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                  | Array<string | number | boolean | unknown | Array<unknown> | null>;
              };
            };

            /**
             * Optional reason for the execution denial.
             */
            reason?: string;
          }

          export interface ErrorText {
            type: 'error-text';

            value: string;

            /**
             * Provider-specific options.
             */
            providerOptions?: {
              [key: string]: {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                  | Array<string | number | boolean | unknown | Array<unknown> | null>;
              };
            };
          }

          export interface ErrorJson {
            type: 'error-json';

            /**
             * A JSON value can be a string, number, boolean, object, array, or null. JSON
             * values can be serialized and deserialized by the JSON.stringify and JSON.parse
             * methods.
             */
            value:
              | string
              | number
              | boolean
              | {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                }
              | Array<string | number | boolean | unknown | Array<unknown> | null>
              | null;

            /**
             * Provider-specific options.
             */
            providerOptions?: {
              [key: string]: {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                  | Array<string | number | boolean | unknown | Array<unknown> | null>;
              };
            };
          }

          export interface Content {
            type: 'content';

            value: Array<
              | Content.Text
              | Content.Media
              | Content.FileData
              | Content.FileURL
              | Content.FileID
              | Content.ImageData
              | Content.ImageURL
              | Content.ImageFileID
              | Content.Custom
            >;
          }

          export namespace Content {
            export interface Text {
              /**
               * Text content.
               */
              text: string;

              type: 'text';

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface Media {
              data: string;

              mediaType: string;

              /**
               * @deprecated Deprecated by the upstream schema.
               */
              type: 'media';
            }

            export interface FileData {
              /**
               * Base-64 encoded media data.
               */
              data: string;

              /**
               * IANA media type.
               */
              mediaType: string;

              type: 'file-data';

              /**
               * Optional filename of the file.
               */
              filename?: string;

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface FileURL {
              type: 'file-url';

              /**
               * URL of the file.
               */
              url: string;

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface FileID {
              /**
               * ID of the file.
               *
               * If you use multiple providers, you need to specify the provider specific ids
               * using the Record option. The key is the provider name, e.g. 'openai' or
               * 'anthropic'.
               */
              fileId: string | { [key: string]: string };

              type: 'file-id';

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface ImageData {
              /**
               * Base-64 encoded image data.
               */
              data: string;

              /**
               * IANA media type.
               */
              mediaType: string;

              /**
               * Images that are referenced using base64 encoded data.
               */
              type: 'image-data';

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface ImageURL {
              /**
               * Images that are referenced using a URL.
               */
              type: 'image-url';

              /**
               * URL of the image.
               */
              url: string;

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface ImageFileID {
              /**
               * Image that is referenced using a provider file id.
               *
               * If you use multiple providers, you need to specify the provider specific ids
               * using the Record option. The key is the provider name, e.g. 'openai' or
               * 'anthropic'.
               */
              fileId: string | { [key: string]: string };

              /**
               * Images that are referenced using a provider file id.
               */
              type: 'image-file-id';

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }

            export interface Custom {
              /**
               * Custom content part. This can be used to implement provider-specific content
               * parts.
               */
              type: 'custom';

              /**
               * Provider-specific options.
               */
              providerOptions?: {
                [key: string]: {
                  [key: string]:
                    | string
                    | number
                    | boolean
                    | { [key: string]: string | number | boolean | unknown | Array<unknown> }
                    | Array<string | number | boolean | unknown | Array<unknown> | null>;
                };
              };
            }
          }
        }

        /**
         * Tool approval response prompt part.
         */
        export interface ToolApprovalResponse {
          /**
           * ID of the tool approval.
           */
          approvalId: string;

          /**
           * Flag indicating whether the approval was granted or denied.
           */
          approved: boolean;

          type: 'tool-approval-response';

          /**
           * Flag indicating whether the tool call is provider-executed. Only
           * provider-executed tool approval responses should be sent to the model.
           */
          providerExecuted?: boolean;

          /**
           * Optional reason for the approval or denial.
           */
          reason?: string;
        }
      }
    }
  }

  /**
   * Envelope for the "ai:generation:error" event from /v1/automate.
   */
  export interface V1AutomateEventAIGenerationError {
    /**
     * Event data when AI generation error occurs
     */
    data: V1AutomateEventAIGenerationError.Data;

    event: 'ai:generation:error';
  }

  export namespace V1AutomateEventAIGenerationError {
    /**
     * Event data when AI generation error occurs
     */
    export interface Data {
      error: string;

      iterationId: string;

      prompt: string;

      schema: unknown;

      timestamp: number;

      messages?: Array<unknown>;
    }
  }

  /**
   * Envelope for the "browser:action_completed" event from /v1/automate.
   */
  export interface V1AutomateEventBrowserActionCompleted {
    /**
     * Event data for action results
     */
    data: V1AutomateEventBrowserActionCompleted.Data;

    event: 'browser:action_completed';
  }

  export namespace V1AutomateEventBrowserActionCompleted {
    /**
     * Event data for action results
     */
    export interface Data {
      iterationId: string;

      success: boolean;

      timestamp: number;

      error?: string;
    }
  }

  /**
   * Envelope for the "browser:action_started" event from /v1/automate.
   */
  export interface V1AutomateEventBrowserActionStarted {
    /**
     * Event data for action execution
     */
    data: V1AutomateEventBrowserActionStarted.Data;

    event: 'browser:action_started';
  }

  export namespace V1AutomateEventBrowserActionStarted {
    /**
     * Event data for action execution
     */
    export interface Data {
      action: string;

      iterationId: string;

      timestamp: number;

      ref?: string | null;

      value?: string | null;
    }
  }

  /**
   * Envelope for the "browser:navigated" event from /v1/automate.
   */
  export interface V1AutomateEventBrowserNavigated {
    /**
     * Event data when navigating to a page
     */
    data: V1AutomateEventBrowserNavigated.Data;

    event: 'browser:navigated';
  }

  export namespace V1AutomateEventBrowserNavigated {
    /**
     * Event data when navigating to a page
     */
    export interface Data {
      iterationId: string;

      timestamp: number;

      title: string;

      url: string;
    }
  }

  /**
   * Envelope for the "browser:reconnected" event from /v1/automate.
   */
  export interface V1AutomateEventBrowserReconnected {
    /**
     * Event data when the browser reconnects after a mid-task disconnect
     */
    data: V1AutomateEventBrowserReconnected.Data;

    event: 'browser:reconnected';
  }

  export namespace V1AutomateEventBrowserReconnected {
    /**
     * Event data when the browser reconnects after a mid-task disconnect
     */
    export interface Data {
      /**
       * 1-based index of the CDP endpoint now in use
       */
      endpointIndex: number;

      iterationId: string;

      /**
       * The original starting URL the agent is restarting execution from
       */
      startingUrl: string;

      timestamp: number;

      /**
       * Total number of configured CDP endpoints
       */
      total: number;
    }
  }

  /**
   * Envelope for the "browser:screenshot_captured" event from /v1/automate.
   */
  export interface V1AutomateEventBrowserScreenshotCaptured {
    /**
     * Event data for screenshot capture
     */
    data: V1AutomateEventBrowserScreenshotCaptured.Data;

    event: 'browser:screenshot_captured';
  }

  export namespace V1AutomateEventBrowserScreenshotCaptured {
    /**
     * Event data for screenshot capture
     */
    export interface Data {
      format: 'jpeg' | 'png';

      iterationId: string;

      size: number;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "browser:screenshot_captured_image" event from /v1/automate.
   */
  export interface V1AutomateEventBrowserScreenshotCapturedImage {
    /**
     * Event data for screenshot image capture with full image data This event contains
     * the complete screenshot and can be very large
     */
    data: V1AutomateEventBrowserScreenshotCapturedImage.Data;

    event: 'browser:screenshot_captured_image';
  }

  export namespace V1AutomateEventBrowserScreenshotCapturedImage {
    /**
     * Event data for screenshot image capture with full image data This event contains
     * the complete screenshot and can be very large
     */
    export interface Data {
      image: string;

      iterationId: string;

      mediaType: 'image/jpeg' | 'image/png';

      timestamp: number;
    }
  }

  /**
   * Envelope for the "cdp:endpoint_connected" event from /v1/automate.
   */
  export interface V1AutomateEventCdpEndpointConnected {
    /**
     * Event data when a CDP endpoint is successfully connected to
     */
    data: V1AutomateEventCdpEndpointConnected.Data;

    event: 'cdp:endpoint_connected';
  }

  export namespace V1AutomateEventCdpEndpointConnected {
    /**
     * Event data when a CDP endpoint is successfully connected to
     */
    export interface Data {
      /**
       * 1-based index of the endpoint that connected
       */
      endpointIndex: number;

      iterationId: string;

      timestamp: number;

      /**
       * Total number of configured CDP endpoints
       */
      total: number;
    }
  }

  /**
   * Envelope for the "cdp:endpoint_cycle" event from /v1/automate.
   */
  export interface V1AutomateEventCdpEndpointCycle {
    /**
     * Event data when a CDP endpoint fails and the next one is being tried
     */
    data: V1AutomateEventCdpEndpointCycle.Data;

    event: 'cdp:endpoint_cycle';
  }

  export namespace V1AutomateEventCdpEndpointCycle {
    /**
     * Event data when a CDP endpoint fails and the next one is being tried
     */
    export interface Data {
      /**
       * 1-based index of the endpoint attempt that failed
       */
      attempt: number;

      /**
       * Sanitized error identifier from the failed connection attempt (error.name, not
       * error.message — full messages may contain endpoint URLs)
       */
      error: string;

      iterationId: string;

      timestamp: number;

      /**
       * Total number of configured CDP endpoints
       */
      total: number;
    }
  }

  /**
   * Envelope for the "complete" event from /v1/automate.
   */
  export interface V1AutomateEventComplete {
    /**
     * Payload for the `complete` stream event. Structurally identical to
     * TaskExecutionResult from webAgent.ts — the `complete` event's data is the
     * agent's final TaskExecutionResult, stringified onto the SSE stream.
     */
    data: V1AutomateEventComplete.Data;

    event: 'complete';
  }

  export namespace V1AutomateEventComplete {
    /**
     * Payload for the `complete` stream event. Structurally identical to
     * TaskExecutionResult from webAgent.ts — the `complete` event's data is the
     * agent's final TaskExecutionResult, stringified onto the SSE stream.
     */
    export interface Data {
      /**
       * Final answer or result from the agent
       */
      finalAnswer: string | null;

      /**
       * Execution statistics
       */
      stats: Data.Stats;

      /**
       * Whether the task completed successfully
       */
      success: boolean;

      /**
       * Structured error information for failed tasks
       */
      error?: Data.Error;
    }

    export namespace Data {
      /**
       * Execution statistics
       */
      export interface Stats {
        actions: number;

        durationMs: number;

        endTime: number;

        iterations: number;

        startTime: number;
      }

      /**
       * Structured error information for failed tasks
       */
      export interface Error {
        /**
         * Error codes for task failures
         */
        code: 'TASK_ABORTED' | 'MAX_ITERATIONS' | 'MAX_ERRORS' | 'TASK_FAILED';

        /**
         * Human-readable error message
         */
        message: string;
      }
    }
  }

  /**
   * Envelope for the "done" event from /v1/automate.
   */
  export interface V1AutomateEventDone {
    /**
     * Payload for the `done` stream terminator event. Empty today; reserved for future
     * metadata.
     */
    data: { [key: string]: unknown };

    event: 'done';
  }

  /**
   * Envelope for the "error" event from /v1/automate.
   */
  export interface V1AutomateEventError {
    /**
     * Payload for the top-level `error` stream event. Emitted when an uncaught error
     * escapes the task runner. Mirrors `ErrorResponse` from the server package's
     * `taskRunner.ts` — kept structurally aligned so schema and runtime stay
     * consistent. Distinct from agent-level error events like `ai:generation:error`
     * and `task:validation_error`, which are emitted through the normal event emitter
     * during the agent loop.
     */
    data: V1AutomateEventError.Data;

    event: 'error';
  }

  export namespace V1AutomateEventError {
    /**
     * Payload for the top-level `error` stream event. Emitted when an uncaught error
     * escapes the task runner. Mirrors `ErrorResponse` from the server package's
     * `taskRunner.ts` — kept structurally aligned so schema and runtime stay
     * consistent. Distinct from agent-level error events like `ai:generation:error`
     * and `task:validation_error`, which are emitted through the normal event emitter
     * during the agent loop.
     */
    export interface Data {
      error: Data.Error;

      success: false;
    }

    export namespace Data {
      export interface Error {
        code: string;

        message: string;

        /**
         * ISO-8601 timestamp
         */
        timestamp: string;
      }
    }
  }

  /**
   * Envelope for the "interactive:form_data:error" event from /v1/automate.
   */
  export interface V1AutomateEventInteractiveFormDataError {
    /**
     * Event data when form validation fails and the agent re-requests data. Carries
     * both the error context and the fields that need new values. Callers respond to
     * this the same way as a request event.
     */
    data: V1AutomateEventInteractiveFormDataError.Data;

    event: 'interactive:form_data:error';
  }

  export namespace V1AutomateEventInteractiveFormDataError {
    /**
     * Event data when form validation fails and the agent re-requests data. Carries
     * both the error context and the fields that need new values. Callers respond to
     * this the same way as a request event.
     */
    export interface Data {
      /**
       * Per-field error messages from validation (field ref -> error text)
       */
      fieldErrors: { [key: string]: string };

      fields: Array<Data.Field>;

      formDescription: string;

      iterationId: string;

      pageTitle: string;

      pageUrl: string;

      requestId: string;

      timestamp: number;
    }

    export namespace Data {
      /**
       * A single form field the agent needs data for.
       */
      export interface Field {
        /**
         * Semantic field type
         */
        fieldType:
          | 'text'
          | 'email'
          | 'phone'
          | 'date'
          | 'number'
          | 'select'
          | 'checkbox'
          | 'radio'
          | 'textarea'
          | 'password'
          | 'other';

        /**
         * The field's visible label
         */
        label: string;

        /**
         * Element ref from the accessibility tree (e.g., "E42")
         */
        ref: string;

        /**
         * Whether this field must be filled
         */
        required: boolean;

        /**
         * Current value if already partially filled
         */
        currentValue?: string;

        /**
         * Additional context (e.g., validation error message on re-request)
         */
        description?: string;

        /**
         * Available options for select/radio fields
         */
        options?: Array<string>;
      }
    }
  }

  /**
   * Envelope for the "interactive:form_data:request" event from /v1/automate.
   */
  export interface V1AutomateEventInteractiveFormDataRequest {
    /**
     * Event data when the agent requests user data for form fields
     */
    data: V1AutomateEventInteractiveFormDataRequest.Data;

    event: 'interactive:form_data:request';
  }

  export namespace V1AutomateEventInteractiveFormDataRequest {
    /**
     * Event data when the agent requests user data for form fields
     */
    export interface Data {
      fields: Array<Data.Field>;

      formDescription: string;

      iterationId: string;

      pageTitle: string;

      pageUrl: string;

      requestId: string;

      timestamp: number;
    }

    export namespace Data {
      /**
       * A single form field the agent needs data for.
       */
      export interface Field {
        /**
         * Semantic field type
         */
        fieldType:
          | 'text'
          | 'email'
          | 'phone'
          | 'date'
          | 'number'
          | 'select'
          | 'checkbox'
          | 'radio'
          | 'textarea'
          | 'password'
          | 'other';

        /**
         * The field's visible label
         */
        label: string;

        /**
         * Element ref from the accessibility tree (e.g., "E42")
         */
        ref: string;

        /**
         * Whether this field must be filled
         */
        required: boolean;

        /**
         * Current value if already partially filled
         */
        currentValue?: string;

        /**
         * Additional context (e.g., validation error message on re-request)
         */
        description?: string;

        /**
         * Available options for select/radio fields
         */
        options?: Array<string>;
      }
    }
  }

  /**
   * Envelope for the "system:debug_compression" event from /v1/automate.
   */
  export interface V1AutomateEventSystemDebugCompression {
    /**
     * Event data for compression debug info
     */
    data: V1AutomateEventSystemDebugCompression.Data;

    event: 'system:debug_compression';
  }

  export namespace V1AutomateEventSystemDebugCompression {
    /**
     * Event data for compression debug info
     */
    export interface Data {
      compressedSize: number;

      compressionPercent: number;

      iterationId: string;

      originalSize: number;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "system:debug_message" event from /v1/automate.
   */
  export interface V1AutomateEventSystemDebugMessage {
    /**
     * Event data for message debug info
     */
    data: V1AutomateEventSystemDebugMessage.Data;

    event: 'system:debug_message';
  }

  export namespace V1AutomateEventSystemDebugMessage {
    /**
     * Event data for message debug info
     */
    export interface Data {
      iterationId: string;

      messages: Array<unknown>;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "task:aborted" event from /v1/automate.
   */
  export interface V1AutomateEventTaskAborted {
    /**
     * Event data when a task is aborted
     */
    data: V1AutomateEventTaskAborted.Data;

    event: 'task:aborted';
  }

  export namespace V1AutomateEventTaskAborted {
    /**
     * Event data when a task is aborted
     */
    export interface Data {
      finalAnswer: string;

      iterationId: string;

      reason: string;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "task:completed" event from /v1/automate.
   */
  export interface V1AutomateEventTaskCompleted {
    /**
     * Event data when a task is completed
     */
    data: V1AutomateEventTaskCompleted.Data;

    event: 'task:completed';
  }

  export namespace V1AutomateEventTaskCompleted {
    /**
     * Event data when a task is completed
     */
    export interface Data {
      finalAnswer: string | null;

      iterationId: string;

      timestamp: number;

      success?: boolean;
    }
  }

  /**
   * Envelope for the "task:metrics" event from /v1/automate.
   */
  export interface V1AutomateEventTaskMetrics {
    data: V1AutomateEventTaskMetrics.Data;

    event: 'task:metrics';
  }

  export namespace V1AutomateEventTaskMetrics {
    export interface Data {
      aiGenerationCount: number;

      aiGenerationErrorCount: number;

      eventCounts: { [key: string]: number };

      iterationId: string;

      stepCount: number;

      timestamp: number;

      totalInputTokens: number;

      totalOutputTokens: number;
    }
  }

  /**
   * Envelope for the "task:metrics_incremental" event from /v1/automate.
   */
  export interface V1AutomateEventTaskMetricsIncremental {
    data: V1AutomateEventTaskMetricsIncremental.Data;

    event: 'task:metrics_incremental';
  }

  export namespace V1AutomateEventTaskMetricsIncremental {
    export interface Data {
      aiGenerationCount: number;

      aiGenerationErrorCount: number;

      eventCounts: { [key: string]: number };

      iterationId: string;

      stepCount: number;

      timestamp: number;

      totalInputTokens: number;

      totalOutputTokens: number;
    }
  }

  /**
   * Envelope for the "task:setup" event from /v1/automate.
   */
  export interface V1AutomateEventTaskSetup {
    /**
     * Event data when a task is setup
     */
    data: V1AutomateEventTaskSetup.Data;

    event: 'task:setup';
  }

  export namespace V1AutomateEventTaskSetup {
    /**
     * Event data when a task is setup
     */
    export interface Data {
      browserName: string;

      iterationId: string;

      task: string;

      timestamp: number;

      data?: unknown;

      guardrails?: string;

      hasApiKey?: boolean;

      keySource?: 'global' | 'env' | 'not_set';

      model?: string;

      provider?: string;

      proxy?: string;

      pwCdpEndpoint?: string;

      /**
       * Total number of CDP endpoints configured (index, not URLs)
       */
      pwCdpEndpointCount?: number;

      pwCdpEndpoints?: Array<string>;

      pwEndpoint?: string;

      url?: string;

      vision?: boolean;
    }
  }

  /**
   * Envelope for the "task:started" event from /v1/automate.
   */
  export interface V1AutomateEventTaskStarted {
    /**
     * Event data when a task is started
     */
    data: V1AutomateEventTaskStarted.Data;

    event: 'task:started';
  }

  export namespace V1AutomateEventTaskStarted {
    /**
     * Event data when a task is started
     */
    export interface Data {
      iterationId: string;

      plan: string;

      successCriteria: string;

      task: string;

      timestamp: number;

      url: string;

      actionItems?: Array<string>;
    }
  }

  /**
   * Envelope for the "task:trace_context" event from /v1/automate.
   */
  export interface V1AutomateEventTaskTraceContext {
    /**
     * Payload for the task:trace_context event. Carries the OpenTelemetry trace ID for
     * this /v1/automate request so consumers can deep-link to distributed-tracing UIs
     * (e.g. Cloud Trace, Cloud Logging) for the run.
     */
    data: V1AutomateEventTaskTraceContext.Data;

    event: 'task:trace_context';
  }

  export namespace V1AutomateEventTaskTraceContext {
    /**
     * Payload for the task:trace_context event. Carries the OpenTelemetry trace ID for
     * this /v1/automate request so consumers can deep-link to distributed-tracing UIs
     * (e.g. Cloud Trace, Cloud Logging) for the run.
     */
    export interface Data {
      /**
       * W3C trace ID — 32-character lowercase hexadecimal string.
       */
      traceId: string;
    }
  }

  /**
   * Envelope for the "task:validated" event from /v1/automate.
   */
  export interface V1AutomateEventTaskValidated {
    /**
     * Event data for task validation
     */
    data: V1AutomateEventTaskValidated.Data;

    event: 'task:validated';
  }

  export namespace V1AutomateEventTaskValidated {
    /**
     * Event data for task validation
     */
    export interface Data {
      completionQuality: 'failed' | 'partial' | 'complete' | 'excellent';

      finalAnswer: string;

      iterationId: string;

      observation: string;

      timestamp: number;

      feedback?: string;
    }
  }

  /**
   * Envelope for the "task:validation_error" event from /v1/automate.
   */
  export interface V1AutomateEventTaskValidationError {
    /**
     * Event data for validation errors during action response processing
     */
    data: V1AutomateEventTaskValidationError.Data;

    event: 'task:validation_error';
  }

  export namespace V1AutomateEventTaskValidationError {
    /**
     * Event data for validation errors during action response processing
     */
    export interface Data {
      errors: Array<string>;

      iterationId: string;

      rawResponse: unknown;

      retryCount: number;

      timestamp: number;
    }
  }
}

/**
 * A Server-Sent Event from /v1/research. Typed discriminated union keyed on event.
 */
export type ResearchEvent =
  | ResearchEvent.V1ResearchEventAnalyzingEnd
  | ResearchEvent.V1ResearchEventAnalyzingStart
  | ResearchEvent.V1ResearchEventComplete
  | ResearchEvent.V1ResearchEventError
  | ResearchEvent.V1ResearchEventEvaluatingEnd
  | ResearchEvent.V1ResearchEventEvaluatingStart
  | ResearchEvent.V1ResearchEventFollowingEnd
  | ResearchEvent.V1ResearchEventFollowingStart
  | ResearchEvent.V1ResearchEventIterationEnd
  | ResearchEvent.V1ResearchEventIterationStart
  | ResearchEvent.V1ResearchEventJudgingEnd
  | ResearchEvent.V1ResearchEventJudgingStart
  | ResearchEvent.V1ResearchEventOutliningEnd
  | ResearchEvent.V1ResearchEventOutliningStart
  | ResearchEvent.V1ResearchEventPlanningEnd
  | ResearchEvent.V1ResearchEventPlanningStart
  | ResearchEvent.V1ResearchEventPrefetchingEnd
  | ResearchEvent.V1ResearchEventPrefetchingStart
  | ResearchEvent.V1ResearchEventSearchingEnd
  | ResearchEvent.V1ResearchEventSearchingStart
  | ResearchEvent.V1ResearchEventStart
  | ResearchEvent.V1ResearchEventWritingEnd
  | ResearchEvent.V1ResearchEventWritingStart;

export namespace ResearchEvent {
  /**
   * Envelope for the "analyzing:end" event from /v1/research.
   */
  export interface V1ResearchEventAnalyzingEnd {
    data: V1ResearchEventAnalyzingEnd.Data;

    event: 'analyzing:end';
  }

  export namespace V1ResearchEventAnalyzingEnd {
    export interface Data {
      analyzed: number;

      failed: number;

      iteration: number;

      message: string;

      samples: Array<Data.Sample>;

      timestamp: number;
    }

    export namespace Data {
      /**
       * Page sample - lightweight representation for event payloads
       */
      export interface Sample {
        domain: string;

        title: string;

        url: string;

        /**
         * URL source tracking - where a URL came from
         */
        urlSource: 'user-input' | 'search-result' | 'extracted-link';

        relevance?: 'low' | 'medium' | 'high';

        reliability?: 'low' | 'medium' | 'high';

        summary?: string;
      }
    }
  }

  /**
   * Envelope for the "analyzing:start" event from /v1/research.
   */
  export interface V1ResearchEventAnalyzingStart {
    data: V1ResearchEventAnalyzingStart.Data;

    event: 'analyzing:start';
  }

  export namespace V1ResearchEventAnalyzingStart {
    export interface Data {
      iteration: number;

      message: string;

      pageCount: number;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "complete" event from /v1/research.
   */
  export interface V1ResearchEventComplete {
    /**
     * complete - Research finished successfully
     */
    data: V1ResearchEventComplete.Data;

    event: 'complete';
  }

  export namespace V1ResearchEventComplete {
    /**
     * complete - Research finished successfully
     */
    export interface Data {
      message: string;

      /**
       * Research metadata
       *
       * Note: citedPages, gapEvaluations, outline, and judgments are optional to support
       * fast mode, which skips these phases for maximum speed.
       */
      metadata: Data.Metadata;

      report: string;

      timestamp: number;
    }

    export namespace Data {
      /**
       * Research metadata
       *
       * Note: citedPages, gapEvaluations, outline, and judgments are optional to support
       * fast mode, which skips these phases for maximum speed.
       */
      export interface Metadata {
        executedQueries: Array<Array<string>>;

        /**
         * Research mode determines depth, thinking budget, and quality controls
         *
         * Modes (in order of cost/thoroughness):
         *
         * - **fast**: Quick answers with minimal validation (~$2, 1 iteration, no judge)
         * - **balanced**: Standard research with moderate depth (~$8, 3 iterations, Flash
         *   models, no judge)
         * - **deep**: Thorough research with judge review (~$15, 5 iterations, Flash
         *   models, with judge)
         * - **max**: Maximum quality with Pro models (~$40, 5 iterations, Pro models, with
         *   judge)
         * - **ultra**: Ultimate tier - all Pro models, 10 iterations (expensive, for when
         *   accuracy is paramount)
         */
        mode: 'fast' | 'balanced' | 'deep' | 'max' | 'ultra';

        prompt: string;

        queryComplexity: 'simple' | 'moderate' | 'complex';

        researchObjective: string;

        researchPlan: string;

        researchQuestions: Array<string>;

        /**
         * Total pages analyzed across all iterations
         */
        totalPagesAnalyzed: number;

        /**
         * Pages cited in the report, ordered by first citation appearance
         */
        citedPages?: Array<Metadata.CitedPage>;

        gapEvaluations?: Array<Metadata.GapEvaluation>;

        judgments?: Array<Metadata.Judgment>;

        /**
         * Complete research metrics
         */
        metrics?: Metadata.Metrics;

        /**
         * Report outline from research writer
         */
        outline?: Metadata.Outline;

        urlSources?: Metadata.URLSources;
      }

      export namespace Metadata {
        export interface CitedPage {
          id: string;

          claims: Array<string>;

          sourceQueries: Array<string>;

          url: string;

          depth?: number;

          /**
           * Full page text (fetched markdown or search excerpts). Only populated when
           * `includeFullText: true` in ResearchOptions.
           *
           * - Fast mode: Parallel API excerpts (~5000 chars)
           * - Other modes: Fetched page markdown
           */
          fullText?: string;

          parentUrl?: string;

          relevance?: 'low' | 'medium' | 'high';

          reliability?: 'low' | 'medium' | 'high';

          /**
           * LLM-generated summary. Undefined in fast mode (no content analysis).
           */
          summary?: string;

          title?: string;

          /**
           * URL source tracking - where a URL came from
           */
          urlSource?: 'user-input' | 'search-result' | 'extracted-link';
        }

        /**
         * Gap evaluation results from research strategist
         */
        export interface GapEvaluation {
          /**
           * Based on unanswered/partial questions, what specific information is still
           * needed?
           */
          gapDescription: string;

          /**
           * Assessment of each research question's status and findings
           */
          questionAssessments: Array<AgentAPI.V1ResearchQuestionAssessment>;

          /**
           * Research coverage level - assesses quality across all questions.
           *
           * Hierarchy: Light < Moderate < Solid < Comprehensive
           *
           * - **Light**: Basic info on some questions, most need more depth → Continue
           * - **Moderate**: Multiple questions answered, some remain partial → Continue
           * - **Solid**: Most questions well-answered with validated sources → Sufficient to
           *   stop
           * - **Comprehensive**: All questions thoroughly answered, exceptional depth →
           *   Definitely stop
           */
          researchCoverage: 'Light' | 'Moderate' | 'Solid' | 'Comprehensive';

          /**
           * Explicit decision: should research continue with another iteration?
           *
           * - Considers: how many questions unanswered/partial, coverage for mode, remaining
           *   iterations
           * - Drives query generation: true → generate queries, false → stop researching
           */
          shouldContinueResearch: boolean;

          /**
           * New research questions to add (optional, use sparingly)
           *
           * - Only if original decomposition missed something critical
           * - Maximum 2-3 new questions total across all iterations
           * - Most iterations should return empty array or omit this field
           */
          newResearchQuestions?: Array<string>;

          /**
           * Search queries to address identified gaps (only when shouldContinueResearch is
           * true)
           *
           * - Target unanswered questions first, then partial questions
           * - 3-10 targeted queries if shouldContinueResearch is true
           * - Omit or provide empty array if shouldContinueResearch is false
           */
          searchQueries?: Array<string>;
        }

        /**
         * Judgment result from research judge
         */
        export interface Judgment {
          approved: boolean;

          observation: string;

          score: number;

          feedback?: string;
        }

        /**
         * Complete research metrics
         */
        export interface Metrics {
          /**
           * Cached fetch count (subset of fetches)
           */
          cachedFetches: number;

          /**
           * Cached search count by provider name (subset of searches)
           */
          cachedSearches: { [key: string]: number };

          /**
           * Fetch count (number of pages fetched)
           */
          fetches: number;

          /**
           * Number of research iterations performed
           */
          iterations: number;

          /**
           * Phase timings with duration in milliseconds
           */
          phases: { [key: string]: Metrics.Phases };

          /**
           * Number of URLs blocked by robots.txt
           */
          robotsBlocked: number;

          /**
           * Search count by provider name (e.g., "bright-data", "parallel")
           */
          searches: { [key: string]: number };

          /**
           * Success rate metrics
           */
          successRates: Metrics.SuccessRates;

          /**
           * Token usage by model ID (e.g., "gemini-2.5-flash")
           */
          tokens: { [key: string]: Metrics.Tokens };

          /**
           * Total duration in milliseconds
           */
          totalDuration: number;
        }

        export namespace Metrics {
          export interface Phases {
            duration: number;
          }

          /**
           * Success rate metrics
           */
          export interface SuccessRates {
            analyzes: number;

            fetches: number;

            searches: number;
          }

          /**
           * Token usage for a specific model
           */
          export interface Tokens {
            input: number;

            output: number;
          }
        }

        /**
         * Report outline from research writer
         */
        export interface Outline {
          directAnswer: string;

          keyTakeaways: Array<string>;

          outline: string;

          relevantSourceIds: Array<string>;
        }

        export interface URLSources {
          extractedLinks: number;

          searchResults: number;

          userProvided: number;
        }
      }
    }
  }

  /**
   * Envelope for the "error" event from /v1/research.
   */
  export interface V1ResearchEventError {
    /**
     * error - Research failed
     */
    data: V1ResearchEventError.Data;

    event: 'error';
  }

  export namespace V1ResearchEventError {
    /**
     * error - Research failed
     */
    export interface Data {
      error: Data.Error;

      message: string;

      timestamp: number;

      /**
       * Activity types for research workflow
       */
      activity?:
        | 'prefetching'
        | 'planning'
        | 'iteration'
        | 'searching'
        | 'analyzing'
        | 'following'
        | 'evaluating'
        | 'outlining'
        | 'writing'
        | 'judging';

      iteration?: number;
    }

    export namespace Data {
      export interface Error {
        message: string;

        name: string;

        stack?: string;
      }
    }
  }

  /**
   * Envelope for the "evaluating:end" event from /v1/research.
   */
  export interface V1ResearchEventEvaluatingEnd {
    data: V1ResearchEventEvaluatingEnd.Data;

    event: 'evaluating:end';
  }

  export namespace V1ResearchEventEvaluatingEnd {
    export interface Data {
      coverage: 'Light' | 'Moderate' | 'Solid' | 'Comprehensive';

      gaps: string;

      iteration: number;

      message: string;

      nextQueries: Array<string>;

      questionAssessments: Array<AgentAPI.V1ResearchQuestionAssessment>;

      shouldContinue: boolean;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "evaluating:start" event from /v1/research.
   */
  export interface V1ResearchEventEvaluatingStart {
    data: V1ResearchEventEvaluatingStart.Data;

    event: 'evaluating:start';
  }

  export namespace V1ResearchEventEvaluatingStart {
    export interface Data {
      iteration: number;

      message: string;

      /**
       * Total pages analyzed so far (including this iteration)
       */
      pagesAnalyzed: number;

      /**
       * Number of research questions being assessed
       */
      questionCount: number;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "following:end" event from /v1/research.
   */
  export interface V1ResearchEventFollowingEnd {
    data: V1ResearchEventFollowingEnd.Data;

    event: 'following:end';
  }

  export namespace V1ResearchEventFollowingEnd {
    export interface Data {
      failed: number;

      followed: number;

      iteration: number;

      message: string;

      samples: Array<Data.Sample>;

      timestamp: number;
    }

    export namespace Data {
      /**
       * Page sample - lightweight representation for event payloads
       */
      export interface Sample {
        domain: string;

        title: string;

        url: string;

        /**
         * URL source tracking - where a URL came from
         */
        urlSource: 'user-input' | 'search-result' | 'extracted-link';

        relevance?: 'low' | 'medium' | 'high';

        reliability?: 'low' | 'medium' | 'high';

        summary?: string;
      }
    }
  }

  /**
   * Envelope for the "following:start" event from /v1/research.
   */
  export interface V1ResearchEventFollowingStart {
    data: V1ResearchEventFollowingStart.Data;

    event: 'following:start';
  }

  export namespace V1ResearchEventFollowingStart {
    export interface Data {
      iteration: number;

      linkCount: number;

      message: string;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "iteration:end" event from /v1/research.
   */
  export interface V1ResearchEventIterationEnd {
    data: V1ResearchEventIterationEnd.Data;

    event: 'iteration:end';
  }

  export namespace V1ResearchEventIterationEnd {
    export interface Data {
      /**
       * Whether this is the final iteration
       */
      isLast: boolean;

      iteration: number;

      message: string;

      timestamp: number;

      /**
       * Why research iterations stopped (only present when isLast is true)
       */
      stopReason?: 'max_iterations' | 'coverage_sufficient';
    }
  }

  /**
   * Envelope for the "iteration:start" event from /v1/research.
   */
  export interface V1ResearchEventIterationStart {
    data: V1ResearchEventIterationStart.Data;

    event: 'iteration:start';
  }

  export namespace V1ResearchEventIterationStart {
    export interface Data {
      iteration: number;

      /**
       * Maximum iterations for this research mode
       */
      maxIterations: number;

      message: string;

      /**
       * Search queries to execute in this iteration
       */
      queries: Array<string>;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "judging:end" event from /v1/research.
   */
  export interface V1ResearchEventJudgingEnd {
    data: V1ResearchEventJudgingEnd.Data;

    event: 'judging:end';
  }

  export namespace V1ResearchEventJudgingEnd {
    export interface Data {
      approved: boolean;

      attempt: number;

      message: string;

      score: number;

      timestamp: number;

      feedback?: string;
    }
  }

  /**
   * Envelope for the "judging:start" event from /v1/research.
   */
  export interface V1ResearchEventJudgingStart {
    data: V1ResearchEventJudgingStart.Data;

    event: 'judging:start';
  }

  export namespace V1ResearchEventJudgingStart {
    export interface Data {
      attempt: number;

      /**
       * Maximum attempts allowed (1 + maxRevisions)
       */
      maxAttempts: number;

      message: string;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "outlining:end" event from /v1/research.
   */
  export interface V1ResearchEventOutliningEnd {
    data: V1ResearchEventOutliningEnd.Data;

    event: 'outlining:end';
  }

  export namespace V1ResearchEventOutliningEnd {
    export interface Data {
      message: string;

      sourcesSelected: number;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "outlining:start" event from /v1/research.
   */
  export interface V1ResearchEventOutliningStart {
    data: V1ResearchEventOutliningStart.Data;

    event: 'outlining:start';
  }

  export namespace V1ResearchEventOutliningStart {
    export interface Data {
      message: string;

      /**
       * Total pages analyzed across all iterations
       */
      pagesAnalyzed: number;

      /**
       * Pages that meet quality threshold (medium+ relevance and reliability)
       */
      qualityPageCount: number;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "planning:end" event from /v1/research.
   */
  export interface V1ResearchEventPlanningEnd {
    data: V1ResearchEventPlanningEnd.Data;

    event: 'planning:end';
  }

  export namespace V1ResearchEventPlanningEnd {
    export interface Data {
      complexity: 'simple' | 'moderate' | 'complex';

      message: string;

      objective: string;

      plan: string;

      queries: Array<string>;

      questions: Array<string>;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "planning:start" event from /v1/research.
   */
  export interface V1ResearchEventPlanningStart {
    data: V1ResearchEventPlanningStart.Data;

    event: 'planning:start';
  }

  export namespace V1ResearchEventPlanningStart {
    export interface Data {
      /**
       * Whether prefetched user-provided URLs exist for context
       */
      hasPrefetchedContext: boolean;

      message: string;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "prefetching:end" event from /v1/research.
   */
  export interface V1ResearchEventPrefetchingEnd {
    data: V1ResearchEventPrefetchingEnd.Data;

    event: 'prefetching:end';
  }

  export namespace V1ResearchEventPrefetchingEnd {
    export interface Data {
      failed: number;

      fetched: number;

      message: string;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "prefetching:start" event from /v1/research.
   */
  export interface V1ResearchEventPrefetchingStart {
    data: V1ResearchEventPrefetchingStart.Data;

    event: 'prefetching:start';
  }

  export namespace V1ResearchEventPrefetchingStart {
    export interface Data {
      message: string;

      timestamp: number;

      urlCount: number;

      urls: Array<string>;
    }
  }

  /**
   * Envelope for the "searching:end" event from /v1/research.
   */
  export interface V1ResearchEventSearchingEnd {
    data: V1ResearchEventSearchingEnd.Data;

    event: 'searching:end';
  }

  export namespace V1ResearchEventSearchingEnd {
    export interface Data {
      iteration: number;

      message: string;

      timestamp: number;

      urlsFound: number;

      urlsNew: number;
    }
  }

  /**
   * Envelope for the "searching:start" event from /v1/research.
   */
  export interface V1ResearchEventSearchingStart {
    data: V1ResearchEventSearchingStart.Data;

    event: 'searching:start';
  }

  export namespace V1ResearchEventSearchingStart {
    export interface Data {
      iteration: number;

      message: string;

      queries: Array<string>;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "start" event from /v1/research.
   */
  export interface V1ResearchEventStart {
    /**
     * start - Research begins
     */
    data: V1ResearchEventStart.Data;

    event: 'start';
  }

  export namespace V1ResearchEventStart {
    /**
     * start - Research begins
     */
    export interface Data {
      message: string;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "writing:end" event from /v1/research.
   */
  export interface V1ResearchEventWritingEnd {
    data: V1ResearchEventWritingEnd.Data;

    event: 'writing:end';
  }

  export namespace V1ResearchEventWritingEnd {
    export interface Data {
      attempt: number;

      message: string;

      timestamp: number;
    }
  }

  /**
   * Envelope for the "writing:start" event from /v1/research.
   */
  export interface V1ResearchEventWritingStart {
    data: V1ResearchEventWritingStart.Data;

    event: 'writing:start';
  }

  export namespace V1ResearchEventWritingStart {
    export interface Data {
      attempt: number;

      /**
       * Whether this is a revision attempt (attempt > 1)
       */
      isRevision: boolean;

      /**
       * Maximum attempts allowed (1 + maxRevisions)
       */
      maxAttempts: number;

      message: string;

      timestamp: number;

      /**
       * Previous judgment score if this is a revision
       */
      previousScore?: number;
    }
  }
}

export interface V1GlobalBuffer {
  buffer: V1GlobalBuffer.Buffer;

  byteLength: number;

  byteOffset: number;

  BYTES_PER_ELEMENT: number;

  length: number;

  [k: string]: number | V1GlobalBuffer.Buffer | undefined;
}

export namespace V1GlobalBuffer {
  export interface Buffer {
    byteLength: number;
  }
}

/**
 * Assessment of a single research question
 */
export interface V1ResearchQuestionAssessment {
  /**
   * What we learned (if answered/partial) or what's missing (if unanswered)
   */
  findings: string;

  /**
   * The research question being assessed
   */
  question: string;

  /**
   * Status: answered (clear info), partial (some info, gaps remain), unanswered (no
   * relevant info)
   */
  status: 'answered' | 'partial' | 'unanswered';
}

export interface AgentAutomateInputResponse {
  status?: string;
}

export interface AgentAutomateParams {
  /**
   * The task description in natural language
   */
  task: string;

  /**
   * JSON data to provide context for form filling or complex tasks
   */
  data?: unknown;

  /**
   * Optional geotargeting parameters for proxy requests
   */
  geo_target?: Shared.GeotargetGeoTarget;

  /**
   * Safety constraints for execution
   */
  guardrails?: string;

  /**
   * Enable interactive mode to allow human-in-the-loop input during task execution
   */
  interactive?: boolean;

  /**
   * Maximum task iterations
   */
  maxIterations?: number;

  /**
   * Maximum validation attempts
   */
  maxValidationAttempts?: number;

  /**
   * TrustedHostnames lists hostnames where the action firewall is bypassed for fills
   * and submissions. WARNING: on listed hosts, prompt injection from page content
   * can drive the agent to fill and submit any field, including personal and
   * credential data. Use only for sites you fully trust to receive your data.
   */
  trusted_hostnames?: Array<string>;

  /**
   * UnsafeMode disables the action firewall entirely. WARNING: prompt injection from
   * page content can then cause the agent to submit your data, including
   * credentials, personal information, and conversation context, to
   * attacker-controlled forms. Only enable for trusted, controlled environments.
   */
  unsafe_mode?: boolean;

  /**
   * Starting URL for the task
   */
  url?: string;
}

export interface AgentAutomateInputParams {
  /**
   * Set to true to cancel/decline the request
   */
  cancelled?: boolean;

  /**
   * Field values as array of {ref, value} pairs (required when not cancelled)
   */
  fields?: Array<AgentAutomateInputParams.Field>;
}

export namespace AgentAutomateInputParams {
  export interface Field {
    ref?: string;

    value?: string;
  }
}

export interface AgentResearchParams {
  /**
   * The research query or question to answer. Maximum 10,000 characters.
   */
  query: string;

  /**
   * Timeout in seconds for fetching web pages
   */
  fetch_timeout?: number;

  /**
   * Research mode: fast (quick answers, default), balanced (standard research)
   */
  mode?: 'fast' | 'balanced';

  /**
   * Bypass cache and force fresh research
   */
  nocache?: boolean;
}

export declare namespace Agent {
  export {
    type AutomateEvent as AutomateEvent,
    type ResearchEvent as ResearchEvent,
    type V1GlobalBuffer as V1GlobalBuffer,
    type V1ResearchQuestionAssessment as V1ResearchQuestionAssessment,
    type AgentAutomateInputResponse as AgentAutomateInputResponse,
    type AgentAutomateParams as AgentAutomateParams,
    type AgentAutomateInputParams as AgentAutomateInputParams,
    type AgentResearchParams as AgentResearchParams,
  };
}
