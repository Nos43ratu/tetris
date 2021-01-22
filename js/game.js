const startGame = () => {
  let pause = false;
  document.querySelector(".pause").onclick = () => {
    pause = !pause;
  };
  document.querySelector(".restart").onclick = () => {
    playerReset();
  };
  function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
      for (let x = 0; x < arena[y].length; ++x) {
        if (arena[y][x] === 0) {
          continue outer;
        }
      }

      const row = arena.splice(y, 1)[0].fill(0);
      arena.unshift(row);
      ++y;

      player.score += rowCount * 10;
      rowCount *= 2;
    }
  }

  const collide = (arena, player) => {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; y++) {
      for (let x = 0; x < m[y].length; ++x) {
        if (
          m[y][x] !== 0 &&
          (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  };
  const createPice = (type) => {
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
  const draw = () => {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 10; x++) {
        let node = document.getElementById(+y + "-" + x);
        node.style.backgroundColor = "";
      }
    }
    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
  };
  const drawMatrix = (matrix, offset) => {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          let node = document.getElementById(`${y + offset.y}-${x + offset.x}`);
          node.style.backgroundColor = colors[value];
        }
      });
    });
  };
  const merge = (arena, player) => {
    player.matrix.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col !== 0) {
          arena[y + player.pos.y][x + player.pos.x] = col;
        }
      });
    });
  };
  const playerDrop = () => {
    player.pos.y++;
    if (collide(arena, player)) {
      player.pos.y--;
      merge(arena, player);
      playerReset();
      arenaSweep();
      updateScore();
    }
    dropCounter = 0;
  };
  const playerReset = () => {
    const pieces = "ITLJSZO";
    player.matrix = createPice(pieces[(pieces.length * Math.random()) | 0]);
    player.pos.y = 0;
    player.pos.x =
      ((arena[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
    if (collide(arena, player)) {
      arena.forEach((row) => row.fill(0));
      player.score = 0;
      updateScore();
    }
  };
  const playerMove = (dir) => {
    player.pos.x += dir;
    if (collide(arena, player)) {
      player.pos.x -= dir;
    }
  };
  function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
      player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > player.matrix[0].length) {
        rotate(player.matrix, -dir);
        player.pos.x = pos;
        return;
      }
    }
  }
  function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
      }
    }

    if (dir > 0) {
      matrix.forEach((row) => row.reverse());
    } else {
      matrix.reverse();
    }
  }
  let dropCounter = 0;
  let dropInterval = 1000;
  let lastTime = 0;
  const update = (time = 0) => {
    if (!pause) {
      const deltaTime = time - lastTime;
      lastTime = time;
      dropCounter += deltaTime;
      if (dropCounter > dropInterval) {
        playerDrop();
      }
      draw();
    }
    requestAnimationFrame(update);
  };

  const colors = [
    null,
    "#FF0D72",
    "#0DC2FF",
    "#0DFF72",
    "#F538FF",
    "#FF8E0D",
    "#FFE138",
    "#3877FF",
  ];

  const arena = new Array(20).fill(0).map(() => new Array(10).fill(0));
  function updateScore() {
    document.querySelector(".score").innerText = player.score;
  }
  const player = {
    pos: { x: 0, y: 0 },
    matrix: createPice("T"),
    score: 0,
  };
  document.addEventListener("keydown", (event) => {
    if (event.code == "ArrowLeft") {
      playerMove(-1);
    } else if (event.code == "ArrowRight") {
      playerMove(1);
    } else if (event.code == "ArrowDown") {
      playerDrop();
    } else if (event.keyCode === 81) {
      playerRotate(-1);
    } else if (event.keyCode === 69) {
      playerRotate(1);
    }
  });
  update();
  playerReset();
  updateScore();
};
