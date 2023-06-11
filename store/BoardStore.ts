import { ID, databases, storage } from '@/appwrite';
import { getTodosGroupedByColoumn } from '@/lib/getTodosGroupedByColoumn';
import uploadImage from '@/lib/uploadImage';
import { create } from 'zustand'


interface BoardStoreInterface {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypeColoum) => void

    searchString: string
    setSeacrhString: (searchString: string) => void

    newTaskInput: string
    setNewTaskInput: (newTaskInput: string) => void


    newTaskType: TypeColoum
    setNewTaskType: (columnId: TypeColoum) => void

    image: File | null
    setImage: (image: File | null) => void


    deleteTask: (taskIndex: number, todo: Todo, id: TypeColoum) => void

    addtask: (todo: string, columnId: TypeColoum, image: File | null) => void

}

export const useBoardStore = create<BoardStoreInterface>((set, get) => ({
    board: {
        coloums: new Map<TypeColoum, Column>()
    },

    searchString: '',
    setSeacrhString: (searchString) => set({ searchString }),

    newTaskInput: '',
    setNewTaskInput: (newTaskInput) => set({ newTaskInput }),

    newTaskType: "todo",
    setNewTaskType: (columnId: TypeColoum) => set({ newTaskType: columnId }),

    image: null,
    setImage: (image: File | null) => set({ image }),

    getBoard: async () => {
        const board = await getTodosGroupedByColoumn()
        set({ board })
    },
    setBoardState: (board) => set({ board }),
    updateTodoInDB: async (todo: Todo, columnId: TypeColoum) => {
        await databases.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, todo.$id, { title: todo.title, status: columnId })
    },

    deleteTask: async (taskIndex: number, todo: Todo, id: TypeColoum) => {
        const newColumns = new Map(get().board.coloums)

        newColumns.get(id)?.todos.splice(taskIndex, 1)
        set({ board: { coloums: newColumns } })
        if (todo.image) {
            await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
        }

        await databases.deleteDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, todo.$id)
    },

    addtask: async (todo: string, columnId: TypeColoum, image: File | null) => {
        let file: Image | undefined
        const fileUploded = await uploadImage(image);
        if (fileUploded) {
            file = {
                bucketId: fileUploded.bucketId,
                fileId: fileUploded.$id
            }
        }
        const { $id } = await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                status: columnId,
                ...(file && { image: JSON.stringify(file) })
            }
        )

        set({ newTaskInput: '' })

        set((state) => {
            const newColumns = new Map(state.board.coloums);
            const newTodo: Todo = {
                $id,
                $createdAt: new Date().toISOString(),
                title: todo,
                status: columnId,
                ...(file && { image: JSON.stringify(file) })
            }

            const coloum = newColumns.get(columnId)

            if (!coloum) {
                newColumns.set(columnId, { id: columnId, todos: [newTodo] })
            } else {
                newColumns.get(columnId)?.todos.push(newTodo)
            }

            return {
                board: { coloums: newColumns }
            };
        })
    }



}))