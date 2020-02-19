import {
    buildGallery
} from '../dist/vertical-gallery.js';

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
    featuredImage: 1,
    featuredWidth: 3
};

buildGallery(options);