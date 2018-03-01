/**
 * Created by Administrator on 2017/3/28 0028.
 */
var controlBtn = [
    {
        id: 0,
        top: 9,
        down: 3,
        left: 12,
        right: 1,
        className: "digital1",
        result: "result"
    },
    {
        id: 1,
        top: 10,
        down: 4,
        left: 0,
        right: 2,
        className: "digital2",
        result: "result"
    },
    {
        id: 2,
        top: 11,
        down: 5,
        left: 1,
        right: 0,
        className: "digital3",
        result: "result"
    },
    {
        id: 3,
        top: 0,
        down: 6,
        left: 12,
        right: 4,
        className: "digital4",
        result: "result"
    },
    {
        id: 4,
        top: 1,
        down: 7,
        left: 3,
        right: 5,
        className: "digital5",
        result: "result"
    },
    {
        id: 5,
        top: 2,
        down: 8,
        left: 4,
        right: 3,
        className: "digital6",
        result: "result"
    },
    {
        id: 6,
        top: 3,
        down: 9,
        left: 12,
        right: 7,
        className: "digital7",
        result: "result"
    },
    {
        id: 7,
        top: 4,
        down: 10,
        left: 6,
        right: 8,
        className: "digital8",
        result: "result"
    },
    {
        id: 8,
        top: 5,
        down: 11,
        left: 7,
        right: 6,
        className: "digital9",
        result: "result"
    },
    {
        id: 9,
        top: 6,
        down: 0,
        left: 12,
        right: 10,
        className: "digital10",
        result: "result"
    },
    {
        id: 10,
        top: 7,
        down: 1,
        left: 9,
        right: 11,
        className: "digital11",
        result: "result"
    },
    {
        id: 11,
        top: 8,
        down: 2,
        left: 10,
        right: 9,
        className: "digital12",
        result: "result"
    },
    {
        id: 12,
        top: 9,
        down: 12,
        left: 12,
        right: 9,
        className: "digital13",
        result: "result"
    }
];

function DonTBuy() {
    window.location.href = "home.html";
}

var index = 0;
var currentObj = controlBtn[index];

var render = function () {
    $("." + currentObj.className).addClass(currentObj.result);
};

var remove = function () {
    $("." + currentObj.className).addClass("none").removeClass(currentObj.result);
};
render();
var ipt = document.getElementById("inputCon");
var digital1 = function () {
    var text = ipt.value;
    ipt.value = text + "1";
};
var digital2 = function () {
    var text = ipt.value;
    ipt.value = text + "2";
};
var digital3 = function () {
    var text = ipt.value;
    ipt.value = text + "3";
};
var digital4 = function () {
    var text = ipt.value;
    ipt.value = text + "4";
};
var digital5 = function () {
    var text = ipt.value;
    ipt.value = text + "5";
};
var digital6 = function () {
    var text = ipt.value;
    ipt.value = text + "6";
};
var digital7 = function () {
    var text = ipt.value;
    ipt.value = text + "7";
};
var digital8 = function () {
    var text = ipt.value;
    ipt.value = text + "8";
};
var digital9 = function () {
    var text = ipt.value;
    ipt.value = text + "9";
};
var digital0 = function () {
    var text = ipt.value;
    ipt.value = text + "0";
};

var removeDigital = function () {
    var text = ipt.value;
    text = text.substring(0,text.length -1);
    ipt.value = text;
};
var keyDown = function (e) {

    if (event.which == 68 || event.which == 65 || event.which == 83 || event.which == 87 || event.which == 72 || event.which == 13) {
        e.preventDefault();
    }

    var currKey = 0, e = e || event;
    currKey = e.keyCode || e.which || e.charCode;
    remove();
    switch (currKey) {
        case 65:
        case 37:
            index = currentObj.left;
            break;
        case 87:
        case 38:
            index = currentObj.top;
            break;
        case 68:
        case 39:
            index = currentObj.right;
            break;
        case 83:
        case 40:
            index = currentObj.down;
            break;
        default:
            break;
    }
    
    currentObj = controlBtn[index];
    render();

    if(currKey == 8){
        DonTBuy();
    }
    
    switch (index) {
        case 0:
            if (currKey == 13) {
                digital1();
            }
            break;
        case 1:
            if (currKey == 13) {
                digital2();
            }
            break;
        case 2:
            if (currKey == 13) {
                digital3();
            }
            break;
        case 3:
            if (currKey == 13) {
                digital4();
            }
            break;
        case 4:
            if (currKey == 13) {
                digital5();
            }
            break;
        case 5:
            if (currKey == 13) {
                digital6();
            }
            break;
        case 6:
            if (currKey == 13) {
                digital7();
            }
            break;
        case 7:
            if (currKey == 13) {
                digital8();
            }
            break;
        case 8:
            if (currKey == 13) {
                digital9();
            }
            break;
        case 9:
            if (currKey == 13) {
                DonTBuy();
            }
            break;
        case 10:
            if (currKey == 13) {
                digital0();
            }
            break;
        case 11:
            if (currKey == 13) {
                removeDigital();
            }
            break;
        case 12:
            if (currKey == 13) {
                DonTBuy();
            }
            break;
        default:
            break;
    }
};
document.onkeydown = keyDown;