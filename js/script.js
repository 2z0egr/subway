window.onload=function(){
    // nav toggle control
    const toggle = document.querySelector('#toggle');
    toggle.addEventListener('click',function(){
        const nav = document.querySelector('#navbar');
        nav.classList.toggle('active');
    });
    
    // nav menu control
    if (window.innerWidth < 1440) {
        let navItem = document.querySelectorAll('#navbar .gnb > li');
        navItem.forEach((list) => {
            list.addEventListener('click', () => {
                const subMenu = list.querySelector('.sub');
                if (subMenu.style.display === 'block') {
                    subMenu.style.display = 'none';
                } else {
                    subMenu.style.display = 'block';
                }
            });
        });
    } else {
        let navLists = document.querySelector('#navbar .gnb');
        navLists.addEventListener('mouseover', () => {
            document.querySelector('#navbar>.sub_bg').style.display = 'block';
        });    
        navLists.addEventListener('mouseout', () => {
            document.querySelector('#navbar>.sub_bg').style.display = 'none';
        });
    };

    // main visual slide
    let currentIndex = 0;
    const sliderWrap = document.querySelector(".slides")
    const sliderClone = sliderWrap.firstElementChild.cloneNode(true);
    sliderWrap.appendChild(sliderClone);

    setInterval(() => {
        currentIndex++;
        sliderWrap.style.marginLeft = -currentIndex * 100 + "vw";
        sliderWrap.style.transition = "all 0.6s"

        if(currentIndex == 3){
            setTimeout(() => {
                sliderWrap.style.transition = "0s"
                sliderWrap.style.marginLeft = "0"
                currentIndex = 0;
            }, 700);
        };
    }, 3000);

    // mobile menu touch slide
    const menu_wrap = document.querySelector('.item_wrap');
    let startX, startY, moveX, moveY, distX, initialTranslateX = 0;

    function isMobileView() {
        return window.innerWidth < 1440;
    }

    // 터치 시작
    menu_wrap.addEventListener("touchstart", function(e) {
        if (!isMobileView()) return; 
        startX = e.touches[0].pageX; 
        startY = e.touches[0].pageY;
    });

    // 터치 이동
    menu_wrap.addEventListener("touchmove", function(e) {
        if (!isMobileView()) return;
        moveX = e.touches[0].pageX;
        moveY = e.touches[0].pageY;
        distX = moveX - startX; // 이동한 거리 계산 (수평 이동 거리)
        menu_wrap.style.transform = `translateX(${initialTranslateX + distX}px)`;
    });

    // 터치 종료
    menu_wrap.addEventListener("touchend", function(e) {
        if (!isMobileView()) return;
        initialTranslateX += distX;
    });
};
