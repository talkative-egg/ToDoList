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

    function makeTask(taskName, taskDescription, taskDueDate){

        const container = makeDiv({class: "task"});

        const finishButton = makeDiv({class: "finish-button"});

        finishButton.addEventListener("click", function(){

            if(finishButton.style.backgroundImage === 'url("../images/check.png")'){
                finishButton.style.backgroundImage = 'none';
            }else{
                finishButton.style.backgroundImage = 'url("../images/check.png")';
                finishButton.style.backgroundSize = 'cover';
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

    const renderTaskContainer = (tasks) => {

        const container = makeDiv({id: "task-container"});

        const title = makeText("h1", "Project 1");
        const hr = document.createElement("hr");

        const innerContainer = makeDiv({id: "tasks"});

        Object.values(tasks).forEach(function(e){
            const task = makeTask(`${e.getTitle()}`, `${e.getDescription()}`, `${e.getDueDate()}`);
            innerContainer.appendChild(task);
        })

        const addButton = makeButton("Add Task");
        innerContainer.appendChild(addButton);

        container.appendChild(title);
        container.appendChild(hr);
        container.appendChild(innerContainer);

        mainContent.appendChild(container);

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