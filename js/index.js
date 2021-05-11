window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    })
    // 动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建li
        var li = document.createElement('li');
        //记录小圆圈的索引号，通过自定义属性
        li.setAttribute('index', i)
        // 把小li插入到ol里面
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                this.className = 'current';
            }
            //点击圆圈移动图片 ul
            //移动距离是 圆圈索引号*图片宽度
            var index = this.getAttribute('index');
            //点击圆圈 把索引号给num
            num = index;
            //点击圆圈 把索引号给circle
            circle = index;
            animate(ul, -index * focusWidth)
        })
    }
    //ol里面的第一个li设置类名 current
    ol.children[0].className = 'current';
    //克隆第一张图片放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮，图片滚动一张
    var num = 0;
    //控制小圆圈播放
    var circle = 0;
    arrow_r.addEventListener('click', function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth);
        circle++;
        if (circle == ul.children.length - 1) {
            circle = 0;
        }
        circleChange();
    })
    //点击左侧按钮，图片滚动一张
    arrow_l.addEventListener('click', function () {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth;

        }
        num--;
        animate(ul, -num * focusWidth);
        circle--;
        // if (circle < 0) {
        //     circle = ol.children.length - 1;
        // }
        circle = circle < 0 ? ol.children.length - 1 : circle;
        circleChange();
    })
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 自动播放图片
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000);
})