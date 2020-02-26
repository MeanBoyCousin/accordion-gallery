import {
    applyMediaQueries
} from './accordion-gallery.js';

//Configure environment.
document.body.innerHTML = `<div class="vg-img" style="display: flex;"></div>
                            <div class="vg-img" style="display: flex;"></div>
                            <div class="vg-img" style="display: flex;"></div>`;
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
    media: {
        320: [0, 1],
        425: [0],
    }
};

test('should only remove image 0 on displays under 425px wide', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: query === `(max-width: 425px)` ? true : false,
            media: query
        })),
    });
    applyMediaQueries(options);
    const images = Array.from(document.getElementsByClassName('vg-img'));
    expect(images[0].style.display).toEqual('none');
    expect(images[1].style.display).toEqual('flex');
    expect(images[2].style.display).toEqual('flex');
});

test('should only remove image 0 and 1 on displays under 320px wide', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: query === `(max-width: 320px)` ? true : false,
            media: query
        })),
    });
    applyMediaQueries(options);
    const images = Array.from(document.getElementsByClassName('vg-img'));
    expect(images[0].style.display).toEqual('none');
    expect(images[1].style.display).toEqual('none');
    expect(images[2].style.display).toEqual('flex');
});

test('should remove no images if no media queries match', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query
        })),
    });
    applyMediaQueries(options);
    const images = Array.from(document.getElementsByClassName('vg-img'));
    expect(images[0].style.display).toEqual('flex');
    expect(images[1].style.display).toEqual('flex');
    expect(images[2].style.display).toEqual('flex');
});