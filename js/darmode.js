
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;
checkdarkmode();
async function checkdarkmode(){
    let dk = await darkmode();
    if(dk == "true"){
        document.getElementById('stylesheet').href='css/darkstyles.css';
        toggleButton.textContent = '☀️';
    }else if(dk == null){
        console.log("dk value is null");
    }else{
        document.getElementById('stylesheet').href='css/styles.css';
        toggleButton.textContent = '🌙';
    }
}
let x = 0;
let y = 0;
toggleButton.addEventListener('click', () => {
    if(x == 0){
        document.getElementById('stylesheet').href='css/darkstyles.css';
        localStorage.setItem('darkmode', 'true');
        x = 1;
    }else{
        document.getElementById('stylesheet').href='css/styles.css';
        localStorage.setItem('darkmode', 'false');
        x = 0;
    }
    // Change the button text/icon
    if (y == 0) {
        toggleButton.textContent = '☀️';
        y = 1;
    } else {
        toggleButton.textContent = '🌙';
        y = 0;
    }
});

async function darkmode() {
    let darkmode = await localStorage.getItem('darkmode');
    return darkmode;
}