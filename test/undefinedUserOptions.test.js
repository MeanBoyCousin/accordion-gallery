import {
    undefinedUserOptions
} from './accordion-gallery.js';

const defaultOptions = {
    images: [{
        image: '',
        caption: '',
        buttonText: '',
        buttonLink: ''
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
    radius: 0,
    scale: 1
};

describe("Don't replace any user options if they are defined", () => {
    const definedUserOptions = {
        images: [{
            image: 'images/1.jpg',
            caption: 'This is a caption with a button.',
            buttonText: 'Click me!',
            buttonLink: 'https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/'
        }],
        linksInNewTab: false,
        captionPosition: 'top',
        captionBkgColor: '#000',
        featuredImage: 0,
        featuredWidth: 3,
        media: {
            300: [0, 1],
            400: [0, 1, 2],
            600: [1, 2, 3]
        },
        galleryWidth: '1000px',
        galleryHeight: '500px',
        opacity: 0.15,
        shadow: false,
        speed: 1000,
        radius: '5%',
        scale: 0.8
    };
    undefinedUserOptions(defaultOptions, definedUserOptions);

    test('should not replace the options that have been defined by the user', () => {
        expect(definedUserOptions.images).toEqual([{
            image: 'images/1.jpg',
            caption: 'This is a caption with a button.',
            buttonText: 'Click me!',
            buttonLink: 'https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/'
        }]);
        expect(definedUserOptions.linksInNewTab).toEqual(false);
        expect(definedUserOptions.captionPosition).toEqual("top");
        expect(definedUserOptions.captionBkgColor).toEqual("#000");
        expect(definedUserOptions.featuredImage).toEqual(0);
        expect(definedUserOptions.featuredWidth).toEqual(3);
        expect(definedUserOptions.media).toEqual({
            300: [0, 1],
            400: [0, 1, 2],
            600: [1, 2, 3]
        });
        expect(definedUserOptions.galleryWidth).toEqual("1000px");
        expect(definedUserOptions.galleryHeight).toEqual("500px");
        expect(definedUserOptions.opacity).toEqual(0.15);
        expect(definedUserOptions.shadow).toEqual(false);
        expect(definedUserOptions.speed).toEqual(1000);
        expect(definedUserOptions.radius).toEqual("5%");
        expect(definedUserOptions.scale).toEqual(0.8);
    });
});

describe("Don't replace any user options if they are defined", () => {
    const emptyUserOptions = {};
    undefinedUserOptions(defaultOptions, emptyUserOptions);

    test('should replace the options that have not been defined by the user with defaults', () => {
        expect(emptyUserOptions.images).toEqual([{
            image: '',
            caption: '',
            buttonText: '',
            buttonLink: ''
        }]);
        expect(emptyUserOptions.linksInNewTab).toEqual(true);
        expect(emptyUserOptions.captionPosition).toEqual("bottom");
        expect(emptyUserOptions.captionBkgColor).toEqual("rgba(255,255,255,0.75)");
        expect(emptyUserOptions.featuredImage).toEqual(undefined);
        expect(emptyUserOptions.featuredWidth).toEqual(5);
        expect(emptyUserOptions.media).toEqual({
            320: [0, 1, 2, 3],
            425: [0, 1, 2],
            768: [5, 6]
        });
        expect(emptyUserOptions.galleryWidth).toEqual("100%");
        expect(emptyUserOptions.galleryHeight).toEqual("100vh");
        expect(emptyUserOptions.opacity).toEqual(0.25);
        expect(emptyUserOptions.shadow).toEqual(true);
        expect(emptyUserOptions.speed).toEqual(300);
        expect(emptyUserOptions.radius).toEqual(0);
        expect(emptyUserOptions.scale).toEqual(1);
    });
});