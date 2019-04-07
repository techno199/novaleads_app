import React from 'react'
import renderer from 'react-test-renderer'
import { AppBar } from '.';

test('should render application top bar', () => {
  const component = renderer.create(
    <AppBar title='title' />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
