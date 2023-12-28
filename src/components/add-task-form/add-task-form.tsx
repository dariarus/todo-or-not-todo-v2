import React, {ChangeEvent, MouseEvent, FunctionComponent, useState, FormEvent} from 'react';

import addTaskFormStyles from './add-task-form.module.css';

import {IInputsValuesState} from '../../services/types/state';
import {TAddTasksForm} from '../../services/types/props';

import {inputsValuesInitialState} from '../../utils/constants';
import {generateUniqueId} from '../../utils/functions';
import {RadioButton} from '../radio-button/radio-button';
import {TaskInputs} from '../task-inputs/task-inputs';
import {observer} from 'mobx-react-lite';
import mainStore from '../../stores';

export const AddTaskForm: FunctionComponent<TAddTasksForm> = observer((props) => {
  const [inputsValues, setInputsValues] = useState<IInputsValuesState>(inputsValuesInitialState);

  return (
    <form className={addTaskFormStyles.form}
          onChange={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
          }}
    >
      <TaskInputs
        isPopupInput={false}
        taskNameValue={inputsValues.textInputValue}
        taskDescriptionValue={inputsValues.textAreaValue}
        setTaskNameValue={(e: ChangeEvent<HTMLInputElement>) => {
          setInputsValues({
            ...inputsValues,
            textInputValue: e.target.value
          })
        }}
        setTaskDescriptionValue={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setInputsValues({
            ...inputsValues,
            textAreaValue: e.target.value
          })
        }}/>
      <button type="submit"
              className={addTaskFormStyles.button}
              disabled={inputsValues.textInputValue === ''}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                // props.onAddTask({
                mainStore.tasks.addNewTask({
                  id: generateUniqueId(),
                  name: inputsValues.textInputValue,
                  description: inputsValues.textAreaValue ? inputsValues.textAreaValue : undefined,
                  isDone: false
                });
                setInputsValues(inputsValuesInitialState);
              }}
      >
        Добавить<br/>задачу
      </button>
    </form>
  )
})