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
        let { url, name, singer, lyric } = song
        initPlayer(url)
        initSonginfo(name, singer, lyric)
    })


    function initSonginfo(name, singer, lyric) {
        //歌名+演唱者
        $('.song-description > h1').html(`
            <h1>
                <span class="name">${name}</span>
                <span>-</span>
                <span class="singer">${singer}</span>
            </h1>
        `)

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
        $(audio).appendTo('body')

        audio.src = url

        //audio播放逻辑
        audio.oncanplay = function () {
            audio.play()
            $('.disc-container').addClass('playing')
        }
        audio.onended = function () {
            $('.disc-container').addClass('paused')
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
        setInterval(() => { rollLyric(audio) }, 1000)
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
            console.log('for'+'      ' +i)
            // if ($lines.eq(i + 1).length !== 0 && $lines.eq(i).attr('data-time') < time && time < $lines.eq(i + 1).attr('data-time')) {
            //     console.log('2')
            //     line = $lines[i]
            //     console.log(line)
            //     $('.lines').css('transform', `translateY(-${(i - 1) * 30}px)`)
            //     break
            // }
            //  if ($lines.eq(i + 1).length === 0) {
            //     line = $lines[i]
            //     console.log('我是最后')
            //     console.log(line)

            //     $('.lines').css('transform', `translateY(-${(i - 1) * 30}px)`)
            //     break
            // }

            // console.log($lines.eq(i + 1).length) 
            // break;

            switch (true) {
                case time <$lines.eq(i).attr('data-time'):
                    console.log('case1')
                    break loop;
                case $lines.eq(i + 1).length !== 0 && $lines.eq(i).attr('data-time') < time && time < $lines.eq(i + 1).attr('data-time'):
                    console.log('case2' + '        ' + i)
                    line = $lines[i]
                    console.log(line)
                    $('.lines').css('transform', `translateY(-${(i - 1) * 30}px)`)
                    break loop;
                case i !== 0 && $lines.eq(i+1).length === 0:
                    line = $lines[i]
                    console.log('我是最后')
                    console.log(i !== 0)
                    console.log($lines.eq(i + 1).length)
                    console.log(line)
                    console.log(i)
                    $('.lines').css('transform', `translateY(-${(i - 1) * 30}px)`)
                    break loop;
            }
        }

    }

    function changeTime(n) {
        return n >= 10 ? n + '' : '0' + n
    }

})


