const form = document.getElementById('form-task')
form.addEventListener('submit', saveTask)

const saveButton = document.getElementById('saveTask')

// LocalStorage functions
const getAllTasks = () => JSON.parse(localStorage.getItem('allTasks'))
const setTaksList = list => localStorage.setItem('allTasks', JSON.stringify(list))

const getTasks = () => {
    const allTasks = getAllTasks()
    const tasksList = document.querySelector('#tasksList')

    tasksList.innerHTML = ''

    if (!allTasks || allTasks.length === 0) {
        setTaksList([])
        MessageAlert('tasksList', 'No are tasks')
    }

    allTasks.map(task => {
        const { taskName, description, id } = task

        return tasksList.innerHTML +=
            `<div class"card">
            <div class="card-body">
                <div class="p-1" id="${id}">
                    <div id="taskOrder">
                    </div>
                    <h6>${taskName}</h6>
                    <p>${description}</p>
                    <button class="btn btn-danger" onclick="deleteTask('${id}')">Delete</button>
                    <button class="btn btn-warning text-white" onclick="updateTask('${id}')">Edit</button>
                </div>
            </div>
        </div>
       `
    })
}

function saveTask(e) {
    e.preventDefault()
    const allTasks = getAllTasks()
    const taskName = document.getElementById('task').value
    const description = document.getElementById('description').value
    const id = Math.random()

    if (taskName.length > 0 && description.length > 0) {
        const task = { id, taskName, description }

        const fullTasks = allTasks ? [...allTasks, task] : [task]
        setTaksList(fullTasks)

        form.reset()
        getTasks()
    }
    else MessageAlert('message', 'The fields are empty’s', true , 'danger', 'h5' )
}

function deleteTask(id) {
    const allTasks = getAllTasks()

    const newTasks = allTasks.filter(task => task.id != id)
    setTaksList(newTasks)
    getTasks()
}

function updateTask(taskId) {
    const allTasks = getAllTasks()
    const taskEdit = allTasks.filter(task => task.id == taskId)
    const { taskName, description, id } = taskEdit[0]

    document.getElementById('task').value = taskName
    document.getElementById('description').value = description

    saveButton.innerHTML = `
        <button class="btn btn-warning text-white btn-block">Update</button>
    `

    form.addEventListener('submit', e => saveUpdateTask(e, id))
}

function saveUpdateTask(e, taskId) {
    e.preventDefault()
    const allTasks = getAllTasks()

    const newTasks = allTasks.filter(task => task.id != taskId)
    setTaksList(newTasks)

    saveButton.innerHTML = `
        <button class="btn btn-primary btn-block">Save</button>
    `

    getTasks()
}

function MessageAlert(sectionId, message, timeOut = false, alertType = 'warning', size = 'h3') {
    if(timeOut){
        setTimeout(()=>{
            document.getElementById(sectionId).innerHTML = ''
        },5000)
    }

    return document.getElementById(sectionId).innerHTML = `
            <div class="alert alert-${alertType} mx-5">
                <${size} class="text-center">${message}</${size}>
            </div>
        `
}


getTasks()