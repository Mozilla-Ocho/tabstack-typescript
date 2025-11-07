/**
 * Fix ESM imports by adding .js extensions
 * ESM requires explicit file extensions in import statements
 */

const fs = require('fs');
const path = require('path');

const distESM = path.join(__dirname, '../dist/esm');

function addJsExtensions(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      addJsExtensions(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Add .js to relative imports (from './file' or from '../file')
      content = content.replace(
        /from ['"](\.\.?\/.+?)['"];/g,
        (match, p1) => {
          if (!p1.endsWith('.js')) {
            return `from '${p1}.js';`;
          }
          return match;
        }
      );

      // Add .js to export from statements (export * from './file' or '../file')
      content = content.replace(
        /export \* from ['"](\.\.?\/.+?)['"];/g,
        (match, p1) => {
          if (!p1.endsWith('.js')) {
            return `export * from '${p1}.js';`;
          }
          return match;
        }
      );

      // Add .js to export { } from statements
      content = content.replace(
        /export \{[^}]+\} from ['"](\.\.?\/.+?)['"];/g,
        (match, p1) => {
          if (!p1.endsWith('.js')) {
            return match.replace(`'${p1}'`, `'${p1}.js'`).replace(`"${p1}"`, `"${p1}.js"`);
          }
          return match;
        }
      );

      fs.writeFileSync(filePath, content);
    }
  });
}

// Create package.json for ESM
const esmPackageJson = {
  type: 'module'
};

// Create package.json for CJS
const cjsPackageJson = {
  type: 'commonjs'
};

// Write package.json files
fs.writeFileSync(
  path.join(__dirname, '../dist/esm/package.json'),
  JSON.stringify(esmPackageJson, null, 2)
);

fs.writeFileSync(
  path.join(__dirname, '../dist/cjs/package.json'),
  JSON.stringify(cjsPackageJson, null, 2)
);

// Fix ESM imports
addJsExtensions(distESM);

console.log('✓ ESM imports fixed');
console.log('✓ Package.json files created');
