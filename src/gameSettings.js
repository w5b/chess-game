const gameSettings = {
  DEBUG_MODE: true,
  tileSize: 50,
  darkTileColor: "#81935c",
  darkTileSelectedColor: "#bfc658",
  lightTileColor: "#ecebd2",
  lightTileSelectedColor: "#f6f295",

  moveSound: new Audio("../assets/move-self.mp3"),
};

gameSettings.boardSize = gameSettings.tileSize * 8;

export default gameSettings;
