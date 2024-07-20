const gameSettings = {
  DEBUG_MODE: true,
  darkTileColor: "#81935c",
  darkTileSelectedColor: "#bfc658",
  lightTileColor: "#ecebd2",
  lightTileSelectedColor: "#f6f295",
  kingCheckedColor: "#d54344",
  moveSound: new Audio("../assets/move-self.mp3"),
};

export function calculateTileSize() {
  const minDimension = Math.min(window.innerWidth, window.innerHeight);
  return (minDimension / 1080) * 120;
}

gameSettings.tileSize = calculateTileSize();
gameSettings.boardSize = gameSettings.tileSize * 8;

export default gameSettings;
