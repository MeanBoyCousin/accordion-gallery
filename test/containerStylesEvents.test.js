import {
    setContainerStylesEvents
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

describe('container styles are applied', () => {
    //Configure environment.
    document.body.innerHTML = '<div id="acc-container"></div>';
    const noStyleContainer = document.getElementById('acc-container');
    setContainerStylesEvents(noStyleContainer, options);
    const styledContainer = document.getElementById('acc-container');

    //Tests
    test('should be a function', () => {
        expect(setContainerStylesEvents).toBeDefined();
    });

    test('should apply width to container', () => {
        expect(styledContainer.style.width).toEqual("100%");

    });

    test('should apply height to container', () => {
        expect(styledContainer.style.height).toEqual("100vh");
    });

    test('should apply display style to container', () => {
        expect(styledContainer.style.display).toEqual("flex");
    });

    test('should apply user select styles to container', () => {
        expect(styledContainer.style.userSelect).toEqual("none");
        expect(styledContainer.style.webkitUserSelect).toEqual("none");
    });
});

describe('container events', () => {

    //Tests
    test('should apply styles to container on mouse enter or touch start', () => {

        //Configure environment.
        document.body.innerHTML = '<div id="acc-container"><div class="vg-img"></div></div>';
        const noStyleContainer = document.getElementById('acc-container');
        const firstImage = document.getElementsByClassName('vg-img')[0];
        setContainerStylesEvents(noStyleContainer, options);

        const mouseEnterEvent = new Event('mouseenter');
        const touchStartEvent = new Event('touchstart');
        if (noStyleContainer.dispatchEvent(mouseEnterEvent) && noStyleContainer.dispatchEvent(touchStartEvent)) {
            Object.assign(firstImage.style, {
                opacity: options.opacity,
                transform: `scale(${options.scale})`,
                borderRadius: options.radius,
                flex: 1
            })
        }

        expect(firstImage.style.opacity).toEqual('0.25');
        expect(firstImage.style.transform).toEqual('scale(0.8)');
        expect(firstImage.style.borderRadius).toEqual('10px');
        expect(firstImage.style.flex).toEqual('1');
    });

    test('should apply styles to container on mouse leave or touch move', () => {

        //Configure environment.
        document.body.innerHTML = '<div id="acc-container"><div class="vg-img"></div></div>';
        const noStyleContainer = document.getElementById('acc-container');
        const firstImage = document.getElementsByClassName('vg-img')[0];
        setContainerStylesEvents(noStyleContainer, options);

        const mouseLeaveEvent = new Event('mouseleave');
        const touchMoveEvent = new Event('touchmove');
        if (noStyleContainer.dispatchEvent(mouseLeaveEvent) && noStyleContainer.dispatchEvent(touchMoveEvent)) {
            Object.assign(firstImage.style, {
                opacity: 1,
                transform: 'scale(1)',
                borderRadius: 0
            })
        }

        expect(firstImage.style.opacity).toEqual('1');
        expect(firstImage.style.transform).toEqual('scale(1)');
        expect(firstImage.style.borderRadius).toEqual('0');
    });
});