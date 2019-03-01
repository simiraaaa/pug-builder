var builder = require('pug-builder');
builder.build({
  target: 'src',
  includes: 'includes',
  output: 'dst',
  pretty: true,
});