/**
 * Created by dphe on 2017/2/17.
 */


var imgs = [
    'img/zuo.png',
    'img/shang.png',
    'img/you.png',
    'img/xia.png'
];

function ItemNode(data) {     //显示内容

    var itemInfo = data.info;

    var img = document.createElement('img');
    img.src = imgs[itemInfo.key];

    var li = document.createElement('li');
    li.appendChild(img);

    this.data = data;
    this.node = li;
}

function ItemCanvas() {   //  管理 显示 对象
    this.itemNodes = null;
    this.newNodes = null;

    this.handleUpdate = null;
}

ItemCanvas.prototype = {
    start: function () {//初始化

        this.itemNodes = [];
        this.newNodes = [];

        var owner = this;
        this.handleUpdate = setInterval(function () {
            owner.update();
        }, 20);
    },

    destroy: function () {//摧毁
        if (this.handleUpdate) {
            clearInterval(this.handleUpdate);
            this.handleUpdate = null;
        }

        this.itemNodes = null;
        this.newNodes = null;
    },

    addItemNode: function (itemData) {    //创建节点
        var itemNode = new ItemNode(itemData);
        //! 先把新创建节点保存在临时队列
        this.newNodes.push(itemNode);

        var key = itemData.info.key;
        var elName = 'pic_ul' + key;
        var parent = document.getElementById(elName);
        parent.appendChild(itemNode.node);
    },

    onTouchItem: function (itemData) {   //触发
        var info = itemData.info;
        // console.log("touch key:%d eval:%d", info.key, info.eval);
        /*-----------------------------*/

    },

    onMissItem: function (itemData) {
        var info = itemData.info;
        

        //console.log("---------miss t:%f key:%d", info.time/1000, info.key);
        
        //------------------------

        var orbital0 = document.getElementById("miss0");
        var orbital1 = document.getElementById("miss1");
        var orbital2 = document.getElementById("miss2");
        var orbital3 = document.getElementById("miss3");

        var orbitalKey0 = 0;
        var orbitalKey1 = 1;
        var orbitalKey2 = 2;
        var orbitalKey3 = 3;

        var time = 300;
        var none = "none";
        var block = "block";
        var missImg = "featuresImg/miss.png";

        var show0 = function () {
            orbital0.style.backgroundImage = "url(" + missImg + ")";
            orbital0.style.display = block;
        };
        var show1 = function () {
            orbital1.style.backgroundImage = "url(" + missImg + ")";
            orbital1.style.display = block;
        };
        var show2 = function () {
            orbital2.style.backgroundImage = "url(" + missImg + ")";
            orbital2.style.display = block;
        };
        var show3 = function () {
            orbital3.style.backgroundImage = "url(" + missImg + ")";
            orbital3.style.display = block;
        };

        var shut0 = function () {
            orbital0.style.display = none;
        };
        var shut1 = function () {
            orbital1.style.display = none;
        };
        var shut2 = function () {
            orbital2.style.display = none;
        };
        var shut3 = function () {
            orbital3.style.display = none;
        };

        if (info.key == orbitalKey0) {
            show0();
            setTimeout(shut0, time);
        } else if (info.key == orbitalKey1) {
            show1();
            setTimeout(shut1, time);
        } else if (info.key == orbitalKey2) {
            show2();
            setTimeout(shut2, time);
        } else if (info.key == orbitalKey3) {
            show3();
            setTimeout(shut3, time);
        }
    },

    removeItemNode: function (itemNode) {   //删除节点
        var node = itemNode.node;
        node.parentNode.removeChild(node);
    },

    update: function () {//移动节点
        var i;
        var itemNode;

        //! 从临时队列转移到逻辑队列
        //！不知道是不是多线程，所以用临时队列
        while (this.newNodes.length > 0) {
            //console.log("new node cnt:%d", this.newNodes.length);
            itemNode = this.newNodes.shift();
            this.itemNodes.push(itemNode);
        }

        for (i = 0; i < this.itemNodes.length; ++i) {
            itemNode = this.itemNodes[i];
            var data = itemNode.data;

            if (data.needDelete) {
                this.removeItemNode(itemNode);
                this.itemNodes.splice(i, 1);
                --i;
                continue;
            }

            itemNode.node.style.top = 440 * data.position + 'px';
        }
    }
};