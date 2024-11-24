#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(`
  Usage
    $ ink-clipboard-demo

  Press Ctrl+V to paste from clipboard
  Press q to quit
`, {
  importMeta: import.meta,
});

render(<App />);
