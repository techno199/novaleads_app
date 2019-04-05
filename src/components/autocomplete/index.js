import React, { useState, useEffect } from 'react'
import Downshift from 'downshift'
import { TextField, Paper, MenuItem, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types'

const styles = theme => ({
  input: {
    width: '100%'
  }
})

const Autocomplete = ({ onChange, classes, items, selectedItem, ...other }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [text, setText] = useState('')

  const handleInputChange = e => {
    onChange &&
      onChange(e.target.value)

    setText(e.target.value)

    if (e.target.value.trim()) {
      setMenuIsOpen(true)
    }
  }

  const handleSelectedValueChange = value => {
    onChange &&   
      onChange(value)

    setMenuIsOpen(false)
  }

  return (
    <Downshift
      isOpen={menuIsOpen}
      onChange={handleSelectedValueChange}
    >
    {
      downshift => (
        <div {...other}>
          <TextField 
            {...downshift.getInputProps()} 
            label='Тэг' 
            className={classes.input}
            onChange={handleInputChange}
            value={selectedItem || text}
          />
          <Paper {...downshift.getMenuProps()}>
          {
            downshift.isOpen && (
              items
                .filter(item => item.includes(text) )
                .map((item, i) => (
                  <MenuItem
                    {...downshift.getItemProps({
                      key: item,
                      index: i,
                      item
                    })}
                  >
                  {item}
                  </MenuItem>
                ))
            )
          }
          </Paper>
        </div>
      )
    }
    </Downshift>
  )
}

Autocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.string
}

const AutocompleteStyled = withStyles(styles)(Autocomplete)

export { AutocompleteStyled as Autocomplete }