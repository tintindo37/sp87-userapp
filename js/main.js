const but1 = document.getElementById("rand");
const but3 = document.getElementById("changepass");
const dlbut1 = document.getElementById("dlugosc");
function ranpass(){
if(but1.checked == true){
    dlbut1.style.display = "block";
} else {
    dlbut1.style.display = "none";
}
}

var num = 0
function createname(arr,int,len) {
    const div2 = document.getElementById('div2');
    let d = document.createElement("br");
    div2.appendChild(d);
    let x = document.createElement("select");
    x.setAttribute("id", "pc");
    div2.appendChild(x);
    let i1 = document.createElement("input");
    i1.setAttribute("type", "text");
    i1.setAttribute("id", "userx");
    i1.setAttribute("placeholder", "Username");
    let i2 = document.createElement("input");
    i2.setAttribute("type", "text");
    i2.setAttribute("id", "passx");
    i2.setAttribute("placeholder", "Password");
    if (len > 0){
        i2.value = generatePassword(len) ;
    }
    div2.appendChild(i1);
    div2.appendChild(i2);
    populateList(arr, int)
    num++;
}

function populateList(arr,int) {
const pc = document.querySelectorAll('[id=pc]');

let option1 = document.createElement("option");
option1.innerHTML = arr[int];
pc[int].appendChild(option1);
arr.forEach(komp => {
    let option = document.createElement("option");
    option.innerHTML = komp;
    pc[int].appendChild(option);
});
}
function generatePassword(len) {
    var length = len,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
function generateCommand() {
    const commandInput = document.getElementById('command').value-1;
    const dl = document.getElementById('dlugosc').value;
    const div2 = document.getElementById('div2');
    const komp = ["S215-01", "S215-02", "S215-03", "S215-04", "S215-05", "S215-06", "S215-07", "S215-08","S215-09","S215-10", "S215-11", "S215-12", "S215-13 nie działa", "S215-14", "S215-15", "S215-16","S215-17","S215-18", "S215-19", "S215-20", "S215-21","S215-22","S215-23","S215-24",] ; 
    const klasa = document.getElementById("comm2").value;
    document.getElementById('div1').innerHTML = "";
    let i = 0;
    while (i <= commandInput) {    
        createname(komp, i, dl);
        i++;
    } 
    let but1 = document.createElement("button");
    but1.innerHTML = "wygeneruj komende";
    but1.setAttribute("id", "comgen");
    but1.setAttribute("onclick", 'comgen('+commandInput+',"'+ klasa+'")');
    div2.appendChild(but1);      
}

function comgen(ileosob,klasa){
    const kom = document.querySelectorAll('[id=pc]');
    const uzyt = document.querySelectorAll('[id=userx]');
    const pass = document.querySelectorAll('[id=passx]');
    let i=0;
    let listakomp = [];
    let usernamex = [];
    let passwordx = [];
    let changepassx = [];
    let imienazw = [];
    let klasax = [];
    while (i <= ileosob) {    
        listakomp.push('"'+kom[i].value+'"');
        usernamex.push('"'+uzyt[i].value+'"');
        passwordx.push('"'+pass[i].value+'"');
        klasax.push('"'+klasa+'"');
        if(but3.checked == true){
            changepassx.push('"yes"');   
        }
        else{
            changepassx.push('"no"'); 
        }

    //    imienazw.push[];   //do zrobienia dodac imie i nazwisko
        i++;
    } 
    let listaex = "$listakomp = @("+listakomp.toString()+")";
    let userex = "$nazwauzyt = @("+usernamex.toString()+")";
    let pasx = "$pass = @("+passwordx.toString()+")";
    let changex = "$changepass = @("+changepassx.toString()+")";
    let klaex = "$comm = @("+klasax.toString()+")";
    let imiex = "$imie = @("+imienazw.toString()+")";
    const div2 = document.getElementById('div2');
    div2.innerHTML = "";
    let p = document.createElement("p");
    p.innerHTML = listaex +"<br>"+ userex +"<br>"+ pasx +"<br>"+ changex+"<br>"+ klaex +"<br>"+ imiex;
    div2.appendChild(p);
}

//    $listakomp = @("cos", "Dekstop-1","desktop-2","lap1")
//    $nazwauzyt = @("AKlonowski","cos")
//    $pass = @("Pass123")
//    $changepass = @("yes","no")
//    $comm = @("klasa 2a", "klasa 3b")
//    $imie = @("Adam Kowalski")

