

console.log(
    "Codes uses GPL Licence"
)

function insertAtCursor(myField, myValue) {

    //IE 浏览器
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
    }

    //FireFox、Chrome等
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;

        // 保存滚动条
        var restoreTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

        if (restoreTop > 0) {
            myField.scrollTop = restoreTop;
        }

        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
        myField.focus();
    }
}
let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top', x + 'px').css('left', y + 'px');

    if (isTrue) {
        $rightMenu.show();
    } else {
        $rightMenu.hide();
    }
}
rmf.switchDarkMode = function () {
//    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
//    if (nowMode === 'light') {
//        activateDarkMode()
//        saveToLocal.set('theme', 'dark', 2)
//        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
//    } else {
//        activateLightMode()
//        saveToLocal.set('theme', 'light', 2)
//        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
//    }
    // handle some cases
//    typeof utterancesTheme === 'function' && utterancesTheme()
//    typeof FB === 'object' && window.loadFBComment()
//    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
      switchNightMode()
};
rmf.copyWordsLink = function () {
    let url = window.location.href
    let txa = document.createElement("textarea");
    txa.value = url;
    document.body.appendChild(txa)
    txa.select();
    document.execCommand("Copy");
    document.body.removeChild(txa);
    Swal.fire("复制成功！");
}
rmf.switchReadMode = function () {
    const $body = document.body
    $body.classList.add('read-mode')
    const newEle = document.createElement('button')
    newEle.type = 'button'
    newEle.className = 'fas fa-sign-out-alt exit-readmode'
    $body.appendChild(newEle)

    function clickFn() {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
    }

    newEle.addEventListener('click', clickFn)
}

//复制选中文字
rmf.copySelect = function () {
    document.execCommand('Copy', false, null);
    //这里可以写点东西提示一下 已复制
}

//回到顶部
rmf.scrollToTop = function () {
    btf.scrollToDest(0, 500);
}
rmf.translate = function () {
    document.getElementById("translateLink").click();
}

// 右键菜单事件
document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 17) {
        console.log("你知道的太多了");
        return;
    }
}

function popupMenu() {
    //window.oncontextmenu=function(){return false;}
    window.oncontextmenu = function (event) {
        if(event.ctrlKey)return true;
        console.log(event.keyCode)
        $('.rightMenu-group.hide').hide();
        //如果有文字选中，则显示 文字选中相关的菜单项
        if (document.getSelection().toString()) {
            $('#menu-text').show();
        }
        if (document.getElementById('post')) {
            $('#menu-post').show();
        } else {
            if (document.getElementById('page')) {
                $('#menu-post').show();
            }
        }
        var el = window.document.body;
        el = event.target;
        var a=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
        if (a.test(window.getSelection().toString())){
            $('#menu-too').show()
        }
        if (el.tagName == 'A') {
            $('#menu-to').show()
            rmf.open = function () {
                location.href = el.href
            }
            rmf.openWithNewTab = function () {
                window.open(el.href);
            }
            rmf.copyLink = function () {
                let url = el.href
                let txa = document.createElement("textarea");
                txa.value = url;
                document.body.appendChild(txa)
                txa.select();
                document.execCommand("Copy");
                document.body.removeChild(txa);
            }
        }
        if (el.tagName == 'IMG') {
            $('#menu-img').show()
            rmf.openWithNewTab = function () {
                window.open(el.src);
            }
            rmf.click = function () {
                el.click()
            }
            rmf.copyLink = function () {
                let url = el.src
                let txa = document.createElement("textarea");
                txa.value = url;
                document.body.appendChild(txa)
                txa.select();
                document.execCommand("Copy");
                document.body.removeChild(txa);
            }
        } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
            $('#menu-paste').show();
            rmf.paste = function () {
                navigator.permissions
                    .query({
                        name: 'clipboard-read'
                    })
                    .then(result => {
                        if (result.state == 'granted' || result.state == 'prompt') {
                            //读取剪贴板
                            navigator.clipboard.readText().then(text => {
                                console.log(text)
                                insertAtCursor(el, text)
                            })
                        } else {
                            alert('请允许读取剪贴板！')
                        }
                    })
            }
        }
        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let rmWidth = $('#rightMenu').width();
        let rmHeight = $('#rightMenu').height();
        if (pageX + rmWidth > window.innerWidth) {
            pageX -= rmWidth + 10;
        }
        if (pageY + rmHeight > window.innerHeight) {
            pageY -= pageY + rmHeight - window.innerHeight;
        }



        rmf.showRightMenu(true, pageY, pageX);
        return false;
    };

    window.addEventListener('click', function () {
        rmf.showRightMenu(false);
    });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    popupMenu()
}
const box = document.documentElement

