const Task = (taskTitle, taskDescription, taskDueDate, taskPriority) => {

    let title = taskTitle;
    let description = taskDescription;
    let dueDate = taskDueDate;
    let priority = taskPriority;
    let finished = false;

    const setProperty = (newProperty) => {
        
        for(let property in newProperty){

            switch(property){
                case 'title':
                    title = newProperty[property];
                    break;
                case 'description':
                    description = newProperty[property];
                    break;
                case 'dueDate':
                    dueDate = newProperty[property];
                    break;
                case 'priority':
                    priority = newProperty[priority];
                    break;
                default:
                    break;
            }

        }

    }

    const setStatus = (newStatus) => {

        finished = newStatus;

    };

    const getTitle = () => title;

    const getDescription = () => description;

    const getDueDate = () => dueDate;

    const getPriority = () => priority;

    const getStatus = () => finished;

    return { setProperty, setStatus, getTitle, getDescription, getDueDate, getPriority, getStatus };
};

const Project = (name) => {

    const tasks = [];
    const projectName = name;

    const addTask = (task) => {
        tasks.push(task);
        return tasks.length() - 1;
    }

    const setTaskProperty = (index, properties) => {
        tasks[index].setProperty(properties);
    }

    const setTaskStatus = (index, status) => {
        tasks[index].setStatus(status);
    }

    const getName = () => projectName;

    return { addTask, setTaskProperty, setTaskStatus, getName };

}

const taskManager = (() => {

    const customizedProjects = {};
    const defaultProject = Project("default");

    const addProject = (projectName) => {
        const project = Project(projectName);
        customizedProjects[projectName] = project;
    }

    const addTask = (title, description, dueDate, priority, ...projects) => {
        const task = Task(title, description, dueDate, priority);
        defaultProject.addTask(task);
        for(let projectName in projects){
            if(customizedProjects.keys().includes(projectName)){
                customizedProjects[projectName].addTask(task);
            }else{
                addProject(projectName);
                customizedProjects[projectName].addTask(task);
            }
        }
    }

    const setTaskProperty = (index, properties) => {
        defaultProject.setTaskProperty(index, properties);
    }

    const setTaskStatus = (index, status) => {
        defaultProject.setTaskStatus(index, status);
    }

    return { addProject, addTask, setTaskProperty, setTaskStatus };

})();