document.addEventListener('DOMContentLoaded', function() { //需dom加载完成后执行
    const links = document.querySelectorAll('#linkContainer a');
    const cityshadowBox1 = document.querySelector('.cityshadow_box1');
    const cityshadowBox2 = document.querySelector('.cityshadow_box2');
    const pages = [
        { element: document.querySelector('.Homepage') },
        { element: document.querySelector('.Character_Intro') },
        { element: document.querySelector('.Reflection') },
        { element: document.querySelector('.Intelligence') }
    ];

    // 节流函数
    function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }

    function triggerAnimation(elementSelector, animationClass) {
        const elements = document.querySelectorAll(elementSelector);
        elements.forEach(el => {
            // 初始化 transform 属性为 translateY(0%)
            el.style.transform = 'translateY(0%)';
            // 移除动画类（如果有）
            el.classList.remove(animationClass);
            // 强制重绘以确保动画可以再次触发
            void el.offsetWidth;
            // 添加动画类以触发动画
            el.classList.add(animationClass);
        });
    }

    function showPage(index) {
        // 移除所有链接的 active 类
        links.forEach(l => l.classList.remove('active'));

        // 重新添加类到当前点击的链接
        links[index].classList.add('active');

        // 使用该函数分别对两个选择器应用动画
        triggerAnimation('.cityshadow', 'animate');
        triggerAnimation('.cityshadow2', 'animate2');

        // 重新设置 city 的位置
        const marginLeftValue = (index * 0.96) + 'rem';
        cityshadowBox1.style.marginLeft = marginLeftValue;
        cityshadowBox2.style.marginLeft = marginLeftValue;

        // 隐藏所有页面
        pages.forEach(page => {
            page.element.style.opacity = '0';
        });

        // 显示目标页面
        pages[index].element.style.display = 'block';
        if (index == 2) {
            startAnimation();
            hideAnimation();
        }
        setTimeout(() => {
            pages[index].element.style.opacity = '1';
        }, 50);

        // 设置其他页面在一段时间后完全隐藏
        setTimeout(() => {
            pages.forEach((page, idx) => {
                if (idx !== index) {
                    page.element.style.display = 'none';
                }
            });
        }, 500);
    }

    // 使用节流函数包装事件处理程序
    const throttledShowPage = throttle(showPage, 600);

    // 绑定点击事件到每个链接
    links.forEach((link, index) => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认的锚点行为
            throttledShowPage(index);
        });
    });

    // 示例动画函数（根据需要实现具体逻辑）
    function startAnimation() {
        console.log("Start Animation");
    }

    function hideAnimation() {
        console.log("Hide Animation");
    }
// 首页角色跳转部分
    
    const guide_role = document.getElementById('guide_role')
    guide_role.addEventListener('click',()=>{
        pages[1].element.style.display = 'block';
            setTimeout(() => {
                pages[1].element.style.opacity = '1';
                pages[0].element.style.opacity = '0';
            }, 50);
            setTimeout(() => { 
               pages[0].element.style.display = 'none';//等主页面显示完成后再隐藏
            }, 500);
    })
        //音乐播放
            const musicSwitchLink = document.getElementById("musicSwitchLink");
            const backgroundMusic = document.getElementById('backgroundMusic');
            const audio = document.getElementById('backgroundMusic');

            // 更新图标
            function updateIcon() {
                if (audio.paused) {
                    musicSwitchLink.classList.remove('switched'); // 显示左侧图标（暂停图标）
                } else {
                    musicSwitchLink.classList.add('switched'); // 显示右侧图标（播放图标）
                }
            }

            // 尝试自动播放音频
            function playAudio() {
                audio.play().then(() => {
                    console.log('音频已成功播放');
                    updateIcon();
                }).catch(error => {
                    console.error('音频播放失败:', error);
                });
            }

            // 现代浏览器可能会阻止自动播放，需要处理这种情况
            // 可以尝试在用户交互后播放音频
            function handleUserInteraction() {
                playAudio();
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('keydown', handleUserInteraction);
            }

            // 绑定点击和键盘事件来播放音频
            document.addEventListener('click', handleUserInteraction);
            document.addEventListener('keydown', handleUserInteraction);

            // 尝试立即播放音频
            playAudio();

            // 初始更新图标
            updateIcon();

            // 监听音频的 play 和 pause 事件
            audio.addEventListener('play', updateIcon);
            audio.addEventListener('pause', updateIcon);

            // 切换音乐播放状态
            musicSwitchLink.addEventListener('click', function() {
                if (backgroundMusic.paused) {
                    backgroundMusic.play();
                } else {
                    backgroundMusic.pause();
                }
                updateIcon(); // 更新图标
            });
        // 获取需要操作的元素
        const pvBtn1 = document.querySelector('.pvBtn');
        const toplayer = document.querySelector('.toplayer');
