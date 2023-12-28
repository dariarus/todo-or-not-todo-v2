import {makeAutoObservable} from 'mobx';
import {TTask} from '../services/types/props';

export class Popup {
  openedTask: TTask = {
    id: '',
    name: '',
    description: undefined,
    isDone: false,
  };
  isOpened: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPopupIsOpened(taskId: string, taskName: string, taskDescription: string | undefined, taskStatus: boolean) {
    this.isOpened = true;
    this.openedTask = {
      id: taskId,
      name: taskName,
      description: taskDescription,
      isDone: taskStatus,
    }
  }

  setPopupIsClosed() {
    this.isOpened = false;
    this.openedTask = {
      id: '',
      name: '',
      description: undefined,
      isDone: false,
    }
  }
}