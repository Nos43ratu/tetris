window.addEventListener("load", () => {
  const settings = {
    width: 10,
    height: 20,
    pxSize: 40,
  };
  const applyBtn = document.querySelector(".apply");
  const width = document.getElementById("width");
  const height = document.getElementById("height");
  const pxSize = document.getElementById("pxSize");
  const applySetting = () => {
    settings.width = width.value;
    settings.height = height.value;
    settings.pxSize = pxSize.value;
    startGame(settings.width, settings.height, settings.pxSize);
  };

  applyBtn.onclick = () => {
    applySetting();
  };

  applySetting();
  startGame(settings.width, settings.height, settings.pxSize);
});
