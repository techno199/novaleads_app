import React, { Component } from 'react'
import { withStyles, Drawer, Typography, TextField, Select, MenuItem, Grid, Button, LinearProgress, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import PropTypes from 'prop-types'
import { TASK_STATUS_DONE, TASK_STATUS_LATER, TASK_STATUS_PROCESSING, DEFAULT_TAG_VALUES, TASK_IMPORTANCE_1, TASK_IMPORTANCE_3, TASK_IMPORTANCE_4, TASK_IMPORTANCE_2 } from '../../helpers/const';
import { Autocomplete } from '../autocomplete';

const EDITOR_VARIANT_CREATION = 'creation'
const EDITOR_VARIANT_EDITING = 'editing'

const styles = theme => ({
  root: {
    width: 304,
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  titleContainer: {
    padding: 10,
    backgroundColor: '#3f51b5',
    color: 'white',
    height: 80,
    display: 'flex',
    alignItems: 'center'
  },
  fieldsContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    flexGrow: 1,
    maxHeight: '100%',
    overflow: 'auto',
    marginBottom: 72
  },
  field: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
  actionBtn: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    padding: theme.spacing.unit * 3
  },
  actionBtnContainer: {
    position: 'absolute',
    bottom: 0
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
})

class TaskEditor extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    variant: PropTypes
      .oneOf([
        EDITOR_VARIANT_CREATION, 
        EDITOR_VARIANT_EDITING
      ]).isRequired,
    task: PropTypes.shape({
      data: PropTypes.shape({
        taskName: PropTypes.string.isRequired,
        taskDescription: PropTypes.string,
        completionDate: PropTypes.string,
        status: PropTypes.string,
        tag: PropTypes.string,
        importance: PropTypes.string
      }).isRequired
    })
  }

  state = {
    taskName: '',
    taskNameError: false,
    taskDescription: '',
    completionDate: '',
    status: TASK_STATUS_PROCESSING,
    tag: '',
    isFetching: false,
    importance: '',
    importanceHidden: true
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.variant === EDITOR_VARIANT_EDITING &&
      nextProps.task) {
      let { 
        taskName, 
        taskDescription, 
        completionDate,
        tag,
        importance,
        status
      } = nextProps.task.data

      this.setState({
        taskName,
        taskDescription,
        completionDate,
        tag,
        importance,
        status,
        taskNameError: false,
        importanceHidden: false
      })
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleTaskNameChange = e => {
    this.setState({
      taskName: e.target.value
    })
    if (e.target.value.trim()) {
      this.setState({
        taskNameError: false
      })
    }
  }

  handleDateChange = e => {
    this.setState({
      importanceHidden: false,
      completionDate: e.target.value
    })
  }

  handleTagChange = tag => {
    this.setState({
      tag
    })
  }

  handleCancelClick = e => {
    if (this.state.isFetching) return

    this.props.onCancel &&
      this.props.onCancel()
  }

  /**
   * Validates all fields and hightlights them if neccessary.
   * Returns true if model state is valid
   */
  modelStateIsValid = () => {
    if (this.state.taskName.trim()) return true
    
    this.setState({
      taskNameError: true
    })

    return false
  }

  handleSaveClick = e => {
    if (!this.modelStateIsValid()) return

    let task = {
      status: this.state.status,
      taskName: this.state.taskName,
      taskDescription: this.state.taskDescription,
      completionDate: this.state.completionDate,
      importance: this.state.importance,
      tag: this.state.tag
    }

    this.setState({
      isFetching: true
    })

    let promise = this.props.onSave &&
      this.props.onSave(task)

    promise &&
      promise
        .then(() => {
          this.setState({
            isFetching: false
          })
          this._clearAllFields()
        })
  }

  /**
   * Vanishes all user input
   */
  _clearAllFields = () => {
    this.setState({
      taskName: '',
      taskDescription: '',
      completionDate: '',
      status: TASK_STATUS_PROCESSING,
      importanceHidden: true,
      importance: '',
      tag: ''
    })
  }

  /**
   * Returns title of editor based on declared editor variant
   */
  _getTitle = () => {
    switch (this.props.variant) {
      case EDITOR_VARIANT_CREATION:
        return 'Новая задача'
      case EDITOR_VARIANT_EDITING:
        return 'Редактирование'
      default:
        return ''
    }
  }

  /**
   * Returns save button text based on declared editor variant
   */
  _getSaveBtnText = () => {
    switch (this.props.variant) {
      case EDITOR_VARIANT_CREATION:
        return 'Создать'
      case EDITOR_VARIANT_EDITING:
        return 'Сохранить'
      default:
        return ''
    }
  }

  render() {
    const { 
      open, 
      classes
    } = this.props
    const { 
      taskName, 
      taskDescription, 
      completionDate, 
      status,
      isFetching, 
      importanceHidden, 
      importance, 
      taskNameError,
      tag
    } = this.state

    return (
      <Drawer open={open}>
        <div className={classes.root}>
          <div className={classes.titleContainer}>
            <Typography variant='h6' color='inherit'>
              {
                this._getTitle()
              }
            </Typography>
          </div>
          <div className={classes.fieldsContainer}>
            <TextField
              value={taskName}
              onChange={this.handleTaskNameChange}
              className={classes.field}
              variant='outlined'
              label='Название'
              error={taskNameError}
            />
            <TextField
              variant='outlined'
              onChange={this.handleChange('taskDescription')}
              multiline
              label='Описание'
              className={classes.field}
              value={taskDescription}
            />
            <TextField
              label='Дата завершения'
              type='date'
              value={completionDate}
              onChange={this.handleDateChange}
              className={classes.field}
              InputLabelProps={{
                shrink: true
              }}
            />
            {
              !importanceHidden &&
              <RadioGroup
                value={importance}
                onChange={this.handleChange('importance')}
              >
                <FormControlLabel value={TASK_IMPORTANCE_1} control={<Radio />} label={TASK_IMPORTANCE_1} />
                <FormControlLabel value={TASK_IMPORTANCE_2} control={<Radio />} label={TASK_IMPORTANCE_2} />
                <FormControlLabel value={TASK_IMPORTANCE_3} control={<Radio />} label={TASK_IMPORTANCE_3} />
                <FormControlLabel value={TASK_IMPORTANCE_4} control={<Radio />} label={TASK_IMPORTANCE_4} />
              </RadioGroup>
            }
            <Select
              className={classes.field}
              value={status}
              onChange={this.handleChange('status')}
            >
              <MenuItem value={TASK_STATUS_DONE}>{TASK_STATUS_DONE}</MenuItem>
              <MenuItem value={TASK_STATUS_LATER}>{TASK_STATUS_LATER}</MenuItem>
              <MenuItem value={TASK_STATUS_PROCESSING}>{TASK_STATUS_PROCESSING}</MenuItem>
            </Select>
            <Autocomplete
              selectedItem={tag}
              items={DEFAULT_TAG_VALUES}  
              className={classes.field} 
              onChange={this.handleTagChange}
            />
          </div>
          <Grid 
            container 
            className={classes.actionBtnContainer}
          >
            {
              isFetching &&
              <LinearProgress className={classes.progress} />
            }
            <Grid item xs={6}>
              <Button
                className={classes.actionBtn} 
                onClick={this.handleSaveClick}
              >
                {
                  this._getSaveBtnText()
                }
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                className={classes.actionBtn} 
                onClick={this.handleCancelClick}
              >
                Отмена
              </Button>
            </Grid>
          </Grid>
        </div>
      </Drawer>
    )
  }
}

const TaskEditorStyled = withStyles(styles)(TaskEditor)

export { TaskEditorStyled as TaskEditor }
