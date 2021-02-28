$(function () {
    // 打开列表页的时候先查看是否携带 seach参数
    // 如果不存在  跳转到首页
    // 如果存在 根据 seach 获取数据
    let reg = /seach=(.*)/;
    if (!reg.test(location.search)) {
        window.location.href = '../index.html';
        return;
    }
    let searchUrl = decodeURI(location.search.match(reg)[1]);
    console.log(searchUrl);
    // 价格
    $('.lh5').mouseover(function () {
        $('.lH5').css('border', '1px solid black');
        $('.lhsure').add('.lhclose').add('.lH5 nav').show();
        $('.lH5').css('z-index', 100)
    }).mouseleave(function () {
        $('.lH5').css('border', '');
        $('.lhsure').add('.lhclose').add('.lH5 nav').hide();
        $('.lH5').css('z-index', 0)
    })

    let small = $('.lhinp1');
    let big = $('.lhinp2');
    $('.lH5 nav').on('click', 'li', function () {
        small.val($(this).html().match(/(\d{0,3})-/i)[1]);
        big.val($(this).html().match(/-(\d{0,3})/i)[1])
    })

    $('.lhclose').click(function () {
        small.add(big).val('')
    })
    // 内容分页
    let list = $('.clist');
    let page = document.querySelector('.cpage')
    let flag = true;
    // 价格区间
    $('.lH5 nav li').click(function () {
        let y1 = this.innerHTML.match(/(\d{0,3})-/i)[1] * 1000;
        let y2 = this.innerHTML.match(/-(\d{0,3})/i)[1] * 1000;
        getDate2(1, 30, y1, y2);
    })
    getDate1(1, 30)
    // 分页1
    function getDate2(index, length, y1, y2) {
        $.ajax({
            url: '../php/list2.php',
            data: {
                index: index,
                length: length,
                search: searchUrl,
                yan1: y1,
                yan2: y2
            },
            success: function (res) {
                let date = JSON.parse(res)
                let total = date.total * 1;
                if (flag) {
                    new Pagination(page, {
                        pageInfo: {
                            pagenum: index,
                            pagesize: length,
                            total: total,
                            totalpage: Math.ceil(total / length)
                        },
                        textInfo: {
                            first: '首页',
                            prev: '上一页',
                            next: '下一页',
                            last: '末页'
                        },
                        change: function (index) {
                            flag = false;
                            // 有一个参数，这个参数当前的页数
                            getDate2(index, 30, y1, y2)
                            render(date);
                            $(document).scrollTop(0);
                        }
                    })
                }
                render(date);
                // 价格升序 降序
                let sx = true;
                $('.lh2').click(function () {
                    $('.lh3').html('销量' + `<span class="iconfont icon-shangxia"></span>`).css('color', '#ababab');
                    if (sx) {
                        sx = false;
                        $('.lh2').html('升序' + `<span class="iconfont icon-shangxia"></span>`).css('color', 'red')
                        date.list.sort(function (a, b) {
                            return b.minGroupPrice - a.minGroupPrice
                        })
                        render(date);
                    } else {
                        sx = true;
                        $('.lh2').html('降序' + `<span class="iconfont icon-shangxia"></span>`).css('color', '#ababab');
                        date.list.sort(function (a, b) {
                            return a.minGroupPrice - b.minGroupPrice
                        })
                        render(date);
                    }
                })
                // 销量升序 降序
                $('.lh3').click(function () {
                    $('.lh2').html('价格' + `<span class="iconfont icon-shangxia"></span>`).css('color', '#ababab');
                    if (sx) {
                        sx = false;
                        $('.lh3').html('升量' + `<span class="iconfont icon-shangxia"></span>`).css('color', 'red')
                        date.list.sort(function (a, b) {
                            return b.salesTip - a.salesTip
                        })
                        render(date);
                    } else {
                        sx = true;
                        $('.lh3').html('降量' + `<span class="iconfont icon-shangxia"></span>`).css('color', '#ababab')
                        date.list.sort(function (a, b) {
                            return a.salesTip - b.salesTip
                        })
                        render(date);
                    }
                })
            }
        })
    }
    // 分页2
    function getDate1(index, length) {
        $.ajax({
            url: '../php/list.php',
            data: {
                index: index,
                length: length,
                search: searchUrl,
            },
            success: function (res) {
                let date = JSON.parse(res)
                let total = date.total * 1;
                if (flag) {
                    new Pagination(page, {
                        pageInfo: {
                            pagenum: index,
                            pagesize: length,
                            total: total,
                            totalpage: Math.ceil(total / length)
                        },
                        textInfo: {
                            first: '首页',
                            prev: '上一页',
                            next: '下一页',
                            last: '末页'
                        },
                        change: function (index) {
                            flag = false;
                            // 有一个参数，这个参数当前的页数
                            getDate1(index, 30)
                            render(date);
                            $(document).scrollTop(0);
                        }
                    })
                }
                render(date);
                // 价格升序 降序
                let sx = true;
                $('.lh2').click(function () {
                    $('.lh3').html('销量' + `<span class="iconfont icon-shangxia"></span>`).css('color', '#ababab');
                    if (sx) {
                        sx = false;
                        $('.lh2').html('升序' + `<span class="iconfont icon-shangxia"></span>`).css('color', 'red')
                        date.list.sort(function (a, b) {
                            return b.minGroupPrice - a.minGroupPrice
                        })
                        render(date);
                    } else {
                        sx = true;
                        $('.lh2').html('降序' + `<span class="iconfont icon-shangxia"></span>`).css('color', '#ababab');
                        date.list.sort(function (a, b) {
                            return a.minGroupPrice - b.minGroupPrice
                        })
                        render(date);
                    }
                })
                // 销量升序 降序
                $('.lh3').click(function () {
                    $('.lh2').html('价格' + `<span class="iconfont icon-shangxia"></span>`).css('color', '#ababab');
                    if (sx) {
                        sx = false;
                        $('.lh3').html('升量' + `<span class="iconfont icon-shangxia"></span>`).css('color', 'red')
                        date.list.sort(function (a, b) {
                            return b.salesTip - a.salesTip
                        })
                        render(date);
                    } else {
                        sx = true;
                        $('.lh3').html('降量' + `<span class="iconfont icon-shangxia"></span>`).css('color', '#ababab')
                        date.list.sort(function (a, b) {
                            return a.salesTip - b.salesTip
                        })
                        render(date);
                    }
                })
            }
        })
    }
    // 渲染数据
    function render(date) {
        let li = date.list;
        let str = '';
        li.forEach(function (item) {
            str +=
                `
           <li>
           <div class="lShop">
               <img src=${item.goodsImageUrl} class="lShop1" alt="">
               <p class="lShop2">${item.goodsName}</p>
               <p class="lShop3"><span>券后￥${parseInt(item.minGroupPrice / 1000 - item.couponDiscount / 1000)}.00</span><span>原价￥${parseInt(item.minGroupPrice / 1000)}.00</span></p>
               <p class="lShop4">销量${item.salesTip}</p>
               <div class="lShop5"><a href="./detail.html?id=${item.goodsId}&${item.goodsSign}">立即抢购</a></div>
           </div>
       </li> 
           `
        })
        list.html(str)
    }
})
