// app/api/tasks/route.js

let tasks = []; // Bellek içi veri kaynağı

export async function GET(request) {
    return new Response(JSON.stringify(tasks), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function POST(request) {
    const task = await request.json();
    task.id = new Date().getTime(); // ID atama
    tasks.push(task);
    return new Response(JSON.stringify(task), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function PUT(request) {
    const updatedTask = await request.json();
    tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
    return new Response(JSON.stringify(updatedTask), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function DELETE(request) {
    const { id } = await request.json();
    tasks = tasks.filter(task => task.id !== id);
    return new Response(JSON.stringify({ message: 'Task deleted' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
