import {
    createButton
} from './vertical-gallery.js';

describe('Creation of link a element and button element that opens in new tab', () => {
    const options = {
        images: [{
            image: 'images/1.jpg',
            caption: 'This is a caption with a button.',
            buttonText: 'Click me!',
            buttonLink: 'https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/'
        }],
        linksInNewTab: true
    };
    const index = options.images.length - 1;
    document.body.appendChild(createButton(options, index));
    const link = document.querySelectorAll('a');
    const button = document.querySelectorAll('button');

    test('should be a function', () => {
        expect(createButton).toBeDefined();
    });

    test('should return a matching HTML element', () => {
        expect(link[0].outerHTML).toEqual("<a href=\"https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/\" target=\"_blank\"><button>Click me!</button></a>");
    });

    test('should apply a URL to the button element', () => {
        expect(link[0].href).toEqual("https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/");
    });

    test('should set link to open in new tab', () => {
        expect(link[0].target).toEqual("_blank");
    });

    test('should set the button text to the buttonText value', () => {
        expect(button[0].innerHTML).toEqual("Click me!");
    });
});

describe('Creation of link a element and button element that opens in same tab', () => {
    const noNewTabOptions = {
        images: [{
            image: 'images/1.jpg',
            caption: 'This is a caption with a button.',
            buttonText: 'Click me!',
            buttonLink: 'https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/'
        }],
        linksInNewTab: false
    };
    const noNewTabIndex = noNewTabOptions.images.length - 1;
    document.body.innerHTML = '';
    document.body.appendChild(createButton(noNewTabOptions, noNewTabIndex));
    const link = document.querySelectorAll('a');
    const button = document.querySelectorAll('button');

    test('should set link to open in new tab', () => {
        expect(link[0].target).toEqual("");
        expect(link[0].target).not.toEqual("_blank");
    });
});