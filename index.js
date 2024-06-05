let inputuser = document.getElementById("inadd");
let donetext = document.getElementById("donetext");
let donevalue = 0;
//menampilkan todo yang di ketik oleh user
function tampil() {
  //jika user memasukan kosong maka akan ada pop up " tidak boleh kosong"
  if (inputuser.value.trim() === "") {
    alert("Input tidak boleh kosong!!!");
  }
  //jika berisi tulisan maka akan ditampilkan
  else {
    //deklarasi
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
    //tailwind class
    tomhapus.className =
      "tomhapus shadow-lg h-8 w-20 hover:bg-red-500 rounded-lg m-1";
    donebutton.className =
      "done shadow-lg h-8 w-20 hover:bg-green-500 rounded-lg m-1";
    edit.className =
      "edit shadow-lg h-8 w-20 hover:bg-yellow-500 rounded-lg m-1";
    divarea.className = "divarea mx-2.5";
    paragraf.className = "mx-1 mt-4";
    //menampilkan dengan funsi append
    divarea.append(paragraf);
    divarea.append(tomhapus);
    divarea.append(donebutton);
    divarea.append(edit);
    box.append(divarea);
    //
    //tombol hapus di klik maka akan menghapus salah satu todo list
    tomhapus.onclick = function () {
      if (confirm("Apakah anda yakin untuk hapus?")) {
        if (donebutton.hasAttribute("done")) {
          donevalue -= 1;
          donetext.innerHTML = "Done List: " + donevalue;
          console.log("Done value per paragraf: ", donevalue);
        }
        paragraf.remove();
        tomhapus.remove();
        donebutton.remove();
        edit.remove();
        divarea.remove();
      }
    };
    //
    //pengeditan teks
    edit.onclick = function () {
      let edittextbox = document.createElement("input");
      let okeditbutton = document.createElement("button");

      edittextbox.value = paragraf.innerText;
      okeditbutton.innerHTML = "OK";
      //classs
      edittextbox.className = "edittextbox shadow-md p-1  focus:ring-1 focus:border-sky-600 focus:outline-none focus:rounded-md placeholder:px-1 invalid:text-red-600 invalid:focus:ring-red-600 peer dark:shadow-slate-300 dark:shadow-lg";
      okeditbutton.className = "okeditbutton shadow-lg h-8 w-20 hover:bg-green-500 rounded-lg";
      //
      paragraf.innerHTML = "";
      paragraf.appendChild(edittextbox);
      paragraf.appendChild(okeditbutton);
      okeditbutton.onclick = function () {
        paragraf.innerHTML = edittextbox.value;
        divarea.appendChild(tomhapus);
        divarea.appendChild(donebutton);
        divarea.appendChild(edit);
      };
    };
    //
    //saat sudah selesai to do listnya..
    donebutton.onclick = function () {
      if (!this.hasAttribute("done")) {
        donevalue += 1;
        this.setAttribute("done", true); // Mark this button as done
        console.log("Done value per paragraf:", donevalue);
        donetext.innerHTML = "Done List: " + donevalue;
        donetext.className = "mx-2.5"
        paragraf.className = "mx-1 mt-4 text-green-700 font-bold"
      }
    };
    //
  }
}
//
