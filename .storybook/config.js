import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { configure, addDecorator, setAddon } from '@storybook/react';
import centered from '@storybook/addon-centered';

addDecorator(centered)
addDecorator(story => (
  <MemoryRouter>
    {story()}
  </MemoryRouter>
))

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
