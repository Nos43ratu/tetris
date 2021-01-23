window.addEventListener("load", () => {
  const settings = {
    width: 10,
    height: 20,
    pxSize: 40,
    speed: 1,
  };
  const applyBtn = document.querySelector(".apply");
  const width = document.getElementById("width");
  const height = document.getElementById("height");
  const pxSize = document.getElementById("pxSize");
  const speed = document.getElementById("speed");
  const applySetting = () => {
    settings.width = width.value;
    settings.height = height.value;
    settings.pxSize = pxSize.value;
    settings.speed = speed.value;
    startGame(
      parseInt(settings.width, 10),
      parseInt(settings.height, 10),
      parseInt(settings.pxSize, 10),
      parseInt(settings.speed, 10)
    );
  };

  applyBtn.onclick = () => {
    applySetting();
  };

  applySetting();
});
