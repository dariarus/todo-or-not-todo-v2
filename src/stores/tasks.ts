import {makeAutoObservable} from 'mobx';
import {TTask} from '../services/types/props';
import {TaskCompletion} from '../services/types/state';

export class Tasks {
  fullTasksArray: TTask[] = [];
  showingTasksArray: TTask[] = [];
  taskNameFilterValue: string = '';
  taskCompletionFilterValue: TaskCompletion = TaskCompletion.ALL;

  constructor() {
    makeAutoObservable(this);
  }

  setFullTasksArray(refreshedTasksArray: TTask[]) {
    this.fullTasksArray = refreshedTasksArray;
  }

  addNewTask(newTask: TTask) {
    this.fullTasksArray.unshift(newTask);
  }

  setTaskCompletionFilterValue(value: TaskCompletion) {
    this.taskCompletionFilterValue = value;
  }

  setCompletionTaskFilterCondition(task: TTask) {
    switch (this.taskCompletionFilterValue) {
      case TaskCompletion.ALL:
        return true;
      case TaskCompletion.UNDONE:
        return !task.isDone;
      case TaskCompletion.DONE:
        return task.isDone;
    }
  }

  setTaskNameFilterValue(value: string) {
    this.taskNameFilterValue = value;
  }

  setSearchTaskCondition(task: TTask) {
    if (!this.taskNameFilterValue) {
      return true;
    }
    return task.name.toLowerCase().includes(this.taskNameFilterValue) || task.description?.toLowerCase().includes(this.taskNameFilterValue)
  }

  setShowingTasksArray() {
    this.showingTasksArray = this.fullTasksArray
      .filter((task) => this.setCompletionTaskFilterCondition(task) && this.setSearchTaskCondition(task))
  }

  changeTaskStatus(taskId: string) {
    if (taskId) {
      const task = this.fullTasksArray.find(task => task.id === taskId);
      if (task) {
        task.isImportant = !task.isImportant;
      }
    }
    this.setShowingTasksArray();
  }

  changeTaskIsDone(taskId: string) {
    if (taskId) {
      const task = this.fullTasksArray.find(task => task.id === taskId);
      if (task) {
        task.isDone = !task.isDone;
        if (task.isDone) {
          task.closeDate = new Date();
        } else {
          task.closeDate = null;
        }
      }
    }
    this.setShowingTasksArray();
  }

  editTask(taskId: string, taskName: string, taskDescription: string | undefined, isDone: boolean, isImportant: boolean) {
    if (taskId) {
      const task = this.fullTasksArray.find(task => task.id === taskId);
      if (task) {
        task.name = taskName;
        task.description = taskDescription;
        task.isDone = isDone;
        task.isImportant = isImportant;

        if (task.isDone) {
          task.closeDate = new Date();
        } else {
          task.closeDate = null;
        }
      }
    }
    this.setShowingTasksArray();
  }

  deleteTask(taskId: string) {
    if (taskId) {
      const task = this.fullTasksArray.find(task => task.id === taskId);
      let taskIndex = -1;
      if (task) {
        taskIndex = this.fullTasksArray.indexOf(task);
      }
      if (taskIndex > -1) {
        this.fullTasksArray.splice(taskIndex, 1);
      }
    }
    this.setShowingTasksArray();
  }
}