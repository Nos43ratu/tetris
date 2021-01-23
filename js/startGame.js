const startGame = (width, height, pxSize, speed) => {
  let pause = false;
  makeGame(width, height, pxSize);

  document.querySelector(".pause").onclick = () => {
    pause = !pause;
  };
  document.querySelector(".restart").onclick = () => {
    startGame(width, height, pxSize, speed);
  };

  const gameMatrix = new Array(height)
    .fill(0)
    .map(() => new Array(width).fill(0));

  const player = {
    pos: { x: 0, y: 0 },
    matrix: getRandomTetramino(),
    score: 0,
  };
  createNextTetramino();

  let next = getRandomTetramino();
  fillNextTetramino(next);

  const draw = () => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let node = document.getElementById(+y + "-" + x);
        node.style.backgroundColor = "";
      }
    }
    matrixAppear(gameMatrix, { x: 0, y: 0 });
    matrixAppear(player.matrix, player.pos);
  };

  const moveDown = () => {
    player.pos.y++;
    if (collision(gameMatrix, player)) {
      player.pos.y--;
      player.matrix.forEach((row, y) => {
        row.forEach((col, x) => {
          if (col !== 0) {
            gameMatrix[y + player.pos.y][x + player.pos.x] = col;
          }
        });
      });
      playerReset();
      let rowCount = 1;
      outer: for (let y = gameMatrix.length - 1; y > 0; --y) {
        for (let x = 0; x < gameMatrix[y].length; ++x) {
          if (gameMatrix[y][x] === 0) {
            continue outer;
          }
        }

        const row = gameMatrix.splice(y, 1)[0].fill(0);
        gameMatrix.unshift(row);
        ++y;

        player.score += rowCount * 500;
        rowCount *= 2;
      }
      updateScore(player.score);
    }
    timeCount = 0;
  };
  const playerReset = () => {
    player.matrix = next;
    next = getRandomTetramino();
    fillNextTetramino(next);
    player.pos.y = 0;
    player.pos.x =
      ((gameMatrix[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
    if (collision(gameMatrix, player)) {
      gameMatrix.forEach((row) => row.fill(0));
      player.score = 0;
      updateScore(player.score);
    }
  };
  let timeCount = 0;
  let prevTime = 0;
  const update = (time = 0) => {
    if (!pause) {
      let timeBetween = time - prevTime;
      prevTime = time;
      timeCount += timeBetween;
      if (timeCount > speed + 1000) {
        moveDown();
      }
      draw();
    }
    requestAnimationFrame(update);
  };
  //KEYBOARD CONTOLL HANDLER
  document.addEventListener("keydown", (event) => {
    if (event.code == "ArrowLeft") {
      player.pos.x--;
      if (collision(gameMatrix, player)) {
        player.pos.x++;
      }
    }
    if (event.code == "ArrowRight") {
      player.pos.x++;
      if (collision(gameMatrix, player)) {
        player.pos.x--;
      }
    }
    if (event.code == "ArrowDown") {
      moveDown();
    }
    if (event.code == "ArrowUp") {
      const pos = player.pos.x;
      let offset = 1;
      rotate(player.matrix, -1);
      while (collision(gameMatrix, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
          rotate(player.matrix, 1);
          player.pos.x = pos;
          return;
        }
      }
    }
  });
  update();
};
