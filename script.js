let draw = false;

init();


function init() {
  const table = $("#dt-table").DataTable();
  const tableData = getTableData(table);
  createHighcharts(tableData);
  setTableEvents(table);
}

function getTableData(table) {
  const dataArray = [],
    countryArray = [],
    populationArray = [],
    densityArray = [],
    ageArray = [];

  table.rows({ search: "applied" }).every(function() {
    const data = this.data();
    countryArray.push(data[0]);
    populationArray.push(parseInt(data[1].replace(/\,/g, "")));
    densityArray.push(parseInt(data[2].replace(/\,/g, "")));
    ageArray.push(parseInt(data[3].replace(/\,/g, "")));
  });

  dataArray.push(countryArray, populationArray, densityArray, ageArray);

  return dataArray;
}

function createHighcharts(data) {
  Highcharts.setOptions({
    lang: {
      thousandsSep: ","
    }
  });

  Highcharts.chart("chart", {
    title: {
      text: "График"
    },
    xAxis: [
      {
        categories: data[0],
        labels: {
          rotation: -45
        }
      }
    ],
    yAxis: [
      {
        title: {
          text: "Население"
        }
      },
      {
        title: {
          text: "Плотность (Ч/Км²)"
        },
        min: 0,
        opposite: true
      }
    ],
    series: [
      {
        name: "Население",
        color: "#0071A7",
        type: "column",
        data: data[1],
        tooltip: {
          valueSuffix: " M"
        }
      },
      {
        name: "Плотность (Ч/Км²)",
        color: "#FF404E",
        type: "areaspline",
        data: data[2],
        yAxis: 1
      },
    ],
    tooltip: {
      shared: true
    },
    legend: {
      backgroundColor: "#ececec",
      shadow: true
    },
    credits: {
      enabled: false
    },
    noData: {
      style: {
        fontSize: "16px"
      }
    }
  });
}

function setTableEvents(table) {
  table.on("page", () => {
    draw = true;
  });

  table.on("draw", () => {
    if (draw) {
      draw = false;
    } else {
      const tableData = getTableData(table);
      createHighcharts(tableData);
    }
  });
}