import React, { Component } from 'react'
import { withStyles, Grid, Table, TableCell, TableRow, TableHead, TableBody, Button, IconButton, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types'
import EditIcon from '@material-ui/icons/Edit'
import RemoveIcon from '@material-ui/icons/Remove'

const styles = theme => ({
  tableBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44
  }
})

class TaskTable extends Component {
  static propTypes = {
    columnNames: PropTypes.array.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    editClick: PropTypes.func,
    removeClick: PropTypes.func
  }

  handleEditBtnClick = data => event => {
    this.props.editClick &&
      this.props.editClick(data)
  }

  handleRemoveBtnClick = data => event => {
    this.props.removeClick &&
      this.props.removeClick(data)
  }

  render() {
    const { classes, columnNames, tasks } = this.props

    return (
      <Table>
        <TableHead>
          <TableRow>
            {
              columnNames.map((name, i) => (
                <TableCell key={i}>
                  {name}
                </TableCell>
              ))
            }
            <TableCell>
              Действия
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            tasks.map(task => (
              <TableRow key={task.data.id}>
                {
                  Object.keys(task.data).map((key, i) => (
                    <TableCell key={i}>
                      {task.data[key]}
                    </TableCell>
                  ))
                }
                <TableCell>
                  <Grid container wrap='nowrap'>
                    <IconButton onClick={this.handleEditBtnClick(task)}>
                      <EditIcon fontSize='small'/>
                    </IconButton>
                    {
                      task.isRemoveFetching ?
                        <div className={classes.tableBtnContainer}>
                          <CircularProgress size={32}/>
                        </div>
                      :
                      <div className={classes.tableBtnContainer}>
                        <IconButton onClick={this.handleRemoveBtnClick(task)}>
                          <RemoveIcon fontSize='small'/>
                        </IconButton>
                      </div>
                    }
                  </Grid>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
  }
}

const TaskTableStyled = withStyles(styles)(TaskTable)

export { TaskTableStyled as TaskTable }
