import {
    imageMouseLeave
} from './vertical-gallery.js';

describe('image div mouse leave actions', () => {
    //Define Environment
    let options = {
        images: [{
            image: 'images/1.jpg',
            caption: 'This is a caption with a button.',
            buttonText: 'Click me!',
            buttonLink: 'https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/'
        }],
        linksInNewTab: true,
        captionPosition: 'bottom',
        captionBkgColor: 'rgba(255,255,255,0.75)',
        featuredImage: undefined,
        featuredWidth: 5,
        media: {
            320: [0, 1, 2, 3],
            425: [0, 1, 2],
            768: [5, 6]
        },
        galleryWidth: '100%',
        galleryHeight: '100vh',
        opacity: 0.25,
        shadow: true,
        speed: 300,
        radius: '10px',
        scale: 0.8
    };
    document.body.innerHTML = `<div id="vg-container">
                                <div class="vg-img">
                                    <div class="text-button-container"></div>
                                </div>
                            </div>`;
    const imageDiv = document.getElementsByClassName('vg-img');
    const index = options.images.length - 1;
    imageMouseLeave(imageDiv[0], options, index);
    const styledImages = document.getElementsByClassName('vg-img');
    const textContainers = document.getElementsByClassName('text-button-container');

    //Tests
    test('should be defined', () => {
        expect(imageMouseLeave).toBeDefined();
    });

    test('should set all text containers opacities to 0', () => {
        expect(textContainers[0].style.opacity).toEqual('0');
    });

    test('should apply styles to image div', () => {
        expect(styledImages[0].style.opacity).toEqual('0.25');
        expect(styledImages[0].style.transform).toEqual('scale(0.8)');
        expect(styledImages[0].style.flex).toEqual('1');
        expect(styledImages[0].style.boxShadow).toEqual('none');
    });
});