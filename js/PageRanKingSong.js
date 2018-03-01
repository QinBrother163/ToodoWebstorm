

function SongNames(name, results,drumsPath,songPath) {
    this.name = name;
    this.results = results;
    this.drumsPath = drumsPath;
    this.songPath = songPath;
}

function SongInfoS(name,singer,songUrl) {
    this.name = name;
    this.singer = singer;
    this.songUrl = songUrl;
}

function ServeHome(tag, theme, childDataS, childSong) {
    this.tag = tag;
    this.theme = theme;
    this.childDataS = childDataS;
    this.childSong = childSong;
}

function RankingList(songName, name, score) {
    this.songName = songName;
    this.playerName = name;
    this.score = score;
}

function PageRanKingName() {
    this.showTypess = null;
    this.serveHomeS = null;
    this.optNodeIndex = null;
    this.showSongs = null;
    this.optSongIndex = null;
    this.contAs = null;
    this.time = null;
    this.address = null;
    this.currentUrl = null;
    this.tag = null;
    this.theme = null;
    this.childDataS = null;
    this.childSong = null;
}

PageRanKingName.prototype = {
    start: function () {

        this.receiveTag();
        
        this.time = 0;
        this.optSongIndex = Math.floor(Math.random()*13);
        this.optNodeIndex = 1;
        this.currentUrl = window.location.href;

        this.judgeTheme();
    },

    receiveTag: function () {
        var GetRequest = function () {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        };

        var Request = undefined;
        Request = GetRequest();
        this.tag = Request["tag"];
    },

    judgeTheme: function () {
        var owner = this;
        switch (this.tag) {
            case this.serveHomeS[0].tag:
                this.theme = this.serveHomeS[0].theme;
                this.childDataS = this.serveHomeS[0].childDataS;
                this.childSong = this.serveHomeS[0].childSong;
                break;
            case this.serveHomeS[1].tag:
                this.theme = this.serveHomeS[1].theme;
                this.childDataS = this.serveHomeS[1].childDataS;
                this.childSong = this.serveHomeS[1].childSong;
                break;
            case this.serveHomeS[2].tag:
                this.theme = this.serveHomeS[2].theme;
                this.childDataS = this.serveHomeS[2].childDataS;
                this.childSong = this.serveHomeS[2].childSong;
                break;
            case this.serveHomeS[3].tag:
                this.theme = this.serveHomeS[3].theme;
                this.childDataS = this.serveHomeS[3].childDataS;
                this.childSong = this.serveHomeS[3].childSong;
                break;
            case this.serveHomeS[4].tag:
                this.theme = this.serveHomeS[4].theme;
                this.childDataS = this.serveHomeS[4].childDataS;
                this.childSong = this.serveHomeS[4].childSong;
                break;
            default:
                break;
        }
        document.getElementById("mark").innerHTML = this.theme;

        $.getJSON(this.childDataS, function (data) {
            var songInfos = [];
            $.each(data, function (i, data) {
                var name = data["name"];
                var results = data["results"];
                var drumsPath = data["drumsPath"];
                var songPath = data["songPath"];
                var ranks = [];
                $.each(results, function (i, data) {
                    var songName = data["musicName"];
                    var name = data["name"];
                    var score = data["score"];
                    var info = new RankingList(songName, name, score);
                    ranks.push(info);
                });

                var info = new SongNames(name, ranks,drumsPath,songPath);
                songInfos.push(info);
            });

            owner.showTypess = songInfos;
            owner.address = [
                "gameStart.html?songUrl=" + owner.showTypess[0].songPath + "&drumsPath="+owner.showTypess[0].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[1].songPath + "&drumsPath="+owner.showTypess[1].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[2].songPath + "&drumsPath="+owner.showTypess[2].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag
            ];

            owner.onKeyDown();
            owner.showSongName();
            owner.showName(owner.optNodeIndex);
            owner.showScore(owner.optNodeIndex);
           
        });

        $.getJSON(this.childSong, function (data) {
            var dataStr = [];
            $.each(data, function (i, data) {
                var name = data["name"];
                var singer = data["singer"];
                var songUrl = data["songUrl"];
                var node = new SongInfoS(name,singer,songUrl);
                dataStr.push(node);
            });
            owner.showSongs = dataStr;
            owner.showSong();
        });
    },
    
    onKeyDown: function () {
        var owner = this;

        var controlBtn = [
            {
                left: 1,
                right: 1,
                id: 0,
                class: "btnChallenge"
                // className: "middleLi"
            },
            {
                left: 0,
                right: 0,
                id: 1,
                class: "btnChallenge",
                className: "btn-challenge"
            }
        ];

        var index_ = 0;
        var currentObj = controlBtn[index_];

        var render = function () {
            $('.' + currentObj.className).addClass(currentObj.class);
        };

        var noRender = function () {
            $('.' + currentObj.className).addClass("none").removeClass(currentObj.class);
        };

        render();
        
        var keyDown = function (e) {

            if(event.which==68||event.which==65||event.which==83||event.which==87||event.which==72||event.which==13)
            {
                e.preventDefault();
            }

            e = e || event;
            var last;
            var lastHref;
            var time = 3;
            var times = null;
            var RemoteControl = true;
            var keyCode = e.keyCode || e.which || e.charCode;

            noRender();
            switch (keyCode) {
                case 38:
                case 87:

                    last = owner.showTypess.pop();
                    owner.showTypess.unshift(last);

                    lastHref = owner.address.pop();
                    owner.address.unshift(lastHref);

                    break;
                case 40:
                case 83:

                    last = owner.showTypess.shift();
                    owner.showTypess.push(last);

                    lastHref = owner.address.shift();
                    owner.address.push(lastHref);

                    break;
                case 65:
                case 37:
                    index_ = currentObj.left;
                    break;
                case 68:
                case 39:
                    index_ = currentObj.right;
                    break;
                default:
                    break;
            }

            currentObj = controlBtn[index_];
            render();
            
            if ( keyCode == 13) {
                if (RemoteControl) {
                    if (owner.time < time) {
                        owner.time++;
                        times = owner.time;
                        owner.time = times;
                        window.location.href = owner.address[owner.optNodeIndex];
                    } else {
                        alert("您的挑战次数用完了");
                        window.location.href = "ranking.html";
                    }
                } else {
                    alert("您还没有购买跳舞毯!");
                    window.location.href = "dancingBlanket.html";
                }
            }else if(keyCode == 8||keyCode == 99){
                window.location.href = "home.html";
            }
            
            owner.showSongName();
            owner.showName(owner.optNodeIndex);
            owner.showScore(owner.optNodeIndex);
        };
        document.onkeydown = keyDown;
    },
    showSongName: function () {

        var songNameLabels = document.getElementsByTagName("a");

        this.contAs = songNameLabels;

        for (var i = 0; i < songNameLabels.length; i++) {
            var songLabel = songNameLabels[i];
            var songInfo = this.showTypess[i];
            this.contAs[i].setAttribute("class", "bar");
            this.contAs[i].href = this.address[i];
            this.contAs[this.optNodeIndex].setAttribute("class", "bar-active");
            songLabel.innerHTML = songInfo.name;
        }
    },

    showSong:function () {//bgm
        var owner = this;
        var songNull = "";
        if(this.showSongs[owner.optSongIndex].songUrl == null || this.showSongs[owner.optSongIndex].songUrl == undefined || this.showSongs[owner.optSongIndex].songUrl == songNull){
            console.log("json中没有songUrl")
        }else{
            var audios = this.showSongs[this.optSongIndex];
            var audio = document.getElementById("audio");
            $("#audio").attr("src", audios.songUrl);
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
                audios = owner.showSongs[owner.optSongIndex];
                $("#audio").attr("src", audios.songUrl);
                audio.play();
                audio.loop = false;
            }, false);
        }
    },

    showName: function (songIndex) {
        var song = this.showTypess[songIndex];
        var results = song.results;
        var topMenus = getClass('span', 'showName');
        for (var i = 0; i < topMenus.length; i++) {
            topMenus[i].innerHTML = results[i].playerName;
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

    showScore: function (songIndex) {
        var song = this.showTypess[songIndex];
        var results = song.results;
        var topMenus = getClass('span', 'shouScore');
        for (var i = 0; i < topMenus.length; i++) {
            topMenus[i].innerHTML = results[i].score;
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
    }

};

function readServeHome() {
    $.getJSON("json/serveHome.json", function (data) {
        var songDataS = [];
        $.each(data, function (i, data) {
            var tag = data["tag"];
            var theme = data["theme"];
            var childDataS = data["childDataS"];
            var childSong = data["childSong"];
            var info = new ServeHome(tag, theme, childDataS, childSong);
            songDataS.push(info)
        });
        var itemCanvas = new PageRanKingName();
        itemCanvas.serveHomeS = songDataS;
        itemCanvas.start();
    })
}
readServeHome();
