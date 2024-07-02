import { useEffect, useState } from "react";

export function TasksComponent() {

    const [tasks, setTasks] = useState(() => {
        const localStorageTasks = window.localStorage.getItem('tasks')
        return new Map(JSON.parse(localStorageTasks)) || new Map();
    })

    useEffect(() => {
        console.debug('Saving your tasks to Local Storage!')
        let tasksToSave = Array.from(tasks.entries())
        localStorage.setItem('tasks', JSON.stringify(tasksToSave))
    })

    function handleTaskAdd(event) {
        event.preventDefault()
        const description = event.target.elements.newTaskInput.value

        if (!description) return

        let newTaskId = tasks.size || 0
        let newTask = {
            description: description,
            complete: false
        }

        setTasks(
            new Map(tasks)
                .set(newTaskId, newTask))
        console.log(`Added task with ID: [${newTaskId}] and description: [${newTask.description}]`)
    }

    function handleTaskCompleted(taskId) {
        const newTasks = new Map(tasks)
        newTasks.get(taskId).complete = true
        setTasks(newTasks)
    }

    return (
        <ul>
            {
                Array.from(
                    tasks,
                    ([key, value]) => (
                        {
                            id: key,
                            description: value.description,
                            complete: value.complete
                        }
                    ))
                    .map(task => (
                            <>
                                <li key={`task-${task.id}`} aria-label={task.description}>
                                    {task.description}
                                </li>
                                <button
                                    key={`task-${task.id}-button`}
                                    onClick={() => handleTaskCompleted(task.id)}
                                    disabled={task.complete}
                                    aria-label="Mark task as complete"
                                >
                                    { task.complete ? 'Completed!' : 'Done' }
                                </button>
                            </>
                        )
                    )
            }
            <li>
                <form onSubmit={handleTaskAdd}>
                    <input id="newTaskInput" type="text" aria-label="Add a new task" onSubmit={handleTaskAdd} />
                    <button type="submit" aria-label="Add this task to your list">+</button>
                </form>
            </li>
        </ul>
    )
}