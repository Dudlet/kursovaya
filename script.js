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