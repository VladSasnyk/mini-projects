const containerSize = { width: 500, height: 500 };

// Виклик функції розташування блоків та відображення результату
// Список блоків беремо з data.json

async function fetchData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Could not fetch data');
    }

    const blocks = await response.json();
    const result = placeBlocks(blocks, containerSize);
    displayBlocks(result.blockCoordinates);

    const outputData = {
      fullness: result.fullness,
      blockCoordinates: result.blockCoordinates,
    };

    console.log(outputData);
    return blocks;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}




// Алгоритм розміщення блоків
const placeBlocks = (blocks, containerSize) =>{
  blocks.sort((a, b) => Math.max(b.width, b.height) - Math.max(a.width, a.height));

  const blockCoordinates = [];
  let totalArea = 0;
  let innerEmptySpace = 0;

  blocks.forEach((block, i) => {
    let bestFit = findBestFit(blockCoordinates, containerSize, block);

    if (!bestFit && block.width !== block.height) {
      const rotatedBlock = { width: block.height, height: block.width };
      bestFit = findBestFit(blockCoordinates, containerSize, rotatedBlock);
    }

    if (bestFit) {
      const color = generateRandomColor();
      blockCoordinates.push({ ...bestFit, color, initialOrder: i });
      totalArea += block.width * block.height;
    }
  });

  const innerSpaces = findInnerSpaces(blockCoordinates, containerSize);
  innerEmptySpace = innerSpaces.reduce((acc, space) => acc + space.width * space.height, 0);

  const containerArea = containerSize.width * containerSize.height;
  const fullness = 1 - innerEmptySpace / (innerEmptySpace + containerArea);
  document.getElementById('fullnessOutput').innerHTML = fullness.toFixed(2);

  return { fullness, blockCoordinates };
}

//ЗНаходимо найкращий варіант розміщення

const findBestFit = (blockCoordinates, containerSize, block, spacing = 0) => {
  const blockWidthWithSpacing = block.width + spacing;
  const blockHeightWithSpacing = block.height + spacing;

  for (let top = containerSize.height - block.height; top >= 0; top -= blockHeightWithSpacing) {
    for (let left = 0; left <= containerSize.width - block.width; left += blockWidthWithSpacing) {
      const right = left + block.width;
      const bottom = top + block.height;

      const isCloseToOtherBlock = blockCoordinates.some(coord =>
        !(right <= coord.left - spacing || left >= coord.right + spacing || bottom <= coord.top - spacing || top >= coord.bottom + spacing)
      );

      if (!isCloseToOtherBlock) {
        return { top, left, right, bottom };
      }
    }
  }

  return null;
}


// Знаходимо площу вільного місця

const findInnerSpaces = (blockCoordinates, containerSize) => {
  const isPointInsideBlocks = (x, y) => {
    return blockCoordinates.some(coord =>
      x >= coord.left && x <= coord.right && y >= coord.top && y <= coord.bottom
    );
  };

  const innerSpaces = [];

  for (let x = 0; x < containerSize.width; x++) {
    for (let y = 0; y < containerSize.height; y++) {
      if (!isPointInsideBlocks(x, y)) {
        const hasAdjacentEmptySpace =
          isPointInsideBlocks(x - 1, y) || isPointInsideBlocks(x, y - 1) || isPointInsideBlocks(x - 1, y - 1);

        if (hasAdjacentEmptySpace) {
          continue;
        }

        innerSpaces.push({
          left: x,
          top: y,
          width: 1,
          height: 1,
        });
      }
    }
  }

  return innerSpaces;
}


// Генерує випадковий колір для блоків
const generateRandomColor = () =>{
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Функція відображення блоків на сторінці
const displayBlocks = (blockCoordinates) => {
  const container = document.getElementById('container');
  container.innerHTML = '';

  blockCoordinates.forEach(block => {
    const blockElement = document.createElement('div');
    blockElement.classList.add('block');
    blockElement.style.width = `${block.right - block.left}px`;
    blockElement.style.height = `${block.bottom - block.top}px`;
    blockElement.style.top = `${block.top}px`;
    blockElement.style.left = `${block.left}px`;
    blockElement.style.backgroundColor = block.color;
    blockElement.textContent = block.initialOrder;
    container.appendChild(blockElement);
  });
}






fetchData()



