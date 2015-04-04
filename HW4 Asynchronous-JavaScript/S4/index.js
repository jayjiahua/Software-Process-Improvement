/**  S4/index.js  13331271  吴嘉华
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
        document.getElementById("seq").innerText = "";
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


function robotRun() {  
    var icon = document.getElementById("icon");
    if (!hasClass(icon, "disabled")) {
        addClass(icon, "disabled");
        // 生成一个乱序序列
        var random_seq = [0, 1, 2, 3, 4]; 
        random_seq.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});// 获得乱序数组
        
        // 打印出执行顺序
        var seq = "Seq: ";
        for (var i = 0 ; i < random_seq.length ; i++) { 
            seq += String.fromCharCode(65 + random_seq[i]); // 由ascii码获得字符
        }
        document.getElementById("seq").innerText = seq;
        
        // 从第一个开始执行
        var buttons = getButton();
        var button0 = getButton()[random_seq[0]];
        robotProcess.call(button0, random_seq);
    }
}

// 根据乱序序列的顺序进行调用
function clickNext(random_seq) {  
    var buttons = getButton();
    for (var i = 0 ; i < random_seq.length ; i++) { 
        if (hasNoNum(buttons[random_seq[i]])) {  
            robotProcess.call(buttons[random_seq[i]], random_seq);
            return;
        }
    }
    var sum_block = document.getElementById("info-bar");
    sum_block.click();
}

function robotProcess(random_seq) {   
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
                clickNext(random_seq);
            }
        };
        xmlHttp.send(null);
        toAbort(xmlHttp);
    }
}

