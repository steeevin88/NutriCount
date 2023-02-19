// fruit vegetable protein grains dairy fats
const box = {
    fruit: {
      element: document.querySelector(".fruitBox"),
      calories: 0,
      portion: 0.20
    },
    vegetable: {
      element: document.querySelector(".vegetableBox"),
      calories: 0,
      portion: 0.25
    },
    protein: {
      element: document.querySelector(".proteinBox"),
      calories: 0,
      portion: 0.10
    },
    grains: {
      element: document.querySelector(".grainsBox"),
      calories: 0,
      portion: 0.30
    },
    dairy: {
      element: document.querySelector(".dairyBox"),
      calories: 0,
      portion: 0.10
    },
    fats: {
      element: document.querySelector(".fatsBox"),
      calories: 0,
      portion: 0.05
    }
  };
  
  const dailyCalories = 2000;
  const numCategories = Object.keys(box).length;
  let resetButton = document.querySelector("#resetButton");
  let calcButton = document.querySelector("#calcButton");
  let clearButton = document.querySelector("#clearButton");
  let totalCalories = 0;
  
  for (const key in box) {
    box[key]["element"].addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && Number(box[key]["element"].value) > 0) calculate();
    });
  }
  
  function getPercentage(key) {
    return box[key]["calories"] / totalCalories;
  }
  
  function calculate() {
      for (const key in box) {
          box[key]["calories"] = 0;
          document.getElementById(key).innerHTML = 0;
          document.getElementById(key + "Percentage").innerHTML = (0).toFixed(2);
      }
      totalCalories = 0;
      document.getElementById("total").innerHTML = totalCalories;
    document.getElementById("health-percentage").innerHTML = 0;
      for (const key in box) {
          if (box[key]["element"].value != "") addValue(box[key], key);
      }
  }
  
  function reset() {
      for (const key in box) {
          box[key]["calories"] = 0;
          document.getElementById(key).innerHTML = 0;
          document.getElementById(key + "Percentage").innerHTML = (0).toFixed(2);
      }
      totalCalories = 0;
      document.getElementById("total").innerHTML = totalCalories;
    document.getElementById("health-percentage").innerHTML = 0;
      for (const key in box) {
          box[key]["element"].value = "";
      }
  }
  
  function clear() {
      for (const key in box) {
          box[key]["element"].value = "";
      }
  }
  
  resetButton.addEventListener("click", (e) =>{ reset();});
  calcButton.addEventListener("click", (e) =>{ calculate();});
  clearButton.addEventListener("click", (e) =>{ clear();});
  
  function addValue(boxName, key) {
    // Adjust variables
    totalCalories += Number(boxName["element"].value);
    boxName["calories"] += Number(boxName["element"].value);
    document.getElementById("total").innerHTML = totalCalories;
      document.getElementById(key).innerHTML = boxName["calories"];
      for (const key in box) {
          document.getElementById(key + "Percentage").innerHTML = (getPercentage(key) * 100).toFixed(2);
      }
    // Adjust pie chart
    /** 
     * FATS: yellow
     * PROTEIN: pink
     * DAIRY: light gray
     * GRAIN: beige
     * FRUITS: red
     * VEGETABLES: green
    */
    let percent = 0.0;
    let pieChartBackground = "conic-gradient(";
    for (const key in box) {
      switch (key) {
        case "fats":
          pieChartBackground += "#fcf5ca";
          break;
        case "protein":
          pieChartBackground += "#ca8272";
          break;
        case "dairy":
          pieChartBackground += "#f9e262";
          break;
        case "grains":
          pieChartBackground += "#e5b66f";
          break;
        case "fruit":
          pieChartBackground += "#f17578";
          break;
        case "vegetable":
          pieChartBackground += "#6bc954";
          break;
      }
      pieChartBackground += " " + (percent * 100) + "%";
      percent += getPercentage(key);
      pieChartBackground += " " + (percent * 100) + "%, ";
    }
    pieChartBackground = pieChartBackground.substring(0, pieChartBackground.length - 2) + ")";
    document.getElementById("piechart").style.backgroundImage = pieChartBackground;
    // Determine health percentage by percent error
    let err = Math.abs((totalCalories - dailyCalories) / dailyCalories);
    for (const key in box) {
      err += Math.abs((getPercentage(key) - box[key]["portion"]) / box[key]["portion"]);
    }
    let percentError = (err / (numCategories + 1) * 100.0);
    if (percentError > 100.0) percentError = 100.0;
    document.getElementById("health-percentage").innerHTML = (100.0 - percentError).toFixed(2);
  }