export default class JSSlider {
    constructor(imagesSelector){
        this.imagesSelector = imagesSelector
        this.sliderRootSelector = '.js-slider'
    }

    run () {
    const imagesList = document.querySelectorAll(this.imagesSelector);
    const sliderRootElement = document.querySelector(this.sliderRootSelector);

    initEvents(imagesList, sliderRootElement);
    initCustomEvents(imagesList, sliderRootElement, this.imagesSelector);
}
}