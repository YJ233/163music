// var $ = require("jquery")

$(function () {

    //获取歌曲id
    let id = location.search.match(/\bid=([^&]*)/)[1]

    //通过歌曲id 获取歌曲信息
    $.get('./songs.json').then(function (res) {
        let songs = res
        let song
        songs.map(function (it, index, arr) {
            if (it.id === id) {
                song = arr[index]
            }
        })
        let { url, url_img, url_bg, name, singer, lyric } = song
        initPlayer(url)
        initSonginfo(name, singer, lyric, url_img, url_bg)
    })


    function initSonginfo(name, singer, lyric, url_img, url_bg) {
        //歌名+演唱者
        $('.song-description > h1').html(`
            <h1>
                <span class="name">${name}</span>
                <span>-</span>
                <span class="singer">${singer}</span>
            </h1>
        `)

        //图片
        $('.cover').attr(`src`, `${url_img}`)
        $('.page .pagewarp').css(`background-image`, `url(${url_bg})`)

        //歌词
        initLyric(lyric)

    }

    function initLyric(lyric) {
        let arr = lyric.split('\n')
        let regex = /^\[(.+)\](.*)$/
        arr = arr.map(function (string, index) {
            let matches = string.match(regex)
            if (matches && matches[2] !== '') {
                return { time: matches[1], words: matches[2] }
            }
        })
        let $lines = $('.lines')
        arr.map(function (item) {
            if (!item) { return }
            let $p = $('<p>')
            $p.attr('data-time', item.time).text(item.words)
            $p.appendTo($lines)
        })
    }

    function initPlayer(url) {

        let audio = document.createElement('audio')
        // $(audio).appendTo('body').attr('controls', 'true') //测试用

        audio.src = url

        //audio播放逻辑
        audio.oncanplay = function () {
            audio.play()
            $('.disc-container').addClass('playing')
        }
        audio.onended = function () {
            $('.disc-container').addClass('paused')
            window.clearInterval(clock)
            $('.lines').css('transform', `translateY(0px)`).children().removeClass('active')

        }

        //歌曲暂停播放
        $('.cover').on('click', function () {
            audio.pause()
            $('.disc-container').addClass('paused')
        })
        $('.play').on('click', function () {
            audio.play()
            $('.disc-container').removeClass('paused')
        })

        //滚动歌词
        let clock = setInterval(() => { rollLyric(audio) }, 1000)
    }

    function rollLyric(audio) {
        let all = audio.currentTime
        let min = ~~(all / 60)
        let sec = all - min * 60
        let time = `${changeTime(min)}:${changeTime(sec)}`
        let $lines = $('.lines > p')
        let line
        loop:
        for (var i = 0; i < $lines.length; i++) {
            switch (true) {
                //当前time<第一行歌词时间
                case time < $lines.eq(i).attr('data-time'):
                    // console.log('case1')
                    break loop;
                //当前行歌词时间<time<下一行歌词时间
                case $lines.eq(i + 1).length !== 0 && $lines.eq(i).attr('data-time') < time && time < $lines.eq(i + 1).attr('data-time'):
                    // console.log('case2' + '        ' + i)
                    line = $lines[i]
                    // console.log(line)
                    $('.lines').css('transform', `translateY(-${(i - 1) * 30}px)`)
                    $(line).addClass('active').siblings().removeClass('active')
                    break loop;
                //最后一行歌词
                case $lines.eq(i + 1).length === 0:
                    line = $lines[i]
                    // console.log('我是最后')
                    // console.log(i !== 0)
                    // console.log($lines.eq(i + 1).length)
                    // console.log(line)
                    // console.log(i)
                    $('.lines').css('transform', `translateY(-${(i - 1) * 30}px)`)
                    $(line).addClass('active').siblings().removeClass('active')
                    break loop;
            }
        }

    }

    function changeTime(n) {
        return n >= 10 ? n + '' : '0' + n
    }

})


