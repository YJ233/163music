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
        let {url,name,singer,lyric} = song
        initPlayer(url)
        initSonginfo(name,singer,lyric)
    })


    function initSonginfo(name,singer,lyric) {
        //歌名+演唱者
        $('.song-description > h1').html(`
            <h1>
                <span class="name">${name}</span>
                <span>-</span>
                <span class="singer">${singer}</span>
            </h1>
        `)

        //歌词
        let arr = lyric.split('\n')
        let regex = /^\[(.+)\](.*)$/
        arr = arr.map(function (string, index) {
            let matches = string.match(regex)
            if (matches) {
                return { time: matches[1], words: matches[2] }
            }
        })
        let $lyric = $('.lyric')
        arr.map(function (item) {
            if (!item) { return }
            let $p = $('<p>')
            $p.attr('data-time', item.time).text(item.words)
            $p.appendTo($lyric)
        })
    }

    function initPlayer(url) {

        let audio = document.createElement('audio')

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
    }



})


