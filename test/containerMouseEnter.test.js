import { containerMouseEnter } from './vertical-gallery.js';

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
    //Configure environment.
    document.body.innerHTML = '<div class="vg-img"></div><div class="vg-img"></div><div class="vg-img"></div>';
    containerMouseEnter(options);
    const images = Array.from(document.getElementsByClassName('vg-img'));

    //Tests
    test('should be a function', () => {
        expect(containerMouseEnter).toBeDefined();
    });

    test('should apply opacity change to container', () => {
        const elOpacity = images.map(el => el.style.opacity);
        expect(elOpacity).toEqual(["0.25", "0.25", "0.25"]);
    });

    test('should apply transform change to container', () => {
        const elTransform = images.map(el => el.style.transform);
        expect(elTransform).toEqual(["scale(0.8)", "scale(0.8)", "scale(0.8)"]);
    });

    test('should apply border radius change to container', () => {
        const elRadius = images.map(el => el.style.borderRadius);
        expect(elRadius).toEqual(["10px", "10px", "10px"]);
    });

    test('should apply flex change to container', () => {
        const elFlex = images.map(el => el.style.flex);
        expect(elFlex).toEqual(["1", "1", "1"]);
    });
});