const DOM = (() => {

    const content = document.querySelector("#content");
    const mainContent = makeDiv({id: "main-content"});
    content.appendChild(mainContent);

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

    const renderProjectContainer = (projects) => {

        const container = makeDiv({id: "project-container"});

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

        mainContent.prepend(container);

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

})();

export { DOM };