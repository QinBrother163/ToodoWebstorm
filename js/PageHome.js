/**
 * Created by Administrator on 2017/2/20 0020.
 */


function PageHome() {
    this.showTypess = null;
    this.showSongs = null;
    this.optNodeIndex = null;
    this.optSongIndex = null;
    this.contAs = null;
}

function NodeInfo(name, homePageUrl) {
    this.name = name;
    this.homePageUrl = homePageUrl;
}

function SongInfo(name, singer, songUrl) {
    this.name = name;
    this.singer = singer;
    this.songUrl = songUrl;
}

PageHome.prototype = {

    start: function () {
        var owner = this;
        this.optNodeIndex = 2;
        this.optSongIndex = Math.floor(Math.random() * 13);
        this.playMusic();

        this.createShowType();

        this.updatePlace();

        document.onkeydown = function (e) {
            owner.onKeyDown(e);
        };
    },

    onKeyDown: function (e) {
        if (event.which == 68 || event.which == 65 || event.which == 83 || event.which == 87 || event.which == 72 || event.which == 13) {
            e.preventDefault();
        }

        e = e || event;
        var last;
        var keyCode = e.keyCode || e.which || e.charCode;
        switch (keyCode) {
            case 38:
            case 87:

                last = this.showTypess.pop();
                this.showTypess.unshift(last);

                break;
            case 40:
            case 83:

                last = this.showTypess.shift();
                this.showTypess.push(last);

                break;
            default:
                break;
        }
        if (keyCode == 37 || keyCode == 13) {
            window.location.href = this.showTypess[this.optNodeIndex].homePageUrl;
        }
        this.updatePlace();
    },

    createShowType: function () {
        var contUl = document.getElementById('cont-ul');
        for (var i = 0; i < this.showTypess.length; i++) {
            var contLl = document.createElement('li');
            var contA = document.createElement("a");
            contLl.appendChild(contA);
            contUl.appendChild(contLl);
        }
    },

    playMusic: function () {
        var owner = this;
        var songNull = "";
        if (this.showSongs[owner.optSongIndex].songUrl == null || this.showSongs[owner.optSongIndex].songUrl == undefined || this.showSongs[owner.optSongIndex].songUrl == songNull) {
            console.log("json中没有songUrl")
        } else {
            var audios = owner.showSongs[owner.optSongIndex];
            var audio = document.getElementById("audio");

            $("#audio").attr("src", audios.songUrl);
            audio.play();
            audio.loop = false;
            if (audio.paused) {
                console.log("暂停中");
            } else {
                console.log("播放中");
            }
            audio.addEventListener('ended', function () {
                owner.optSongIndex = Math.floor(Math.random() * 12);
                owner.optSongIndex++;
                audios = owner.showSongs[owner.optSongIndex];
                $("#audio").attr("src", audios.songUrl);
                audio.play();
                audio.loop = false;
            }, false);
        }
    },

    updatePlace: function () {
        var contAs = document.getElementsByTagName("a");
        for (var i = 0; i < this.showTypess.length; i++) {
            this.contAs = contAs;
            this.contAs[i].setAttribute("class", "bar");
            this.contAs[this.optNodeIndex].setAttribute("class", "bar-active");
            this.contAs[i].id = "bar" + i;
            this.contAs[i].href = this.showTypess[i].homePageUrl;
            this.contAs[i].innerHTML = this.showTypess[i].name;
        }
    }
};

var type_url = 'json/home.json';
var bgm_url = 'json/homeSong.json';
var itemCanvas = new PageHome();


function readJson() {
    if (req.readyState == 4) {
        if (req.status == 200) {
            var obj1 = req.responseText;
            var dataStr = eval(obj1);
            itemCanvas.showTypess = dataStr;
        } else {
            console.log("加载状态 ：" + req.readyState);
        }
    }


}

function readSongJson() {
    if (reqG.readyState == 4) {
        if (reqG.status == 200) {
            var obj = reqG.responseText;
            var dataStr = eval(obj);
            itemCanvas.showSongs = dataStr;
            itemCanvas.start();
        } else {
            console.log("加载状态 ：" + reqG.readyState);
        }
    }
}

if (XMLHttpRequest) {
    var req = new XMLHttpRequest();
    var reqG = new XMLHttpRequest();
    req.onreadystatechange = readJson;
    reqG.onreadystatechange = readSongJson;
    req.open("GET", type_url);
    reqG.open("GET", bgm_url);
    req.send(null);
    reqG.send(null)
}
