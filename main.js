var array = [];
var speed = 15;
function createRandomArray(size) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    const val = Math.floor(Math.random() * 100);
    if (val > 0) {
      arr.push(val);
    } else {
      arr.push(val + 5);
    }
  }
  return arr;
}

function bubbeSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - (i + 1); j++) {
      if (array[j] > array[j + 1]) {
        const [first, second] = swap(array[j + 1], array[j]);
        array[j] = second;
        array[j + 1] = first;
      }
    }
  }
  return array;
}

window.onload = function () {
  console.log(bubbeSort([6, 5, 4, 3, 2, 1]));
  updateBars();
};

function getArraySize() {
  let arraySize = document.getElementById("arraySizeRange").value;
  if (arraySize) {
    arraySize = arraySize * 10;
  } else {
    arraySize = 20;
  }
  return arraySize;
}

function setSpeed() {
  let trSpeed = document.getElementById("arraySpeedRange").value;
  if (trSpeed) {
    speed = 500 / (trSpeed * 2);
  } else {
    speed = 15;
  }
}

function updateBars(arr = []) {
  setSpeed();
  const arraySize = getArraySize();
  if (arr.length == 0) {
    array = createRandomArray(arraySize);
  } else {
    array = arr;
  }
  createBarChart();
}

function createBarChart() {
  const chartContainer = document.getElementById("chart");
  chartContainer.innerHTML = "";

  array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.id = `bar_${index}`;
    bar.classList.add("bar");
    bar.classList.add("border");
    bar.style.height = `${value}%`;
    bar.style.backgroundColor = "#0000FF";
    bar.style.width = `${100 / array.length}%`;
    chartContainer.appendChild(bar);
  });
}

// function bubbleSort() {
//   setTimeout(() => {
//     for (let i = 0; i < array.length - 1; i++) {
//       for (let j = 0; j < array.length - (i + 1); j++) {
//         let bar1 = document.getElementById(`bar_${j}`);
//         let bar2 = document.getElementById(`bar_${j + 1}`);
//         bar1.style.backgroundColor = "#008000";
//         bar2.style.backgroundColor = "#008000";

//         if (array[j] > array[j + 1]) {
//           const [first, second] = swap(array[j + 1], array[j]);
//           array[j] = second;
//           array[j + 1] = first;
//           const [b1, b2] = swap(bar1, bar2);
//           const h1 = b1.style.height;
//           const h2 = b2.style.height;
//           bar1.style.height = h1;
//           bar2.style.height = h2;
//           // updateBars(array);
//         }
//         bar1.style.backgroundColor = "#0000FF";
//         bar2.style.backgroundColor = "#0000FF";
//       }
//     }
//   }, 500);
// }

function disableAllButtons(){
  const allBtn = document.querySelectorAll('button')
  allBtn.forEach((button) => {
    button.disabled = true;
  });
}

function enableAllButtons(){
  const allBtn = document.querySelectorAll('button')
  allBtn.forEach((button) => {
    button.disabled = false;
  });
}

function bubbleSort() {
  disableAllButtons()
  let i = 0;
  let j = 0;
  
  // Recursive function to iterate with a delay
  function sortStep() {
    if (i < array.length - 1) {
      if (j < array.length - (i + 1)) {
        let bar1 = document.getElementById(`bar_${j}`);
        let bar2 = document.getElementById(`bar_${j + 1}`);

        // Highlight the bars being compared
        bar1.style.backgroundColor = "#008000";
        bar2.style.backgroundColor = "#008000";

        setTimeout(() => {
          if (array[j] > array[j + 1]) {
            // Swap array values
            const temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;

            // Swap bar heights
            const tempHeight = bar1.style.height;
            bar1.style.height = bar2.style.height;
            bar2.style.height = tempHeight;
          }

          // Reset colors back to default after comparison
          bar1.style.backgroundColor = "#0000FF";
          bar2.style.backgroundColor = "#0000FF";

          // Move to the next pair
          j++;
          if (j < array.length - (i + 1)) {
            sortStep();  // Recursive call for next comparison in the inner loop
          } else {
            // Move to the next outer loop iteration
            i++;
            j = 0;
            sortStep();  // Start the next pass after finishing the inner loop
          }

        }, speed);
      }

    }
    else{
      enableAllButtons()
    }
  }

  // Start the sorting visualization
  sortStep();
}


function swap(first, second) {
  return [second, first];
}
