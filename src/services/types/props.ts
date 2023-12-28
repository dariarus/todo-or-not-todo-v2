import {ChangeEvent} from 'react';

export type TTask = {
  id: string,
  name: string,
  description: string | undefined,
  isDone: boolean,
}

export type TTaskItem = TTask & {
  index: number,
  onMoveTask: (dragIndex: number, hoverIndex: number) => void
}

export type TRadioButton = {
  label: string,
  value: string,
  isChecked: boolean,
  onClickRadio: (event: ChangeEvent<HTMLInputElement>) => void
}

export type TAddTasksForm = {
  onAddTask: (task: TTask) => void,
}

export type TTaskInputs = {
  isPopupInput: boolean,
  taskNameValue: string,
  taskDescriptionValue: string | undefined,
  setTaskNameValue: (e: ChangeEvent<HTMLInputElement>) => void,
  setTaskDescriptionValue: (e: ChangeEvent<HTMLTextAreaElement>) => void,
}

export type TIsDoneCheckbox = {
  id: string,
  checked: boolean,
  onChange: () => void,
}