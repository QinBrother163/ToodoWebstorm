/**
 * Created by dphe on 2017/2/18.
 */


//! 开始运行
var itemMgr = new ItemManager();
var itemCanvas = new ItemCanvas();






//! 为了逃避可恶的错误指针，需要用对象调用函数
itemMgr.onCreateItem = function (itemData) {
    itemCanvas.addItemNode(itemData);
};
itemMgr.onTouchItem = function (itemData) {
    itemCanvas.onTouchItem(itemData);
};
itemMgr.onMissItem = function (itemData) {
    itemCanvas.onMissItem(itemData);

};


var onDestroy = function () {

    itemMgr.destroy();
    itemCanvas.destroy();
    // alert("所有鼓点跑完了啊！")
    
};

var overTime = 0;
itemMgr.onOverItem = function () {
    //console.log("over time %d", overTime);
    overTime += 20;
    if (overTime > 5000) {
        onDestroy();
    }
};

itemCanvas.start();
itemMgr.start();
