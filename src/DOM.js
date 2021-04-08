const DOM = (() => {

    const content = document.querySelector("#content");
    const mainContent = makeDiv({id: "main-content"});
    content.appendChild(mainContent);

    let currentProjectTab;

    function makeText(tag, text){
        const element = document.createElement(`${tag}`);
        element.textContent = text;
        return element;
    }

    function makeDiv(attributes = {}){

        const div = document.createElement("div");

        if(attributes.id){
            div.id = attributes.id;
        }

        if(attributes.class){
            div.className = attributes.class;
        }

        if(attributes.text){
            div.textContent = attributes.text;
        }

        return div;

    }

    function makeButton(text){
        
        const button = document.createElement("button");
        button.textContent = text;

        return button;

    }

    function makeTask(taskName, taskDescription, taskDueDate, finish = false){

        const container = makeDiv({class: "task"});

        const finishButton = makeDiv({class: "finish-button"});

        if(finish){
            finishButton.style.backgroundImage = 'url("../images/check.png")';
            finishButton.style.backgroundSize = 'cover';
            container.style.backgroundColor = 'lightgrey';
        }

        finishButton.addEventListener("click", function(){

            if(finishButton.style.backgroundImage === 'url("../images/check.png")'){
                finishButton.style.backgroundImage = 'none';
                container.style.backgroundColor = 'white';
                events.emit("taskStatus", {taskName, status: false});
            }else{
                finishButton.style.backgroundImage = 'url("../images/check.png")';
                finishButton.style.backgroundSize = 'cover';
                container.style.backgroundColor = 'lightgrey';
                events.emit("taskStatus", {taskName, status: true});
            }
            
        });

        const textContainer = makeDiv({class: "task-description"});

        const title = makeText("h2", `${taskName}`);
        const description = makeText("p", `${taskDescription}`);
        textContainer.appendChild(title);
        textContainer.appendChild(description);

        const dueContainer = makeDiv({class: "due-date"});

        dueContainer.appendChild(makeText("p", "Due Date:"));
        dueContainer.appendChild(makeText("p", `${taskDueDate}`));
        
        container.appendChild(finishButton);
        container.appendChild(textContainer);
        container.appendChild(dueContainer);

        return container;

    }

    function removeAllChildren(parent){

        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }

    }

    function renderDeleteProjectContainer(projects){

        const container = document.querySelector("#project-container");
        removeAllChildren(container);

        const title = makeText("h1", "Projects");
        const hr = document.createElement("hr");

        const innerContainer = makeDiv({id: "projects"});

        Object.values(projects).forEach(function(e){

            if(e.getName() === "All Tasks" ||  e.getName() === currentProjectTab.getName()){
                const project = makeDiv({class: "project", text: `${e.getName()}`});
                innerContainer.appendChild(project);
            }else{
                const projectContainer = makeDiv({id: "delete-project-container"});

                const project = makeDiv({class: "project", text: `${e.getName()}`});
                project.style.width = "90%";
                project.style.margin = "0";

                const image = document.createElement("img");
                image.setAttribute("src", "../images/delete.png");
                image.setAttribute("alt", "delete");

                image.addEventListener("click", function(i){
                    events.emit("deleteProject", e.getName());
                });

                projectContainer.appendChild(project);
                projectContainer.appendChild(image);

                innerContainer.appendChild(projectContainer);
            }

        });

        const confirmIcon = document.createElement("img");
        confirmIcon.setAttribute("src", "../images/confirm.png");
        confirmIcon.setAttribute("alt", "confirm");

        confirmIcon.addEventListener("click", function(e){
            renderProjectContainer(projects);
            setProjectTab();
        });

        container.appendChild(title);
        container.appendChild(hr);
        container.appendChild(innerContainer);
        container.appendChild(confirmIcon);

        setProjectTab();

    }

    const renderProjectContainer = (projects) => {

        let alreadyHasProjects = (document.querySelector("#project-container") == null)?
            false : true;

        let container;

        if(alreadyHasProjects){
            container = document.querySelector("#project-container");
            removeAllChildren(container);
        }else{
            container = makeDiv({id: "project-container"});
        }

        const title = makeText("h1", "Projects");
        const hr = document.createElement("hr");

        const innerContainer = makeDiv({id: "projects"});

        Object.values(projects).forEach(function(e){
            const project = makeDiv({class: "project", text: `${e.getName()}`});

            project.addEventListener("click", function(i){
                events.emit("renderTasks", e);
                events.emit("setProjectTab", e);
            });

            innerContainer.appendChild(project);
        });

        const addButton = makeButton("Add Project");
        const deleteButton = makeButton("Delete Project");

        container.appendChild(title);
        container.appendChild(hr);
        container.appendChild(innerContainer);
        container.appendChild(addButton);
        container.appendChild(deleteButton);

        addButton.addEventListener("click", function(e){

            const inputContainer = makeDiv({id: "new-project"});

            addButton.style.display = "none";
            deleteButton.style.display = "none";

            const newProject = document.createElement("input");
            newProject.setAttribute("type", "text");
            newProject.setAttribute("placeholder", "Project Name");

            const confirmIcon = document.createElement("img");
            confirmIcon.setAttribute("src", "../images/confirm.png");
            confirmIcon.setAttribute("alt", "confirm");

            confirmIcon.addEventListener("click", function(i){
                events.emit("newProject", newProject.value);
            });

            inputContainer.appendChild(newProject);
            inputContainer.appendChild(confirmIcon);

            container.appendChild(inputContainer);

        });

        deleteButton.addEventListener("click", function(e){

            renderDeleteProjectContainer(projects);

        });

        if(!alreadyHasProjects) mainContent.prepend(container);

    }

    function setProjectTab(project = currentProjectTab){

        const projects = document.querySelectorAll(".project");

        let found = false;

        projects.forEach(function(e){
            if(e.textContent == project.getName()){
                e.style.boxShadow = "none";
                found = true;
                currentProjectTab = project;
            }else{
                e.style.boxShadow = "3px 1px #000000";
            }
        });

        if(!found){
            projects[0].style.boxShadow = "none";
            currentProjectTab = projects[0];
        }

    }

    function makeLabel(forAttribute, text){

        const label = document.createElement("label");
        label.textContent = text;
        label.setAttribute("for", forAttribute);
        return label;

    }

    function makeInput(type, placeholder, id, required){

        const input = document.createElement("input");
        input.setAttribute("type", type);
        input.setAttribute("placeholder", placeholder);
        input.setAttribute("name", id);
        input.id = id;
        input.required = required;
        return input;

    }

    function renderAddTaskPopUp(project){

        const container = makeDiv({id: "myForm"});

        const form = document.createElement("form");
        form.id = "form-container";

        const formTitle = makeText("h1", "New Task");

        const titleLabel = makeLabel("title", "Task Name: ");
        const titleInput = makeInput("text", "Task Name", "title", true);

        const descriptionLabel = makeLabel("description", "Task Description: ");
        const descriptionInput = document.createElement("textarea");
        descriptionInput.setAttribute("placeholder", "Task Descripiton");
        descriptionInput.setAttribute("name", "description");
        descriptionInput.id = "description";

        const dateLabel = makeLabel("dueDate", "Due Date: ");
        const dateInput = makeInput("date", "", "dueDate", true);

        const confirm = document.createElement("img");
        confirm.setAttribute("src", "../images/confirm.png");
        confirm.setAttribute("alt", "confirm");
        const cancel = document.createElement("img");
        cancel.setAttribute("src", "../images/cancel.png");
        cancel.setAttribute("alt", "cancel");

        form.appendChild(formTitle);
        form.appendChild(titleLabel);
        form.appendChild(document.createElement("br"));
        form.appendChild(titleInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(descriptionLabel);
        form.appendChild(document.createElement("br"));
        form.appendChild(descriptionInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(dateLabel);
        form.appendChild(document.createElement("br"));
        form.appendChild(dateInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(confirm);
        form.appendChild(cancel);

        container.appendChild(form);
        content.appendChild(container);

        confirm.addEventListener("click", function(e){

            if(project.containsTask(titleInput.value)){
                alert("already has this task");
            }else if(titleInput.value != ""){
                events.emit("newTask", {
                    title: titleInput.value,
                    description:  descriptionInput.value,
                    dueDate:  dateInput.value,
                    project: project.getName()
                });
                content.removeChild(container);
            }else{
                alert("must have a title");
            }

        });

        cancel.addEventListener("click", function(e){
            content.removeChild(container);
        });

    }

    const renderTaskContainer = (project) => {

        let alreadyHasTasks = (document.querySelector("#task-container") == null)?
            false : true;

        let container;

        if(alreadyHasTasks){
            container = document.querySelector("#task-container");
            removeAllChildren(container);
        }else{
            container = makeDiv({id: "task-container"});
        }

        const title = makeText("h1", `${project.getName()}`);
        const hr = document.createElement("hr");

        const innerContainer = makeDiv({id: "tasks"});

        Object.values(project.getTasks()).forEach(function(e){
            const task = makeTask(e.getTitle(), e.getDescription(), e.getDueDate(), e.getStatus());
            innerContainer.appendChild(task);
        })

        const addButton = makeButton("Add Task");
        innerContainer.appendChild(addButton);

        container.appendChild(title);
        container.appendChild(hr);
        container.appendChild(innerContainer);

        addButton.addEventListener("click", function(e){
            renderAddTaskPopUp(project);
        });

        if(!alreadyHasTasks) mainContent.appendChild(container);

    }

    const renderNavBar = () => {

        const nav = document.createElement("nav");

        const leftContainer = makeDiv();

        const logo = document.createElement("img");
        logo.setAttribute("src", "../images/icon.png");
        logo.setAttribute("alt", "logo");

        leftContainer.appendChild(logo);
        leftContainer.appendChild(makeText("p", "ToDoList"));

        nav.appendChild(leftContainer);
        nav.appendChild(makeText("p", "Peter Chen"));

        content.prepend(nav);

    };

    events.on("init", renderNavBar);
    events.on("renderProjects", renderProjectContainer);
    events.on("renderTasks", renderTaskContainer);
    events.on("setProjectTab", setProjectTab);
    events.on("renderDeleteProjects", renderDeleteProjectContainer);

})();

export { DOM };