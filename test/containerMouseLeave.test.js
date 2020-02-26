import {
    containerMouseLeave
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
    featuredImage: 1,
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
    radius: 0,
    scale: 1
};

const undefinedFeatureOptions = {
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
    radius: 0,
    scale: 1
};

const nonZeroIndexedFeaturedImageOptions = {
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
    featuredImage: 3,
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
    radius: 0,
    scale: 1
};

//Define DOM.
const dom = '<div class="vg-img" style="flex: 1;"><div class="text-button-container" style="opacity: 0;"></div></div><div class="vg-img" style="flex: 1;"><div class="text-button-container" style="opacity: 0;"></div></div><div class="vg-img" style="flex: 1;"><div class="text-button-container" style="opacity: 0;"></div></div>';

describe('container mouse leave style changes with defined feature image', () => {
    //Configure environment.
    document.body.innerHTML = dom;
    containerMouseLeave(options);
    const images = Array.from(document.getElementsByClassName('vg-img'));

    //Tests
    test('should be a function', () => {
        expect(containerMouseLeave).toBeDefined();
    });

    test('should apply opacity change to image', () => {
        const elOpacity = images.map(el => el.style.opacity);
        expect(elOpacity).toEqual(["1", "1", "1"]);
    });

    test('should apply transform change to image', () => {
        const elTransform = images.map(el => el.style.transform);
        expect(elTransform).toEqual(["scale(1)", "scale(1)", "scale(1)"]);
    });

    test('should apply border radius change to image', () => {
        const elRadius = images.map(el => el.style.borderRadius);
        expect(elRadius).toEqual(["0", "0", "0"]);
    });

    test('should make the featured image wider', () => {
        const featuredImageWidth = images[options.featuredImage].style.flex;
        expect(featuredImageWidth).toEqual("5");
    });
});

describe('container mouse leave style changes with undefined feature image', () => {
    //Configure environment.
    document.body.innerHTML = dom;
    containerMouseLeave(undefinedFeatureOptions);
    const images = Array.from(document.getElementsByClassName('vg-img'));

    //Tests   
    test('should keep all images the same size when featured image is undefined', () => {
        const elFlex = images.map(el => el.style.flex);
        expect(elFlex).toEqual(["1", "1", "1"]);

    });
});

describe('text container opacity should default to 1 for defined featured image on mouse leave', () => {
    //Configure environment.
    document.body.innerHTML = dom;
    containerMouseLeave(options);
    const textContainers = Array.from(document.getElementsByClassName('text-button-container'));

    //Tests
    test('should make the featured image text container opacity default to 1', () => {
        const featuredContainerOpacity = textContainers[options.featuredImage].style.opacity;
        expect(featuredContainerOpacity).toEqual("1");
    });
});

describe('text container opacity should be 0 for undefined featured image on mouse leave', () => {
    //Configure environment.
    document.body.innerHTML = dom;
    containerMouseLeave(undefinedFeatureOptions);
    const textContainers = Array.from(document.getElementsByClassName('text-button-container'));

    //Tests
    test('should make the featured image text container opacity default to 0', () => {
        const textContainersOpacity = textContainers.map(el => el.style.opacity);
        expect(textContainersOpacity).toEqual(["0", "0", "0"]);
    });
});

describe('text container opacity should be 0 for featured that is a value above the index of the array on mouse leave', () => {
    //Configure environment.
    document.body.innerHTML = dom;
    containerMouseLeave(nonZeroIndexedFeaturedImageOptions);
    const textContainers = Array.from(document.getElementsByClassName('text-button-container'));

    //Tests
    test('should make the featured image text container opacity default to 0', () => {
        const textContainersOpacity = textContainers.map(el => el.style.opacity);
        expect(textContainersOpacity).toEqual(["0", "0", "0"]);
    });
});