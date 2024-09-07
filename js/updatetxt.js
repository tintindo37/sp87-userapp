//funkcja co woła featurebox 
function showFeatureBox(text) {
    const featureBox = document.getElementById('featureBox');
    featureBox.innerHTML = text;
    featureBox.style.display = 'block';
    const butt = document.createElement("button");
    butt.innerHTML = "Zamknij update";
    butt.setAttribute("onclick","patch()")
    featureBox.appendChild(butt);
}
//funkcja co dodaje featurebox do dom
function patch(){
    const featureBox = document.getElementById('featureBox');
    localStorage.setItem('featureShown', 'true');
    featureBox.style.display = 'none';
}
//funckje co biorą danę z githuba
async function fetchFeatureText() {
    let response = await fetch('https://raw.githubusercontent.com/tintindo37/sp87-userapp/test/patchnote/latest.txt', {
        cache: "no-store",
        cache: "no-cache",
    });
    let text = await response.text();
    return text;
}
async function fetchVersionFeatureText() {
    let response = await fetch('https://raw.githubusercontent.com/tintindo37/sp87-userapp/test/patchnote/version.txt', {
        cache: "no-store",
        cache: "no-cache",
    }); // Update this URL
    let text = await response.text();
    return text;
}
//funkcja co zdobywa dane z local storage 
async function getVersionShown() {
    let versionShown = await localStorage.getItem('versionshown');
    console.log("Dun" +versionShown); // Now it's a string
    return versionShown;
}

//funkcja co generuje text i zmienia wersje 
async function showFeature(version) {
    let featureText = await fetchFeatureText();
    showFeatureBox(featureText);
    console.log("fun"+version);
    localStorage.setItem('versionshown', version);
}


//główna funkcja co updatuje strone i backend


async function checkAndShowFeature() {
    let version = await fetchVersionFeatureText()
    let localversion = await getVersionShown(); 
    console.log("Lokalna version "+localversion + "i version " + version)
    if (!localStorage.getItem('featureShown')) {
        showFeature(version);
    }
    else if (localversion !== version && localStorage.getItem('featureShown')){
        localStorage.clear();
        console.log("zmiana");
        showFeature(version);
    }
    else if (localversion == version && localStorage.getItem('featureShown')){
        console.log("Nie ma zmian local version " + localversion + "i version " + version + "są takie same");
    }
    else{
        console.log("error");
    }
}

checkAndShowFeature();