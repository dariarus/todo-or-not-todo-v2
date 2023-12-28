import {makeAutoObservable} from 'mobx';
import {Task} from './task';
import {TTask} from '../services/types/props';

export class Tasks {
  fullTasksArray: TTask[] = [];
  showingTasksArray: TTask[] = [];
  showingTasksFilter: (task: TTask) => boolean = task => true;

  constructor() {
    makeAutoObservable(this);
  }

  setFullTasksArray(refreshedTasksArray: TTask[]) {
    this.fullTasksArray = refreshedTasksArray;
  }

  setFilterTasksCallback(showingTasksFilter: (task: TTask) => boolean) {
    this.showingTasksFilter = showingTasksFilter;
  }

  setShowingTasksArray() {
    this.showingTasksArray = this.fullTasksArray.filter(this.showingTasksFilter)
  }

  addNewTask(newTask: TTask) {
    this.fullTasksArray.push(newTask);
  }

  changeTaskStatus(taskId: string) {
    if (taskId) {
      const task = this.fullTasksArray.find(task => task.id === taskId);
      if (task) {
        task.isDone = !task.isDone;
      }
    }
  }

  editTask(taskId: string, taskName: string, taskDescription: string | undefined, taskStatus: boolean) {
    if (taskId) {
      const task = this.fullTasksArray.find(task => task.id === taskId);
      if (task) {
        task.name = taskName;
        task.description = taskDescription;
        task.isDone = taskStatus;
      }
    }
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
  }
}