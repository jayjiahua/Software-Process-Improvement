/* * Lab-2 sorter.js
   * 13331271 wujiahua*/

window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSprtable(tables);
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesSprtable(tables) {
    for (var i = 0 ; i < tables.length ; i++) {
        var tr_obj = tables[i].getElementsByTagName("tr");
        var head = tr_obj[0];       // In general, the first tr is the head of table.
        var th = head.cells;

        var rows = new Array();

        // So from second to last tr is the body of table.
        for (var j = 1 ; j < tr_obj.length ; j++) {  
            rows.push(tr_obj[j]);
        }

        for (var j = 0 ; j < th.length ; j++) { 
            th[j].onclick = sortByColumns(j, tables[i], rows);
        }
    }
}

// Callback for clicking the cells of thead
function sortByColumns(Idx, table, rows) {   
    return function() {
        // If the sequence is unsorted, make it ascending, else make it descending.
        if (!isSorted(Idx, rows)) {
            rows.sort(function(row1, row2) {return row1.cells[Idx].innerText > row2.cells[Idx].innerText ? 1 : -1});
            changeIconDirection(this, "ascend");
        } else {    
            rows.reverse();
            changeIconDirection(this, "descend");
        }

        for (var k = 0 ; k < rows.length ; k++) {
            if (k % 2 == 0) {   
                rows[k].className = "";
            } else {    
                rows[k].className = "alternate";
            }
            table.tBodies[0].appendChild(rows[k]);
        }
        
    }
}

// Judge that whether the 'rows' is ascending sequence
function isSorted(Idx, rows) {
    for (var i = 1 ; i < rows.length ; i++) {
        if (rows[i - 1].cells[Idx].innerText > rows[i].cells[Idx].innerText) {  
            return false;
        }
    }
    return true;
}

function changeIconDirection(th_obj, direction) {   
    th_obj.className = direction;
}


