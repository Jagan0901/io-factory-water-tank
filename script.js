function calculateWater() {
  const blockHeightsInput = document.getElementById("blockHeight").value;
  const blockHeights = blockHeightsInput.split(",").map(Number);

  let totalWater = 0;

  for (let i = 0; i < blockHeights.length; i++) {
    let leftMax = 0;
    for (let j = 0; j < i; j++) {
      leftMax = Math.max(leftMax, blockHeights[j]);
    }

    let rightMax = 0;
    for (let j = i + 1; j < blockHeights.length; j++) {
      rightMax = Math.max(rightMax, blockHeights[j]);
    }

    const minHeight = Math.min(leftMax, rightMax);
    if (minHeight > blockHeights[i]) {
      totalWater += minHeight - blockHeights[i];
    }
  }

  const resultContainer = document.getElementById("result");
  resultContainer.textContent = `Total water stored: ${totalWater} units`;

  //Water chart
  waterChart(blockHeights);

  //Compute water chart
  computeWaterChart(blockHeights);
}

//Water Chart
function waterChart(blockHeights) {
  const chart = document.getElementById("chart");
  chart.innerHTML = "";

  const width = 40;
  const height = 100;
  const padding = 2;

  const maxBlockHeight = Math.max(...blockHeights);

  for (let i = 0; i < blockHeights.length; i++) {
    const bar = document.createElement("div");

    const dummyArray = [...blockHeights];

    const barHeight =
      i != 0 && i != blockHeights.length - 1 && blockHeights[i] === 0
        ? (gettingBarHeight(dummyArray, i) / maxBlockHeight) * height
        : (blockHeights[i] / maxBlockHeight) * height;

    bar.style.height = `${barHeight}px`;

    if (i != 0 && i != blockHeights.length - 1 && blockHeights[i] === 0) {
      bar.style.backgroundColor = "blue";
    } else {
      bar.style.backgroundColor = "yellow";
    }

    bar.classList.add("bar");
    chart.appendChild(bar);
  }
}

//To calculate water height for bar chart which was in line 51
function gettingBarHeight(height, i) {
  //  if(i!=0 && i!=(height.length-1) && height[i]===0){
  if (height[i - 1] !== 0) {
    height[i] = height[i - 1];
    return height[i];
  } else {
    return gettingBarHeight(height, i - 1);
  }
  //  }
}

//Compute Water Chart
function computeWaterChart(blockHeights) {
  const chart = document.getElementById("water-chart");
  chart.innerHTML = "";

  const width = 40;
  const height = 100;
  const padding = 2;

  const maxBlockHeight = Math.max(...blockHeights);

  for (let i = 0; i < blockHeights.length; i++) {
    const bar = document.createElement("div");

    const dummyArray = [...blockHeights];

    const barHeight =
      (gettingBarHeight(dummyArray, i) / maxBlockHeight) * height;

    bar.style.height = `${barHeight}px`;

    if (i != 0 && i != blockHeights.length - 1 && blockHeights[i] === 0) {
      bar.style.backgroundColor = "blue";
    } else bar.style.backgroundColor = "white";

    bar.classList.add("bar");
    chart.appendChild(bar);
  }
}
