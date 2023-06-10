import { getTodosGroupedByColoumn } from '@/lib/getTodosGroupedByColoumn';
import { create } from 'zustand'


interface BoardStoreInterface {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void
}

export const useBoardStore = create<BoardStoreInterface>((set) => ({
    board: {
        coloums: new Map<TypeColoum, Column>()
    },
    getBoard: async () => {
        const board = await getTodosGroupedByColoumn()
        set({ board })
    },
    setBoardState: (board) => set({ board })

}))