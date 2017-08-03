$(function () {
    
    //歌词
    $.get('./lyric.json').then(function (lrc) {
        let { lyric } = lrc
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
            if (!item) {return}
            let $p = $('<p>')
            $p.attr('data-time',item.time).text(item.words)
            $p.appendTo($lyric)
        })
    })

    //播放
    let audio = document.createElement('audio')
    audio.src = '//otzmymn2r.bkt.clouddn.com/%E6%88%90%E9%83%BD.m4a'
    audio.oncanplay = function () {
        audio.play()
        $('.disc-container').addClass('playing')
    }
    audio.onended = function () {
        $('.disc-container').addClass('paused')
    }

    //歌曲暂停播放
    $('.cover').on('click',function(){
        audio.pause()
        $('.disc-container').addClass('paused')
    })
    $('.play').on('click',function(){
        audio.play()
        $('.disc-container').removeClass('paused')
    })


})


 