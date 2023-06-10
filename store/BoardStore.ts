import { databases, storage } from '@/appwrite';
import { getTodosGroupedByColoumn } from '@/lib/getTodosGroupedByColoumn';
import { create } from 'zustand'


interface BoardStoreInterface {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypeColoum) => void

    searchString: string
    setSeacrhString: (searchString: string) => void

    deleteTask: (taskIndex: number, todo: Todo, id: TypeColoum) => void
}

export const useBoardStore = create<BoardStoreInterface>((set, get) => ({
    board: {
        coloums: new Map<TypeColoum, Column>()
    },

    searchString: '',
    setSeacrhString: (searchString) => set({ searchString }),

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
    }



}))