/**
 * Created by dphe on 2017/2/16.
 */

//! 一些变量标志
//!============================================================================
//! 鼓点评价
var RhythmEval = {
    Perfect: 0,
    Good: 1,
    Bad: 2,
    Miss: 3
};
//! 鼓点键值
var RhythmKey = {
    Left: 0,
    Up: 1,
    Right: 2,
    Down: 3,






    
    LeftUp: 4,
    RightUp: 5,
    LeftDown: 6,
    RightDown: 7
};

function ItemInfo(time, speed, key) {  //一个鼓点信息
    this.time = time;
    this.speed = speed;
    this.key = key;
    this.eval = RhythmEval.Miss;
    //this.bornTime = this.time - 1.0/this.speed;
}

/*
* 生命周期：出生、击中消失、过时消失
* */
function ItemData(info) {      
    this.info = info;
    this.position = 0.0; //! 当前位置[0,1.0]
    this.touched = false; //! 击中鼓点
    this.needDelete = false; //! 请求删除
}