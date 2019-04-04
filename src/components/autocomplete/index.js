import React, { useState } from 'react'
import Downshift from 'downshift'
import { TextField, Paper, MenuItem, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types'

const styles = theme => ({
  input: {
    width: '100%'
  }
})

const Autocomplete = (props) => {
  const [selectedTag, setSelectedTag] = useState('')

  return (
    <Downshift
      onChange={props.onChange}
    >
    {
      downshift => (
        <div {...props}>
          <TextField 
            {...downshift.getInputProps()} 
            label='Тэг' 
            className={props.classes.input} 
            // value={selectedTag}
            // onChange={e => setSelectedTag(e.target.value)}
          />
          <Paper {...downshift.getMenuProps()}>
          {
            downshift.isOpen && (
              props.items
                .filter(item => item.includes(downshift.inputValue) || !downshift.inputValue)
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
  onChange: PropTypes.func
}

const AutocompleteStyled = withStyles(styles)(Autocomplete)

export { AutocompleteStyled as Autocomplete }