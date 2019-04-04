import React, { Component } from 'react'
import { withStyles, Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import PropTypes from 'prop-types'
import { TaskTable } from '../taskTable';
import { getNextId } from '../../helpers/db';
import { TaskEditor } from '../taskEditor';
import { Snackbar } from '../snackBar';
import { SNACK_DELAY, createTask } from '../../helpers/const';

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    position: 'relative',
    height: '100%'
  },
  addBtn: {
    position: 'fixed',
    right: theme.spacing.unit * 4,
    bottom: theme.spacing.unit * 4
  }
})

class TaskApp extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onAddClick: PropTypes.func
  }

  state = {
    taskEditorCreationOpen: false,
    taskEditorEditingOpen: false,
    snackOpen: false,
    tasks: [],
    selectedTask: null,
    snackText: ''
  }

  handleAddBtnClick = event => {
    this.onAddClick &&
    this.onAddClick()

    this.setState({
      taskEditorCreationOpen: true
    })
  }

  handleCancel = () => {
    this.setState({
      taskEditorCreationOpen: false,
      snackOpen: true
    })

    this._showSnack('Задача не сохранена')
  }

  handleEditingCancel = () => {
    this.setState({
      taskEditorEditingOpen: false,
      selectedTask: null
    })

    this._showSnack('Изменения не сохранены')
  }

  _showSnack = (text, delay = SNACK_DELAY) => {
    this.setState({
      snackOpen: true,
      snackText: text
    })

    setTimeout(() => {
      this.setState({
        snackOpen: false,
        snackText: ''
      })
    }, delay)
  }

  handleSave = async task => {
    let newTask = createTask(
      task.status,
      task.taskName,
      task.taskDescription,
      task.completionDate,
      task.importance,
      task.tag
    )

    await new Promise(resolve => setTimeout(resolve, 2000));
    this.setState(oldState => {
      let tasks = oldState.tasks.slice();
      tasks.push(newTask);
      return {
        tasks,
        taskEditorCreationOpen: false
      };
    });
  }

  handleSnackClose = (event, resason) => {
    if (resason === 'clickaway') return

    this.setState({
      snackOpen: false
    })
  }

  handleRemoveClick = async task => {
    this.setState(oldState => {
      let newTasks = oldState.tasks.slice()
      let targetTask = newTasks.find(t => t.data.id == task.data.id)

      targetTask.isRemoveFetching = true

      return {
        newTasks
      }
    })

    await new Promise(resolve => setTimeout(resolve, 2000))

    this.setState(oldState => {
      let newTasks = oldState.tasks
        .slice()
        .filter(t => t.data.id !== task.data.id);

      return {
        tasks: newTasks
      };
    });
  }

  handleEditClick = task => {
    this.setState({
      taskEditorEditingOpen: true,
      selectedTask: task
    })
  }

  handleEditingSave = async taskData => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    this.setState(oldState => {
      let newTasks = oldState.tasks.slice()
      let selectedTask = oldState.selectedTask

      let targetIndex = newTasks.findIndex(t => t.data.id === taskData.id)
      // Provide selected task with new values
      selectedTask.data = Object.assign(selectedTask.data, taskData)
      
      newTasks[targetIndex] = oldState.selectedTask

      return {
        tasks: newTasks,
        taskEditorEditingOpen: false
      }
    })
  }

  render() {
    const { classes } = this.props
    const { taskEditorCreationOpen, tasks, snackOpen, selectedTask, taskEditorEditingOpen } = this.state
    let columnNames = ['id', 'Статус', 'Название задачи', 'Описание задачи', 'Дата выполнения', 'Важность', 'Тэг']
    
    return (
      <Grid className={classes.root}>
        <TaskEditor 
          variant='creation'
          open={taskEditorCreationOpen} 
          onSave={this.handleSave} 
          onCancel={this.handleCancel}
        />
        <TaskEditor
          open={taskEditorEditingOpen}
          variant='editing'
          task={selectedTask}
          onSave={this.handleEditingSave}
          onCancel={this.handleEditingCancel}
        />
        <TaskTable 
          columnNames={columnNames} 
          tasks={tasks}
          removeClick={this.handleRemoveClick}
          editClick={this.handleEditClick}
        />
        <Snackbar 
          open={snackOpen} 
          variant='error'
          message='Изменения не сохранены' 
          onClose={this.handleSnackClose}
        />
        <Fab 
          color='secondary' 
          size='medium' 
          className={classes.addBtn} 
          onClick={this.handleAddBtnClick}
        >
          <AddIcon />
        </Fab>
      </Grid>
    )
  }
}

const TaskAppStyled = withStyles(styles)(TaskApp)

export { TaskAppStyled as TaskApp }
