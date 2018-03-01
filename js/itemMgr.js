/**
 * Created by dphe on 2017/2/16.
 */
function ItemManager() {       //  管理鼓点信息
    this.goldenCut = 0.618; //! 黄金分割数
    this.deadPoint = 0.9; //! 消亡时刻
    this.touchArea = 0.1318; //! 可触控区域长度

    this.distance = 1.0;

    /**
     @param {ItemData} [itemData]
     */
    this.onCreateItem = null;
    /**
     @param {ItemData} [itemData]
     */
    this.onTouchItem = null;
    /**
     @param {ItemData} [itemData]
     */
    this.onMissItem = null;
    /**
     */
    this.onOverItem = null;

    var upCut = this.touchArea * this.goldenCut;
    var downCut = this.touchArea * (1.0 - this.goldenCut);
    //!鼓点击中时评价区间
    this.dBad0 = this.deadPoint - upCut;
    this.dBad1 = this.deadPoint + downCut;
    this.dGood0 = this.deadPoint - upCut * (1.0 - this.goldenCut);
    this.dGood1 = this.deadPoint + downCut * (1.0 - this.goldenCut);
    this.dPerfect0 = this.deadPoint - upCut * (1.0 - this.goldenCut) * (1.0 - this.goldenCut);
    this.dPerfect1 = this.deadPoint + downCut * (1.0 - this.goldenCut) * (1.0 - this.goldenCut);


    this.itemInfos = null; //! 读取的配置信息
    this.itemDatas = null; //! 逻辑更新信息
    this.itemnIndex = 0; //！配置项索引

    this.lastTime = 0;
    this.runTime = 0;

    this.handleUpdate = null;

    this.countNumber = null;
    this.showResults = null;
    this.perfectShow = null;
    this.comboShow = null;
    this.scoreShow = null;
    this.correct = null;
    this.flawless = null;

    this.orbital0 = null;
    this.orbital1 = null;
    this.orbital2 = null;
    this.orbital3 = null;

    this.featuresTxt0 = null;
    this.featuresTxt1 = null;
    this.featuresTxt2 = null;
    this.featuresTxt3 = null;
    this.timer = null;

    this.countDown = null;
    this.userName = null;
    this.songNameJoin = null;
    this.songSing = null;
    this.songDifficulty = null;
    
    this.audio = null;
    this.ovideoTime = null;
    this.aTime = null;
    this.countTime = null;
    this.countTimeA = null;
    this.runCountDown = null;
    this.stopTime = null;
    this.drumsPath = null;
    this.songUrl = null;
    this.showDiv = null;
    this.currentUrl = null;
    this.tag = null;
    this.audioLen = null;
    this.serveHomeS = null;
    this.childDataS = null;
    this.showTypess = null;
    this.bestScore = null;
    this.bestUser = null;
    this.recordBreaking = null;
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

ItemManager.prototype = {
    //! 初始化
    start: function () {
        var owner = this;

        this.gainUrlStr();
        this.countDownGame();
        this.oneResultsNode();
        this.readServeHome();

        if (window.navigator.onLine) {
            alert
        } else {
            alert('float');
        }

        this.itemInfos = [];
        this.itemDatas = [];
        this.itemnIndex = 0;
        this.flawless = 0;
        
        var infoList = [];
        
        $.getJSON(this.drumsPath, function (data) {
            $.each(data, function (index, info) {
                var time = info["time"];
                var key = info["type"];
                var speed = info["speed"];
                var item = new ItemInfo(time, speed, key);
                infoList.push(item);
            });
        });
        
        this.itemInfos = infoList;
        this.runTime = 0;
        this.lastTime = new Date().getTime();

        var timer = this.handleUpdate = setInterval(function () {
            owner.update();
        }, 20);

        document.onkeydown = function (e) {
            owner.onKeyDown(e);
        };
        
        this.timer = timer;

    },

    gainUrlStr: function () {
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
        this.songUrl = Request["songUrl"];
        this.songNameJoin = Request["songName"];
        this.songSing = Request["singer"];
        this.songDifficulty = Request["level"];
        this.drumsPath = Request["drumsPath"];
        this.currentUrl = Request["currentUrl"];
        this.tag = Request["tag"];

    },

    readServeHome: function () {
        var songDataS = [];
        $.getJSON("json/serveHome.json", function (data) {
            $.each(data, function (i, data) {
                var tag = data["tag"];
                var theme = data["theme"];
                var childDataS = data["childDataS"];
                var childSong = data["childSong"];
                var info = new ServeHome(tag, theme, childDataS, childSong);
                songDataS.push(info)
            });
        });
        this.serveHomeS = songDataS;
    },

    judgeTheme: function () {
        var owner = this;
        switch (this.tag) {
            case this.serveHomeS[0].tag:
                this.childDataS = this.serveHomeS[0].childDataS;
                break;
            case this.serveHomeS[1].tag:
                this.childDataS = this.serveHomeS[1].childDataS;
                break;
            case this.serveHomeS[2].tag:
                this.childDataS = this.serveHomeS[2].childDataS;
                break;
            case this.serveHomeS[3].tag:
                this.childDataS = this.serveHomeS[3].childDataS;
                break;
            case this.serveHomeS[4].tag:
                this.childDataS = this.serveHomeS[4].childDataS;
                break;
            default:
                break;
        }

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
            
            switch (owner.songUrl + "=" + "occupied" + "&songName=" + owner.songNameJoin + "&singer=" + owner.songSing + "&level=" + owner.songDifficulty){
                case owner.showTypess[0].songPath:
                    owner.bestScore = owner.showTypess[0].grade;
                    owner.bestUser = owner.showTypess[0].user;
                    break;
                case owner.showTypess[1].songPath:
                    owner.bestScore = owner.showTypess[1].grade;
                    owner.bestUser = owner.showTypess[1].user;
                    break;
                case owner.showTypess[2].songPath:
                    owner.bestScore = owner.showTypess[2].grade;
                    owner.bestUser = owner.showTypess[2].user;
                    break;
                case owner.showTypess[3].songPath:
                    owner.bestScore = owner.showTypess[3].grade;
                    owner.bestUser = owner.showTypess[3].user;
                    break;
                case owner.showTypess[4].songPath:
                    owner.bestScore = owner.showTypess[4].grade;
                    owner.bestUser = owner.showTypess[4].user;
                    break;
                case owner.showTypess[5].songPath:
                    owner.bestScore = owner.showTypess[5].grade;
                    owner.bestUser = owner.showTypess[5].user;
                    break;
                case owner.showTypess[6].songPath:
                    owner.bestScore = owner.showTypess[6].grade;
                    owner.bestUser = owner.showTypess[6].user;
                    break;
                case owner.showTypess[7].songPath:
                    owner.bestScore = owner.showTypess[7].grade;
                    owner.bestUser = owner.showTypess[7].user;
                    break;
                case owner.showTypess[8].songPath:
                    owner.bestScore = owner.showTypess[8].grade;
                    owner.bestUser = owner.showTypess[8].user;
                    break;
                case owner.showTypess[9].songPath:
                    owner.bestScore = owner.showTypess[9].grade;
                    owner.bestUser = owner.showTypess[9].user;
                    break;
                case owner.showTypess[10].songPath:
                    owner.bestScore = owner.showTypess[10].grade;
                    owner.bestUser = owner.showTypess[10].user;
                    break;
                case owner.showTypess[11].songPath:
                    owner.bestScore = owner.showTypess[11].grade;
                    owner.bestUser = owner.showTypess[11].user;
                    break;
                case owner.showTypess[12].songPath:
                    owner.bestScore = owner.showTypess[12].grade;
                    owner.bestUser = owner.showTypess[12].user;
                    break;
                default:
                    break;
            }
        })
    },
    
    oneResultsNode: function () {
        var owner = this;
        
        this.gainUrlStr();
        var grade = document.getElementById("grade");
        var oVideo = document.getElementById('bgvid');
        var comboShow = document.getElementById("combo");
        var scoreShow = document.getElementById("score");
        var userName = document.getElementById("userName");
        var orbital0 = document.getElementById("orbital0");
        var orbital1 = document.getElementById("orbital1");
        var orbital2 = document.getElementById("orbital2");
        var orbital3 = document.getElementById("orbital3");
        var SongName = document.getElementById("SongName");
        var countDown = document.getElementById("countDown");
        var perfectShow = document.getElementById("perfect");
        var showResults = document.getElementById("showResults");
        var songNameGame = document.getElementById("songNameGame");
        var songSingGame = document.getElementById("songSingGame");
        var featuresTxt0 = document.getElementById("featuresTxt0");
        var featuresTxt1 = document.getElementById("featuresTxt1");
        var featuresTxt2 = document.getElementById("featuresTxt2");
        var featuresTxt3 = document.getElementById("featuresTxt3");
        this.recordBreaking = document.getElementById("recordBreaking");
        var songDifficultyGame = document.getElementById("songDifficultyGame");

        this.orbital0 = orbital0;
        this.orbital1 = orbital1;
        this.orbital2 = orbital2;
        this.orbital3 = orbital3;
        this.countDown = countDown;
        this.featuresTxt0 = featuresTxt0;
        this.featuresTxt1 = featuresTxt1;
        this.featuresTxt2 = featuresTxt2;
        this.featuresTxt3 = featuresTxt3;
        
        this.showResults = showResults;
        this.perfectShow = perfectShow;
        this.comboShow = comboShow;
        this.scoreShow = scoreShow;
        
        this.audio = document.getElementById("audio");
        var audio = this.audio;

        SongName.innerHTML = this.songNameJoin;
        songNameGame.innerHTML = this.songNameJoin;
        songSingGame.innerHTML = this.songSing;
        songDifficultyGame.innerHTML = this.songDifficulty;

        this.aTime = function () {
            oVideo.play();
            oVideo.currentTime = 3;
        };
        var steInt = function () {
            owner.ovideoTime = setInterval(owner.aTime, 14000);
        };
        steInt();

        var audioPlay = function () {//音乐播放
            audio.src = owner.songUrl;
            audio.play();
            audio.loop = false;
        };
        audioPlay();
        
        var aTime = function () {
            owner.audioLen = audio.duration;
            bTime();
        };
        setTimeout(aTime, 3000);

        var bTime = function () {

            var timeLeft = Math.round(owner.audioLen) * 1000 - 4000;//这里设定时间

            owner.countTimeA = function () {

                var startMinutes = parseInt(timeLeft / (60 * 1000), 10);
                var startSec = parseInt((timeLeft - (startMinutes * 60 * 1000)) / 1000);
                document.getElementById('songTime').innerHTML = startMinutes + " : " + startSec;
                document.getElementById('songTime').style.marginLeft = "15px";
                document.getElementById('songTime').style.marginTop = "-3px";
                if (timeLeft == 0) {
                    clearTimeout(owner.countTime);
                } else {
                    timeLeft = timeLeft - 1000;
                }
                owner.countTime = setTimeout(owner.countTimeA, 1000);
            };
            owner.countTimeA();
        };
        
        this.userName = "张三";

        grade.innerHTML = 0;
        userName.innerHTML = this.userName;
        
        this.showDiv = function () {// -- 弹框 --
            var Idiv = document.getElementById("Idiv");
            var mou_head = document.getElementById('mou_head');
            Idiv.style.display = "block";
            
            Idiv.style.left = (document.documentElement.clientWidth - Idiv.clientWidth) / 2 + document.documentElement.scrollLeft - 350 + "px";
            Idiv.style.top = (document.documentElement.clientHeight - Idiv.clientHeight) / 2 + document.documentElement.scrollTop - 200 + "px";

            //以下部分使整个页面至灰不可点击
            var procbg = document.createElement("div"); //首先创建一个div
            procbg.setAttribute("id", "mybg"); //定义该div的id
            procbg.style.background = "#000000";
            procbg.style.width = "100%";
            procbg.style.height = "100%";
            procbg.style.position = "fixed";
            procbg.style.top = "0";
            procbg.style.left = "0";
            procbg.style.zIndex = "500";
            procbg.style.opacity = "0.6";
            procbg.style.filter = "Alpha(opacity=70)";
            //背景层加入页面
            document.body.appendChild(procbg);
            document.body.style.overflow = "hidden";

            var posX;
            var posY;
            mou_head.onmousedown = function (e) {
                if (!e) e = window.event;
                posX = e.clientX - parseInt(Idiv.style.left);
                posY = e.clientY - parseInt(Idiv.style.top);
                document.onmousemove = mousemove;
            };
            document.onmouseup = function () {
                document.onmousemove = null;
            };
            var mousemove = function (ev) {
                if (ev == null) ev = window.event;
                Idiv.style.left = (ev.clientX - posX) + "px";
                Idiv.style.top = (ev.clientY - posY) + "px";
            }
        };
    },

    countDownGame: function () {//开场动画

        var countDownImg = [
            "featuresImg/D1.png",
            "featuresImg/D2.png",
            "featuresImg/D3.png",
            "featuresImg/D4.png",
            "featuresImg/D5.png"
        ];
        var owner = this;
        var block = "block";
        var none = "none";
        var time = 8;

        var showImg = function () {
            owner.countDown.style.display = block;
        };
        var noneImg = function () {
            owner.countDown.style.display = none;
        };

        var animationLi1 = function () {
            document.getElementById("animationLi1").style.display = block;
            document.getElementById("animationLi2").style.display = block;
            document.getElementById("animationLi3").style.display = block;

            $(".animationLi1").animate({
                marginLeft: "244px"
            }, 800);
            setTimeout(animationLi2, 100)
        };

        var animationLi2 = function () {
            $(".animationLi2").animate({
                marginLeft: "354px"
            }, 800);
            setTimeout(animationLi3, 200)
        };

        var animationLi3 = function () {
            $(".animationLi3").animate({
                marginLeft: "484px"
            }, 800);
        };

        animationLi1();
        
        this.runCountDown = function () {
            time--;

            if (time == 5) {
                document.getElementById("animationLi1").style.display = none;
                document.getElementById("animationLi2").style.display = none;
                document.getElementById("animationLi3").style.display = none;
                showImg();
                this.countDown.style.backgroundImage = "url(" + countDownImg[4] + ")";
                setTimeout(noneImg, 800);
            } else if (time == 4) {
                showImg();
                this.countDown.style.backgroundImage = "url(" + countDownImg[3] + ")";
                setTimeout(noneImg, 800);
            } else if (time == 3) {
                showImg();
                this.countDown.style.backgroundImage = "url(" + countDownImg[2] + ")";
                setTimeout(noneImg, 800);
            } else if (time == 2) {
                showImg();
                this.countDown.style.backgroundImage = "url(" + countDownImg[1] + ")";
                setTimeout(noneImg, 800);
            } else if (time == 1) {
                showImg();
                this.countDown.style.backgroundImage = "url(" + countDownImg[0] + ")";
                setTimeout(noneImg, 800);
            } else if (time == 0) {
                clearInterval(owner.stopTime);
            }
        };
        this.stopTime = setInterval(this.runCountDown, 1000);
    },

    showResultsNode: function () {//游戏结束统计
        var owner = this;
        var combo = 0;
        var badCount = 0;
        var goodCount = 0;
        var missCount = 0;
        var perfectCount = 0;
        var comboList = [];

        for (var i = 0; i < this.itemInfos.length; ++i) {
            var itemInfo = this.itemInfos[i];
            if (itemInfo.eval == RhythmEval.Bad) {
                badCount++;
            }
            if (itemInfo.eval == RhythmEval.Good) {
                goodCount++;
            }
            if (itemInfo.eval == RhythmEval.Perfect) {
                perfectCount++;
            }

            if (itemInfo.eval == RhythmEval.Miss) {
                missCount++;
            }

            if (itemInfo.eval == RhythmEval.Miss) {
                if (combo != 0) {
                    comboList.push(combo);
                    combo = 0;
                }
            } else {
                combo++;
            }
        }

        if (combo != 0) {
            comboList.push(combo);
        }
        var comboMax = 0;//最大连击
        for (var j = 0; j < comboList.length; ++j) {
            combo = comboList[j];
            if (combo > comboMax) {
                comboMax = combo;
            }
        }

        var correct;
        var one = 1;
        var two = 2;
        var three = 3;
        var record = 0;
        var shell = document.getElementById("shell");

        this.countNumber = perfectCount * three + goodCount * two + badCount * one;//总分数
        this.flawless = perfectCount / this.itemInfos.length;//完美比例
        this.correct = (perfectCount + goodCount + badCount) / this.itemInfos.length;//正确率
        this.correct = Math.round(this.correct * 100);
        this.flawless = Math.round(this.flawless * 100);

        correct = this.correct;

        if (correct >= 0 && correct <= 64) {

            $("#resultsBg").css("background-image", "url(img/D.png)")

        } else if (correct >= 65 && correct <= 79) {

            $("#resultsBg").css("background-image", "url(img/C.png)")

        } else if (correct >= 80 && correct <= 84) {

            $("#resultsBg").css("background-image", "url(img/B.png)")

        } else if (correct >= 85 && correct <= 89) {

            $("#resultsBg").css("background-image", "url(img/A.png)")

        } else if (correct >= 90 && correct <= 94) {

            $("#resultsBg").css("background-image", "url(img/S.png)")

        } else if (correct >= 95 && correct <= 100) {

            $("#resultsBg").css("background-image", "url(img/ss.png)")
        }

        
        if(this.tag == 5){
            shell.style.display = "none";
            this.showResults.style.display = "block";

            this.perfectShow.innerHTML = this.flawless;
            this.comboShow.innerHTML = comboMax;
            this.scoreShow.innerHTML = this.countNumber;
        }else{
            if (this.countNumber > this.bestScore) {
                //
                // console.log("破纪录了 -------" + this.countNumber);
                // console.log("用户 -------" + this.bestUser);
                // console.log("分数 -------" + this.bestScore);
                // console.log("类型 -------" + this.tag);
                // console.log("歌曲 -------" + this.songNameJoin);

                shell.style.display = "none";
                this.recordBreaking.style.display = "block";
                this.showResults.style.display = "block";

                this.perfectShow.innerHTML = this.flawless;
                this.comboShow.innerHTML = comboMax;
                this.scoreShow.innerHTML = this.countNumber;
            } else {
                shell.style.display = "none";
                this.showResults.style.display = "block";

                this.perfectShow.innerHTML = this.flawless;
                this.comboShow.innerHTML = comboMax;
                this.scoreShow.innerHTML = this.countNumber;
            }
        }
        

        var controlBtn = [
            {
                left: 0,
                right: 1,
                id: 0,
                class: "resultBtn",
                className: "btnF"
            },
            {
                left: 0,
                right: 1,
                id: 1,
                class: "resultBtn",
                className: "btnZ"
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

        var onPageGameStart = function () {//-------------再次挑战传参
            window.location.href = "gameStart.html?songUrl=" + owner.songUrl + "&songName=" + owner.songNameJoin + "&singer=" + owner.songSing + "&level=" + owner.songDifficulty + "&drumsPath=" + owner.drumsPath + "&currentUrl=" + owner.currentUrl;
        };
        var onPageGameHome = function () {
            window.location.href = owner.currentUrl + "=" + owner.tag;
        };

        var keyDown = function (e) {
            console.log(keyDown);
            if (event.which == 68 || event.which == 65 || event.which == 83 || event.which == 87 || event.which == 72 || event.which == 13) {
                e.preventDefault();
            }

            e = e || event;
            var keyCode = e.keyCode || e.which || e.charCode;

            noRender();

            switch (keyCode) {

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

            if (index_ == 0 && keyCode == 13) {
                onPageGameHome();
            } else if (index_ == 1 && keyCode == 13) {
                onPageGameStart();
            }

        };
        document.onkeydown = keyDown;
    },

    recordGrade: function () {//游戏中的分数累加

        var sum;
        var one = 1;
        var two = 2;
        var three = 3;
        var badCount = 0;
        var goodCount = 0;
        var perfectCount = 0;
        var grade = document.getElementById("grade");

        for (var i = 0; i < this.itemInfos.length; ++i) {
            var itemInfo = this.itemInfos[i];
            if (itemInfo.eval == RhythmEval.Bad) {
                badCount++;
            }
            if (itemInfo.eval == RhythmEval.Good) {
                goodCount++;
            }
            if (itemInfo.eval == RhythmEval.Perfect) {
                perfectCount++;
            }
        }

        sum = perfectCount * three + goodCount * two + badCount * one;//总分数
        grade.innerHTML = sum;
    },

    //! 销毁
    destroy: function () {
        var owner = this;
        // document.onkeydown = null;
        
        this.audio.addEventListener('ended', function () {//监听歌曲是否播放结束
            

            if (owner.handleUpdate) {
                clearInterval(owner.handleUpdate);
                owner.handleUpdate = null;
            }

            owner.showResultsNode();

            owner.itemInfos = null;
            owner.itemDatas = null;
        }, false);

    },

    bouncedKeyDown: function () {//游戏中暂停弹框处理
        var owner = this;

        var controlBtn = [
            {
                left: 0,
                right: 1,
                id: 0,
                class: "btnChallenge",
                className: "btnEnsure"
            },
            {
                left: 0,
                right: 1,
                id: 1,
                class: "btnChallenge",
                className: "btnCancel"
            }
        ];

        var index_ = 1;
        var currentObj = controlBtn[index_];
        var audio = document.getElementById("audio");
        var oVideo = document.getElementById('bgvid');

        var render = function () {
            $('.' + currentObj.className).addClass(currentObj.class);
        };

        var noRender = function () {
            $('.' + currentObj.className).addClass("none").removeClass(currentObj.class);
        };

        render();

        var closeDiv = function () {
            var Idiv = document.getElementById("Idiv");
            Idiv.style.display = "none";
            document.body.style.overflow = "auto";
            var body = document.getElementsByTagName("body");
            var mybg = document.getElementById("mybg");
            body[0].removeChild(mybg);
        };

        var start = function () {
            audio.play();
            oVideo.play();

            owner.lastTime = new Date().getTime();
            owner.ovideoTime = setInterval(owner.aTime, 17000);
            owner.countTime = setTimeout(owner.countTimeA, 1000);
            owner.stopTime = setInterval(owner.runCountDown, 1000);
            owner.timer = owner.handleUpdate = setInterval(function () {
                owner.update();
            }, 20);
            document.onkeydown = function (e) {
                owner.onKeyDown(e);
            };
        };

        var keyDown = function (e) {
            console.log(keyDown);
            if (event.which == 68 || event.which == 65 || event.which == 83 || event.which == 87 || event.which == 72 || event.which == 13) {
                e.preventDefault();
            }

            e = e || event;
            var keyCode = e.keyCode || e.which || e.charCode;

            noRender();
            switch (keyCode) {
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

            if (index_ == 0 && keyCode == 13) {
                window.location.href = owner.currentUrl + "=" + owner.tag;
            } else if (index_ == 1 && keyCode == 13) {
                closeDiv();
                start();
            }
        };
        document.onkeydown = keyDown;
    },

    onKeyDown: function (e) {
        var owner = this;
        var audio = document.getElementById("audio");
        var oVideo = document.getElementById('bgvid');
        
        if (event.which == 68 || event.which == 65 || event.which == 83 || event.which == 87 || event.which == 72 || event.which == 13 || event.which == 8) {
            e.preventDefault();
        }
        e = e || event;
        var keyCode = e.keyCode || e.which || e.charCode;

        var rhythmKey = -1;
        
        var pause = function () {
            audio.pause();
            oVideo.pause();
            clearInterval(owner.timer);
            clearInterval(owner.ovideoTime);
            clearTimeout(owner.countTime);
            clearTimeout(owner.stopTime);
        };

        switch (keyCode) {
            case 37:
            case 65:
                rhythmKey = RhythmKey.Left;
                break;
            case 38:
            case 87:
                rhythmKey = RhythmKey.Up;
                break;
            case 39:
            case 68:
                rhythmKey = RhythmKey.Right;
                break;
            case 40:
            case 83:
                rhythmKey = RhythmKey.Down;
                break;
            default:
                break;
        }

        if (keyCode == 8 || keyCode == 97) {
            pause();
            this.showDiv();
            this.bouncedKeyDown();
        }

        if (rhythmKey < 0) {
            return;
        }

        //------------>>>>>

        var orbital0;
        var orbital1;
        var orbital2;
        var orbital3;

        var featuresTxt0;
        var featuresTxt1;
        var featuresTxt2;
        var featuresTxt3;

        var none = "none";
        var block = "block";

        orbital0 = this.orbital0;
        orbital1 = this.orbital1;
        orbital2 = this.orbital2;
        orbital3 = this.orbital3;

        featuresTxt0 = this.featuresTxt0;
        featuresTxt1 = this.featuresTxt1;
        featuresTxt2 = this.featuresTxt2;
        featuresTxt3 = this.featuresTxt3;

        var magnifyBg = function () {
            $(".features").animate({
                position: "absolute",
                left: "-100px",
                bottom: "-75px",
                width: "230%",
                height: "55%"
            }, 120);
        };

        var shrinkBg = function () {
            $(".features").animate({
                position: "absolute",
                left: "-68px",
                bottom: "-50px",
                width: "283px",
                height: "245px"
            }, 120);
        };

        var show0 = function () {
            orbital0.style.display = block;
            magnifyBg();
            featuresTxt0.style.display = block;
        };

        var shut0 = function () {
            orbital0.style.display = none;
            shrinkBg();
            featuresTxt0.style.display = none;
        };

        var show1 = function () {
            orbital1.style.display = block;
            magnifyBg();
            featuresTxt1.style.display = block;
        };

        var shut1 = function () {
            orbital1.style.display = none;
            shrinkBg();
            featuresTxt1.style.display = none;
        };

        var show2 = function () {
            orbital2.style.display = block;
            magnifyBg();
            featuresTxt2.style.display = block;
        };

        var shut2 = function () {
            orbital2.style.display = none;
            shrinkBg();
            featuresTxt2.style.display = none;
        };

        var show3 = function () {
            orbital3.style.display = block;
            magnifyBg();
            featuresTxt3.style.display = block;
        };

        var shut3 = function () {
            orbital3.style.display = none;
            shrinkBg();
            featuresTxt3.style.display = none;
        };

        var time = 150;
        var orbitalKey0 = 0;
        var orbitalKey1 = 1;
        var orbitalKey2 = 2;
        var orbitalKey3 = 3;

        var featuresImg = "featuresImg/4-4.png";
        var featuresImgHuang = "featuresImg/4.png";
        var featuresImgGood = "featuresImg/good.png";
        var featuresImgPerfect = "featuresImg/perfect.png";

        var showFeatures1 = function () {
            if (data.info.key == orbitalKey0) {//金色图片  -- Perfect文字
                orbital0.style.backgroundImage = "url(" + featuresImg + ")";
                featuresTxt0.style.backgroundImage = "url(" + featuresImgPerfect + ")";
                show0();
                setTimeout(shut0, time);
            } else if (data.info.key == orbitalKey1) {
                orbital1.style.backgroundImage = "url(" + featuresImg + ")";
                featuresTxt1.style.backgroundImage = "url(" + featuresImgPerfect + ")";
                show1();
                setTimeout(shut1, time);
            } else if (data.info.key == orbitalKey2) {
                orbital2.style.backgroundImage = "url(" + featuresImg + ")";
                featuresTxt2.style.backgroundImage = "url(" + featuresImgPerfect + ")";
                show2();
                setTimeout(shut2, time);
            } else if (data.info.key == orbitalKey3) {
                orbital3.style.backgroundImage = "url(" + featuresImg + ")";
                featuresTxt3.style.backgroundImage = "url(" + featuresImgPerfect + ")";
                show3();
                setTimeout(shut3, time);
            }
        };

        var showFeatures2 = function () {
            if (data.info.key == orbitalKey0) {//蓝色图片  -- good文字
                orbital0.style.backgroundImage = "url(" + featuresImgHuang + ")";
                featuresTxt0.style.backgroundImage = "url(" + featuresImgGood + ")";
                show0();
                setTimeout(shut0, time);
            } else if (data.info.key == orbitalKey1) {
                orbital1.style.backgroundImage = "url(" + featuresImgHuang + ")";
                featuresTxt1.style.backgroundImage = "url(" + featuresImgGood + ")";
                show1();
                setTimeout(shut1, time);
            } else if (data.info.key == orbitalKey2) {
                orbital2.style.backgroundImage = "url(" + featuresImgHuang + ")";
                featuresTxt2.style.backgroundImage = "url(" + featuresImgGood + ")";
                show2();
                setTimeout(shut2, time);
            } else if (data.info.key == orbitalKey3) {
                orbital3.style.backgroundImage = "url(" + featuresImgHuang + ")";
                featuresTxt3.style.backgroundImage = "url(" + featuresImgGood + ")";
                show3();
                setTimeout(shut3, time);
            }
        };

        //------------<<<<

        for (var i = 0; i < this.itemDatas.length; ++i) {
            var data = this.itemDatas[i];
            if (data.touched) {
                continue;   //开始一个新的循环
            }
            if (rhythmKey != data.info.key) {
                continue;
            }

            var pos = data.position;
            var canTouch = (this.dBad0 <= pos && pos < this.dBad1);

            if (canTouch) {

                if (this.dPerfect0 <= pos && pos < this.dPerfect1) {
                    data.info.eval = RhythmEval.Perfect;

                    showFeatures1();

                } else if (this.dGood0 <= pos && pos < this.dGood1) {
                    data.info.eval = RhythmEval.Good;

                    showFeatures1();

                } else {
                    data.info.eval = RhythmEval.Bad;

                    showFeatures2();

                }
                data.touched = true;
                break;
            }
        }

        this.recordGrade();
        this.judgeTheme();
    },

    update: function () {//判断节点位置

        var time = new Date().getTime();
        var deltaTime = time - this.lastTime;
        this.runTime += deltaTime;

        //console.log('runTime:%f  deltaTime:%f', this.runTime/1000, deltaTime);

        // 更新逻辑项位置
        for (var i = 0; i < this.itemDatas.length; ++i) {
            var targetData = this.itemDatas[i];

            //! 已经击中的鼓点
            if (targetData.touched) {

                targetData.needDelete = true;
                if (this.onTouchItem) {
                    this.onTouchItem(targetData);
                }

                this.itemDatas.splice(i, 1);
                --i;
                continue;
            }

            //! 没有踩中鼓点，失误了
            if (targetData.position >= this.dBad1) {

                targetData.needDelete = true;
                if (this.onMissItem) {
                    this.onMissItem(targetData);
                }

                this.itemDatas.splice(i, 1);//! 删除超出范围项
                --i;//! 因为删除了一项，索引需要减1
                continue;
            }

            var info = targetData.info;
            targetData.position += info.speed * 0.682 * deltaTime / 1000;
        }

        // 到达一定时间生成逻辑项
        while (true) {
            if (this.itemnIndex >= this.itemInfos.length) {
                if (this.onOverItem) {
                    this.onOverItem();
                }
                break;
            }

            var targetInfo = this.itemInfos[this.itemnIndex];
            var bornTime = targetInfo.time - (this.distance * 1000 / targetInfo.speed);

            if (this.runTime < bornTime) {
                break;
            }

            var itemData = new ItemData(targetInfo);
            this.itemDatas.push(itemData);
            this.itemnIndex++;
            if (this.onCreateItem) {
                this.onCreateItem(itemData);
            }
        }
        // console.log("GGGG" + this.itemnIndex);

        this.lastTime = time;
    }
};

