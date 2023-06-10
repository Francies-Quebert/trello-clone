import { useBoardStore } from '@/store/BoardStore';
import { XCircleIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

type Props = {
    todo: Todo;
    index: number;
    id: TypeColoum;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}
function TodoCard({ todo, index, id, dragHandleProps, draggableProps, innerRef }: Props) {

    const deleteTask = useBoardStore(state => state.deleteTask)
    return (
        <div
            className='bg-white rounded-md space-y-2 drop-shadow-md'
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
        >
            <div className='flex justify-between items-center p-5'>
                <p>{todo.title}</p>
                <button className='text-red-500 hover:text-red-600' onClick={() => deleteTask(index, todo, id)}>
                    <XCircleIcon className='ml-5 h-8 w-8' />
                </button>
                {/* Add Image Here */}
                {/* {imageUrl && ()} */}
            </div>
        </div>
    )
}

export default TodoCard