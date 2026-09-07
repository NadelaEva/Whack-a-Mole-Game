const cursor = document.querySelector(".cursor");
const scoreDisplay = document.querySelector(".score span");
const countdown = document.querySelector(".countdown span");
const holes = [...document.querySelectorAll(".hole")];
let score = 0;
const sound = new Audio("./assets/smash.mp3");
let timeLeft = 30;

//waktu berjalan
let interval = setInterval(() => {
    timeLeft--;
    countdown.textContent = timeLeft;

    if (timeLeft < 10) {
        countdown.textContent = String(timeLeft).padStart(2, "0");//menggunakan 2 karakter
    }

    if (timeLeft <= 0) {
        document.querySelector(".in-game").style.display = "none"; //disembunyikan
        document.querySelector(".history").style.display = "none";
        clearInterval(interval);

        const finalScore = document.querySelector(".final-score");
        const resetGame = document.querySelector(".reset-btn");
        document.querySelector("body").style.cursor = "default";
        finalScore.style.display = "block"; //menapilkan hasil
        resetGame.style.display = "block";
        cursor.style.display = "none";

        const h3 = document.createElement("h3");
        const h1 = document.createElement("h1");
        h3.textContent = "Your final score is : ";
        h1.textContent = score;

        resetGame.addEventListener("click", () => {
          window.location.reload();
        });

        finalScore.appendChild(h3);
        finalScore.appendChild(h1);
    }
}, 1000);

function run () {
    //memilih lubang random
    const i = Math.floor(Math.random() * holes.length); 
    let hole = holes[i];
    let timer = null;

    const img = document.createElement("img");
    img.classList.add("mole");
    img.src = "./assets/mole.png";

    img.addEventListener("click", () => {
        score += 10;
        sound.play();
        scoreDisplay.textContent = score;
        img.src = "./assets/mole-whacked.png"; //mengubah mole yg di pukul
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            if (timeLeft > 0) {
                run();
            }
        }, 500); //memberi waktu diam slama 0,5s
    })

    hole.appendChild(img);

    timer = setTimeout(() => {
      hole.removeChild(img);

      if (timeLeft > 0) {
         run();
        }
    }, 1500);
}

run();

window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px"; //horizontal
  cursor.style.left = e.pageX + "px"; //vertikal
});

window.addEventListener("mousedown", () => { //mouse di tekan
  cursor.classList.add("active");
});
window.addEventListener("mouseup", () => { //mouse di lepas
  cursor.classList.remove("active");
});