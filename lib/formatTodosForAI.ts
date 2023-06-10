export const formatTodosForAI = (board: Board) => {
    const todos = Array.from(board.coloums.entries())

    const flatArray = todos.reduce((map, [key, value]) => {
        map[key] = value.todos;
        return map;
    }, {} as { [key in TypeColoum]: Todo[] })

    const flatArrayCounted = Object.entries(flatArray).reduce((map, [key, value]) => {
        map[key as TypeColoum] = value.length
        return map
    }, {} as { [key in TypeColoum]: number });

    return flatArrayCounted
}