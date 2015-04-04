/* * Lab-3 filterable_and_sortable.js
   * 13331271 wujiahua*/

window.onload = function() {
    var tables = getAllTables();
    makeFilterable(makeSortable(tables));
    // makeSortable(makeFilterable(tables));
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeSortable(tables) {
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
            th[j].onclick = sortByColumns(j, tables[i], rows, th);
        }
    }
    return tables;
}

// Callback for clicking the cells of thead
function sortByColumns(Idx, table, rows, th) {   
    return function() {
        for (var k = 0 ; k < th.length ; k++) {
            th[k].className = "";
        }
        // If the sequence is unsorted, make it ascending, else make it descending.
        if (!isSorted(Idx, rows)) {
            rows.sort(function(row1, row2) {return row1.cells[Idx].innerText > row2.cells[Idx].innerText ? 1 : -1});
            this.className = "ascend";
        } else {    
            rows.reverse();
            this.className = "descend";
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


function makeFilterable(tables) {
    for (var i = 0 ; i < tables.length ; i++) {
        var keyword_input = document.createElement("input");
        keyword_input.type = "text";
        keyword_input.placeholder = "Please input keyword.";
        tables[i].parentNode.insertBefore(keyword_input, tables[i]);
        keyword_input.onkeyup = filter(tables[i]);
    }
    return tables;
}

function filter(table) {  
    return function() { 
        var keyword = this.value;
        var tr_obj = table.getElementsByTagName("tr");
        for (var j = 1 ; j < tr_obj.length ; j++) {  
            displayOrHide(tr_obj[j], keyword);
            displayHighlight(tr_obj[j], keyword);
        }
    }
}

function displayOrHide(tr, keyword) {   
    var tds = tr.cells;
    var flag = false;
    var reg = new RegExp(keyword, "i");
    for (var i = 0 ; i < tds.length ; i++) {    
        if (tds[i].innerText.search(reg)>= 0) {    
            flag = true;
        }
    }
    if (flag) { 
        tr.style.display = "";
    } else {    
        tr.style.display = "none";
    }
}

function displayHighlight(tr, keyword) {    
    var tds = tr.cells;
    var reg = new RegExp(keyword, "gi");
    for (var i = 0 ; i < tds.length ; i++) {    
        tds[i].innerHTML = tds[i].innerText.replace(reg, function(origin){return "<span style='background-color:rgb(10,255,0)'>"+origin+"</span>";});
    }
}

