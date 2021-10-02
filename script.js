init();


function init() {
  const table = $("#dt-table").DataTable();
  const tableData = getTableData(table);
  createHighcharts(tableData);
  setTableEvents(table);
}