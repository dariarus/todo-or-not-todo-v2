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

export type TTaskInputs = {
  isPopupInput: boolean,
  taskNameValue: string,
  taskDescriptionValue: string | undefined,
  setTaskNameValue: (e: ChangeEvent<HTMLInputElement>) => void,
  setTaskDescriptionValue: (e: ChangeEvent<HTMLTextAreaElement>) => void,
}

export type TIsDoneCheckbox = {
  checked: boolean,
  onChange: () => void,
  labelId?: string,
}