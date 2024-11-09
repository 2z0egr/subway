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
    const menu_wrap = document.querySelector('.item_wrap'); // UL 전체를 대상으로 선택
    let startX, startY, moveX, moveY, distX, initialTranslateX = 0; // 초기화된 이동 거리 변수 추가

    // 화면 너비가 1440px 미만일 때만 드래그 가능
    function isMobileView() {
        return window.innerWidth < 1440;
    }

    // 터치 시작
    menu_wrap.addEventListener("touchstart", function(e) {
        if (!isMobileView()) return; // 화면이 1440px 이상일 경우 이벤트 무시
        startX = e.touches[0].pageX;  // 첫 번째 터치의 X 좌표
        startY = e.touches[0].pageY;  // 첫 번째 터치의 Y 좌표
    });

    // 터치 이동
    menu_wrap.addEventListener("touchmove", function(e) {
        if (!isMobileView()) return; // 화면이 1440px 이상일 경우 이벤트 무시
        moveX = e.touches[0].pageX;   // 현재 터치의 X 좌표
        moveY = e.touches[0].pageY;   // 현재 터치의 Y 좌표
        distX = moveX - startX;       // 이동한 거리 계산 (수평 이동 거리)

        // 요소를 이동시키되, 처음 시작 위치와 이동한 거리를 더해서 반영
        menu_wrap.style.transform = `translateX(${initialTranslateX + distX}px)`;
    });

    // 터치 종료
    menu_wrap.addEventListener("touchend", function(e) {
        if (!isMobileView()) return; // 화면이 1440px 이상일 경우 이벤트 무시
        // 터치 종료 시, 이동한 위치를 그대로 유지
        initialTranslateX += distX;  // 마지막 이동 거리만큼 계속 누적하여 저장
    });
};
