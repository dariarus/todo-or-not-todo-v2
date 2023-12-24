import React, {useCallback, useEffect, useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import appStyles from './app.module.css';

import {AddTaskForm} from '../add-task-form/add-task-form';
import {RadioButton} from '../radio-button/radio-button';
import {TaskItem} from '../task-item/task-item';

import {radioButtonsInitialState} from '../../utils/constants';

import {IRadioButtonsState} from '../../services/types/state';
import {TTask} from '../../services/types/props';

function App() {
  const [filterRadioButtons, setFilterRadioButtons] = useState<IRadioButtonsState>(radioButtonsInitialState);
  const [tasksArray, setTasksArray] = useState<Array<TTask>>([]);
  const [showingArray, setShowingArray] = useState<Array<TTask>>(tasksArray);

  const handleSetTasksArray = (task: TTask) => {
    let copiedTasks = [...tasksArray];
    copiedTasks.push(task);
    setTasksArray(copiedTasks);
  }

  const refreshTasksArray = () => {
    if (filterRadioButtons.allIsChecked) {
      setShowingArray(tasksArray);
    } else if (filterRadioButtons.undoneIsChecked) {
      const filteredUndoneTasksArray = tasksArray.filter(task => !task.isDone);
      setShowingArray(filteredUndoneTasksArray);
    } else {
      const filteredDoneTasksArray = tasksArray.filter(task => task.isDone);
      setShowingArray(filteredDoneTasksArray);
    }
  }

  const handleOnChangeTaskStatus = (taskId: string) => {
    let copiedTasks = tasksArray.map(task => {
      return {...task}
    });
    if (taskId) {
      const task = copiedTasks.find(task => task.id === taskId);
      if (task) {
        task.isDone = !task.isDone;
      }
    }
    setTasksArray(copiedTasks);
  }

  const handleOnMoveTask = useCallback((dragIndex: number, hoverIndex: number) => {
    /* Перемещаем элементы в массиве showingArray, отображаемом в зависимости от выбранной сортировки задач,
    на основе его индексов */
    const updatedShowingArray = [...showingArray];

    const dragItem = updatedShowingArray[dragIndex]
    const hoverItem = updatedShowingArray[hoverIndex]

    updatedShowingArray[dragIndex] = hoverItem;
    updatedShowingArray[hoverIndex] = dragItem;

    setShowingArray(updatedShowingArray);

    // Перемещаем элементы в основном массиве tasksArray на основе его индексов
    const updatedTasksArray = [...tasksArray];

    const dragTask = updatedTasksArray.find(task => task.id === dragItem.id);
    const hoverTask = updatedTasksArray.find(task => task.id === hoverItem.id);

    if (dragTask && hoverTask) {
      const dragTaskIndex = updatedTasksArray.indexOf(dragTask);
      const hoverTaskIndex = updatedTasksArray.indexOf(hoverTask);
      updatedTasksArray[dragTaskIndex] = hoverItem;
      updatedTasksArray[hoverTaskIndex] = dragItem;
    }

    setTasksArray(updatedTasksArray);
  }, [tasksArray, showingArray])

  const handleOnDeleteTask = (taskId: string) => {
    let copiedTasks = [...tasksArray];
    if (taskId) {
      const task = copiedTasks.find(task => task.id === taskId);
      let taskIndex = -1;
      if (task) {
        taskIndex = copiedTasks.indexOf(task);
      }
      if (taskIndex > -1) {
        copiedTasks.splice(taskIndex, 1);
      }
    }
    setTasksArray(copiedTasks);
  }

  useEffect(() => {
    refreshTasksArray();
  }, [tasksArray, filterRadioButtons.allIsChecked, filterRadioButtons.undoneIsChecked, filterRadioButtons.doneIsChecked])

  return (
    <main className={appStyles.main}>
      <h1 className={appStyles['todos-board__heading']}>Мои задачи</h1>
      <div className={appStyles['todos-board']}>
        <AddTaskForm tasksArray={tasksArray} onAddTask={handleSetTasksArray}/>
        <div className={appStyles['todos-board__tasks-wrap']}>
          <div className={appStyles['radio-button-wrap']}>
            <RadioButton label="Все задачи" value="all" isChecked={filterRadioButtons.allIsChecked}
                         onClickRadio={() => {
                           setFilterRadioButtons({
                             allIsChecked: true,
                             undoneIsChecked: false,
                             doneIsChecked: false
                           });
                         }}/>
            <RadioButton label="Невыполненные" value="undone" isChecked={filterRadioButtons.undoneIsChecked}
                         onClickRadio={() => {
                           setFilterRadioButtons({
                             allIsChecked: false,
                             undoneIsChecked: true,
                             doneIsChecked: false
                           });
                         }}/>
            <RadioButton label="Выполненные" value="done" isChecked={filterRadioButtons.doneIsChecked}
                         onClickRadio={() => {
                           setFilterRadioButtons({
                             allIsChecked: false,
                             undoneIsChecked: false,
                             doneIsChecked: true
                           });
                         }}/>
          </div>
          <div className={appStyles['todos-board__tasks-list-wrap']}>
            {
              showingArray && showingArray.length > 0
                ? <DndProvider backend={HTML5Backend}>
                  <ul className={appStyles['todos-board__tasks-list']}>
                    {
                      showingArray.map((task, index) => (
                        <TaskItem key={task.id}
                                  id={task.id}
                                  index={index}
                                  name={task.name}
                                  description={task.description}
                                  isDone={task.isDone}
                                  onChangeTaskStatus={handleOnChangeTaskStatus}
                                  onDeleteTask={handleOnDeleteTask}
                                  onMoveTask={handleOnMoveTask}
                        />
                      )).reverse()
                    }
                  </ul>
                </DndProvider>
                : <p className={appStyles['stub-text']}>Нет задач</p>
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;