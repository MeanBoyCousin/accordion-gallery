import {
    containerMouseEnter
} from './accordion-gallery.js';

const options = {
    images: [{
            image: 'images/1.jpg',
            caption: 'This is a caption with a button.',
            buttonText: 'Click me!',
            buttonLink: 'https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/'
        },
        {
            image: 'images/2.jpg',
            buttonText: 'Solo button!',
            buttonLink: 'https://www.pexels.com/photo/grayscale-photo-of-topless-woman-1164674/'
        },
        {
            image: 'images/3.jpg',
            caption: 'This is a solo caption.',
        }
    ],
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

describe('container mouse enter style changes', () => {
    document.body.innerHTML = `<div class="vg-img">
                                    <div class="text-button-container"></div>
                                </div>
                                <div class="vg-img">
                                    <div class="text-button-container"></div>
                                </div>
                                <div class="vg-img">
                                    <div class="text-button-container"></div>
                                </div>`;
    containerMouseEnter(options);
    const images = Array.from(document.getElementsByClassName('vg-img'));
    const captionContainers = Array.from(document.getElementsByClassName('text-button-container'));

    test('should be a function', () => {
        expect(containerMouseEnter).toBeDefined();
    });

    const createStyleArray = (array, styleName) => {
        return array.map(el => el.style[styleName]);
    };

    test('should apply opacity change to caption containers', () => {
        expect(createStyleArray(captionContainers, 'opacity')).toEqual(["0", "0", "0"]);
    });

    test('should apply opacity change to image', () => {
        expect(createStyleArray(images, 'opacity')).toEqual(["0.25", "0.25", "0.25"]);
    });

    test('should apply transform change to image', () => {
        expect(createStyleArray(images, 'transform')).toEqual(["scale(0.8)", "scale(0.8)", "scale(0.8)"]);
    });

    test('should apply border radius change to image', () => {
        expect(createStyleArray(images, 'borderRadius')).toEqual(["10px", "10px", "10px"]);
    });

    test('should apply flex change to image', () => {
        expect(createStyleArray(images, 'flex')).toEqual(["1", "1", "1"]);
    });
});