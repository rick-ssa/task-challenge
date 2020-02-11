// Add your javascript here. Plagiarism is NOT tolerated!

const PRIORITY_LOW = 0
const PRIORITY_MEDIUM = 1
const PRIORITY_HIGH = 2

let task = []

let taskElements = []

let lastId = 0

let editIndex = null

async function addTask (taskText,deadline,priority) {
    if(taskText && deadline) {
        lastId++
        task.push({id:lastId,task:taskText, deadline,priority})
        return true
    } else {
        return false
    }
}

async function edit(newTask,newDeadline,newPriority){
    if(newTask && newDeadline){ 
        console.log(task)
        let myTask = task.reduce((p,v,i)=>{
            if(i===editIndex){
                p = v
                return p
            } else {
                return p
            }
        })

        myTask.task = newTask
        myTask.deadline = newDeadline
        myTask.priority = newPriority
        return true
    } else {
        return false
    }

}

async function render() {

    let container = document.getElementById('container')
    containerClear()
    'fa-plus'
    let add = createCardInputElement('add','fa-plus',addTask)

    taskElements.push(add)

    container.appendChild(add)

    task.map((v,i)=>{      
        let tsk = createTaskElement(v,i)
        taskElements.push(tsk)
        container.appendChild(tsk)       
    })

    let editCard = createCardInputElement('edit','fa-check',edit)
    editCard.style.position = 'absolute'
    editCard.style.zIndex = 1000
    editCard.style.display = 'none'

    taskElements.push(editCard)
    container.appendChild(editCard)
    document.getElementById('addInputTask').focus()
}

function createTaskElement(v,index) {
    let taskWrap = document.createElement('div')
    let taskText = document.createElement('div')
    let taskDetails = document.createElement('div')
    let titleDeadline = document.createElement('div')
    let taskDeadline = document.createElement('div')
    let taskController = document.createElement('div')
    let editButton = document.createElement('div')
    let deleteButton = document.createElement('div')

    taskWrap.classList.add('task-wrap')
    taskWrap.classList.add(definePriorityClass(v.priority))
    taskText.classList.add('task-text')
    taskDetails.classList.add('task-details')
    titleDeadline.classList.add('title-deadline')
    taskDeadline.classList.add('task-deadline')
    taskController.classList.add('task-controller')
    editButton.classList.add('fas')
    editButton.classList.add('fa-edit')
    editButton.classList.add('pointer')
    deleteButton.classList.add('fas')
    deleteButton.classList.add('fa-times')
    deleteButton.classList.add('pointer')

    taskController.appendChild(deleteButton)
    taskController.appendChild(editButton)
    
    taskDeadline.appendChild(document.createTextNode(v.deadline))
    titleDeadline.appendChild(document.createTextNode('Deadline'))
    
    taskDetails.appendChild(titleDeadline)
    taskDetails.appendChild(taskDeadline)
    
    taskText.appendChild(document.createTextNode(v.task))
    
    taskWrap.appendChild(taskText)
    taskWrap.appendChild(taskDetails)
    taskWrap.appendChild(taskController)
    
    taskWrap.id = 'task' + index

    deleteButton.addEventListener('click',()=>{
        del(index)
    })
    
    editButton.addEventListener('click',()=>{
        showEditCard(taskElements[index+1])
    })
    return taskWrap
}

