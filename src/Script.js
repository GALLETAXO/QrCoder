
let qr;


function generateQR(){

    const text = document.getElementById("textInput").value;

    const container = document.getElementById("qrContainer");


    if(text === ""){
        alert("Escribe algo primero");
        return;
    }


    container.innerHTML = "";


    qr = new QRCode(container, {

        text: text,

        width: 200,

        height: 200

    });


    document.getElementById("downloadBtn").disabled = false;

}



function downloadQR(){

    const img = document.querySelector("#qrContainer img");


    if(!img){
        return;
    }


    const link = document.createElement("a");

    link.href = img.src;

    link.download = "codigo_qr.png";

    link.click();

}