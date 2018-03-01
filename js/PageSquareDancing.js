
function SquareDancingSong(name,singer,songUrl) {
    this.name = name;
    this.singer = singer;
    this.songUrl = songUrl;
}

function SongInfo(songName, name, score, user, grade, prop, heat, recommend, songState, songPath, drumsPath, state, label) {
    this.songName = songName;
    this.name = name;
    this.score = score;
    this.user = user;
    this.grade = grade;
    this.prop = prop;
    this.heat = heat;
    this.recommend = recommend;
    this.songState = songState;
    this.songPath = songPath;
    this.drumsPath = drumsPath;
    this.state = state;
    this.label = label;
}

function PageSquareDancing() {
    this.showTypess = null;
    this.squareDancingSongS = null;
    this.showSongs = null;
    this.optSongIndex = null;
    this.optNodeIndex = null;
    this.optNodeLiIndex0 = null;
    this.optNodeLiIndex1 = null;
    this.optNodeLiIndex11 = null;
    this.optNodeLiIndex12 = null;
    this.contAs = null;
    this.address = null;
    this.currentUrl = null;;
}

PageSquareDancing.prototype = {
    start: function () {
        var owner = this;
        this.optSongIndex = Math.floor(Math.random()*13);
        this.optNodeIndex = 6;
        this.optNodeLiIndex0 = 0;
        this.optNodeLiIndex1 = 1;
        this.optNodeLiIndex11 = 11;
        this.optNodeLiIndex12 = 12;
        this.currentUrl = window.location.href;

        document.onkeydown = function (e) {
            owner.onKeyDown(e);
        };

        this.address = [
            "gameStart.html?songUrl=" + this.showTypess[0].songPath + "&drumsPath=" + this.showTypess[0].drumsPath + "&currentUrl=" + this.currentUrl,
            "gameStart.html?songUrl=" + this.showTypess[1].songPath + "&drumsPath=" + this.showTypess[1].drumsPath + "&currentUrl=" + this.currentUrl,
            "gameStart.html?songUrl=" + this.showTypess[2].songPath + "&drumsPath=" + this.showTypess[2].drumsPath + "&currentUrl=" + this.currentUrl,
            "gameStart.html?songUrl=" + this.showTypess[3].songPath + "&drumsPath=" + this.showTypess[3].drumsPath + "&currentUrl=" + this.currentUrl,
            "gameStart.html?songUrl=" + this.showTypess[4].songPath + "&drumsPath=" + this.showTypess[4].drumsPath + "&currentUrl=" + this.currentUrl,
            "gameStart.html?songUrl=" + this.showTypess[5].songPath + "&drumsPath=" + this.showTypess[5].drumsPath + "&currentUrl=" + this.currentUrl,
            "gameStart.html?songUrl=" + this.showTypess[6].songPath + "&drumsPath=" + this.showTypess[6].drumsPath + "&currentUrl=" + this.currentUrl,
            "gameStart.html?songUrl=" + this.showTypess[7].songPath + "&drumsPath=" + this.showTypess[7].drumsPath + "&currentUrl=" + this.currentUrl,
            "gameStart.html?songUrl=" + this.showTypess[8].songPath + "&drumsPath=" + this.showTypess[8].drumsPath + "&currentUrl=" + this.currentUrl,
            "gameStart.html?songUrl=" + this.showTypess[9].songPath + "&drumsPath=" + this.showTypess[9].drumsPath + "&currentUrl=" + this.currentUrl,
            "gameStart.html?songUrl=" + this.showTypess[10].songPath + "&drumsPath=" + this.showTypess[10].drumsPath + "&currentUrl=" + this.currentUrl,
            "gameStart.html?songUrl=" + this.showTypess[11].songPath + "&drumsPath=" + this.showTypess[11].drumsPath + "&currentUrl=" + this.currentUrl,
            "gameStart.html?songUrl=" + this.showTypess[12].songPath + "&drumsPath=" + this.showTypess[12].drumsPath + "&currentUrl=" + this.currentUrl
        ];
        
        this.showSongName();
        this.showName();
        this.showScore();
        this.showResults();
        this.showSong();
        this.showNewImg();
        this.showHotImg();
    },

    onKeyDown: function (e) {
        if(event.which==68||event.which==65||event.which==83||event.which==87||event.which==72||event.which==13)
        {
            e.preventDefault();
        }
        
        e = e || event;
        var last;
        var lastHref;
        var keyCode = e.keyCode || e.which || e.charCode;
        switch (keyCode) {
            case 38:
            case 87:

                last = this.showTypess.pop();
                this.showTypess.unshift(last);

                lastHref = this.address.pop();
                this.address.unshift(lastHref);
                
                break;
            case 40:
            case 83:

                last = this.showTypess.shift();
                this.showTypess.push(last);

                lastHref = this.address.shift();
                this.address.push(lastHref);
                
                break;
            default:
                break;
        }

        if (keyCode == 37 || keyCode == 13) {

            for (var i = 0; i < this.showTypess.length; i++) {

                if (this.showTypess[i].state == 3) {

                    window.location.href = this.address[this.optNodeIndex];

                } else if (this.showTypess[i].state == 2) {

                    window.location.href = "dancingBlanket.html";

                } else if (this.showTypess[i].state == 1) {

                    window.location.href = "dancingBlanket.html";
                }
            }

        } else if (keyCode == 8 || keyCode == 99) {
            window.location.href = "home.html";
        }

        this.showSongName();
        this.showName();
        this.showScore();
        this.showResults();
        this.showNewImg();
        this.showHotImg();
    },

    showSongName: function () {
        var songNameLabels = document.getElementsByTagName("a");
        var songNameLi = document.getElementsByTagName("li");
        for (var i = 0; i < songNameLabels.length; i++) {
            this.contAs = songNameLabels;
            var songLabel = songNameLabels[i];
            var songInfo = this.showTypess[i];
            this.contAs[i].setAttribute("class", "bar");
            this.contAs[i].href = this.address[i];
            this.contAs[this.optNodeIndex].setAttribute("class", "bar-active");
            songNameLi[this.optNodeLiIndex0].setAttribute("class", "liOpacity4");
            songNameLi[this.optNodeLiIndex1].setAttribute("class", "liOpacity6");
            songNameLi[this.optNodeLiIndex11].setAttribute("class", "liOpacity6");
            songNameLi[this.optNodeLiIndex12].setAttribute("class", "liOpacity4");
            songLabel.innerHTML = songInfo.songName;
        }
    },

    showSong:function () {
        var owner = this;
        var songNull = "";
        if(this.squareDancingSongS[owner.optSongIndex].songUrl == null || this.squareDancingSongS[owner.optSongIndex].songUrl == undefined || this.squareDancingSongS[owner.optSongIndex].songUrl == songNull){
            console.log("json中没有songUrl")
        }else{
            var audios = this.squareDancingSongS[this.optSongIndex];
            var audio = document.getElementById("audio");
            $("#audio").attr("src",audios.songUrl);
            audio.play();
            audio.loop = false;
            if(audio.paused){
                console.log("暂停中");
            }else{
                console.log("播放中");
            }
            audio.addEventListener('ended', function () {
                owner.optSongIndex = Math.floor(Math.random()*12);
                owner.optSongIndex++;
                audios = owner.squareDancingSongS[owner.optSongIndex];
                $("#audio").attr("src",audios.songUrl);
                audio.play();
                audio.loop = false;
            }, false);
        }
    },

    showNewImg: function () {
        var topMenus = getClass('span', 'main-new');
        for (var i = 0; i < topMenus.length; i++) {
            var songInfo = this.showTypess[i];
            var pic = "true";
            if(songInfo.recommend == pic){
                songInfo.recommend = "NEW.png";
                topMenus[i].style.backgroundImage = "url(" + "img/" + songInfo.recommend + ")";
            }
            topMenus[i].style.backgroundImage = "url(" + "img/" + songInfo.recommend + ")";
        }

        function getClass(tagName, className) {
            if (document.getElementsByClassName) {
                return document.getElementsByClassName(className);
            }
            else {
                var tags = document.getElementsByTagName(tagName);
                var tagArr = [];
                for (var i = 0; i < tags.length; i++) {
                    if (tags[i].class == className) {
                        tagArr[tagArr.length] = tags[i];
                    }
                }
                return tagArr;
            }
        }
    },

    showHotImg: function () {
        var topMenus = getClass('span', 'main-hot');
        for (var i = 0; i < topMenus.length; i++) {
            var songInfo = this.showTypess[i];
            var pic = "true";
            if(songInfo.heat == pic){
                songInfo.heat = "HOT.png";
                topMenus[i].style.backgroundImage = "url(" + "img/" + songInfo.heat + ")";
            }
            topMenus[i].style.backgroundImage = "url(" + "img/" + songInfo.heat + ")";
        }

        function getClass(tagName, className) {
            if (document.getElementsByClassName) {
                return document.getElementsByClassName(className);
            }
            else {
                var tags = document.getElementsByTagName(tagName);
                var tagArr = [];
                for (var i = 0; i < tags.length; i++) {
                    if (tags[i].class == className) {
                        tagArr[tagArr.length] = tags[i];
                    }
                }
                return tagArr;
            }
        }
    },

    showName: function () {
        var topMenus = getClass('span', 'main-span');
        for (var i = 0; i < topMenus.length; i++) {
            var songInfo = this.showTypess[i];
            topMenus[i].innerHTML = songInfo.name;
        }

        function getClass(tagName, className) {
            if (document.getElementsByClassName) {
                return document.getElementsByClassName(className);
            }
            else {
                var tags = document.getElementsByTagName(tagName);
                var tagArr = [];
                for (var i = 0; i < tags.length; i++) {
                    if (tags[i].class == className) {
                        tagArr[tagArr.length] = tags[i];
                    }
                }
                return tagArr;
            }
        }
    },

    showScore: function () {
        var topMenus = getClass('span', 'main-span1');
        for (var i = 0; i < topMenus.length; i++) {
            var songInfo = this.showTypess[i];
            topMenus[i].innerHTML = songInfo.score;
        }
        function getClass(tagName, className) {
            if (document.getElementsByClassName) {
                return document.getElementsByClassName(className);
            }
            else {
                var tags = document.getElementsByTagName(tagName);
                var tagArr = [];
                for (var i = 0; i < tags.length; i++) {
                    if (tags[i].class == className) {
                        tagArr[tagArr.length] = tags[i];
                    }
                }
                return tagArr;
            }
        }
    },

    showResults: function () {
        var user = document.getElementById("user");
        var grade = document.getElementById("grade");
        for (var i = 0; i < this.showTypess.length; i++) {
            user.innerHTML = this.showTypess[i].user;
            grade.innerHTML = this.showTypess[i].grade;
        }
    }
};

