const makeGame = (width, height, pxSize) => {
  //CLEAR PREV GAME
  const game = document.querySelector(".game");
  if (game.firstChild) {
    game.removeChild(game.firstChild);
  }
  //create and fill game with nodes
  const tetris = document.createElement("div");
  tetris.style.backgroundColor = "black";
  tetris.style.border = "2px solid #0f66ac";
  tetris.style.width = width * pxSize + "px";
  tetris.style.height = height * pxSize + "px";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let node = document.createElement("div");
      node.classList.add("node");
      node.style.backgroundColor = "";
      node.style.width = pxSize + "px";
      node.style.height = pxSize + "px";
      node.style.float = "left";
      node.setAttribute("id", +y + "-" + x);
      tetris.appendChild(node);
    }
  }
  game.appendChild(tetris);
};
const getTetraminoType = (type) => {
  switch (type) {
    case "I":
      return [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    case "T":
      return [
        [7, 7, 7],
        [0, 7, 0],
        [0, 0, 0],
      ];
    case "L":
      return [
        [2, 2, 2],
        [2, 0, 0],
        [0, 0, 0],
      ];
    case "J":
      return [
        [3, 3, 3],
        [0, 0, 3],
        [0, 0, 0],
      ];
    case "S":
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
    case "Z":
      return [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0],
      ];
    case "O":
      return [
        [4, 4],
        [4, 4],
      ];
  }
};
const getRandomTetramino = () => {
  const pieces = "ITLJSZO";
  return getTetraminoType(pieces[randomNumber(pieces.length)]);
};
const colors = [
  null,
  "#ff6900",
  "#fcb900",
  "#00d084",
  "#0693e3",
  "#eb144c",
  "#f78da7",
  "#9900ef",
];
const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
const randomNumber = (n) => {
  return (n * Math.random()) | 0;
};
const matrixAppear = (matrix, pos) => {
  matrix.forEach((a, y) => {
    a.forEach((b, x) => {
      if (b !== 0) {
        let node = document.getElementById(`${y + pos.y}-${x + pos.x}`);
        node.style.backgroundColor = colors[b];
      }
    });
  });
};
const updateScore = (s) => {
  document.querySelector(".score").innerText = s;
};
const rotate = (m, d) => {
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [m[x][y], m[y][x]] = [m[y][x], m[x][y]];
    }
  }
  d > 0 ? m.forEach((row) => row.reverse()) : m.reverse();
};
const createNextTetramino = () => {
  const next = document.querySelector(".nextTetramino");
  if (next.firstChild) {
    next.removeChild(next.firstChild);
  }
  const d = document.createElement("div");
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 4; x++) {
      let node = document.createElement("div");
      node.classList.add("node");
      node.style.backgroundColor = "#000";
      node.style.width = 40 + "px";
      node.style.height = 40 + "px";
      node.style.float = "left";
      node.setAttribute("id", "next-" + y + "-" + x);
      d.appendChild(node);
    }
  }
  next.appendChild(d);
};
const fillNextTetramino = (m) => {
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 4; x++) {
      let node = document.getElementById(`next-${y}-${x}`);
      node.style.backgroundColor = "#000";
    }
  }
  m.forEach((a, y) => {
    a.forEach((b, x) => {
      if (b !== 0) {
        let node = document.getElementById(`next-${y}-${x}`);
        node.style.backgroundColor = colors[b];
      }
    });
  });
};
const collision = (gameMatrix, player) => {
  for (let y = 0; y < player.matrix.length; y++) {
    for (let x = 0; x < player.matrix[y].length; ++x) {
      if (
        player.matrix[y][x] !== 0 &&
        (gameMatrix[y + player.pos.y] &&
          gameMatrix[y + player.pos.y][x + player.pos.x]) !== 0
      ) {
        return true;
      }
    }
  }
  return false;
};
