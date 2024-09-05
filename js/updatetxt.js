function showFeatureBox(text) {
    const featureBox = document.getElementById('featureBox');
    featureBox.innerText = text;
    featureBox.style.display = 'block';
    const butt = document.createElement("button");
    butt.innerHTML = "Zamknij update";
    butt.setAttribute("onclick","patch()")
    featureBox.appendChild(butt);
}
function patch(){
    const featureBox = document.getElementById('featureBox');
    featureBox.style.display = 'none';
}
async function fetchFeatureText() {
    const response = await fetch('https://raw.githubusercontent.com/tintindo37/sp87-userapp/testing-main/patchnote/latest.txt.txt'); // Update this URL
    const text = await response.text();
    return text;
}

async function checkAndShowFeature() {
    if (!localStorage.getItem('featureShown')) {
        const featureText = await fetchFeatureText();
        showFeatureBox(featureText);
        localStorage.setItem('featureShown', 'true');
    }
}

checkAndShowFeature();