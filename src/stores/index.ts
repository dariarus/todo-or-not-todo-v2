import {Tasks} from './tasks';
import {Popup} from './popup';

class MainStore {
  tasks: Tasks;
  popup: Popup;

  constructor() {
    this.tasks = new Tasks();
    this.popup = new Popup();
  }
}

const mainStore = new MainStore();
export default mainStore;