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
    overflowX: 'auto',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
})

class App extends Component {
  state = {
    creationEditorOpen: false
  }

  handleSaveClick = newTask => {
    this.setState({
      creationEditorOpen: false
    })
  }

  handleEditorClose = () => {
    this.setState({
      creationEditorOpen: false
    })
  }

  handleAddClick = () => {
    this.setState({
      creationEditorOpen: true
    })
  }

  render() {
    const { classes } = this.props
    const { creationEditorOpen } = this.state

    return (
      <div className={classes.root}>
        <AppBar 
          title="Список задач" 
          onAddClick={this.handleAddClick}
        />
        <div className={classes.appContainer}>
          <TaskApp 
            creationEditorOpen={creationEditorOpen} 
            onCreateAddClick={this.handleSaveClick} 
            onEditorClose={this.handleEditorClose}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App)
