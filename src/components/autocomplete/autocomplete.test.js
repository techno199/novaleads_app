import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Autocomplete } from '.';

let items = [
  'тэг0',
  'тэг1',
  'тэг2'
]

test('should render empty autocomplete', () => {
  const component = renderer.create(
    <Autocomplete items={items} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})


test('should render autocomplete with suggestions', () => {
  let component = renderer.create(
    <Autocomplete items={items} selectedItem='тэг' />
  )

  let instance = component.root
  let input = instance.findByType('input')

  let e = { target: { value: 'тэг'}}
  act(() => {
    input.props.onChange(e)
  })

  let suggestions = instance.findAllByType('li')
  expect(suggestions.length).toBe(3)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('should render autocomplete with 1 suggestion, and close suggestion on outer click', () => {
  const component = renderer.create(
    <Autocomplete items={items} selectedItem='тэг1' />
  )
  let root = component.root

  let input = root.findByType('input')

  act(() => {
    let e = { target: { value: 'тэг1' } }
    input.props.onChange(e)
  })

  let suggestions = root.findAllByType('li')
  expect(suggestions.length).toBe(1)

  let downshift = root.find(el => el.props.onOuterClick)

  act(() => {
    downshift.props.onOuterClick()
  })

  suggestions = root.findAllByType('li')
  expect(suggestions.length).toBe(0)
})

