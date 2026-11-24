const stage = document.getElementById("designStage");
const icons = document.querySelectorAll(".tech-icon");
const svg = document.getElementById("connectionLines");
const center = document.querySelector(".center-glow");

function drawLines() {

    const stageRect = stage.getBoundingClientRect();
    const centerRect = center.getBoundingClientRect();

    const targetX =
        centerRect.left + centerRect.width / 2 - stageRect.left;

    const targetY =
        centerRect.top - stageRect.top + 8;

    svg.innerHTML = "";

    svg.setAttribute(
        "viewBox",
        `0 0 ${stage.clientWidth} ${stage.clientHeight}`
    );

    icons.forEach((icon, index) => {

        const rect = icon.getBoundingClientRect();

        const startX =
            rect.left + rect.width / 2 - stageRect.left;

        const startY =
            rect.bottom - stageRect.top;

        const distance = targetY - startY;

        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

        const curve = `
            M ${startX} ${startY}
            C ${startX} ${startY + distance * 0.45},
              ${targetX} ${targetY - distance * 0.45},
              ${targetX} ${targetY}
        `;

        path.setAttribute("d", curve);
        path.style.animation = `lineGlow 3s ease-in-out ${index * 0.15}s infinite`;

        svg.appendChild(path);
    });
}

window.addEventListener("load", drawLines);
window.addEventListener("resize", drawLines);