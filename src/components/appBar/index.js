import React, { Component } from 'react'
import { withStyles, Toolbar, Typography, Fab } from '@material-ui/core';
import { AppBar as MaterialAppBar } from '@material-ui/core'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  fabBtn: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    display: 'block',
    position: 'absolute',
    left: 'calc(50% - 24px)',
    bottom: -24
  }
})

class AppBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    /**
     * Fires when Add button is clicked
     */
    onAddClick: PropTypes.func
  }

  handleAddClick = () => {
    this.props.onAddClick &&
      this.props.onAddClick()
  }

  render() {
    const { title, classes } = this.props
    return (
      <MaterialAppBar position='absolute'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            {title}
          </Typography>
          <Fab
            color='secondary'
            className={classes.fabBtn}
            size='medium'
            onClick={this.handleAddClick}
          >
            <AddIcon />
          </Fab>
        </Toolbar>
      </MaterialAppBar>
    )
  }
}

const AppBarStyled = withStyles(styles)(AppBar)

export { AppBarStyled as AppBar }
