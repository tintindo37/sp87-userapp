function showFeatureBox(text) {
    const featureBox = document.getElementById('featureBox');
    featureBox.innerText = text;
    featureBox.style.display = 'block';
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