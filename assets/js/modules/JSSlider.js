export default class JSSlider {
    constructor(imagesSelector) {
        this.imagesSelector = imagesSelector
        this.sliderRootSelector = '.js-slider'
    }

    run() {
        const imagesList = document.querySelectorAll(this.imagesSelector);
        const sliderRootElement = document.querySelector(this.sliderRootSelector);

        this.initEvents(imagesList, sliderRootElement);
        this.initCustomEvents(imagesList, sliderRootElement, this.imagesSelector);
    }

    initEvents(imagesList, sliderRootElement) {
        const thisContext = this
        imagesList.forEach((item) => {
            item.addEventListener('click', (e) => {
                thisContext.fireCustomEvent(e.currentTarget, 'js-slider-img-click');
            });

        });

        this.assignEvent('.js-slider__nav--next', 'js-slider-img-next')

        this.assignEvent('.js-slider__nav--prev', 'js-slider-img-prev')


        const zoom = sliderRootElement.querySelector('.js-slider__zoom');
        if (zoom) {
            zoom.addEventListener('click', (e) => {
                if (e.target === e.currentTarget) {
                    thisContext.fireCustomEvent(sliderRootElement, 'js-slider-close');
                }
            })
        }
    }

    assignEvent(selector, customEvent){
        const sliderRootElement = document.querySelector(this.sliderRootSelector);
        const element = sliderRootElement.querySelector(selector)
        
        if(element){
            element.addEventListener('click', e => {
                this.fireCustomEvent(sliderRootElement, customEvent)
            })
        }
    }

    initCustomEvents(imagesList, sliderRootElement) {
        const thisContext = this
        imagesList.forEach((img) => {
            img.addEventListener('js-slider-img-click', (event) => {
                thisContext.onImageClick(event, sliderRootElement, this.imagesSelector);
            });
        });

        sliderRootElement.addEventListener('js-slider-img-next', this.onImageNext);
        sliderRootElement.addEventListener('js-slider-img-prev', this.onImagePrev);
        sliderRootElement.addEventListener('js-slider-close', this.onClose);
    }

    onImageNext(event) {
        console.log(this, 'onImageNext');

        const currentClassName = 'js-slider__thumbs-image--current';
        const current = this.querySelector('.' + currentClassName);

        const parentCurrent = current.parentElement;
        const nextElement = parentCurrent.nextElementSibling;
        if (nextElement && !nextElement.className.includes('js-slider__thumbs-item--prototype')) {
            const img = nextElement.querySelector('img')
            img.classList.add(currentClassName);

            this.querySelector('.js-slider__image').src = img.src;
            current.classList.remove(currentClassName);
        }
    }

    fireCustomEvent(element, name) {
        console.log(element.className, '=>', name);

        const event = new CustomEvent(name, {
            bubbles: true,
        });

        element.dispatchEvent(event);
    }

    onImageClick(event, sliderRootElement) {
        sliderRootElement.classList.add('js-slider--active');

        const src = event.currentTarget.querySelector('img').src;
        sliderRootElement.querySelector('.js-slider__image').src = src;

        const groupName = event.currentTarget.dataset.sliderGroupName;
        const thumbsList = document.querySelectorAll(this.imagesSelector + '[data-slider-group-name=' + groupName + ']');
        const prototype = document.querySelector('.js-slider__thumbs-item--prototype');
        thumbsList.forEach((item) => {
            const thumbElement = prototype.cloneNode(true);
            thumbElement.classList.remove('js-slider__thumbs-item--prototype');
            const thumbImg = thumbElement.querySelector('img');
            thumbImg.src = item.querySelector('img').src;
            if (thumbImg.src === src) {
                thumbImg.classList.add('js-slider__thumbs-image--current');
            }

            document.querySelector('.js-slider__thumbs').appendChild(thumbElement);
        })
    }

    onImagePrev(event) {
        console.log(this, 'onImagePrev');

        const currentClassName = 'js-slider__thumbs-image--current';
        const current = this.querySelector('.' + currentClassName);

        const parentCurrent = current.parentElement;
        const prevElement = parentCurrent.previousElementSibling;
        if (prevElement && !prevElement.className.includes('js-slider__thumbs-item--prototype')) {
            const img = prevElement.querySelector('img')
            img.classList.add(currentClassName);

            this.querySelector('.js-slider__image').src = img.src;
            current.classList.remove(currentClassName);
        }
    }
    onClose(event) {
        event.currentTarget.classList.remove('js-slider--active');
        const thumbsList = this.querySelectorAll('.js-slider__thumbs-item:not(.js-slider__thumbs-item--prototype)');
        thumbsList.forEach(item => item.parentElement.removeChild(item));
    }
}