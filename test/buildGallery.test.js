import {
    buildGallery,
    applyMediaQueries
} from './accordion-gallery.js';

describe('Build the gallery with user options', () => {
    //Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query
        })),
    });

    document.body.innerHTML = '';
    document.body.innerHTML = '<div id="acc-container"></div>';
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
                image: 'images/4.jpg'
            },
            {
                image: 'images/5.jpg'
            },
            {
                image: 'images/6.jpg'
            },
            {
                image: 'images/7.jpg'
            }
        ],
        featuredImage: 3,
        featuredWidth: 2.8
    };
    buildGallery(options);
    const images = document.getElementsByClassName('vg-img');

    test('should be a function', () => {
        expect(buildGallery).toBeDefined();
    });

    test('should generate seven images', () => {
        expect(images.length).toEqual(7);
    });

    test('should add undefined options', () => {
        const expectedOptionsAfterCall = {
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
                    caption: 'This is a solo caption.'
                },
                {
                    image: 'images/4.jpg'
                },
                {
                    image: 'images/5.jpg'
                },
                {
                    image: 'images/6.jpg'
                },
                {
                    image: 'images/7.jpg'
                }
            ],
            featuredImage: 3,
            featuredWidth: 2.8,
            linksInNewTab: true,
            captionPosition: 'bottom',
            captionBkgColor: 'rgba(255,255,255,0.75)',
            media: {
                '320': [0, 1, 2, 3],
                '425': [0, 1, 2],
                '768': [5, 6]
            },
            galleryWidth: '100%',
            galleryHeight: '100vh',
            opacity: 0.25,
            shadow: true,
            speed: 300,
            radius: 0,
            scale: 1
        };
        expect(options).toEqual(expectedOptionsAfterCall);
    });

});

describe('Build the gallery with no user options', () => {
    //Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query
        })),
    });

    test('should build an empty gallery with one blank image', () => {
        document.body.innerHTML = '';
        document.body.innerHTML = '<div id="acc-container"></div>';
        buildGallery();
        const images = document.getElementsByClassName('vg-img');
        const captions = document.querySelectorAll('p');
        const buttons = document.querySelectorAll('button');
        const links = document.querySelectorAll('a');

        expect(images.length).toEqual(1);
        expect(images[0].style.backgroundImage).toEqual('url()');
        expect(captions[0].innerHTML).toEqual('');
        expect(buttons[0].innerHTML).toEqual('');
        expect(links[0].href).toEqual("http://localhost/");
    });
});

describe('media queries on window resize', () => {
    test('should fire media queries on window resize', () => {
        //Mock matchMedia
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query
            })),
        });

        document.body.innerHTML = '';
        document.body.innerHTML = '<div id="acc-container"></div>';
        const mediaOptions = {
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
                    image: 'images/4.jpg'
                },
                {
                    image: 'images/5.jpg'
                },
                {
                    image: 'images/6.jpg'
                },
                {
                    image: 'images/7.jpg'
                }
            ],
            media: {
                400: [0, 1, 2]
            }
        };
        buildGallery(mediaOptions);
        const images = Array.from(document.getElementsByClassName('vg-img'));

        //Should be 7 images with display flex on immediate load of full sized window.
        expect(images.length).toEqual(7);
        const imagesDisplay = images.map(image => image.style.display);
        expect(imagesDisplay).toEqual(['flex', 'flex', 'flex', 'flex', 'flex', 'flex', 'flex']);

        //Resize event fires.
        const resize = new Event('resize');
        if (window.dispatchEvent(resize)) {
            //Re-mock matchMedia to simulate new window size.
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: jest.fn().mockImplementation(query => ({
                    matches: query === `(max-width: 400px)` ? true : false,
                    media: query
                })),
            });
            applyMediaQueries(mediaOptions);
        };

        const imagesAfterResize = Array.from(document.getElementsByClassName('vg-img'));

        //Should be 7 images after resize, with the first 3 hidden with display none.
        expect(imagesAfterResize.length).toEqual(7);
        const imagesDisplayAfterResize = imagesAfterResize.map(image => image.style.display);
        expect(imagesDisplayAfterResize).toEqual(['none', 'none', 'none', 'flex', 'flex', 'flex', 'flex']);
    });
});