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
    let response = await fetch('https://raw.githubusercontent.com/tintindo37/sp87-userapp/prod/patchnote/latest.txt'); // Update this URL
    let text = await response.text();
    return text;
}
async function fetchVersionFeatureText() {
    let response = await fetch('https://raw.githubusercontent.com/tintindo37/sp87-userapp/test/patchnote/version.txt', {
        cache: "no-store",
    }); // Update this URL
    let text = await response.text();
    return text;
}
//funkcja co zdobywa dane z local storage 
async function getVersionShown() {
    let versionShown = await localStorage.getItem('versionshown');
    console.log(versionShown); // Now it's a string
    return versionShown;
}

//główna funkcja co updatuje strone i backend
async function checkAndShowFeature() {
    if (!localStorage.getItem('featureShown')) {
        let featureText = await fetchFeatureText();
        showFeatureBox(featureText);
        localStorage.setItem('featureShown', 'true');
        let version = await fetchVersionFeatureText()
        console.log(version + "1");
        localStorage.setItem('versionshown', await version);
    }
    else{
        let version = await fetchVersionFeatureText();
        let localversion = await getVersionShown();  
//       console.log(version)
//        console.log(localversion)  
        if(version !== localversion){
            let featureText = await fetchFeatureText();
            showFeatureBox(featureText);
            localStorage.clear;
            localStorage.setItem('featureShown', 'true');
            let version = fetchVersionFeatureText()
            localStorage.setItem('versionshown', version);
            let version1 = await fetchVersionFeatureText();
            let localversion = await getVersionShown();  
            console.log(localversion)  
            console.log(version1);
            console.log("nowa wersja");
        }
        else{
            console.log("nic sie nie zmieniło");
            let version1 = await fetchVersionFeatureText();
            let localversion2 = await getVersionShown();  
            console.log(localversion2)  
            console.log(version1);
        }
    }
}

checkAndShowFeature();