/* * Lab-3 filter.js
   * 13331271 wujiahua*/

window.onload = function() {
    var tables = getAllTables();
    makeFilterable(tables);
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeFilterable(tables) {
    for (var i = 0 ; i < tables.length ; i++) {
        var keyword_input = document.createElement("input"); // add input
        keyword_input.type = "text";
        keyword_input.placeholder = "Please input keyword.";
        tables[i].parentNode.insertBefore(keyword_input, tables[i]);
        keyword_input.onkeyup = filter(tables[i]);
    }
    return tables;
}

// callback
function filter(table) {  
    return function() { 
        var keyword = this.value;
        var tr_obj = table.getElementsByTagName("tr");
        for (var j = 1 ; j < tr_obj.length ; j++) {  
            displayOrHide(tr_obj[j], keyword);   // whether the row should be hided
            displayHighlight(tr_obj[j], keyword); // highlight the keyword
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
    // this is a case insensitive
    for (var i = 0 ; i < tds.length ; i++) {    
        tds[i].innerHTML = tds[i].innerText.replace(reg, function(origin){return "<span style='background-color:rgb(10,255,0)'>"+origin+"</span>";});
    }
}

