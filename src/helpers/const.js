import { getNextId } from "./db";

export const TASK_STATUS_PROCESSING = 'Выполняется'
export const TASK_STATUS_LATER = 'На потом'
export const TASK_STATUS_DONE = 'Выполнена'
export const DEFAULT_TAG_VALUES = [
  'tag1',
  'tag2',
  'tag3',
  'tag4',
  'tag5'
]
export const TASK_IMPORTANCE_1 = 'Срочная важная задача'
export const TASK_IMPORTANCE_2 = 'Срочная неважная задача'
export const TASK_IMPORTANCE_3 = 'Несрочная важная задача'
export const TASK_IMPORTANCE_4 = 'Несрочная неважная задача'

export const createTask = (status, taskName, taskDescription, completionDate, importance, tag) => {
  return {
    data: {
      id: getNextId(), 
      status, 
      taskName, 
      taskDescription, 
      completionDate, 
      importance, 
      tag
    },
    isRemoveFetching: false
  }
}