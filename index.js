let inputuser = document.getElementById("inadd");
let donetext = document.getElementById("donetext");
let donevalue = 0;

document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
});

function saveTodos() {
  const todos = [];
  document.querySelectorAll(".divarea").forEach((divarea) => {
    const paragraf = divarea.querySelector("p").innerText;
    const done = divarea.querySelector("button[done]") ? true : false;
    todos.push({ text: paragraf, done: done });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    inputuser.value = todo.text;
    tampil(todo.done);
  });
}

function tampil(done = false) {
  if (inputuser.value.trim() === "") {
    alert("Input tidak boleh kosong!!!");
  } else {
    let paragraf = document.createElement("p");
    let tomhapus = document.createElement("button");
    let donebutton = document.createElement("button");
    let edit = document.createElement("button");
    let divarea = document.createElement("div");
    let box = document.getElementById("box");

    paragraf.innerHTML = inputuser.value;
    tomhapus.innerHTML = "Hapus";
    donebutton.innerHTML = "Done";
    edit.innerHTML = "Edit";
    donetext.className = "mx-2.5 dark:text-white font-medium lg:mx-0 md:mx-0";
    tomhapus.className =
      "tomhapus shadow-lg h-8 w-20 sm:hover:bg-red-500 rounded-lg m-1 dark:border  dark:bg-white dark:shadow-md dark:shadow-slate-300";
    donebutton.className =
      "done shadow-lg h-8 w-20 sm:hover:bg-green-500 rounded-lg m-1 dark:border  dark:bg-white dark:shadow-md dark:shadow-slate-300";

    edit.className =
      "edit shadow-lg h-8 w-20 sm:hover:bg-yellow-500 rounded-lg m-1 dark:border  dark:bg-white dark:shadow-md dark:shadow-slate-300";

    divarea.className = "divarea mx-1.5 lg:mx-0";
    paragraf.className = "mx-1 mt-4 dark:text-white";

    divarea.append(paragraf);
    divarea.append(tomhapus);
    divarea.append(donebutton);
    divarea.append(edit);
    box.append(divarea);

    if (done) {
      donebutton.setAttribute("done", true);
      donevalue += 1;
      paragraf.className = "mx-1 mt-4 text-green-700 font-bold ";
    }

    donetext.innerHTML = "Done List: " + donevalue;

    tomhapus.onclick = function () {
      if (confirm("Apakah anda yakin untuk hapus?")) {
        if (donebutton.hasAttribute("done")) {
          donevalue -= 1;
          donetext.innerHTML = "Done List: " + donevalue;
        }
        divarea.remove();
        saveTodos();
      }
    };

    edit.onclick = function () {
      let edittextbox = document.createElement("input");
      let okeditbutton = document.createElement("button");

      edittextbox.value = paragraf.innerText;
      okeditbutton.innerHTML = "OK";
      edittextbox.className =
        "edittextbox shadow-md p-1  focus:ring-1 focus:border-sky-600 focus:outline-none focus:rounded-md placeholder:px-1 invalid:text-red-600 invalid:focus:ring-red-600 peer dark:shadow-slate-300 dark:shadow-md rounded-lg dark:text-black";
      okeditbutton.className =
        "okeditbutton shadow-lg h-8 w-20 hover:bg-green-500 rounded-lg dark:border  dark:bg-white dark:shadow-md dark:shadow-slate-300 dark:text-black mx-0.5 text-black font-normal";

      paragraf.innerHTML = "";
      paragraf.appendChild(edittextbox);
      paragraf.appendChild(okeditbutton);

      okeditbutton.onclick = function () {
        paragraf.innerHTML = edittextbox.value;
        divarea.appendChild(tomhapus);
        divarea.appendChild(donebutton);
        divarea.appendChild(edit);
        saveTodos();
      };
    };

    donebutton.onclick = function () {
      if (!this.hasAttribute("done")) {
        donevalue += 1;
        this.setAttribute("done", true);
        paragraf.className = "mx-1 mt-4 text-green-700 font-bold";
        donetext.innerHTML = "Done List: " + donevalue;
        saveTodos();
      }
    };

    saveTodos();
  }
}
