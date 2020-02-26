import {
    createGalleryContents
} from './accordion-gallery.js';

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
    test('should apply correct styles to images and text containers on hover out', () => {
        document.body.innerHTML = '';
        document.body.innerHTML = `<div id="vg-container"></div>`;
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
                },
                {
                    image: 'images/4.jpg',
                }
            ],
            captionPosition: 'bottom',
            featuredImage: 0,
            featuredWidth: 5,
            speed: 300,
            shadow: true
        };
        createGalleryContents(container, options);
        const imageDivs = Array.from(document.getElementsByClassName('vg-img'));
        const textContainers = Array.from(document.getElementsByClassName('text-button-container'));

        const mouseEnterEvent = new Event('mouseenter');
        const touchStartEvent = new Event('touchstart');
        imageDivs.forEach(image => {
            if (image.dispatchEvent(mouseEnterEvent) && image.dispatchEvent(touchStartEvent)) {
                Object.assign(image.style, {
                    opacity: 1,
                    transform: 'scale(1)',
                    flex: 5,
                    boxShadow: '0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.44)'
                })
            }
        });
        textContainers.forEach(container => {
            container.style.opacity = 1;
        });

        const createStyleArray = (array, styleName) => {
            return array.map(el => el.style[styleName]);
        };

        expect(createStyleArray(imageDivs, 'opacity')).toEqual(["1", "1", "1", "1"]);
        expect(createStyleArray(imageDivs, 'transform')).toEqual(['scale(1)', 'scale(1)', 'scale(1)', 'scale(1)']);
        expect(createStyleArray(imageDivs, 'flex')).toEqual(["5", "5", "5", "5"]);
        expect(createStyleArray(imageDivs, 'boxShadow')).toEqual(['0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.44)', '0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.44)', '0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.44)', '0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.44)']);
        expect(createStyleArray(textContainers, 'opacity')).toEqual(["1", "1", "1", "1"]);
    });

    test('should apply correct styles to hovered images and text containers', () => {
        document.body.innerHTML = '';
        document.body.innerHTML = `<div id="vg-container"></div>`;
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
                },
                {
                    image: 'images/4.jpg',
                }
            ],
            captionPosition: 'bottom',
            featuredImage: 0,
            featuredWidth: 5,
            speed: 300,
            shadow: true,
            scale: 0.8,
            opacity: 0.15
        };
        createGalleryContents(container, options);
        const imageDivs = Array.from(document.getElementsByClassName('vg-img'));
        const textContainers = Array.from(document.getElementsByClassName('text-button-container'));

        const mouseEnterEvent = new Event('mouseleave');
        const touchStartEvent = new Event('touchmove');
        imageDivs.forEach(image => {
            if (image.dispatchEvent(mouseEnterEvent) && image.dispatchEvent(touchStartEvent)) {
                Object.assign(image.style, {
                    opacity: 0.15,
                    transform: 'scale(0.8)',
                    flex: 1,
                    boxShadow: 'none'
                })
            }
        });
        textContainers.forEach(container => {
            container.style.opacity = 0;
        });

        const createStyleArray = (array, styleName) => {
            return array.map(el => el.style[styleName]);
        };

        expect(createStyleArray(imageDivs, 'opacity')).toEqual(["0.15", "0.15", "0.15", "0.15"]);
        expect(createStyleArray(imageDivs, 'transform')).toEqual(['scale(0.8)', 'scale(0.8)', 'scale(0.8)', 'scale(0.8)']);
        expect(createStyleArray(imageDivs, 'flex')).toEqual(["1", "1", "1", "1"]);
        expect(createStyleArray(imageDivs, 'boxShadow')).toEqual(['none', 'none', 'none', 'none']);
        expect(createStyleArray(textContainers, 'opacity')).toEqual(["0", "0", "0", "0"]);
    });
});

describe('Text and button elements', () => {
    test('should append text and button elements only if provided', () => {
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
                },
                {
                    image: 'images/4.jpg',
                }
            ],
            captionPosition: 'bottom',
            featuredImage: 0,
            featuredWidth: 5,
            speed: 300,
            shadow: true,
            scale: 0.8,
            opacity: 0.15
        };
        createGalleryContents(container, options);
        const containers = document.getElementsByClassName('text-button-container');
        const text = Array.from(document.querySelectorAll('p'));
        const buttons = Array.from(document.querySelectorAll('button'));

        expect(text.length).toEqual(2);
        expect(buttons.length).toEqual(2);
        expect(containers.length).toEqual(4);
        expect(containers[0].innerHTML).toEqual(`<p style="word-wrap: break-word;">This is a caption with a button.</p><a href="https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/"><button>Click me!</button></a>`);
        expect(containers[0].style.display).toEqual('flex');
        expect(containers[1].innerHTML).toEqual(`<a href="https://www.pexels.com/photo/grayscale-photo-of-topless-woman-1164674/"><button>Solo button!</button></a>`);
        expect(containers[1].style.display).toEqual('flex');
        expect(containers[2].innerHTML).toEqual(`<p style="word-wrap: break-word;">This is a solo caption.</p>`);
        expect(containers[2].style.display).toEqual('flex');
        expect(containers[3].innerHTML).toEqual(``);
        expect(containers[3].style.display).toEqual('none');
    });
});