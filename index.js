// var $ = require("jquery")

$(function() {
    $.get('./songs.json').then(function(res){
        let item = res
        item.forEach(function(i) {
            let $li = $(`
            <li>
                <a href="./song.html?id=${i.id}">
                    <h3>${i.name}</h3>
                    <p>
                        <svg class="iconsq" aria-hidden="true">
                            <use xlink:href="#icon-sq"></use>
                        </svg>
                        演唱者-专辑1</p>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-play"></use>
                    </svg>
                </a>
            </li>
            `)
            $li.appendTo('#newmusic')
        })
        $('.newmusic-loading').remove()
    })



         












})