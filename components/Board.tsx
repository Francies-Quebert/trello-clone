'use client'

import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

function Board() {
    const [board, getBoard, setBoardState] = useBoardStore((state) => [state.board, state.getBoard, state.setBoardState])
    useEffect(() => {

        getBoard()
        return () => {
        }
    }, [])

    function handleOnDrapEnd(result: DropResult) {
        const { destination, source, type } = result
        console.log(destination, source, type)
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