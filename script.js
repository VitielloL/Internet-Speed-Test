let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

// Pgea uma img randon
let imageApi = "https://source.unsplash.com/random?topic=nature";

// Quando carregar img
image.onload = async function () {
    endTime = new Date().getTime();

    // Pega tamanho da img
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

// funcao para calcular velocidade
function calculateSpeed() {
    // Tempo gasto em segundos
    let timeDuration = (endTime - startTime) / 1000;
    // Total bits
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    // Se todos os testes forem concluidos (obtemos 5 imagens e calculamos a media)
    if (testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        //Exibe velocidades medias
        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbps}`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}`;
        info.innerHTML = "Test Completed!";
    } else {
        // start para proximo test
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

// Funcao inicial para iniciar testes
const init = async () => {
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

// Execute testes quando starta pagina
window.onload = () => {
    for (let i = 0; i < numTests; i++) {
        init();
    }
};