function createCardInputElement(id,classButton,action) {

    let card = document.createElement('div')
    let wrapInputContentsTask = document.createElement('div')
    let wrapInputContentsDeadline = document.createElement('div')
    let wrapInputContentsPriority = document.createElement('div')
    let labelTask = document.createElement('label')
    let labelDeadLine = document.createElement('label')
    let labelPriority = document.createElement('label')
    let inputTask = document.createElement('input')
    let inputDeadline = document.createElement('input')
    let selectPriority = document.createElement('select')
    let optionLow = document.createElement('option')
    let optionMedium = document.createElement('option')
    let optionHigh = document.createElement('option')
    let buttonCorner = document.createElement('i')

    card.classList.add('task-wrap')
    card.classList.add('add-task')

    wrapInputContentsTask.classList.add('wrapInputContents')
    wrapInputContentsDeadline.classList.add('wrapInputContents')
    wrapInputContentsPriority.classList.add('wrapInputContents')

    inputTask.setAttribute('autofocus', 'true')
    inputTask.setAttribute('type','text')
    inputTask.setAttribute('placeholder','type your task here')
    inputTask.classList.add('inputTextTask')

    inputDeadline.setAttribute('type','date')
    inputDeadline.classList.add('inputDeadLine')

    selectPriority.classList.add('selectPriority')

    optionLow.setAttribute('selected','true')
    optionLow.setAttribute('value','0')
    optionLow.innerHTML = "low"

    optionMedium.setAttribute('value','1')
    optionMedium.innerHTML = "medium"

    optionHigh.setAttribute('value','2')
    optionHigh.innerHTML = "high"

    labelTask.innerHTML = 'Task'
    labelDeadLine.innerHTML = 'Deadline'
    labelPriority.innerHTML = 'Priority'

    selectPriority.appendChild(optionLow)
    selectPriority.appendChild(optionMedium)
    selectPriority.appendChild(optionHigh)

    wrapInputContentsPriority.appendChild(labelPriority)
    wrapInputContentsPriority.appendChild(selectPriority)

    wrapInputContentsDeadline.appendChild(labelDeadLine)
    wrapInputContentsDeadline.appendChild(inputDeadline)

    wrapInputContentsTask.appendChild(labelTask)
    wrapInputContentsTask.appendChild(inputTask)
    
    buttonCorner.classList.add('fas')
    buttonCorner.classList.add(classButton)
    buttonCorner.classList.add('add-button')

    card.appendChild(wrapInputContentsTask)
    card.appendChild(wrapInputContentsDeadline)
    card.appendChild(wrapInputContentsPriority)
    card.appendChild(buttonCorner)

    inputTask.id = id + 'InputTask'
    inputDeadline.id = id + 'InputDeadline'
    selectPriority.id = id + 'SelectPriority'

    card.id = id

    addEventHandlerToInputs(inputTask, inputDeadline, selectPriority, buttonCorner, action)

    return card
}

function definePriorityClass(priority) {
    switch(priority) {
        case PRIORITY_LOW:
            return 'priority-low'
        case PRIORITY_MEDIUM:
            return 'priority-medium'
        case PRIORITY_HIGH:
            return 'priority-high'
    }
}

function containerClear() {
    let container = document.getElementById('container')
    
    taskElements.map(v=>{
        container.removeChild(v)
    })

    taskElements = []
}

function addEventHandlerToInputs(inputTask, inputDeadline,selectPriority,buttonCorner,action) {
    inputTask.addEventListener('keypress',(e)=>{
        if(e.key==='Enter'){
            action(inputTask.value,inputDeadline.value,selectPriority.options.selectedIndex).then(ok=>{
                if(ok){
                    render()
                } else {
                    displyaMessage('You must fill all fields to add a task!')
                }
            })
        }
    })

    inputDeadline.addEventListener('keypress',(e)=>{
        if(e.key==='Enter'){
            action(inputTask.value,inputDeadline.value,selectPriority.options.selectedIndex).then(ok=>{
                if(ok){
                    render()
                } else {
                    displyaMessage('You must fill all fields to add a task!')
                }
            })
        }
    })

    selectPriority.addEventListener('keypress',(e)=>{
        if(e.key==='Enter'){
            action(inputTask.value,inputDeadline.value,selectPriority.options.selectedIndex).then(ok=>{
                if(ok){
                    render()
                } else {
                    displyaMessage('You must fill all fields to add a task!')
                }
            })
        }
    })

    buttonCorner.addEventListener('click',()=>{
        action(inputTask.value,inputDeadline.value,selectPriority.options.selectedIndex).then(ok=>{
            if(ok){
                render()
            } else {
                displyaMessage('You must fill all fields to add a task!')
            }
        })
    })

}

function del(id) {
     task = task.filter((v,i)=>{
         if(i!==id) {
             return v
         }
     })
     render()
}

function showEditCard(taskCaller){
    let edit = document.getElementById('edit')
    let editInputTask = document.getElementById('editInputTask')
    let editInputDeadline = document.getElementById('editInputDeadline')
    let editSelectPriority = document.getElementById('editSelectPriority')
    let index = Number.parseInt(taskCaller.id.replace(/\D+/,""))
    let tsk = task[index]

    edit.style.left = taskCaller.offsetLeft - 16 + "px"
    edit.style.top = taskCaller.offsetTop - 16  + "px"

    edit.style.display = 'flex'
    editInputTask.value = tsk.task
    editInputDeadline.value = tsk.deadline
    editSelectPriority.selectedIndex = tsk.priority
    editInputTask.focus()
    editInputTask.select()

    editIndex = index
    
}

async function displyaMessage(text) {
    let messageBox = document.getElementById('message-box')
    messageBox.innerHTML = text
    messageBox.style.top = '5px'
    await setTimeout(() => {
        messageBox.style.top = '-55px'
    }, 3000);
}

render()