function addLongtabListener(target, callback) {
    let timer = 0 // 初始化timer

    target.ontouchstart = () => {
        timer = 0 // 重置timer
        timer = setTimeout(() => {
            callback();
            timer = 0
        }, 380) // 超时器能成功执行，说明是长按
    }

    target.ontouchmove = () => {
        clearTimeout(timer) // 如果来到这里，说明是滑动
        timer = 0
    }

    target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
        if (timer) {
            clearTimeout(timer)
        }
    }
}

addLongtabListener(box, popupMenu)

const metingJs = document.querySelector("#nav-music meting-js");
//判断是否是音乐
if (metingJs.contains(event.target)) {
} else {
}

function addRightMenuClickEvent() {
    $("#menu-backward").on("click", function() {
        window.history.back(),
        rm.hideRightMenu()
    }),
    $("#menu-forward").on("click", function() {
        window.history.forward(),
        rm.hideRightMenu()
    }),
    $("#menu-refresh").on("click", function() {
        window.location.reload()
    }),
    $("#menu-top").on("click", function() {
        btf.scrollToDest(0, 500),
        rm.hideRightMenu()
    }),
    $(".menu-link").on("click", rm.hideRightMenu),
    $("#menu-darkmode").on("click", rm.switchDarkMode),
    $("#menu-home").on("click", function() {
        window.location.href = window.location.origin
    }),
    $("#menu-randomPost").on("click", function() {
        toRandomPost()
    }),
    $("#menu-commentBarrage").on("click", anzhiyu.switchCommentBarrage),
    $("#rightmenu-mask").on("click", rm.hideRightMenu),
    $("#rightmenu-mask").contextmenu(function() {
        return rm.hideRightMenu(),
        !1
    }),
    $("#menu-translate").on("click", function() {
        rm.hideRightMenu(),
        translateInitialization()
    }),
    $("#menu-copy").on("click", rm.copyPageUrl),
    $("#menu-pastetext").on("click", rm.pasteText),
    $("#menu-copytext").on("click", function() {
        rm.rightmenuCopyText(selectTextNow),
        btf.snackbarShow("复制成功，复制和转载请标注本文地址")
    }),
    $("#menu-commenttext").on("click", function() {
        rm.rightMenuCommentText(selectTextNow)
    }),
    $("#menu-newwindow").on("click", function() {
        window.open(domhref),
        rm.hideRightMenu()
    }),
    $("#menu-copylink").on("click", rm.copyLink),
    $("#menu-downloadimg").on("click", function() {
        anzhiyu.downloadImage(domImgSrc, "anzhiyu")
    }),
    $("#menu-newwindowimg").on("click", function() {
        window.open(domImgSrc),
        rm.hideRightMenu()
    }),
    $("#menu-copyimg").on("click", function() {
        rm.writeClipImg(domImgSrc)
    }),
    $("#menu-searchBaidu").on("click", rm.searchBaidu),
    $("#menu-music-toggle").on("click", anzhiyu.musicToggle),
    $("#menu-music-back").on("click", anzhiyu.musicSkipBack),
    $("#menu-music-forward").on("click", anzhiyu.musicSkipForward),
    $("#menu-music-copyMusicName").on("click", function() {
        rm.rightmenuCopyText(anzhiyu.musicGetName()),
        btf.snackbarShow("复制歌曲名称成功", !1, 3e3)
    })
}

musicToggle: function() {
        var e = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
        anzhiyu_musicFirst || (musicBindEvent(),
        anzhiyu_musicFirst = !0);
        anzhiyu_musicStretch = anzhiyu_musicPlaying ? (document.querySelector("#nav-music").classList.remove("playing"),
        document.getElementById("menu-music-toggle").innerHTML = '<i class="fa-solid fa-play"></i><span>播放音乐</span>',
        document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停",
        document.querySelector("#consoleMusic").classList.remove("on"),
        anzhiyu_musicPlaying = !1,
        document.querySelector("#nav-music").classList.remove("stretch"),
        !1) : (document.querySelector("#nav-music").classList.add("playing"),
        document.getElementById("menu-music-toggle").innerHTML = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>',
        document.querySelector("#consoleMusic").classList.add("on"),
        anzhiyu_musicPlaying = !0,
        document.querySelector("#nav-music").classList.add("stretch"),
        !0),
        e && document.querySelector("#nav-music meting-js").aplayer.toggle()
    },
    musicTelescopic: function() {
        anzhiyu_musicStretch = anzhiyu_musicStretch ? (document.querySelector("#nav-music").classList.remove("stretch"),
        !1) : (document.querySelector("#nav-music").classList.add("stretch"),
        !0)
    },
    musicSkipBack: function() {
        document.querySelector("#nav-music meting-js").aplayer.skipBack()
    },
    musicSkipForward: function() {
        document.querySelector("#nav-music meting-js").aplayer.skipForward()
    },
    musicGetName: function() {
        for (var e = $(".aplayer-title"), t = [], n = e.length - 1; 0 <= n; n--)
            t[n] = e[n].innerText;
        return t[0]
    },