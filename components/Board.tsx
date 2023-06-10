'use client'

import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

function Board() {
    const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [state.board, state.getBoard, state.setBoardState, state.updateTodoInDB])
    useEffect(() => {

        getBoard()
        return () => {
        }
    }, [])

    function handleOnDrapEnd(result: DropResult) {
        const { destination, source, type } = result
        // check if droped outside od board
        if (!destination) return

        // handle coumn drag
        if (type === 'column') {
            const entries = Array.from(board.coloums.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const reaarangedColumns = new Map(entries);
            setBoardState({ ...board, coloums: reaarangedColumns })

        }
        const columns = Array.from(board.coloums);
        const startColIndex = columns[Number(source.droppableId)]
        const finishColIndex = columns[Number(destination.droppableId)]


        const startCol: Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos
        }

        const finshCol: Column = {
            id: finishColIndex[0],
            todos: finishColIndex[1].todos
        }
        if (!startColIndex || !finishColIndex) return;

        if (source.index === destination.index && startCol === finshCol) return;

        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1)

        if (startCol.id === finshCol.id) {
            // dragging in same column 
            newTodos.splice(destination.index, 0, todoMoved)
            const newCol = {
                id: startCol.id,
                todos: newTodos
            }

            const newColumns = new Map(board.coloums)
            newColumns.set(startCol.id, newCol)
            setBoardState({ ...board, coloums: newColumns })
        } else {
            // dragging in new column
            const finishTodos = Array.from(finshCol.todos);
            finishTodos.splice(destination.index, 0, todoMoved)

            const newColumns = new Map(board.coloums)
            const newCol = {
                id: startCol.id,
                todos: newTodos
            }

            newColumns.set(startCol.id, newCol)
            newColumns.set(finshCol.id, { id: finshCol.id, todos: finishTodos })

            // Update In DB 
            updateTodoInDB(todoMoved, finshCol.id)

            setBoardState({ ...board, coloums: newColumns })
        }
    }

    return (
        <DragDropContext onDragEnd={handleOnDrapEnd}>
            <Droppable droppableId='board' direction='horizontal' type='column'>
                {(provided, snapshot) => {
                    return <div
                        className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {/* rendering all the coumn */}
                        {Array.from(board.coloums.entries()).map(([id, column], index) => {
                            return (<Column
                                key={id}
                                id={id}
                                todos={column.todos}
                                index={index}
                            />)
                        })}
                    </div>

                }}
            </Droppable>
        </DragDropContext>
    )
}

export default Board