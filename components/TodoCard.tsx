import getURL from '@/lib/getURL';
import { useBoardStore } from '@/store/BoardStore';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
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

    const [imageURl, setImageURl] = useState<string | null>(null)

    useEffect(() => {
        if (todo.image) {
            const fetchImage = async () => {
                let image = todo.image;
                if (typeof todo.image === 'string') image = JSON.parse(todo.image)
                const url = getURL(image!)
                if (url) {
                    setImageURl(url.toString())
                }
            }
            fetchImage()
        }
    }, [])


    return (
        <div
            className='bg-white rounded-md space-y-2 drop-shadow-md'
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
        >
            <div className='flex flex-col '>
                <div className='flex justify-between items-center p-5'>
                    <p>{todo.title}</p>
                    <button className='text-red-500 hover:text-red-600' onClick={() => deleteTask(index, todo, id)}>
                        <XCircleIcon className='ml-5 h-8 w-8' />
                    </button></div>
                {/* Add Image Here */}
                {imageURl && (
                    <div className='h-full w-full rounded-b-md'>
                        <Image src={imageURl} width={400} height={200} alt='Task Image' className='w-full object-contain rounded-b-md' />
                    </div>
                )}
            </div>
        </div>
    )
}

export default TodoCard