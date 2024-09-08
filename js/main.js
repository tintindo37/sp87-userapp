const but1 = document.getElementById("rand");
const but3 = document.getElementById("changepass");
const dlbut1 = document.getElementById("dlugosc");
//funkcja co zmienia widoczność inputa gdzie można wpisać jak długo hasło wpisać
function ranpass(){
    if(but1.checked == true){
        dlbut1.style.display = "block";
    } else {
        dlbut1.style.display = "none";
    }
}
//funkcja co chowa input na ilosc uzytkownikow przy wpisaniu uzytkownikow z listy
const checklistax = document.getElementById("listax");
const com1 = document.getElementById("command");
const lcom1 = document.getElementById("lcommand");
function listanamebut(){   
    if(checklistax.checked !== true){
        com1.style.display = "block";
        lcom1.style.display = "block";
    } else {
        com1.style.display = "none";
        lcom1.style.display = "none";
    }
}
//funkcja co idzie do głównego ekranu
function goBack() {
    location.reload();
}
//funkcja która tworzy inputy i miejsce gdzie mozna wpisac nazwe, haslo i wybrac komputer
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
//funkcja co bierze imie i nazwiska i zamienia je w inputy
var num = 0
function creatlistname(arr,ile,len, imienazw) {
    const div2 = document.getElementById('div2');
    let d = document.createElement("br");
    div2.appendChild(d);
    let x = document.createElement("select");
    x.setAttribute("id", "pc");
    div2.appendChild(x);
    let i1 = document.createElement("input");
    i1.value = imienazw;
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
    populateList(arr, ile)
    num++;
}
//funkcja do wypełnienia listy komputerów
//W przyszłości chce żeby automatycznie brało z action1 ale musze się nauczyć jak pisać api
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
//funkcja do generowania hasła
function generatePassword(len) {
    var length = len,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
//funkcja co usuwa Polskie znaki
function removePolishCharacters(arr) {
    const polishToEnglishMap = {
        'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
        'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
    };

    return arr.map(item => {
        return item.split('').map(char => polishToEnglishMap[char] || char).join('');
    });
}
//funkcja co genruje drugi krok aplikacji
function generateCommand() {
    const checklista = document.getElementById("listax");
    const klasa = document.getElementById("comm2").value;
    if(klasa.length == 0){
        alert("Proszę wypełnić klasę")
        exit()
    }
    if (checklista.checked == true){
        const checkdl = document.getElementById("rand");
        if(checkdl.checked == true){
            var dl = document.getElementById('dlugosc').value; 
        }else{
            var dl = 0;
        }
        const h1 = document.getElementById("tytul");
        h1.innerHTML = "Wpisać imie i nazwiska";
        const div1 = document.getElementById("div1")
        div1.innerHTML = "";
        const div2 = document.getElementById('div2');
        let txtbox = document.createElement("textarea");
        txtbox.setAttribute("id","namesInput")
        txtbox.setAttribute("placeholder", "Wpisać imie i nazwiska, każde na nowej lini (automatycznie polskie znaki się usuną)")    
        div2.appendChild(txtbox);     
        let but1 = document.createElement("button");
        but1.innerHTML = "wygeneruj komende";
        but1.setAttribute("id", "comgen");
        but1.setAttribute("onclick", 'processNames('+dl+',"'+ klasa+'")');
        div2.appendChild(but1); 
        let back = document.createElement("button");
        back.setAttribute("class", "back-button");
        back.setAttribute("onclick", "goBack()");
        back.innerHTML="Powrót do Menu";
        div2.appendChild(back);
    }else{
        genCommand();
    }
}
var namlista = [];

function processNames(dl,klasa) {
    const namesText = document.getElementById("namesInput").value;
    // Split the input by new lines
    const namesArray = namesText.split("\n");
    // Get the unordered list element
    const namesList = document.getElementById("namesList");
    // Create a list item for each name
    let ileimion = 0;
    namesArray.forEach(name => {
        if(name.trim() !== "") {
            namlista.push(name.trim());
            ileimion++
        }  
    });
    let namlistapl = removePolishCharacters(namlista)
    genCommandname(ileimion-1, dl, namlistapl, klasa )

}
function genCommandname(commandInput, dl, namlista, klasa) {
    const h1 = document.getElementById("tytul");
    h1.innerHTML = "Sprawdzić dane";
    const div2 = document.getElementById('div2');
    const komp = ["S215-01", "S215-02", "S215-03", "S215-04", "S215-05", "S215-06", "S215-07", "S215-08","S215-09","S215-10", "S215-11", "S215-12", "S215-13 nie działa", "S215-14", "S215-15", "S215-16","S215-17","S215-18", "S215-19", "S215-20", "S215-21","S215-22","S215-23","S215-24",] ; 
    document.getElementById('div2').innerHTML = "";
    let i = 0;
    while (i <= commandInput) {
        let x = namlista[i]+" " +klasa; 
        creatlistname(komp, i, dl, x);
        i++;
    } 
    let but1 = document.createElement("button");
    but1.innerHTML = "wygeneruj komende";
    but1.setAttribute("id", "comgen");
    but1.setAttribute("onclick", 'comgen('+commandInput+',"'+ klasa+'")');
    div2.appendChild(but1); 
    let back = document.createElement("button");
    back.setAttribute("class", "back-button");
    back.setAttribute("onclick", "goBack()");
    back.innerHTML="Powrót do Menu";
    div2.appendChild(back);   
}
function genCommand() {
    const h1 = document.getElementById("tytul");
    h1.innerHTML = "Wpisać dane";
    const commandInput = document.getElementById('command').value-1;
    let dl = document.getElementById('dlugosc').value;
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
    let back = document.createElement("button");
    back.setAttribute("class", "back-button");
    back.setAttribute("onclick", "goBack()");
    back.innerHTML="Powrót do Menu";
    div2.appendChild(back);
}

//generowanie ostatecznego kroku aplikacji 
function comgen(ileosob,klasa){
    const kom = document.querySelectorAll('[id=pc]');
    const uzyt = document.querySelectorAll('[id=userx]');
    const pass = document.querySelectorAll('[id=passx]');
    const h1 = document.getElementById("tytul");

    h1.innerHTML = "Skopiować konfiguracje do skryptu w Action1";
    let i=0;
    let listakomp = [];
    let usernampl = [];
    let passwordxpl = [];
    let changepassx = [];
    let imienazw = [];
    let klasax = [];
    while (i <= ileosob) {    
        listakomp.push('"'+kom[i].value+'"');
        usernampl.push('"'+uzyt[i].value+'"');
        passwordxpl.push('"'+pass[i].value+'"');
        klasax.push('"Klasa '+klasa+'"');
        if(but3.checked == true){
            changepassx.push('"yes"');   
        }
        else{
            changepassx.push('"no"'); 
        }

        imienazw.push('"'+namlista[i]+'"'); 
        i++;
    } 

    let usernamex = removePolishCharacters(usernampl);
    let passwordx = removePolishCharacters(passwordxpl);
    let imienazwpl = removePolishCharacters(imienazw);
    let listaex = "$listakomp = @("+listakomp.toString()+")";
    let userex = "$nazwauzyt = @("+usernamex.toString()+")";
    let pasx = "$pass = @("+passwordx.toString()+")";
    let changex = "$changepass = @("+changepassx.toString()+")";
    let klaex = "$comm = @("+klasax.toString()+")";
    let imiex = "$imie = @("+imienazwpl.toString()+")";
    const div2 = document.getElementById('div2');
    div2.innerHTML = "";
    let configbutt = listaex +"`n "+ userex +"`n "+ pasx +"`n "+ changex+"`n "+ klaex +"`n "+ imiex +"`n";
//butt copy   
    let copyback = document.createElement("button");
    copyback.setAttribute("class", "back-copy");
    copyback.setAttribute("onclick", "copy('"+configbutt+"')");
    copyback.innerHTML="Skopiuj do schowka";
    div2.appendChild(copyback);
    
//config 
    let p = document.createElement("p");
    let config = listaex +"`n <br>"+ userex +"`n <br>"+ pasx +"`n <br>"+ changex+"`n <br>"+ klaex +"`n <br>"+ imiex +"`n";
    p.innerHTML = config;
    div2.appendChild(p);
    let br = document.createElement("br");
    div2.appendChild(br);
    div2.appendChild(br);
    div2.appendChild(br);
// butt 1
    let back = document.createElement("button");
    back.setAttribute("class", "back-button");
    back.setAttribute("onclick", "goBack()");
    back.innerHTML="Powrót do Menu";
    div2.appendChild(back);
// butt 2
    let back2 = document.createElement("button");
    back2.setAttribute("id", "printbutt");
    back2.setAttribute("onclick", "window.print()");
    back2.innerHTML="Wydrukuj";
    div2.appendChild(back2);
// butt 3
    let back3 = document.createElement("button");
    back3.setAttribute("class", "exelbutt");
    back3.setAttribute("onclick", "exportData('xlsx','"+klasa+"')");
    back3.innerHTML="export to exel";
    div2.appendChild(back3);

// Create the table element
    let table = document.createElement('table');
    table.setAttribute('border', '1');
    table.setAttribute("id","nametable")

// Create the table header
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    let headers = ['PC' ,'Username', 'Password', 'Zmiana hasła',  'Klasa', 'Imię i naziwsko'];
    headers.forEach(headerText => {
        let th = document.createElement('th');
        let text = document.createTextNode(headerText);
        th.appendChild(text);
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

// Create the table body
    let tbody = document.createElement('tbody');

    for (let i = 0; i < listakomp.length; i++) {
        let row = document.createElement('tr');

        let pcCell = document.createElement('td');
        let usernameCell = document.createElement('td');
        let passwordCell = document.createElement('td');
        let klasacell = document.createElement('td');
        let zmieniacell = document.createElement('td');
        let imienazwcell = document.createElement("td");


        pcCell.appendChild(document.createTextNode(listakomp[i].replace(/"/g, '')));
        usernameCell.appendChild(document.createTextNode(usernamex[i].replace(/"/g, '')));
        passwordCell.appendChild(document.createTextNode(passwordx[i].replace(/"/g, '')));
        let zmiana = klasax[i].replace(/"/g, '');
        if(zmiana = "yes"){
            zmieniacell.appendChild(document.createTextNode("tak"));
        }else{
            zmieniacell.appendChild(document.createTextNode("nie"));

        }
        klasacell.appendChild(document.createTextNode(klasax[i].replace(/"/g, '')));
        imienazwcell.appendChild(document.createTextNode(imienazwpl[i].replace(/"/g, '')));


        row.appendChild(pcCell);
        row.appendChild(usernameCell);
        row.appendChild(passwordCell);
        row.appendChild(zmieniacell);
        row.appendChild(klasacell);
//     row.appendChild(imienazwcellell);
        

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    // Add the table to the DOM
    const body = document.getElementById("bd")
    table.setAttribute("id","table")
    body.appendChild(table);

    
}
// do exportowania plików do exela
function exportData(type, klasa){
    let kl = "Klasa " +klasa+".";
    const fileName = kl + type
    const table = document.getElementById("table")
    const wb = XLSX.utils.table_to_book(table)
    XLSX.writeFile(wb, fileName)
    const body = document.getElementById("bd");
    alert('Pobrało się do folderu Pobrane');
    body.appendChild(txt);
}
//funkcja co kopiuje konfig
function copy(config){
    navigator.clipboard.writeText(config);
}
//    $listakomp = @("cos", "Dekstop-1","desktop-2","lap1")
//    $nazwauzyt = @("AKlonowski","cos")
//    $pass = @("Pass123")
//    $changepass = @("yes","no")
//    $comm = @("klasa 2a", "klasa 3b")
//    $imie = @("Adam Kowalski")

