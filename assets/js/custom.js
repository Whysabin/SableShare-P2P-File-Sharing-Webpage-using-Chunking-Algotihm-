function closeModal() {
  document.getElementById("popup-modal").hidden = true;
}
function denial() {
  sendChannel.send(JSON.stringify({ confirmed: false })); downloadInProgress = false; closeModal();
}
function accepting() {
  sendChannel.send(JSON.stringify({ confirmed: true })); closeModal();
}
window.onclick = function (event) {
  let modal = document.getElementById("popup-modal");
  if (event.target == modal) { closeModal(); }
};




window.addEventListener('load', () => {
    let c = document.createElement('canvas');
    document.body.appendChild(c);
    let style = c.style;
    style.width = '100%';
    style.position = 'absolute';
    style.zIndex = -1;
    style.top = 0;
    style.left = 0;
    let ctx = c.getContext('2d');
    let x0, y0, w, h, dw;

    function init() {
        w = window.innerWidth;
        h = window.innerHeight;
        c.width = w;
        c.height = h;
        let offset = h > 380 ? 110 : 102;
        offset = h > 800 ? 116 : offset;
        x0 = w / 2;
        y0 = h - offset;
        dw = Math.max(w, h, 1000) / 13;
        drawCircles();
    }
    window.onresize = init;

    function drawCircle(radius) {
        ctx.beginPath();
        let color = Math.round(255 * (1 - radius / Math.max(w, h)));
        ctx.strokeStyle = 'rgba(' + color + ',' + color + ',' + color + ',0.1)';
        ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = 4;
    }

    let step = 0;

    function drawCircles() {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < 8; i++) {
            drawCircle(dw * i + step % dw);
        }
        step += 1;
    }

    let loading = true;

    function animate() {
        if (loading || step % dw < dw - 5) {
            requestAnimationFrame(function() {
                drawCircles();
                animate();
            });
        }
    }
    window.animateBackground = function(l) {
        loading = l;
        animate();
    };
    init();
    animate();
});


document.addEventListener('DOMContentLoaded', () => {
    const themeLightButton = document.getElementById('theme-light');
    const themeDarkButton = document.getElementById('theme-dark');
    const themeAutoButton = document.getElementById('theme-auto');
    const body = document.body;

    // Function to switch to light mode
    function setLightMode() {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeLightButton.classList.add('selected');
        themeDarkButton.classList.remove('selected');
        themeAutoButton.classList.remove('selected');
    }

    // Function to switch to dark mode
    function setDarkMode() {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeDarkButton.classList.add('selected');
        themeLightButton.classList.remove('selected');
        themeAutoButton.classList.remove('selected');
    }

    // Event listeners for theme buttons
    themeLightButton.addEventListener('click', setLightMode);
    themeDarkButton.addEventListener('click', setDarkMode);

    // Optional: Set initial theme based on user preference or default
    if (body.classList.contains('dark-mode')) {
        setDarkMode();
    } else {
        setLightMode();
    }
});
