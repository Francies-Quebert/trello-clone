import { databases } from "@/appwrite"

export const getTodosGroupedByColoumn = async () => {
    const data = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!)
    const todos = data.documents
    const coloums = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }
        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            status: todo.status,
            title: todo.title,
            ...(todo.image && { image: JSON.parse(todo.image) })
        })

        return acc;
    }, new Map<TypeColoum, Column>)

    const columnTypes: TypeColoum[] = ['todo', 'inprogress', 'done']
    for (const columnType of columnTypes) {
        if (!coloums.get(columnType)) {
            coloums.set(columnType, {
                id: columnType,
                todos: []
            })

        }
    }

    const sortedColoumn = new Map(Array.from(coloums.entries()).sort((a, b) =>
        columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    ))
    const board: Board = { coloums: sortedColoumn }
    return board
}