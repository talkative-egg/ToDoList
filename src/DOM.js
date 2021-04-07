const DOM = (() => {

    const content = document.querySelector("#content");
    const mainContent = _makeDiv({id: "main-content"});
    content.appendChild(mainContent);

    function _makeText(tag, text){
        const element = document.createElement(`${tag}`);
        element.textContent = text;
        return element;
    }

    function _makeDiv(attributes = {}){

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

    function _makeButton(text){
        
        const button = document.createElement("button");
        button.textContent = text;

        return button;

    }

    function _makeTask(taskName, taskDescription, taskDueDate){

        const container = _makeDiv({class: "task"});

        const finishButton = _makeDiv({class: "finish-button"});

        finishButton.addEventListener("click", function(){

            if(finishButton.style.backgroundImage === 'url("../images/check.png")'){
                finishButton.style.backgroundImage = 'none';
            }else{
                finishButton.style.backgroundImage = 'url("../images/check.png")';
                finishButton.style.backgroundSize = 'cover';
            }
            
        });

        const textContainer = _makeDiv({class: "task-description"});

        const title = _makeText("h2", `${taskName}`);
        const description = _makeText("p", `${taskDescription}`);
        textContainer.appendChild(title);
        textContainer.appendChild(description);

        const dueContainer = _makeDiv({class: "due-date"});

        dueContainer.appendChild(_makeText("p", "Due Date:"));
        dueContainer.appendChild(_makeText("p", `${taskDueDate}`));
        
        container.appendChild(finishButton);
        container.appendChild(textContainer);
        container.appendChild(dueContainer);

        return container;

    }

    const _renderProjectContainer = () => {

        const container = _makeDiv({id: "project-container"});

        const title = _makeText("h1", "Projects");
        const hr = document.createElement("hr");

        const projects = _makeDiv({id: "projects"});

        const project1 = _makeDiv({class: "project", text: "Project 1"});
        const project2 = _makeDiv({class: "project", text: "Project 2"});

        projects.appendChild(project1);
        projects.appendChild(project2);

        const addButton = _makeButton("Add Project");
        const deleteButton = _makeButton("Delete Project");

        container.appendChild(title);
        container.appendChild(hr);
        container.appendChild(projects);
        container.appendChild(addButton);
        container.appendChild(deleteButton);

        mainContent.appendChild(container);

    }

    const _renderTaskContainer = () => {

        const container = _makeDiv({id: "task-container"});

        const title = _makeText("h1", "Project1");
        const hr = document.createElement("hr");

        const tasks = _makeDiv({id: "tasks"});

        tasks.appendChild(_makeTask("Task 1", "Lorem ipsum dolor sit amet.", "Today"));
        tasks.appendChild(_makeTask("Task 2", "Lorem ipsum dolor sit amet.", "Today"));
        tasks.appendChild(_makeTask("Task 3", "Lorem ipsum dolor sit amet.", "Today"));
        tasks.appendChild(_makeTask("Task 4", "Lorem ipsum dolor sit amet.", "Today"));
        tasks.appendChild(_makeTask("Task 5", "Lorem ipsum dolor sit amet.", "Today"));
        tasks.appendChild(_makeTask("Task 6", "Lorem ipsum dolor sit amet.", "Today"));
        tasks.appendChild(_makeTask("Task 7", "Lorem ipsum dolor sit amet.", "Today"));

        container.appendChild(title);
        container.appendChild(hr);
        container.appendChild(tasks);

        mainContent.appendChild(container);

    }

    const _renderNavBar = () => {

        const nav = document.createElement("nav");

        const leftContainer = _makeDiv();

        const logo = document.createElement("img");
        logo.setAttribute("src", "../images/icon.png");
        logo.setAttribute("alt", "logo");

        leftContainer.appendChild(logo);
        leftContainer.appendChild(_makeText("p", "ToDoList"));

        nav.appendChild(leftContainer);
        nav.appendChild(_makeText("p", "Peter Chen"));

        content.prepend(nav);

    };

    const renderInitialPage = () => {
        _renderNavBar();
        _renderProjectContainer();
        _renderTaskContainer();
    }

    return { renderInitialPage };

})();

export { DOM };