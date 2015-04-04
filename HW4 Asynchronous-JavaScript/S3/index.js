/**  S3/index.js  13331271  吴嘉华
  *  在Chrome 运行通过  
  *  在S1的基础上加了几个函数，故与S1重复的部分不做注释 */

window.onload = function() {    
    var buttons = getButton();
    var container = document.getElementById("at-plus-container");
    container.addEventListener('mouseout', reset, true);
    for (var i = 0 ; i < buttons.length ; i++) {
        buttons[i].addEventListener("click", getRandomNum);
    }
    var sum_block = document.getElementById("info-bar");
    sum_block.addEventListener('click', calculateSum);

    var icon = document.getElementById("icon");
    icon.addEventListener('click', robotRun);
}

function getButton() {  
    return document.getElementsByTagName("li");
}

function reset() {  
    if (this.offsetWidth == 0) {
        var buttons = getButton();
        for (var i = 0 ; i < buttons.length ; i++) {
            removeClass(buttons[i], "button-disabled");
            buttons[i].firstChild.style.display = "none";
            buttons[i].firstChild.innerText = "...";
        }
        document.getElementById("sum").innerText = "";
        removeClass(document.getElementById("icon"), "disabled");
    }
}


function getRandomNum() {   
    if (!hasClass(this, "button-disabled") && hasNoNum(this)) {
        var that = this;
        that.firstChild.style.display = "block";
        disable();
        removeClass(that, "button-disabled");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("get", "/");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                that.firstChild.innerText = xmlHttp.responseText;
                enable();
            }
        };
        xmlHttp.send(null);
        toAbort(xmlHttp);
    }
}

function disable() {    
    var buttons = getButton();
    for (var i = 0 ; i < buttons.length ; i++) { 
        if (hasNoNum(buttons[i])) {
            addClass(buttons[i], "button-disabled");
        }
    }
}

function enable() { 
    var buttons = getButton();
    for (var i = 0 ; i < buttons.length ; i++) { 
        if (hasNoNum(buttons[i])) {
            removeClass(buttons[i], "button-disabled");
        } else {    
            addClass(buttons[i], "button-disabled");
        }
    }
}

function hasNoNum(button) { 
    var num = button.firstChild.innerText;
    return isNaN(num);
}

function addClass(dom, target_class) {    
    if (!hasClass(dom, target_class)) {
        dom.className = dom.className + " " + target_class;
    }
}

function removeClass(dom, target_class) {   
    dom.className = dom.className.replace(new RegExp(target_class, "g"), "");
}

function hasClass(dom, target_class) {  
    var name = dom.className;
    return name.indexOf(target_class) >= 0;
}

function calculateSum() {   
    var buttons = getButton();
    var all_has_num = true;
    for (var i = 0 ; i < buttons.length ; i++) { 
        if (hasNoNum(buttons[i])) {  
            all_has_num = false;
        }
    }

    if (all_has_num) {  
        var sum = 0;
        for (var i = 0 ; i < buttons.length ; i++) { 
            sum += parseInt(buttons[i].firstChild.innerText);
        }
        document.getElementById("sum").innerText = sum;
    }
}

function toAbort(xmlHttp) { 
    var container = document.getElementById("at-plus-container");
    container.addEventListener('mouseout', function() { 
        if (this.offsetWidth == 0) {    
            xmlHttp.abort();
        }
    });
}

// 用循环发出五次请求
function robotRun() {   
    var icon = document.getElementById("icon");
    if (!hasClass(icon, "disabled")) {
        addClass(icon, "disabled");
        var buttons = getButton();
        for (var i = 0 ; i < buttons.length ; i++) {    
            robotProcess.call(buttons[i], i);
        }
    }
}

function robotProcess(i) {   
    if (!hasClass(this, "button-disabled") && hasNoNum(this)) {
        var that = this;
        that.firstChild.style.display = "block";
        removeClass(that, "button-disabled");
        var xmlHttp = new XMLHttpRequest();
        // 由于同时多次请求相同的url会被忽略，故给每次请求加上不同的参数
        xmlHttp.open("get", "/?reqnum="+i);  
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                that.firstChild.innerText = xmlHttp.responseText;
                enable();
                calculateSum();
            }
        };
        xmlHttp.send(null);
        toAbort(xmlHttp);
    }
}


