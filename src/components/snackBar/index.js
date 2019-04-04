import React, { Component } from 'react'
import { withStyles, Snackbar as MaterialSnackbar, SnackbarContent, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  closeIcon: {
    fontSize: 20
  }
})

class Snackbar extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    message: PropTypes.string,
    variant: PropTypes.oneOf(['error']).isRequired,
  }
  
  handleClose = (event, reason) => {
      this.props.onClose &&
      this.props.onClose(event, reason)
  }

  render() {
    const { classes, message, variant, ...other } = this.props
    return (
      <MaterialSnackbar 
        {...other}
        onClose={this.handleClose}
      >
        <SnackbarContent
          className={classes[variant]}
          message={
            <span className={classes.message}>
              {message}
            </span>
          }
          action={[
            <IconButton
              key='close'
              color='inherit'
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.closeIcon}/>
            </IconButton>
          ]}
        >
        </SnackbarContent>
      </MaterialSnackbar>
    )
  }
}

const SnackbarStyled = withStyles(styles)(Snackbar)

export { SnackbarStyled as Snackbar }
