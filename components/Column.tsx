import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { PlusCircleIcon } from '@heroicons/react/24/solid'

type Props = {
    id: TypeColoum
    todos: Todo[]
    index: number
}

const idTOColumnText: {
    [key in TypeColoum]: string
} = {
    'todo': 'To Do',
    'inprogress': 'In Progress',
    'done': 'Done'
}

function Column({ id, todos, index }: Props) {
    console.log(index, 'index')
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {/* render dropable todos in column */}
                    <Droppable droppableId={index.toString()} type='card'>
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className={`pb-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'}`}>
                                <h2 className='flex justify-between font-bold text-xl p-2'>
                                    {idTOColumnText[id]}
                                    <span className='text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal'>
                                        {todos.length}
                                    </span>
                                </h2>
                                <div className='space-y-2'>
                                    {todos.map((todo, index) => (
                                        <Draggable key={todo.$id} index={index} draggableId={todo.$id} >
                                            {(provided) => (
                                                <TodoCard
                                                    todo={todo}
                                                    id={id}
                                                    index={index}
                                                    dragHandleProps={provided.dragHandleProps}
                                                    draggableProps={provided.draggableProps}
                                                    innerRef={provided.innerRef}
                                                ></TodoCard>
                                            )}

                                        </Draggable>
                                    ))}

                                    {provided.placeholder}

                                    <div className='flex items-end justify-end p-2'>
                                        <button className='text-green-500 hover:text-green-600'>
                                            <PlusCircleIcon
                                                className='h-10 w-10'
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>

            )}

        </Draggable>
    )
}

export default Column