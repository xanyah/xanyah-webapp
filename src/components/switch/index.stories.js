import React from 'react'
import { storiesOf } from '@storybook/react'
import Switch from './'

storiesOf('Switch', module)
  .add('Empty switch', () => (
    <Switch />
  ))
  .add('Switch with labels', () => (
    <Switch
      labels={['no', 'yes']}
    />
  ))
