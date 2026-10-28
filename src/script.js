let qr = null;
let isAdvancedMode = false; // Controla qué pestaña está activa

const card = document.getElementById("card");
const cardTitle = document.getElementById("cardTitle");
const cardSub = document.getElementById("cardSub");
const cardExtra = document.getElementById("cardExtra");
const qrContainer = document.getElementById("qrContainer");

// Función para cambiar entre pestañas
function switchTab(mode) {
    isAdvancedMode = (mode === 'advanced');
    
    // Cambiar clases visuales en los botones
    document.getElementById('tabNormal').classList.toggle('active', !isAdvancedMode);
    document.getElementById('tabAdvanced').classList.toggle('active', isAdvancedMode);
    
    // Mostrar u ocultar el contenido de la pestaña
    document.getElementById('contentNormal').classList.toggle('active', !isAdvancedMode);
    document.getElementById('contentAdvanced').classList.toggle('active', isAdvancedMode);
    
    updatePreview(); // Actualizar la tarjeta al cambiar de pestaña
}

// Función centralizada para aplicar estilos al texto
// element = el div HTML, inputPrefix = "title", "sub" o "extra", configPrefix = "global" o "title/sub/extra"
function applyStyles(element, inputPrefix, configPrefix) {
    const textInput = document.getElementById(`${inputPrefix}Input`);
    const show = document.getElementById(`show${inputPrefix.charAt(0).toUpperCase() + inputPrefix.slice(1)}`).checked;
    
    if (!show) {
        element.style.display = "none";
        return;
    }
    
    element.style.display = "block";
    element.innerText = textInput.value || textInput.placeholder;
    
    element.style.fontSize = `${document.getElementById(`${configPrefix}Size`).value}px`;
    element.style.color = document.getElementById(`${configPrefix}Color`).value;
    element.style.fontWeight = document.getElementById(`${configPrefix}Bold`).checked ? "bold" : "normal";
    element.style.fontStyle = document.getElementById(`${configPrefix}Italic`).checked ? "italic" : "normal";

    const useBg = document.getElementById(`${configPrefix}BgToggle`).checked;
    if (useBg) {
        element.style.backgroundColor = document.getElementById(`${configPrefix}BgColor`).value;
        element.style.padding = "10px 15px";
    } else {
        element.style.backgroundColor = "transparent";
        element.style.padding = "0px";
    }
    
    element.style.borderRadius = document.getElementById(`${configPrefix}Radius`).checked ? "10px" : "0px";
}

function updatePreview() {
    const bg1 = document.getElementById("bgColor1").value;
    const bg2 = document.getElementById("bgColor2").value;
    card.style.background = `linear-gradient(to bottom, ${bg1}, ${bg2})`;

    // Si estamos en modo avanzado, leemos configuraciones separadas
    if (isAdvancedMode) {
        applyStyles(cardTitle, "title", "title");
        applyStyles(cardSub, "sub", "sub");
        applyStyles(cardExtra, "extra", "extra");
    } else {
        // Si estamos en modo normal, todos los textos leen de la configuración "global"
        applyStyles(cardTitle, "title", "global");
        applyStyles(cardSub, "sub", "global");
        applyStyles(cardExtra, "extra", "global");
    }
}

// Escuchar eventos
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", updatePreview);
});

function generateQR(){
    const text = document.getElementById("qrInput").value;

    if(text === ""){
        alert("Escribe el contenido del QR primero");
        return;
    }

    qrContainer.innerHTML = "";
    qr = new QRCode(qrContainer, {
        text: text,
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff"
    });
}

function downloadCard(){
    if(!qrContainer.querySelector("img")) {
        alert("¡Genera un QR antes de descargar la tarjeta!");
        return;
    }

    html2canvas(card, { scale: 2 }).then(canvas => {
        const link = document.createElement("a");
        link.download = "mi_tarjeta_qr_pro.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

// Inicializar la vista
updatePreview();