import {
    createText
} from './vertical-gallery.js';

describe('Creates a text element from the caption', () => {
    let options = {
        images: [{
            image: 'images/1.jpg',
            caption: 'This is a caption with a button.',
            buttonText: 'Click me!',
            buttonLink: 'https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/'
        }]
    };
    let index = options.images.length - 1;
    document.body.appendChild(createText(options, index));
    const textEl = document.querySelectorAll('p');


    test('should be a function', () => {
        expect(createText).toBeDefined();
    });

    test('should create a matching HTML element', () => {
        expect(textEl[0].innerHTML).toEqual("This is a caption with a button.");
        expect(textEl[0].outerHTML).toEqual("<p style=\"word-wrap: break-word;\">This is a caption with a button.</p>");
    });

    test('should apply correct styles to HTML element', () => {
        expect(textEl[0].style.wordWrap).toEqual("break-word");
        expect(textEl[0].style.wordWrap).not.toEqual("normal");
    });
});