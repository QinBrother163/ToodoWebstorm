
function ChildSong(name, singer, songUrl) {
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

function PageChild() {
    this.showTypess = null;
    this.serveHomeS = null;
    this.showSongs = null;
    this.childSongS = null;
    this.optSongIndex = null;
    this.optNodeIndex = null;
    this.optNodeLiIndex0 = null;
    this.optNodeLiIndex1 = null;
    this.optNodeLiIndex11 = null;
    this.optNodeLiIndex12 = null;
    this.contAs = null;
    this.address = null;
    this.currentUrl = null;
    this.tag = null;
    this.theme = null;
    this.childDataS = null;
    this.childSong = null;
}

PageChild.prototype = {

    start: function () {
        
        this.receiveTag();
        this.judgeTheme();
        this.optSongIndex = Math.floor(Math.random() * 13);
        this.optNodeIndex = 6;
        this.optNodeLiIndex0 = 0;
        this.optNodeLiIndex1 = 1;
        this.optNodeLiIndex11 = 11;
        this.optNodeLiIndex12 = 12;
        this.currentUrl = window.location.href;

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
            owner.showTypess = songInfos;
            
            document.onkeydown = function (e) {
                owner.onKeyDown(e);
            };

            owner.address = [
                "gameStart.html?songUrl=" + owner.showTypess[0].songPath + "&drumsPath=" + owner.showTypess[0].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[1].songPath + "&drumsPath=" + owner.showTypess[1].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[2].songPath + "&drumsPath=" + owner.showTypess[2].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[3].songPath + "&drumsPath=" + owner.showTypess[3].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[4].songPath + "&drumsPath=" + owner.showTypess[4].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[5].songPath + "&drumsPath=" + owner.showTypess[5].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[6].songPath + "&drumsPath=" + owner.showTypess[6].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[7].songPath + "&drumsPath=" + owner.showTypess[7].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[8].songPath + "&drumsPath=" + owner.showTypess[8].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[9].songPath + "&drumsPath=" + owner.showTypess[9].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[10].songPath + "&drumsPath=" + owner.showTypess[10].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[11].songPath + "&drumsPath=" + owner.showTypess[11].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag,
                "gameStart.html?songUrl=" + owner.showTypess[12].songPath + "&drumsPath=" + owner.showTypess[12].drumsPath + "&currentUrl=" + owner.currentUrl + "&tag=" + owner.tag
            ];
            owner.showSongName();
            owner.showName();
            owner.showScore();
            owner.showResults();
            owner.showNewImg();
            owner.showHotImg();
        });
        
        $.getJSON(this.childSong, function (data) {
            var songInfoS = [];
            $.each(data, function (i, data) {
                var name = data["name"];
                var singer = data["singer"];
                var songUrl = data["songUrl"];
                var info = new ChildSong(name, singer, songUrl);
                songInfoS.push(info);
            });
            owner.childSongS = songInfoS;
            owner.showSong();
        });
        
    },

    onKeyDown: function (e) {

        if (event.which == 68 || event.which == 65 || event.which == 83 || event.which == 87 || event.which == 72 || event.which == 13) {
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

    showSong: function () {//bgm
        var owner = this;
        var songNull = "";
        if (this.childSongS[owner.optSongIndex].songUrl == null || this.childSongS[owner.optSongIndex].songUrl == undefined || this.childSongS[owner.optSongIndex].songUrl == songNull) {
            console.log("json中没有songUrl")
        } else {
            var audios = this.childSongS[this.optSongIndex];
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
                audios = owner.childSongS[owner.optSongIndex];
                $("#audio").attr("src", audios.songUrl);
                audio.play();
                audio.loop = false;
            }, false);
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

    showNewImg: function () {
        var topMenus = getClass('span', 'main-new');
        for (var i = 0; i < topMenus.length; i++) {
            var songInfo = this.showTypess[i];
            var pic = "true";
            if (songInfo.recommend == pic) {
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
            if (songInfo.heat == pic) {
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
        var itemCanvas = new PageChild();
        itemCanvas.serveHomeS = songDataS;
        itemCanvas.start();
    })
}
readServeHome();