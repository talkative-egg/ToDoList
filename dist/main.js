(()=>{"use strict";(()=>{const e=document.querySelector("#content"),t=c({id:"main-content"});let n;function s(e,t){const n=document.createElement(`${e}`);return n.textContent=t,n}function c(e={}){const t=document.createElement("div");return e.id&&(t.id=e.id),e.class&&(t.className=e.class),e.text&&(t.textContent=e.text),t}function o(e){const t=document.createElement("button");return t.textContent=e,t}function a(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function d(e){const t=document.querySelector("#project-container");a(t);const o=s("h1","Projects"),d=document.createElement("hr"),l=c({id:"projects"});Object.values(e).forEach((function(e){if("All Tasks"===e.getName()||e.getName()===n.getName()){const t=c({class:"project",text:`${e.getName()}`});l.appendChild(t)}else{const t=c({id:"delete-project-container"}),n=c({class:"project",text:`${e.getName()}`});n.style.width="90%",n.style.margin="0";const s=document.createElement("img");s.setAttribute("src","../images/delete.png"),s.setAttribute("alt","delete"),s.addEventListener("click",(function(t){events.emit("deleteProject",e.getName())})),t.appendChild(n),t.appendChild(s),l.appendChild(t)}}));const p=document.createElement("img");p.setAttribute("src","../images/confirm.png"),p.setAttribute("alt","confirm"),p.addEventListener("click",(function(t){i(e),r()})),t.appendChild(o),t.appendChild(d),t.appendChild(l),t.appendChild(p),r()}e.appendChild(t);const i=e=>{let n,i=null!=document.querySelector("#project-container");i?(n=document.querySelector("#project-container"),a(n)):n=c({id:"project-container"});const r=s("h1","Projects"),l=document.createElement("hr"),p=c({id:"projects"});Object.values(e).forEach((function(e){const t=c({class:"project",text:`${e.getName()}`});p.appendChild(t)}));const u=o("Add Project"),m=o("Delete Project");n.appendChild(r),n.appendChild(l),n.appendChild(p),n.appendChild(u),n.appendChild(m),u.addEventListener("click",(function(e){const t=c({id:"new-project"});u.style.display="none",m.style.display="none";const s=document.createElement("input");s.setAttribute("type","text"),s.setAttribute("placeholder","Project Name");const o=document.createElement("img");o.setAttribute("src","../images/confirm.png"),o.setAttribute("alt","confirm"),o.addEventListener("click",(function(e){events.emit("newProject",s.value)})),t.appendChild(s),t.appendChild(o),n.appendChild(t)})),m.addEventListener("click",(function(t){d(e)})),i||t.prepend(n)};function r(e=n){const t=document.querySelectorAll(".project");let s=!1;t.forEach((function(t){t.textContent==e.getName()?(t.style.boxShadow="none",s=!0,n=e):t.style.boxShadow="3px 1px #000000"})),s||(t[0].style.boxShadow="none",n=t[0])}events.on("init",(()=>{const t=document.createElement("nav"),n=c(),o=document.createElement("img");o.setAttribute("src","../images/icon.png"),o.setAttribute("alt","logo"),n.appendChild(o),n.appendChild(s("p","ToDoList")),t.appendChild(n),t.appendChild(s("p","Peter Chen")),e.prepend(t)})),events.on("renderProjects",i),events.on("renderTasks",(e=>{const n=c({id:"task-container"}),a=s("h1","Project 1"),d=document.createElement("hr"),i=c({id:"tasks"});Object.values(e).forEach((function(e){const t=function(e,t,n){const o=c({class:"task"}),a=c({class:"finish-button"});a.addEventListener("click",(function(){'url("../images/check.png")'===a.style.backgroundImage?a.style.backgroundImage="none":(a.style.backgroundImage='url("../images/check.png")',a.style.backgroundSize="cover")}));const d=c({class:"task-description"}),i=s("h2",`${e}`),r=s("p",`${t}`);d.appendChild(i),d.appendChild(r);const l=c({class:"due-date"});return l.appendChild(s("p","Due Date:")),l.appendChild(s("p",`${n}`)),o.appendChild(a),o.appendChild(d),o.appendChild(l),o}(`${e.getTitle()}`,`${e.getDescription()}`,`${e.getDueDate()}`);i.appendChild(t)}));const r=o("Add Task");i.appendChild(r),n.appendChild(a),n.appendChild(d),n.appendChild(i),t.appendChild(n)})),events.on("setProjectTab",r),events.on("renderDeleteProjects",d)})();const e=e=>{const t={},n=e;return{addTask:(e,n)=>{t[e]=n},setTaskProperty:(e,n)=>{t[e].setProperty(n)},setTaskStatus:(e,n)=>{t[e].setStatus(n)},deleteTask:e=>{void 0!==t[e]&&delete t[e]},getName:()=>n,getTasks:()=>t}};(()=>{const t={},n=e("All Tasks"),s=s=>{const c=e(s);t[s]=c,events.emit("renderProjects",Object.assign({},{defaultProject:n,...t})),events.emit("setProjectTab",Object.assign({},t[s]))},c=(e,c,o,...a)=>{const d=((e,t,n)=>{let s=e,c=t,o=n,a=!1;return{setProperty:e=>{for(let t in e)switch(t){case"title":s=e[t];break;case"description":c=e[t];break;case"dueDate":o=e[t]}},setStatus:e=>{a=e},getTitle:()=>s,getDescription:()=>c,getDueDate:()=>o,getStatus:()=>a}})(e,c,o);n.addTask(e,d);for(let n=0;n<a.length;n++)t[a[n]]||s(a[n]),t[a[n]].addTask(e,d)};events.on("init",(()=>{c("example1","Lorem ipsum dolor sit Amet","today"),c("example2","Lorem ipsum dolor sit Amet","today"),s("Sample Project"),c("example3","Lorem ipsum dolor sit Amet","today","Sample Project"),events.emit("renderProjects",Object.assign({},{defaultProject:n,...t})),events.emit("renderTasks",Object.assign({},n.getTasks())),events.emit("setProjectTab",Object.assign({},n))})),events.on("newProject",s),events.on("deleteProject",(e=>{void 0!==t[e]&&delete t[e],events.emit("renderDeleteProjects",Object.assign({},{defaultProject:n,...t}))}))})(),events.emit("init")})();