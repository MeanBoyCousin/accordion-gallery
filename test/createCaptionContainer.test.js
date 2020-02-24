import {
    createCaptionContainer
} from './vertical-gallery.js';

describe('creation of text and button container with a featured image', () => {
    const options = {
        images: [{
            image: 'images/1.jpg',
            caption: 'This is a caption with a button.',
            buttonText: 'Click me!',
            buttonLink: 'https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/'
        }],
        captionBkgColor: 'rgba(255,255,255,0.75)',
        featuredImage: 0,
        speed: 300,
        radius: '10px'
    };
    const index = options.images.length - 1;
    document.body.appendChild(createCaptionContainer(options, index));
    const div = document.getElementsByClassName('text-button-container');

    test('should be a function', () => {
        expect(createCaptionContainer).toBeDefined();
    });

    test('should return a matching html element', () => {
        expect(div[0].outerHTML).toEqual("<div class=\"text-button-container\" style=\"display: flex; flex-direction: column; align-items: center; max-width: 80%; background-color: rgba(255, 255, 255, 0.75); margin: 5%; padding: 5%; border-radius: 10px; opacity: 1; transition: 300ms cubic-bezier(.25, .8, .25, 1);\"></div>");
    });

    test('should apply correct styles to created container div', () => {
        expect(div[0].style.display).toEqual('flex');
        expect(div[0].style.flexDirection).toEqual('column');
        expect(div[0].style.alignItems).toEqual('center');
        expect(div[0].style.maxWidth).toEqual('80%');
        expect(div[0].style.backgroundColor).toEqual('rgba(255, 255, 255, 0.75)');
        expect(div[0].style.margin).toEqual('5%');
        expect(div[0].style.padding).toEqual('5%');
        expect(div[0].style.borderRadius).toEqual('10px');
        expect(div[0].style.transition).toEqual('300ms cubic-bezier(.25, .8, .25, 1)');
    });

    test('should set the opacity to 1 if the parent image is the featured image', () => {
        expect(div[0].style.opacity).toEqual("1");
    });
});

describe('creation of text and button container without featured image', () => {

    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('should set the opacity to 0 if the parent image is not the featured image', () => {
        const noFeatureOptions = {
            images: [{
                image: 'images/1.jpg',
                caption: 'This is a caption with a button.',
                buttonText: 'Click me!',
                buttonLink: 'https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/'
            }],
            captionBkgColor: 'rgba(255,255,255,0.75)',
            featuredImage: undefined,
            speed: 300,
            radius: '10px'
        };

        const index = noFeatureOptions.images.length - 1;

        document.body.appendChild(createCaptionContainer(noFeatureOptions, index));

        const div = document.getElementsByClassName('text-button-container');
        expect(div[0].style.opacity).toEqual("0");
    });
});