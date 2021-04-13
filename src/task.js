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

        if(title !== properties.title){
            tasks[properties.title] = tasks[title];
            delete tasks[title];
        }
        
    }

    const setTaskStatus = (title, status) => {
        tasks[title].setStatus(status);
    }

    const deleteTask = (title) => {
        if(tasks[title] !== undefined){
            delete tasks[title];
        }
    }

    const containsTask = (taskName) => (tasks[taskName])? true:false;

    const getName = () => projectName;

    const getTasks = () => tasks;

    return { addTask, setTaskProperty, setTaskStatus, deleteTask, containsTask, getName, getTasks };

}

const taskManager = (() => {

    const customizedProjects = {};
    const defaultProject = Project("All Tasks");

    const addProject = (projectName) => {
        const project = Project(projectName);
        customizedProjects[projectName] = project;
        events.emit("renderProjects", Object.assign({}, {defaultProject, ...customizedProjects}));
        events.emit("setProjectTab", Object.assign({}, customizedProjects[projectName]));
        events.emit("renderTasks", Object.assign({}, customizedProjects[projectName]));
    }

    const addTask = ({title, description, dueDate, project}) => {
        const task = Task(title, description, dueDate);
        defaultProject.addTask(title, task);
        if(customizedProjects[project]){
            customizedProjects[project].addTask(title, task);
            events.emit("renderTasks", Object.assign({}, customizedProjects[project]));
        }else{
            events.emit("renderTasks", Object.assign({}, defaultProject));
        }
    }

    const setTaskProperty = (props) => {
        defaultProject.setTaskProperty(props.originalTitle, props);

        const projectRender = (customizedProjects[props.project.getName()])? 
            customizedProjects[props.project.getName()] : defaultProject;

        events.emit("renderTasks", projectRender);
    }

    const setTaskStatus = (task) => {
        defaultProject.setTaskStatus(task.taskName, task.status);
    }

    const deleteTask = (props) => {
        defaultProject.deleteTask(props.title);
        Object.values(customizedProjects).forEach(function(e){
            e.deleteTask(props.title);
        });

        const projectRender = (customizedProjects[props.project.getName()])? 
            customizedProjects[props.project.getName()] : defaultProject;

        events.emit("renderTasks", projectRender);
    }

    const deleteProject = (title) => {
        if(customizedProjects[title] !== undefined){
            delete customizedProjects[title];
        }

        events.emit("renderDeleteProjects", Object.assign({}, {defaultProject, ...customizedProjects}));
    }

    const initialize = () => {
        addTask({title: "example1", description: "Lorem ipsum dolor sit Amet", dueDate: "today", project: ""});
        addTask({title: "example2", description: "Lorem ipsum dolor sit Amet", dueDate: "today", project: ""});
        addProject("Sample Project");
        addTask({title: "example3", description: "Lorem ipsum dolor sit Amet", dueDate: "today", project: "Sample Project"});
        events.emit("renderProjects", Object.assign({}, {defaultProject, ...customizedProjects}));
        events.emit("renderTasks", Object.assign({}, defaultProject));
        events.emit("setProjectTab", Object.assign({}, defaultProject));
    }

    events.on("init", initialize);
    events.on("newProject", addProject);
    events.on("deleteProject", deleteProject);
    events.on("newTask", addTask);
    events.on("taskStatus", setTaskStatus);
    events.on("deleteTask", deleteTask);
    events.on("setTask", setTaskProperty);

})();

export { taskManager };