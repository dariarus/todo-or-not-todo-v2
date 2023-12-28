import {makeAutoObservable} from 'mobx';
import {TTask} from '../services/types/props';


export class Tasks {
  fullTasksArray: TTask[] = [];
  showingTasksArray: TTask[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setFullTasksArray(refreshedTasksArray: TTask[]) {
    this.fullTasksArray = refreshedTasksArray;
  }

  setShowingTasksArray(refreshedTasksArray: TTask[]) {
    this.showingTasksArray = refreshedTasksArray;
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