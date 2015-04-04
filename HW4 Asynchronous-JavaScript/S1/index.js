/**  S1/index.js  13331271  吴嘉华
  *  在Chrome 运行通过  */

window.onload = function() {    
    var container = document.getElementById("at-plus-container");
    container.addEventListener('mouseout', reset, true);

    var button = getButton();
    for (var i = 0 ; i < button.length ; i++) {
        button[i].addEventListener("click", getRandomNum);
    }

    var sum_block = document.getElementById("info-bar");
    sum_block.addEventListener('click', calculateSum);
}

// 获得li的dom对象
function getButton() {  
    return document.getElementsByTagName("li");
}

// 鼠标离开时将对样式进行重置
function reset() {  
    // 这是判断环形按钮是否真正缩回去的依据
    if (this.offsetWidth == 0) {
        var button = getButton();
        for (var i = 0 ; i < button.length ; i++) {
            removeClass(button[i], "button-disabled");
            button[i].firstChild.style.display = "none";
            button[i].firstChild.innerText = "...";
        }
        document.getElementById("sum").innerText = "";
    }
}

// 点击按钮后触发的事件，当按钮没有被禁用，且按钮未曾接收过数字时才会发出相应的get请求
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
        toAbort(xmlHttp);    // 在获得数据的期间鼠标是否离开环形菜单，若是，则中断ajax请求
    }
}

// 把按钮改成禁用的样式
function disable() {    
    var button = getButton();
    for (var i = 0 ; i < button.length ; i++) { 
        if (hasNoNum(button[i])) {
            addClass(button[i], "button-disabled");
        }
    }
}

// 把按钮改成激活的样式
function enable() { 
    var button = getButton();
    for (var i = 0 ; i < button.length ; i++) { 
        if (hasNoNum(button[i])) {
            removeClass(button[i], "button-disabled");
        } else {    
            addClass(button[i], "button-disabled");
        }
    }
}

// 判断一个按钮是否已经接收过数字
function hasNoNum(button) { 
    var num = button.firstChild.innerText;
    return isNaN(num);
}

// 给指定元素添加一个class
function addClass(dom, target_class) {    
    if (!hasClass(dom, target_class)) {
        dom.className = dom.className + " " + target_class;
    }
}

// 给指定元素删除一个class
function removeClass(dom, target_class) {   
    dom.className = dom.className.replace(new RegExp(target_class, "g"), "");
}

// 判断元素是否有某个class
function hasClass(dom, target_class) {  
    var name = dom.className;
    return name.indexOf(target_class) >= 0;
}

// 求和，当且仅当五个按钮都有数字时才能计算出结果
function calculateSum() {   
    var button = getButton();
    var all_has_num = true;
    for (var i = 0 ; i < button.length ; i++) { 
        if (hasNoNum(button[i])) {  
            all_has_num = false;
        }
    }

    if (all_has_num) {  
        var sum = 0;
        for (var i = 0 ; i < button.length ; i++) { 
            sum += parseInt(button[i].firstChild.innerText);
        }
        document.getElementById("sum").innerText = sum;
    }
}

// 在发送ajax时，如果环形按钮已经收回，则中断当前尚未完成的请求
function toAbort(xmlHttp) { 
    var container = document.getElementById("at-plus-container");
    container.addEventListener('mouseout', function() { 
        if (this.offsetWidth == 0) {    
            xmlHttp.abort();
        }
    });
}