var itemCanvas = new PageSquareDancing();

function readJson() {
    $.getJSON("json/squareDancingDataS.json", function (data) {
        var songInfos = [];

        $.each(data, function (i, data) {
            var songName = data["musicName"];
            var name = data["name"];
            var score = data["score"];
            var user = data["bestUser"];
            var grade = data["bestScore"];
            var prop = data["prop"];
            var heat = data["heat"];
            var recommend = data["recommend"];
            var songState = data["songState"];
            var songPath = data["songPath"];
            var drumsPath = data["drumsPath"];
            var state = data["state"];
            var label = data["label"];
            var info = new SongInfo(songName, name, score, user, grade, prop, heat, recommend, songState, songPath, drumsPath, state, label);
            songInfos.push(info);
        });

        itemCanvas.showTypess = songInfos;
        readSquareDancingSong();

    })
}

readJson();

function readSquareDancingSong() {
    $.getJSON("json/squareDancingSong.json",function (data) {
        var songInfos = [];

        $.each(data, function (i, data) {
            var name = data["name"];
            var singer = data["singer"];
            var songUrl = data["songUrl"];
            var info = new SquareDancingSong(name,singer,songUrl);
            songInfos.push(info);
        });

        itemCanvas.squareDancingSongS = songInfos;
        itemCanvas.start();
    })
}

