import { databases } from "@/appwrite"

export const getTodosGroupedByColoumn = async () => {
    const data = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!)
    console.log(data)
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
            ...(todo.image && { image: JSON.parse(todo.image) })
        })

        return acc;
    }, new Map<TypeColoum, Column>)

    console.log(coloums)
}