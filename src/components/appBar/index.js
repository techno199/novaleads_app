import React, { Component } from 'react'
import { withStyles, Toolbar, Typography } from '@material-ui/core';
import { AppBar as MaterialAppBar } from '@material-ui/core'
import PropTypes from 'prop-types'

const styles = theme => ({

})

class AppBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string
  }

  render() {
    const { title } = this.props
    return (
      <MaterialAppBar>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            {title}
          </Typography>
        </Toolbar>
      </MaterialAppBar>
    )
  }
}

const AppBarStyled = withStyles(styles)(AppBar)

export { AppBarStyled as AppBar }
