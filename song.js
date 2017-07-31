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
    audio.src = 'http://dl.stream.qqmusic.qq.com/C400000MCRpx0myGAL.m4a?vkey=81F7019D76BA745611C8081210655199AC6460A71531483BDA8168A27E1D1063681273995CEC3405DAFC37C29F951BA0218AD13D2631095C&guid=755372966&uin=469532368&fromtag=66'
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


 