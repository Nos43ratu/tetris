window.addEventListener("load", () => {
  const tetris = document.querySelector(".tetris");
  tetris.style.backgroundColor = "black";
  tetris.style.border = "2px solid #0f66ac";
  const settings = {
    width: 10,
    height: 20,
    pxsize: 40,
  };
  const applyBtn = document.querySelector("#apply");
  const width = document.getElementById("width");
  const height = document.getElementById("height");
  const pxSize = document.getElementById("pxSize");
  console.log(width.value, height.value, pxSize.value);
  const applySetting = () => {
    settings.width = width.value;
    settings.height = height.value;
    settings.pxsize = pxSize.value;
    tetris.style.width = settings.width * settings.pxsize + "px";
    tetris.style.height = settings.height * settings.pxsize + "px";
  };
  applySetting();

  // applyBtn.onclick = () => {
  //   applySetting();
  // };

  for (let y = 0; y < settings.height; y++) {
    for (let x = 0; x < settings.width; x++) {
      let node = document.createElement("div");
      node.classList.add("node");
      node.style.backgroundColor = "";
      node.style.width = settings.pxsize + "px";
      node.style.height = settings.pxsize + "px";
      node.style.float = "left";
      node.setAttribute("id", +y + "-" + x);
      tetris.appendChild(node);
    }
  }
  startGame();
});
