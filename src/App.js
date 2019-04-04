import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppBar } from './components/appBar';
import { TaskApp } from './components/taskApp';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    height: '100vh'
  },
  appContainer: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
})

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar title="Список задач" />
        <div className={classes.appContainer}>
          <TaskApp />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App)
