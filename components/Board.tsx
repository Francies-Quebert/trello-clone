'use client'

import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function Board() {
    const getBoard = useBoardStore((state) => state.getBoard)
    useEffect(() => {

        getBoard()
        return () => {
        }
    }, [])

    return (<>Board</>
        // <DragDropContext onDragEnd={ } onDragStart={ }>
        //     <Droppable droppableId='board' direction='horizontal' type='card'>
        //         {(provided) => {
        //             return <div>
        //                 {/* rendering all the coumn */}
        //             </div>
        //         }}
        //     </Droppable>
        // </DragDropContext>
    )
}

export default Board