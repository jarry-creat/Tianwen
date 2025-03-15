// 首页按钮点击事件
const exploreButton = document.getElementById('exploreButton');
if (exploreButton) {
    exploreButton.addEventListener('click', function () {
        window.location.href = 'detail.html';
    });
}

// 详情页功能
if (window.location.pathname.includes('detail.html')) {
    const detailImage = document.querySelector('.slider');
    const zoomInButton = document.getElementById('zoomInButton');
    const zoomOutButton = document.getElementById('zoomOutButton');
    const prevImageButton = document.querySelector('.slider-arrow-left');
    const nextImageButton = document.querySelector('.slider-arrow-right');

    let scale = 1;
    const scaleStep = 0.1;
    const maxScale = 2;
    const minScale = 0.5;

    // 图片放大功能
    if (zoomInButton) {
        zoomInButton.addEventListener('click', function () {
            if (scale < maxScale) {
                scale += scaleStep;
                detailImage.style.transform = `scale(${scale})`;
            }
        });
    }

    // 图片缩小功能
    if (zoomOutButton) {
        zoomOutButton.addEventListener('click', function () {
            if (scale > minScale) {
                scale -= scaleStep;
                detailImage.style.transform = `scale(${scale})`;
            }
        });
    }

    const slides = document.querySelectorAll('.slide');
    let currentImageIndex = 0;

    // 上一张图片功能
    if (prevImageButton) {
        prevImageButton.addEventListener('click', function () {
            if (currentImageIndex === 0) {
                // 临时将最后一张图片复制到最前面
                const lastSlide = slides[slides.length - 1].cloneNode(true);
                detailImage.insertBefore(lastSlide, detailImage.firstChild);

                // 先将当前的第一张图片移到最前面
                detailImage.style.transform = `translateX(0)`;

                // 等待下一帧，让浏览器有时间更新样式
                requestAnimationFrame(() => {
                    // 再向左移动到最后一张图片的位置
                    detailImage.style.transform = `translateX(-100%)`;
                    // 移除临时添加的图片
                    setTimeout(() => {
                        detailImage.removeChild(lastSlide);
                        currentImageIndex = slides.length - 1;
                    }, 1500); // 这里的 1500 要和 CSS 里的过渡时间一致
                });
            } else {
                currentImageIndex = (currentImageIndex - 1 + slides.length) % slides.length;
                detailImage.style.transform = `translateX(-${currentImageIndex * 100}%)`;
            }
        });
    }

    // 下一张图片功能
    if (nextImageButton) {
        nextImageButton.addEventListener('click', function () {
            if (currentImageIndex === slides.length - 1) {
                // 临时将第一张图片复制到最后面
                const firstSlide = slides[0].cloneNode(true);
                detailImage.appendChild(firstSlide);

                // 先将当前的最后一张图片移到最右边
                detailImage.style.transform = `translateX(-${currentImageIndex * 100}%)`;

                // 等待下一帧，让浏览器有时间更新样式
                requestAnimationFrame(() => {
                    // 再向右移动到第一张图片的位置
                    detailImage.style.transform = `translateX(-${(currentImageIndex + 1) * 100}%)`;
                    // 移除临时添加的图片
                    setTimeout(() => {
                        detailImage.removeChild(firstSlide);
                        currentImageIndex = 0;
                    }, 1500); // 这里的 1500 要和 CSS 里的过渡时间一致
                });
            } else {
                currentImageIndex = (currentImageIndex + 1) % slides.length;
                detailImage.style.transform = `translateX(-${currentImageIndex * 100}%)`;
            }
        });
    }
}
    