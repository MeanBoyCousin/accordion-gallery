import {
    vg
} from '../dist/vertical-gallery.js';

const options = {
    images: ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg', 'images/5.jpg', 'images/6.jpg', 'images/7.jpg'],
    captions: ['This is a caption with a button.', undefined, 'Solo Caption.'],
    buttons: ['Click me!', 'Solo Button!', undefined],
    buttonLinks: ['https://www.pexels.com/photo/grayscale-photography-of-woman-1572878/', 'https://www.pexels.com/photo/grayscale-photo-of-topless-woman-1164674/'],
    featuredImage: 1,
    featuredWidth: 3
};

vg(options);

const imageObject = {
    image: '',
    buttonText: '',
    buttonLink: ''
}

console.log(imageObject.caption)