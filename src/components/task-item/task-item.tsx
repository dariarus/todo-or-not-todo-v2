import React, {FunctionComponent, useCallback, useRef, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {DropTargetMonitor, useDrag, useDrop} from 'react-dnd';
import {Identifier, XYCoord} from 'dnd-core';

import taskItemStyles from './task-item.module.css';

import {IsDoneCheckbox} from '../is-done-checkbox/is-done-checkbox';

import mainStore from '../../stores';

import {TTaskItem} from '../../services/types/props';

export const TaskItem: FunctionComponent<TTaskItem> = observer((props) => {
  const [taskIsDone, setTaskIsDone] = useState<boolean>(props.isDone);

  const ref = useRef<HTMLLIElement>(null);

  const [{isDragging}, dragRef] = useDrag({
    type: 'task',
    item: () => {
      return {index: props.index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })

  const [{handlerId}, dropRef] = useDrop<TTaskItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'task',
    collect(monitor: DropTargetMonitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover: (item: TTaskItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index
      const hoverIndex = props.index

      // Не замещать элементы самими собой
      if (dragIndex === hoverIndex) {
        return;
      }

      // вычислить пространство экрана:
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // вычислить середину по вертикали:
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // вычислить, где находится указатель мыши:
      const clientOffset = monitor.getClientOffset();
      // расстояние от верха экрана:
      const hoverActualY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      /* Выполняем перемещение только тогда, когда мышь пересекла половину высоты элемента.
      При перетаскивании вниз перемещение элемента происходит только тогда, когда курсор находится ниже 50% высоты элемента
      При перетаскивании вверх перемещение элемента происходит только тогда, когда курсор находится выше 50% высоты элемента */

      // При перетаскивании вниз совершать действие только в случае, если hover меньше, чем middleY
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // При перетаскивании вверх совершать действие только в случае, если hover больше, чем middleY
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      props.onMoveTask(dragIndex, hoverIndex);

      /* Примечание из документации. Здесь мы меняем элемент монитора!
      Обычно лучше избегать мутаций,
      но здесь можно применить ради производительности,
      чтобы избежать дорогостоящего поиска по индексу. */
      item.index = hoverIndex;
    }
  })

  dragRef(dropRef(ref));

  const handleOnChangeStatus = useCallback(() => {
    mainStore.tasks.changeTaskStatus(props.id);
    mainStore.tasks.setShowingTasksArray();
  }, [props.isDone])

  return (
    <li ref={ref}
        data-handler-id={handlerId}
        className={isDragging ? `${taskItemStyles.task} ${taskItemStyles['task_is-dragging']}` : `${taskItemStyles.task}`}>
      <IsDoneCheckbox
        checked={props.isDone}
        onChange={handleOnChangeStatus}/>
      {
        props.isDone
          ? <div className={`${taskItemStyles['task__item']} ${taskItemStyles['task__item_is-done']}`}>
            <p
              className={`${taskItemStyles['task__text']} ${taskItemStyles['task__text_heading']} ${taskItemStyles['task__text_crossed']}`}>
              {props.name}
            </p>
            <span
              className={`${taskItemStyles['task__text']} ${taskItemStyles['task__text_description']} ${taskItemStyles['task__text_crossed']}`}>
              {props.description}
            </span>
          </div>
          : <div className={taskItemStyles['task__item']}>
            <p className={`${taskItemStyles['task__text']} ${taskItemStyles['task__text_heading']}`}>{props.name}</p>
            <span
              className={`${taskItemStyles['task__text']} ${taskItemStyles['task__text_description']}`}>{props.description}</span>
          </div>
      }
      <button type="button"
              className={`${taskItemStyles.task__button} ${taskItemStyles['task__button_type_edit']}`}
              onClick={() => {
                mainStore.popup.setPopupIsOpened(props.id, props.name, props.description, props.isDone);
              }}
      />
      <button type="button"
              className={`${taskItemStyles.task__button} ${taskItemStyles['task__button_type_delete']}`}
              onClick={() => {
                mainStore.tasks.deleteTask(props.id);
              }}
      />
    </li>
  )
})