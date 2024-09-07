//funkcja co woła featurebox 
function showFeatureBox(text) {
    const featureBox = document.getElementById('featureBox');
    featureBox.innerText = text;
    featureBox.style.display = 'block';
    const butt = document.createElement("button");
    butt.innerHTML = "Zamknij update";
    butt.setAttribute("onclick","patch()")
    featureBox.appendChild(butt);
}
//funkcja co dodaje featurebox do dom
function patch(){
    const featureBox = document.getElementById('featureBox');
    featureBox.style.display = 'none';
}
//funckje co biorą danę z githuba
async function fetchFeatureText() {
    const response = await fetch('https://raw.githubusercontent.com/tintindo37/sp87-userapp/prod/patchnote/latest.txt'); // Update this URL
    const text = await response.text();
    return text;
}
async function fetchVersionFeatureText() {
    const response = await fetch('https://raw.githubusercontent.com/tintindo37/sp87-userapp/test/patchnote/version.txt'); // Update this URL
    const text = await response.text();
    return text;
}
//funkcja co zdobywa dane z local storage 
async function getVersionShown() {
    let versionShown = await localStorage.getItem('versionshown');
    return versionShown ;
}

//główna funkcja co updatuje strone i backend
async function checkAndShowFeature() {
    if (!localStorage.getItem('featureShown')) {
        const featureText = await fetchFeatureText();
        showFeatureBox(featureText);
        localStorage.setItem('featureShown', 'true');
        const version = await fetchVersionFeatureText()
        localStorage.setItem('versionshown', version);
    }
    else{
        const version = await fetchVersionFeatureText();
        const localversion = await getVersionShown();    
        if(version !== localversion){
            const featureText = await fetchFeatureText();
            showFeatureBox(featureText);
            localStorage.clear;
            localStorage.setItem('featureShown', 'true');
            const version = fetchVersionFeatureText()
            localStorage.setItem('versionshown', version);
            console.log("nowa wersja");
        }
        else{
            console.log("nic sie nie zmieniło");
        }
    }
}

checkAndShowFeature();