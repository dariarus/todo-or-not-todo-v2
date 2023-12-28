import React, {ChangeEvent, FunctionComponent, useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import ReactDOM from 'react-dom';

import popupStyles from './popup.module.css';

import {Overlay} from '../overlay/overlay';
import {TaskInputs} from '../task-inputs/task-inputs';
import {IsDoneCheckbox} from '../is-done-checkbox/is-done-checkbox';

import mainStore from '../../stores';

import {IInputsValuesState} from '../../services/types/state';

import {inputsValuesInitialState} from '../../utils/constants';

export const Popup: FunctionComponent = observer(() => {
  const [inputsValues, setInputsValues] = useState<IInputsValuesState>(inputsValuesInitialState);
  const [taskIsDone, setTaskIsDone] = useState<boolean>(mainStore.popup.openedTask.isDone);

  const popupRoot = document.getElementById('popup');

  const handleEscClose = useCallback((evt: KeyboardEvent): void => {
    if (evt.key === 'Escape') {
      mainStore.popup.setPopupIsClosed()
    }
  }, [mainStore.popup.isOpened])

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose)
    return () => {
      document.removeEventListener("keydown", handleEscClose)
    }
  }, [handleEscClose])

  if (popupRoot !== null) {
    return ReactDOM.createPortal(
      (
        <>
          <Overlay onClose={() => mainStore.popup.setPopupIsClosed()}/>
          <div className={popupStyles.popup}>
            <button className={popupStyles['popup__cross-icon']} onClick={() => mainStore.popup.setPopupIsClosed()}>
            </button>
            <h3 className={`${popupStyles['popup__text']} ${popupStyles['popup__text_heading']}`}>Редактировать
              задачу</h3>
            <form className={popupStyles.popup__form}>
              <TaskInputs
                isPopupInput={true}
                taskNameValue={mainStore.popup.openedTask.name}
                taskDescriptionValue={mainStore.popup.openedTask.description}
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
                }}
              />
              <div className={popupStyles['popup__checkbox-wrap']}>
                <IsDoneCheckbox
                  id={mainStore.popup.openedTask.name}
                  checked={taskIsDone}
                  onChange={() => {
                    mainStore.tasks.changeTaskStatus(mainStore.popup.openedTask.id);
                    setTaskIsDone(!taskIsDone)
                  }}/>
                <label htmlFor={mainStore.popup.openedTask.name} className={popupStyles['popup__checkbox-label']}>Задача выполнена</label>
              </div>
              <div className={popupStyles['popup__buttons-wrap']}>
                <button
                  type="submit"
                  className={`${popupStyles.popup__button} ${popupStyles.popup__button_type_save}`}
                  onClick={() => console.log('hi')}
                >Сохранить</button>
                <button
                  type="submit"
                  className={`${popupStyles.popup__button} ${popupStyles.popup__button_type_cancel}`}
                  onClick={() => mainStore.popup.setPopupIsClosed()}
                >Отменить</button>
              </div>
            </form>
          </div>
        </>
      ), popupRoot
    )
  } else return null
})