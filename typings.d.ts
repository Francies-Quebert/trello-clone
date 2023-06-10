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
    status: string;
    image?: string
}

interface Image {
    bucketId: string;
    fielId: string
}