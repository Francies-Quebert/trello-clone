import { databases } from '@/appwrite';
import { getTodosGroupedByColoumn } from '@/lib/getTodosGroupedByColoumn';
import { create } from 'zustand'


interface BoardStoreInterface {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypeColoum) => void
    searchString: string
    setSeacrhString: (searchString: string) => void
}

export const useBoardStore = create<BoardStoreInterface>((set) => ({
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
    updateTodoInDB: async (todo, coloumId) => {
        await databases.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, todo.$id, { title: todo.title, status: coloumId })
    }

}))