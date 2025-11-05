/**
 * Schema definition examples for TABStack AI TypeScript SDK
 *
 * This file demonstrates various ways to define schemas using the type-safe DSL.
 */

import {
  Schema,
  StringType,
  NumberType,
  BooleanType,
  ArrayType,
  ObjectType,
} from '@tabstack/sdk';

// Example 1: Simple flat schema
const userSchema = new Schema({
  name: StringType('Full name'),
  email: StringType('Email address'),
  age: NumberType('Age in years'),
  isActive: BooleanType('Account active status'),
});

console.log('User Schema:');
console.log(JSON.stringify(userSchema.toJSONSchema(), null, 2));
console.log();

// Example 2: Schema with arrays
const blogPostSchema = new Schema({
  title: StringType('Post title'),
  author: StringType('Author name'),
  content: StringType('Post content'),
  tags: ArrayType(StringType('Tag name')),
  views: NumberType('View count'),
  published: BooleanType('Published status'),
});

console.log('Blog Post Schema:');
console.log(JSON.stringify(blogPostSchema.toJSONSchema(), null, 2));
console.log();

// Example 3: Nested objects
const productSchema = new Schema({
  id: StringType('Product ID'),
  name: StringType('Product name'),
  price: NumberType('Price in USD'),
  inStock: BooleanType('Availability'),
  dimensions: ObjectType({
    width: NumberType('Width in cm'),
    height: NumberType('Height in cm'),
    depth: NumberType('Depth in cm'),
  }),
  reviews: ArrayType(
    ObjectType({
      author: StringType('Reviewer name'),
      rating: NumberType('Rating 1-5'),
      comment: StringType('Review text'),
    })
  ),
});

console.log('Product Schema:');
console.log(JSON.stringify(productSchema.toJSONSchema(), null, 2));
console.log();

// Example 4: Complex nested structure
const organizationSchema = new Schema({
  name: StringType('Organization name'),
  foundedYear: NumberType('Year founded'),
  departments: ArrayType(
    ObjectType({
      name: StringType('Department name'),
      budget: NumberType('Annual budget'),
      employees: ArrayType(
        ObjectType({
          name: StringType('Employee name'),
          role: StringType('Job title'),
          salary: NumberType('Annual salary'),
          skills: ArrayType(StringType('Skill name')),
        })
      ),
    })
  ),
  headquarters: ObjectType({
    address: ObjectType({
      street: StringType('Street address'),
      city: StringType('City'),
      country: StringType('Country'),
      postalCode: StringType('Postal code'),
    }),
    coordinates: ObjectType({
      latitude: NumberType('Latitude'),
      longitude: NumberType('Longitude'),
    }),
  }),
});

console.log('Organization Schema (complex):');
console.log(JSON.stringify(organizationSchema.toJSONSchema(), null, 2));
console.log();

// Example 5: Schema deserialization
const jsonSchema = {
  type: 'object' as const,
  properties: {
    title: { type: 'string' as const },
    year: { type: 'number' as const },
    genres: {
      type: 'array' as const,
      items: { type: 'string' as const },
    },
  },
};

const movieSchema = Schema.fromJSONSchema(jsonSchema);
console.log('Movie Schema (from JSON):');
console.log(JSON.stringify(movieSchema.toJSONSchema(), null, 2));
console.log();

// Example 6: Reusable schema components
const addressType = ObjectType({
  street: StringType('Street address'),
  city: StringType('City name'),
  state: StringType('State/Province'),
  zipCode: StringType('Postal code'),
  country: StringType('Country'),
});

const contactInfoType = ObjectType({
  email: StringType('Email address'),
  phone: StringType('Phone number'),
  address: addressType,
});

const companySchema = new Schema({
  name: StringType('Company name'),
  website: StringType('Website URL'),
  contact: contactInfoType,
  offices: ArrayType(
    ObjectType({
      name: StringType('Office name'),
      address: addressType,
      employees: NumberType('Employee count'),
    })
  ),
});

console.log('Company Schema (reusable components):');
console.log(JSON.stringify(companySchema.toJSONSchema(), null, 2));
