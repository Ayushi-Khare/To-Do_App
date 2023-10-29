let form = document.getElementById("form");
let textinput= document.getElementById("textInput");
let msg = document.getElementById("msg");
let dateinput = document.getElementById("dateInput");
let desc = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (obj)=>{
    obj.preventDefault(); 
    formValid();
});

let formValid = ()=>{
    if(textinput.value === "")
    {
        msg.innerHTML = "Task cannot be blank";
        console.log('failed');
    }
    else{
        msg.innerHTML = "";
        console.log('success');
        acceptData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();

        (()=>{
            add.setAttribute("data-bs-dismiss","");
        })();
    }
};

let data =[];

let acceptData = ()=>{
    data.push({
        text:textinput.value,
        date: dateinput.value,
        desc: desc.value,
    });

    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks(); 
    
    /*localStorage.setItem("data",JSON.stringify(data));
    createTasks();  */
    /*data["text"]= textinput.value;
    data["date"]= dateinput.value;
    data["desc"]= desc.value;
    createTasks();*/
};

let createTasks = ()=>{
    tasks.innerHTML="";
    data.map((x,y)=>{
        return (tasks.innerHTML += `
        <div id=${y}>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary">${x.date}</span>
                <p>${x.desc}</p>
                <span class="options">
                    <i onClick="edit(this)" data-bs-toggle="modal" data-bs-target="#form" class="material-symbols-outlined">edit</i>
                    <i onClick ="del(this);createTasks()" class="material-symbols-outlined">delete</i>
                </span>
            </div>
    `);
    });
    reset();
};

let del= (obj)=>{
    obj.parentElement.parentElement.remove();
    data.splice(obj.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
};

let edit = (obj)=>{
    let seltask = obj.parentElement.parentElement;
    textinput.value = seltask.children[0].innerHTML;
    dateinput.value = seltask.children[1].innerHTML;
    textarea.value = seltask.children[2].innerHTML;
    del(obj);
};

let reset = ()=>{
    textinput.value="";
    dateinput.value="";
    textarea.value="";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
    console.log(data);
})();