//videoPlayer动画播放
        pvBtn1.addEventListener('mouseover', function() {
    // 当鼠标悬停在 .pvBtn 上时，移除 .toplayer 的背景图片
        toplayer.style.backgroundImage = 'none';
});

// 添加鼠标离开事件监听器
        pvBtn1.addEventListener('mouseout', function() {
    // 当鼠标离开 .pvBtn 时，恢复 .toplayer 的背景图片
        toplayer.style.backgroundImage = 'url(./assets/pvPlayer.png)';
});
        
        const pvBtn = document.querySelector('.pvBtn.countEventClick');
        const videoPlayer = document.getElementById('videoPlayer');
        const pop_close =document.getElementById('pop_close')
    pvBtn.addEventListener('click', function(event) {
        event.preventDefault(); // 阻止默认的链接跳转行为

                // 获取自定义属性
                const countType = this.getAttribute('counttype');
                const videoLink = this.getAttribute('videolink');

                // 记录点击事件
                sendClickEventToServer(countType);

                // 播放视频
                videoPlayer.src = videoLink;
                videoPlayer.style.display = 'block';
                videoPlayer.play();

                // 显示关闭按钮
                pop_close.style.display = 'block';
            });

            pop_close.addEventListener('click', function(event) {
                event.preventDefault(); // 阻止默认的链接跳转行为

                // 隐藏视频
                videoPlayer.style.display = 'none';
                videoPlayer.pause();

                // 隐藏关闭按钮
                pop_close.style.display = 'none';
            });

    // 模拟发送点击事件到服务器的函数
    function sendClickEventToServer(countType) {
        fetch('/api/click-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                countType: countType,
                timestamp: new Date().toISOString()
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('成功记录点击事件:', data);
        })
        .catch(error => {
            console.error('记录点击事件失败:', error);
        });
    }


    // 预约框显示隐藏
    const reservation = document.getElementById('Reservation');
    const rsvContent = document.getElementById('rsv_content');
    const indexYyBtns = document.getElementById('indexYyBtns');
    const index_inquiry = document.getElementById('index_inquiry');
    const rsv_close = document.querySelector('.rsv_close');
    const rsv_successful = document.querySelector('.rsv_successful');
    const yyForm_submit = document.querySelector('.yyForm_submit');
    const show = document.querySelector('.show')
    const show2 = document.querySelector('#show2')
    const show3 = document.querySelector('#show3')
    // 开启
    function showReservation() {
    rsvContent.style.display = 'block';
    reservation.style.display = 'block';
    setTimeout(() => {
        rsvContent.style.opacity = '1';
        reservation.style.opacity = '0.8';
    }, 100);
}
// 绑定点击事件
index_inquiry.addEventListener('click',showReservation);
indexYyBtns.addEventListener('click', showReservation);
show.addEventListener('click',showReservation);
show2.addEventListener('click',showReservation);
show3.addEventListener('click',showReservation);
// 预约框关闭
    rsv_close.addEventListener('click', function() {
    rsvContent.style.opacity = '0';
    reservation.style.opacity = '0';
    console.log("成功");
    setTimeout(() => {
    rsvContent.style.display = 'none';
    reservation.style.display = 'none';
    return;
    },300);
});

    
    let countdown = 60;
    const btn = document.getElementById('yyFormRow_btn');
    const verificationCodeInput = document.getElementById('verificationCodeInput');
    let generatedCode;

    // 节流函数
    function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }

    const throttledSendVerificationCode = throttle(sendVerificationCode, 60000);

    btn.addEventListener('click', throttledSendVerificationCode);

    function sendVerificationCode() {
        const phoneNumber = document.getElementById('phoneNumber').value;
        if (!phoneNumber) {
            alert("请填写手机号");
            return;
        }

        // 启动倒计时
        startCountdown();

        // 发送验证码的逻辑（仅做模拟）
        console.log("验证码已发送");

        // 生成随机验证码
        generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("生成的验证码:", generatedCode);
        alert("生成的验证码:" + generatedCode);
    }

    function startCountdown() {
        btn.classList.add('disabled');
        btn.textContent = `${countdown}秒后发送验证码`;

        const intervalId = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                btn.textContent = `${countdown}秒后发送验证码`;
            } else {
                clearInterval(intervalId);
                btn.classList.remove('disabled');
                btn.textContent = '获取验证码';
                countdown = 60; // 重置倒计时
            }
        }, 1000);
    }

    yyForm_submit.addEventListener('click', function() {
        // 验证码验证
        const userInput = verificationCodeInput.value.trim();
        if (userInput === generatedCode) {
            rsvContent.style.display = 'none'; // 隐藏预约表单内容
            rsv_successful.style.display = 'block'; // 显示成功界面
        } else {
            alert("验证码不正确");
        }
    });
        // 成功预约关闭功能
        const rsv_close2 = document.querySelector('.rsv_close2');
        rsv_close2.addEventListener('click',function(){
            reservation.style.opacity = '0';
            setTimeout(() => {
                rsv_successful.style.display = 'none';
                reservation.style.display = 'none';
            },300)
        })
        // 角色页面切换功能
        const role_bullet1 = document.querySelector('.role_bullet1');
        const role_bullet2 = document.querySelector('.role_bullet2');
        const role_bullet3 = document.querySelector('.role_bullet3');
        const role_1 = document.querySelector('.role_1');
        const role_2 = document.querySelector('.role_2');
        const role_3 = document.querySelector('.role_3');
         // 防抖函数
            function debounce(func) {
                let timeout;
                return function(...args) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func.apply(this, args), 50);
                };
            }

            function resetBullets() {
                role_bullet1.style.backgroundPosition = 'top';
                role_bullet2.style.backgroundPosition = 'top';
                role_bullet3.style.backgroundPosition = 'top';
                role_bullet1.classList.remove('active');
                role_bullet2.classList.remove('active');
                role_bullet3.classList.remove('active');
            }

            function showRole(roleBullet, roleElement) {
                resetBullets();
                roleBullet.style.backgroundPosition = 'bottom';
                roleBullet.classList.add('active');
                roleElement.style.display = 'block';
                setTimeout(() => {
                    roleElement.style.opacity = '1';
                    if (roleElement === role_1) {
                        role_2.style.opacity = '0';
                        role_3.style.opacity = '0';
                    } else if (roleElement === role_2) {
                        role_1.style.opacity = '0';
                        role_3.style.opacity = '0';
                    } else if (roleElement === role_3) {
                        role_1.style.opacity = '0';
                        role_2.style.opacity = '0';
                    }
                }, 50);
                setTimeout(() => {
                    if (roleElement !== role_1) {
                        role_1.style.display = 'none';
                    }
                    if (roleElement !== role_2) {
                        role_2.style.display = 'none';
                    }
                    if (roleElement !== role_3) {
                        role_3.style.display = 'none';
                    }
                }, 500);
            }

            // 使用防抖函数包装事件处理程序
            const debouncedShowRole1 = debounce(() => showRole(role_bullet1, role_1), 500);
            const debouncedShowRole2 = debounce(() => showRole(role_bullet2, role_2), 500);
            const debouncedShowRole3 = debounce(() => showRole(role_bullet3, role_3), 500);

            role_bullet1.addEventListener('click', debouncedShowRole1);
            role_bullet2.addEventListener('click', debouncedShowRole2);
            role_bullet3.addEventListener('click', debouncedShowRole3);
            //  Reflection wav动画
            const wavyLine1 = document.querySelector('.wavyLline1');
            const wavyLine2 = document.querySelector('.wavyLline2');
            const tape =document.querySelector('#tape')
            // 开始动画
            function resetAndPlayAnimation_wavLine(element) {
                // 停止动画并重置到初始状态
                element.style.animation = 'none'; // 移除所有动画效果
                element.offsetHeight; // 强制浏览器进行一次重绘
            
                // 设置元素透明度为0，并确保元素仍然占据空间
                element.style.opacity = '0';
                element.style.display = 'block';
            
                // 立即设置回原动画，这样可以清除之前的动画状态
                element.style.animation = ''; // 恢复默认动画
            
                // 使用 requestAnimationFrame 确保动画在下一帧开始
                requestAnimationFrame(() => {
                    element.style.opacity = '1'; // 恢复元素透明度
                    element.style.animationPlayState = 'running'; // 开始动画
                });
            }
            function resetAndPlayAnimation_Reflection(element) {
                // 停止动画并重置到初始状态
                element.style.animation = 'none'; // 移除所有动画效果
                element.offsetHeight; // 强制浏览器进行一次重绘
            
                // 设置元素透明度为0，并确保元素仍然占据空间
                element.style.display = 'block';
            
                // 立即设置回原动画，这样可以清除之前的动画状态
                element.style.animation = ''; // 恢复默认动画
            
                // 使用 requestAnimationFrame 确保动画在下一帧开始
                requestAnimationFrame(() => {
                    element.style.animationPlayState = 'running'; // 开始动画
                });
            }

            function startAnimation() {
                console.log("都市映像");
                // 重置并播放动画
                resetAndPlayAnimation_wavLine(wavyLine1);
                resetAndPlayAnimation_wavLine(wavyLine2);
                resetAndPlayAnimation_Reflection(tape);
            }
            
            // 隐藏动画
            function hideAnimation() {
                // 先渐隐动画元素
                wavyLine1.style.opacity = '0';
                wavyLine2.style.opacity = '0';
            
                // 延迟一段时间后完全隐藏元素
                setTimeout(() => {
                    wavyLine1.style.display = 'none';
                    wavyLine2.style.display = 'none';
                }, 500); // 与动画持续时间一致
            }
            // 隐藏动画
            function hideAnimation() {
                setTimeout(() => {
                    wavyLine1.style.opacity = '0';
                    wavyLine2.style.opacity = '0';
                }, 500); // 与动画持续时间一致
                setTimeout(() => {
                    wavyLine1.style.display = 'none';
                    wavyLine2.style.display = 'none';
                }, 1000);
            }
           //轮播图功能
            const swiperWrapper = document.querySelector('.swiper-wrapper');
            const citySlideImgs = document.querySelectorAll('.citySlideImg');
            const prevButton = document.querySelector('.swiper-button-prev');
            const nextButton = document.querySelector('.swiper-button-next');
            const paginationContainer = document.querySelector('.swiper-pagination');
            const tape_all = document.querySelector('.tape_all');
            const tapeA = document.querySelector('.tapeA');
            const tapeB = document.querySelector('.tapeB');
            let currentIndex = 0;
            // 封装Num/Tit可视
            function updateSlides(currentIndex) {
                const citySlideNums = document.querySelectorAll('.citySlideNum');
                citySlideNums.forEach((element, index) => {
                    element.style.opacity = index === currentIndex ? 1 : 0;
                });
                const citySlideTits = document.querySelectorAll('.citySlideTit');
                citySlideTits.forEach((element, index) => {
                    element.style.opacity = index === currentIndex ? 1 : 0;
                });
            }
            // 创建分页项目符号
            citySlideImgs.forEach((_, index) => {
                const bullet = document.createElement('div');
                bullet.classList.add('swiper-pagination-bullet');
                if (index === 0) {
                    bullet.classList.add('swiper-pagination-bullet-active');
                }
                
                bullet.addEventListener('click', () => {
                    goToSlide(index);
                });
                paginationContainer.appendChild(bullet);
            });

            // 更新活动项目符号
            function updatePagination() {
                const bullets = document.querySelectorAll('.swiper-pagination-bullet');
                bullets.forEach((bullet, index) => {
                    if (index === currentIndex) {
                        bullet.classList.add('swiper-pagination-bullet-active');
                    } else {
                        bullet.classList.remove('swiper-pagination-bullet-active');
                    }
                });
            }

            // 转到特定图片位置
            function goToSlide(index) {
                if(index > 1){
                    tape_all.style.transform = "rotateY(-180deg)";
                    tapeA.style.opacity = '0';
                    tapeB.style.opacity = '1';
                }
                else if(index < 2){
                    tape_all.style.transform = "rotateY(0deg)";
                    tapeA.style.opacity = '1';
                    tapeB.style.opacity = '0';
                }
                console.log("// 转到特定图片位置")
                updateSlides(index);
                currentIndex = index;
                const offset = -currentIndex * 100;
                swiperWrapper.style.transform = `translateX(${offset}%)`;
                updatePagination();
            }

            // 按钮点击处理程序
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % citySlideImgs.length;
                console.log( (currentIndex + 1) % citySlideImgs.length);
                goToSlide(currentIndex);
            });

            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + citySlideImgs.length) % citySlideImgs.length;
                goToSlide(currentIndex);
            });
            const swiperWrapper2 = document.querySelector('.swiper-wrapper2');
            const citySlideImgs2 = document.querySelectorAll('.citySlideImg2');
            const prevButton2 = document.querySelector('.swiper-button-prev2');
            const nextButton2 = document.querySelector('.swiper-button-next2');
            const paginationContainer2 = document.querySelector('.swiper-pagination2');
            let currentIndex2 = 0;
            
            // 封装文字部分可视
            function updateSlides2(currentIndex) {
                const citySlideNums2 = document.querySelectorAll('.citySlideNum2');
                citySlideNums2.forEach((element, index) => {
                    element.style.opacity = index === currentIndex ? 1 : 0;
                });
            
                const citySlideTits2 = document.querySelectorAll('.citySlideTit2');
                citySlideTits2.forEach((element, index) => {
                    element.style.opacity = index === currentIndex ? 1 : 0;
                });
            }
            
            // 创建分页项目符号
            citySlideImgs2.forEach((_, index) => {
                const bullet = document.createElement('div');
                bullet.classList.add('swiper-pagination-bullet2');
                if (index === 0) {
                    bullet.classList.add('swiper-pagination-bullet-active2');
                }
            
                bullet.addEventListener('click', () => {
                    goToSlide2(index);
                });
                paginationContainer2.appendChild(bullet);
            });
            
            // 更新活动项目符号
            function updatePagination2() {
                const bullets2 = document.querySelectorAll('.swiper-pagination-bullet2');
                bullets2.forEach((bullet, index) => {
                    if (index === currentIndex2) {
                        bullet.classList.add('swiper-pagination-bullet-active2');
                    } else {
                        bullet.classList.remove('swiper-pagination-bullet-active2');
                    }
                });
            }
            
            // 转到特定图片位置
            function goToSlide2(index) {
                updateSlides2(index);
                currentIndex2 = index;
                const offset = -currentIndex2 * 100;
                swiperWrapper2.style.transform = `translateX(${offset}%)`;
                updatePagination2();
            }
            
            // 按钮点击处理程序
            nextButton2.addEventListener('click', () => { 
                currentIndex2 = (currentIndex2 + 1) % citySlideImgs2.length; // 使用 currentIndex2 和 citySlideImgs2
                console.log(`Next index: ${currentIndex2}`);
                goToSlide2(currentIndex2);
            });
            
            prevButton2.addEventListener('click', () => { // 使用 prevButton2
                currentIndex2 = (currentIndex2 - 1 + citySlideImgs2.length) % citySlideImgs2.length; // 使用 currentIndex2 和 citySlideImgs2
                console.log(`Prev index: ${currentIndex2}`);
                goToSlide2(currentIndex2);
            });
});
