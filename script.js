function calculateWater() {
  const blockHeightInput = document.getElementById("blockHeight").value.trim();
  const blockHeights = blockHeightInput
    .split(",")
    .map((height) => parseInt(height.trim()));

  let waterUnits = 0;
  let leftMax = 0;
  let rightMax = 0;
  let left = 0;
  let right = blockHeights.length - 1;

  while (left < right) {
    if (blockHeights[left] < blockHeights[right]) {
      if (blockHeights[left] > leftMax) {
        leftMax = blockHeights[left];
      } else {
        waterUnits += leftMax - blockHeights[left];
      }
      left++;
    } else {
      if (blockHeights[right] > rightMax) {
        rightMax = blockHeights[right];
      } else {
        waterUnits += rightMax - blockHeights[right];
      }
      right--;
    }
  }

  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `Units of water stored: ${waterUnits}`;
}
