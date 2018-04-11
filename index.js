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
            tab3($li)
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

    function tab3(li) {
        $.get('./indextab3.json').then(function (res) {
            // console.log('1')
            // console.log(res)
            li.html(res.content)
            li.attr('data-downloaded', 'yes')
        })
    }


    function search(keyword) {
        // console.log('搜索' + keyword)
        return new Promise((resolve, reject) => {
            let db = [
                {
                    "id": "1", "name": "成都", "singer": "赵雷", "album": "成都",
                    "url": "http://otzmymn2r.bkt.clouddn.com/%E6%88%90%E9%83%BD.m4a"
                },
                {
                    "id": "2", "name": "小半", "singer": "陈粒", "album": "小梦大半",
                    "url": "http://otzmymn2r.bkt.clouddn.com/%E5%B0%8F%E5%8D%8A.mp3"
                },
                {
                    "id": "3", "name": "安和桥", "singer": "宋冬野", "album": "安和桥北",
                    "url": "http://otzmymn2r.bkt.clouddn.com/%E5%AE%89%E5%92%8C%E6%A1%A5.mp3"
                },
                {
                    "id": "4", "name": "天空之城", "singer": "李志", "album": "我爱南京",
                    "url": "http://otzmymn2r.bkt.clouddn.com/%E5%A4%A9%E7%A9%BA%E4%B9%8B%E5%9F%8E.mp3"
                },
                {
                    "id": "5", "name": "七月上", "singer": "Jam", "album": "七月上",
                    "url": "http://otzmymn2r.bkt.clouddn.com/%E4%B8%83%E6%9C%88%E4%B8%8A.mp3"
                }
            ]

            let result = db.filter(function (item) {
                return item.name.indexOf(keyword) >= 0
            })

            setTimeout(function () {
                // console.log(keyword + "的结果")
                resolve(result)
            }, Math.random() * 1000 + 500)
        })


    }




    $('.icondelete').on('click',function() {
        $('#search').val('')
        $('.icondelete-box').removeClass('active')
    })




    let timer = 0
    $('#search').on('input', function (e) {
        let $input = $(e.currentTarget)
        let value = $input.val()
        // console.log('lalalal'+'                    '+value)
        // console.log(value==='')
        if(value !=='') { 
            $('.icondelete-box').addClass('active')
        }else {$('.icondelete-box').removeClass('active')}
        if (value.trim() === '') {return}

        if (timer) { clearTimeout(timer) }

        timer = setTimeout(function () {
            search(value).then((result) => {
                // console.log(result)
                timer = 0
                $('.searchresult ol').html('')

                if (result.length !== 0) {
                    result.forEach(function (i) {
                        // console.log('1')
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
                        // console.log('2')
                        $li.appendTo($('.searchresult ol'))
                    })


                } else {
                    $(`<li style="text-align:center;border:0;margin-top: 20px">暂无搜索结果</li>`)
                    .appendTo($('.searchresult ol'))
                }
            })
        }, 500);
    })




})