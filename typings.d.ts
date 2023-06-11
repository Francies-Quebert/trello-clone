interface Board {
    coloums: Map<TypeColoum, Column>
}

type TypeColoum = 'todo' | 'inprogress' | 'done'

interface Column  {
    id: TypeColoum;
    todos: Todo[];
}

interface Todo extends Models.documents {
    $id: string;
    $createdAt: string;
    title:string
    status: string;
    image?: string | Models.FileList
}

interface Image {
    bucketId: string;
    fileId: string
}