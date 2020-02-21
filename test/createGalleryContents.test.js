import {
    createGalleryContents
} from './vertical-gallery.js';

describe('Applies styles to the image div with default options', () => {
    document.body.innerHTML = '<div id="vg-container"></div>';
    const container = document.getElementById('vg-container');
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
        captionPosition: 'bottom',
        featuredImage: 0,
        featuredWidth: 5,
        speed: 300
    };

    createGalleryContents(container, options);
    const images = Array.from(document.getElementsByClassName('vg-img'));
    const imageStyles = images.map(el => el.style);

    test('should apply correct styling', () => {
        imageStyles.forEach(image => {
            expect(image._values.display).toEqual('flex');
            expect(image._values['justify-content']).toEqual('center');
            expect(image._values['align-items']).toEqual('flex-end');
            expect(image._values['background-position']).toEqual('center');
            expect(image._values['background-size']).toEqual('auto 100%');
            expect(image._values['background-repeat']).toEqual('no-repeat');
            expect(image._values['overflow']).toEqual('hidden');
            expect(image._values['transition']).toEqual('300ms cubic-bezier(.25, .8, .25, 1)');
        })
        expect(imageStyles[0]._values['background-image']).toEqual("url(images/1.jpg)");
        expect(imageStyles[1]._values['background-image']).toEqual("url(images/2.jpg)");
        expect(imageStyles[2]._values['background-image']).toEqual("url(images/3.jpg)");
    });
});

describe('Applies align-items to center if user inputs captionPosition as middle', () => {
    document.body.innerHTML = '';
    document.body.innerHTML = '<div id="vg-container"></div>';
    const container = document.getElementById('vg-container');
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
        captionPosition: 'middle',
        featuredImage: 0,
        featuredWidth: 5,
        speed: 300
    };

    createGalleryContents(container, options);
    const images = Array.from(document.getElementsByClassName('vg-img'));
    const imageStyles = images.map(el => el.style);

    test('should apply correct styling', () => {
        imageStyles.forEach(image => {
            expect(image._values['align-items']).toEqual('center');
        })
    });
});

describe('Applies align-items to flex-start if user inputs captionPosition as top', () => {
    document.body.innerHTML = '';
    document.body.innerHTML = '<div id="vg-container"></div>';
    const container = document.getElementById('vg-container');
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
        captionPosition: 'top',
        featuredImage: 0,
        featuredWidth: 5,
        speed: 300
    };

    createGalleryContents(container, options);
    const images = Array.from(document.getElementsByClassName('vg-img'));
    const imageStyles = images.map(el => el.style);

    test('should apply correct styling', () => {
        imageStyles.forEach(image => {
            expect(image._values['align-items']).toEqual('flex-start');
        })
    });
});

describe('Applies correct flex styling if a featured image is specified', () => {
    document.body.innerHTML = '';
    document.body.innerHTML = '<div id="vg-container"></div>';
    const container = document.getElementById('vg-container');
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
        captionPosition: 'bottom',
        featuredImage: 0,
        featuredWidth: 5,
        speed: 300
    };

    createGalleryContents(container, options);
    const images = Array.from(document.getElementsByClassName('vg-img'));
    const imageStyles = images.map(el => el.style);

    test('should apply correct styling', () => {
        expect(imageStyles[0]._values.flex).toEqual("5");
        expect(imageStyles[1]._values.flex).toEqual("1");
        expect(imageStyles[2]._values.flex).toEqual("1");
    });
});

describe('gallery events', () => {
    //Write tests to check that event listeners are firing.
});

describe('check that text and button are appended if their is content', () => {
    document.body.innerHTML = '';
    document.body.innerHTML = '<div id="vg-container"></div>';
    const container = document.getElementById('vg-container');
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
        captionPosition: 'bottom',
        featuredImage: 0,
        featuredWidth: 5,
        speed: 300
    };

    createGalleryContents(container, options);
    //Write tests to check that button and text are being appended to the page.
});