const searchBtn = document.querySelector("#searchBtn");
const qrTextInput = document.querySelector("#qrText");
const displayQR = document.querySelector("#displayQR");

const config = {
  API_URL: "https://api.everrest.educata.dev",
};

searchBtn.addEventListener("click", () => {
  generateQrCode(qrTextInput.value.trim());
});

qrTextInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    generateQrCode(this.value.trim());
  }
});

async function generateQrCode(text) {
  if (text.length === 0) {
    return;
  }
  qrTextInput.value = "";
  try {
    const qrResponse = await xhrRequest(
      "POST",
      `${config.API_URL}/qrcode/generate`,
      { text }
    );
    displayQR.innerHTML = `
      <ul>
        <li>Text: ${qrResponse.text}</li>
        <li>Format: ${qrResponse.format}</li>
        <li>Type: ${qrResponse.type}</li>
        <li>Error correction level: ${qrResponse.errorCorrectionLevel}</li>
      </ul>
      <img class="mt-3 img-thumbnail" src="${qrResponse.result}" alt="${qrResponse.text} generated code" onclick="downloadImage(this)">
    `;
  } catch (err) {
    console.log(err);
  }
}

function xhrRequest(method, url, body = {}) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  if (method !== "GET") {
    xhr.setRequestHeader("Content-Type", "application/json");
  }
  xhr.send(JSON.stringify(body));
  return new Promise((resolve, reject) => {
    xhr.onerror = () => {
      reject(JSON.parse(xhr.responseText));
    };
    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };
  });
}

function downloadImage(image) {
  const a = document.createElement("a");
  a.setAttribute("href", image.src);
  a.setAttribute("download", `${image.alt}.png`);
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
