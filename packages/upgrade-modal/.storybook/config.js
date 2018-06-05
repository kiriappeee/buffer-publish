import { configure } from '@storybook/react';
import 'babel-polyfill';

// automatically import all story.js files
const req = require.context('../components/', true, /story\.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
