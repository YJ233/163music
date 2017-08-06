// var $ = require("jquery")

$(function () {

    //动态获取newmusic
    $.get('./songs.json').then(function (res) {
        let item = res
        item.forEach(function (i) {
            let $li = $(`
            <li>
                <a href="./song.html?id=${i.id}">
                    <h3>${i.name}</h3>
                    <p>
                        <svg class="iconsq" aria-hidden="true">
                            <use xlink:href="#icon-sq"></use>
                        </svg>
                        ${i.singer} - ${i.album}</p>
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


    //tabNav切换
    $('.tab-items > li').on('click', function (e) {
        let $li = $(e.currentTarget)
        let index = $li.index()
        $li.trigger('tabChange', index)
        $li.addClass('active').siblings().removeClass('active')
        $('.tab-content > li').eq(index).addClass('active').siblings().removeClass('active')

    })

    //tabContent切换
    $('.tab-items > li').on('tabChange', function (e, index) {
        let $li = $('.tab-content > li').eq(index)
        if ($li.attr('data-downloaded') === 'yes') return
        if (index === 1) {
            tab2($li)
        } else if (index === 2) {
            return
            tab3()
        }
    })

    function tab2(li) {
        $.get('./indextab2.json').then(function (res) {
            let item = res
            let $ol = $('<ol id="hotmusic"></ol>')
            $ol.appendTo(li)
            item.forEach(function (i) {
                let $li = $(`
                <li>
                    <a href="./song.html?id=${i.id}">
                        <h3>${i.name}</h3>
                        <p>
                            <svg class="iconsq" aria-hidden="true">
                                <use xlink:href="#icon-sq"></use>
                            </svg>
                            ${i.singer} - ${i.album}</p>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </a>
                </li>
            `)
                $li.appendTo($ol)
            })
            $('.tab2-loading').remove()
            li.attr('data-downloaded', 'yes')
        })
    }

    function tab3() {
        $.get('./indextab3.json').then(function (res) {
            console.log(res)
            $li.text(res.content)





            $li.attr('data-downloaded', 'yes')
        })
    }


    function search(keyword) {
        console.log('搜索'+keyword)
        return new Promise((resolve, reject) => {
            let db = [
                { "id": "1", "name": "成都", "singer": "赵雷" },
                { "id": "2", "name": "小半", "singer": "陈粒" },
                { "id": "3", "name": "安和桥", "singer": "宋冬野" },
                { "id": "4", "name": "天空之城", "singer": "李志" },
                { "id": "5", "name": "七月上", "singer": "Jam" },
                { "id": "6", "name": "天天" }
            ]

            let result = db.filter(function (item) {
                return item.name.indexOf(keyword) >= 0
            })

            setTimeout(function () {
                console.log(keyword+"的结果")
                resolve(result)
            }, Math.random() * 1000 + 500)
        })


    }

    let timer = 0
    $('#search').on('input', function (e) {
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if (value === '') return

        if (timer) {clearTimeout(timer)}

        timer = setTimeout(function () {
            search(value).then((result) => {
                console.log(result)
                timer = 0
                if (result.length !== 0) {
                    $('#output').text(result.map((i) => i.name).join(','))
                } else {
                    $('#output').text('暂无搜索结果')
                }
            })
        }, 500);
    })




})