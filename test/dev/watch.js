var builder = require('pug-builder');
builder.watch({
  target: 'src',
  includes: 'includes',
  output: 'dst',
  pretty: true,
});