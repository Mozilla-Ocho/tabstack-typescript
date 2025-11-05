/**
 * Schema definition system for TABStack AI SDK.
 *
 * This module provides a DSL for defining JSON schemas in a TypeScript-friendly way.
 */

export interface JSONSchema {
  type: string;
  properties?: Record<string, JSONSchema>;
  items?: JSONSchema;
  required?: string[];
  additionalProperties?: boolean;
  description?: string;
}

/**
 * Base interface for schema types
 */
export interface SchemaTypeInterface {
  toJSONSchema(): JSONSchema;
}

/**
 * String type factory function
 */
export function StringType(description?: string): SchemaTypeInterface {
  return {
    toJSONSchema(): JSONSchema {
      const schema: JSONSchema = { type: 'string' };
      if (description) {
        schema.description = description;
      }
      return schema;
    },
  };
}

/**
 * Number type factory function
 */
export function NumberType(description?: string): SchemaTypeInterface {
  return {
    toJSONSchema(): JSONSchema {
      const schema: JSONSchema = { type: 'number' };
      if (description) {
        schema.description = description;
      }
      return schema;
    },
  };
}

/**
 * Boolean type factory function
 */
export function BooleanType(description?: string): SchemaTypeInterface {
  return {
    toJSONSchema(): JSONSchema {
      const schema: JSONSchema = { type: 'boolean' };
      if (description) {
        schema.description = description;
      }
      return schema;
    },
  };
}

/**
 * Object type factory function with properties
 */
export function ObjectType(
  properties: Record<string, SchemaTypeInterface>,
  description?: string
): SchemaTypeInterface {
  return {
    toJSONSchema(): JSONSchema {
      const jsonProperties: Record<string, JSONSchema> = {};
      for (const [key, value] of Object.entries(properties)) {
        jsonProperties[key] = value.toJSONSchema();
      }

      const schema: JSONSchema = {
        type: 'object',
        properties: jsonProperties,
        required: Object.keys(properties),
        additionalProperties: false,
      };
      if (description) {
        schema.description = description;
      }
      return schema;
    },
  };
}

/**
 * Array type factory function with item schema
 */
export function ArrayType(items: SchemaTypeInterface, description?: string): SchemaTypeInterface {
  return {
    toJSONSchema(): JSONSchema {
      const schema: JSONSchema = {
        type: 'array',
        items: items.toJSONSchema(),
      };
      if (description) {
        schema.description = description;
      }
      return schema;
    },
  };
}

/**
 * Root schema definition
 *
 * This class provides a convenient DSL for defining JSON schemas.
 *
 * @example
 * ```typescript
 * const schema = new Schema({
 *   name: StringType(),
 *   age: NumberType(),
 *   tags: ArrayType(StringType()),
 *   address: ObjectType({
 *     street: StringType(),
 *     city: StringType(),
 *   })
 * });
 * ```
 */
export class Schema {
  private properties: Record<string, SchemaTypeInterface>;

  constructor(properties: Record<string, SchemaTypeInterface>) {
    this.properties = properties;
  }

  /**
   * Convert to JSON Schema format
   */
  toJSONSchema(): JSONSchema {
    const properties: Record<string, JSONSchema> = {};
    for (const [key, value] of Object.entries(this.properties)) {
      properties[key] = value.toJSONSchema();
    }

    return {
      type: 'object',
      properties,
      required: Object.keys(this.properties),
      additionalProperties: false,
    };
  }

  /**
   * Create a Schema from a JSON Schema object
   *
   * @param jsonSchema - JSON Schema object
   * @returns Schema instance
   *
   * @example
   * ```typescript
   * const jsonSchema = {
   *   type: 'object',
   *   properties: {
   *     name: { type: 'string' },
   *     age: { type: 'number' }
   *   }
   * };
   * const schema = Schema.fromJSONSchema(jsonSchema);
   * ```
   */
  static fromJSONSchema(jsonSchema: JSONSchema): Schema {
    if (jsonSchema.type !== 'object') {
      throw new Error("Root schema must be of type 'object'");
    }

    const properties: Record<string, SchemaTypeInterface> = {};
    const propertiesDict = jsonSchema.properties || {};

    for (const [key, propSchema] of Object.entries(propertiesDict)) {
      properties[key] = parseSchemaType(propSchema);
    }

    return new Schema(properties);
  }
}

/**
 * Parse a JSON schema property into a SchemaType
 */
function parseSchemaType(schema: JSONSchema): SchemaTypeInterface {
  const { type, description } = schema;

  switch (type) {
    case 'string':
      return StringType(description);
    case 'number':
      return NumberType(description);
    case 'boolean':
      return BooleanType(description);
    case 'array': {
      const itemsSchema = schema.items || { type: 'string' };
      const itemsType = parseSchemaType(itemsSchema);
      return ArrayType(itemsType, description);
    }
    case 'object': {
      const properties: Record<string, SchemaTypeInterface> = {};
      const propertiesDict = schema.properties || {};
      for (const [key, propSchema] of Object.entries(propertiesDict)) {
        properties[key] = parseSchemaType(propSchema);
      }
      return ObjectType(properties, description);
    }
    default:
      // Fallback to string type for unknown types
      return StringType(description);
  }
}
