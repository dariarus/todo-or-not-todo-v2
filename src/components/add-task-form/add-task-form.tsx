import React, {ChangeEvent, MouseEvent, FunctionComponent, useState, FormEvent} from 'react';

import addTaskFormStyles from './add-task-form.module.css';

import {IInputsValuesState} from '../../services/types/state';

import {inputsValuesInitialState} from '../../utils/constants';
import {generateUniqueId} from '../../utils/functions';
import {RadioButton} from '../radio-button/radio-button';
import {TaskInputs} from '../task-inputs/task-inputs';
import {observer} from 'mobx-react-lite';
import mainStore from '../../stores';
import taskInputsStyles from '../task-inputs/task-inputs.module.css';

export const AddTaskForm: FunctionComponent = observer(() => {
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
        isDisabled={inputsValues.textInputValue === ''}
        isStatusCheckboxChecked={inputsValues.isImportant}
        setTaskNameValue={(e: ChangeEvent<HTMLInputElement>) => {
          setInputsValues({
            ...inputsValues,
            textInputValue: e.target.value
          })
        }}
        setTaskStatus={() => {
          setInputsValues({
            ...inputsValues,
            isImportant: !inputsValues.isImportant
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
                mainStore.tasks.addNewTask({
                  id: generateUniqueId(),
                  name: inputsValues.textInputValue,
                  description: inputsValues.textAreaValue ? inputsValues.textAreaValue : undefined,
                  isImportant: inputsValues.isImportant,
                  isDone: false,
                });
                setInputsValues(inputsValuesInitialState);
                mainStore.tasks.setShowingTasksArray();
              }}
      >
        Добавить<br/>задачу
      </button>
    </form>
  )
})