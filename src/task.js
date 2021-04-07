const Task = (taskTitle, taskDescription, taskDueDate) => {

    let title = taskTitle;
    let description = taskDescription;
    let dueDate = taskDueDate;
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

    const getStatus = () => finished;

    return { setProperty, setStatus, getTitle, getDescription, getDueDate, getStatus };
};

const Project = (name) => {

    const tasks = {};
    const projectName = name;

    const addTask = (title, task) => {
        tasks[title] = task;
    }

    const setTaskProperty = (title, properties) => {
        tasks[title].setProperty(properties);
    }

    const setTaskStatus = (title, status) => {
        tasks[title].setStatus(status);
    }

    const deleteTask = (title) => {
        if(tasks[title] !== undefined){
            delete tasks[title];
        }
    }

    const getName = () => projectName;

    return { addTask, setTaskProperty, setTaskStatus, deleteTask, getName };

}

const taskManager = (() => {

    const customizedProjects = {};
    const defaultProject = Project("default");

    const addProject = (projectName) => {
        const project = Project(projectName);
        customizedProjects[projectName] = project;
    }

    const addTask = (title, description, dueDate, ...projects) => {
        const task = Task(title, description, dueDate);
        defaultProject.addTask(title, task);
        for(let projectName in projects){
            if(customizedProjects.keys().includes(projectName)){
                customizedProjects[projectName].addTask(title, task);
            }else{
                addProject(projectName);
                customizedProjects[projectName].addTask(title, task);
            }
        }
    }

    const setTaskProperty = (title, properties) => {
        defaultProject.setTaskProperty(title, properties);
    }

    const setTaskStatus = (title, status) => {
        defaultProject.setTaskStatus(title, status);
    }

    const deleteTask = (title) => {
        defaultProject.deleteTask(title);
        Object.values(customizedProjects).forEach(e => function(){
            e.deleteTask(title);
        });
    }

    const deleteProject = (title) => {
        if(customizedProjects[title] !== undefined){
            delete customizedProjects[title];
        }
    }

    return { addProject, addTask, setTaskProperty, setTaskStatus, deleteTask, deleteProject };

})();

export { taskManager };