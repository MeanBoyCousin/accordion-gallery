const setContainerStyles = (container, options) => {
    // Style container.
    container.style.width = options.galleryWidth;
    container.style.height = options.galleryHeight;
    container.style.display = 'flex';

    // Hover rules for container.
    container.onmouseenter = () => {
        let images = Array.from(document.getElementsByClassName('vg-img'));
        images.forEach(image => {
            image.style.opacity = options.opacity;
            image.style.transform = `scale(${options.scale})`;
            image.style.borderRadius = options.radius;
            image.style.flex = 1;
        });
    };
    container.onmouseleave = () => {
        let images = Array.from(document.getElementsByClassName('vg-img'));
        let textContainer = Array.from(document.getElementsByClassName('text-button-container'));
        images.forEach(image => {
            image.style.opacity = 1;
            image.style.transform = 'scale(1)';
            image.style.borderRadius = '0px';
        });
        if (options.featuredImage !== undefined) {
            images[options.featuredImage].style.flex = options.featuredWidth;
            textContainer[options.featuredImage].style.opacity = 1;
        };
    };
};

const createGalleryContents = (container, images, options) => {
    images.forEach((image, i) => {
        // Create div.
        const div = document.createElement('div');
        // Style div.
        div.classList.add('vg-img');
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        if (options.captionPosition === 'top') {
            div.style.alignItems = 'flex-start';
        } else if (options.captionPosition === 'middle') {
            div.style.alignItems = 'center';
        } else {
            div.style.alignItems = 'flex-end';
        }
        div.style.backgroundImage = `url('${image}')`;
        div.style.backgroundPosition = 'center';
        div.style.backgroundSize = 'auto 100%';
        div.style.backgroundRepeat = 'no-repeat';
        div.style.overflow = 'hidden';
        if (options.featuredImage === i) {
            div.style.flex = options.featuredWidth;
        } else {
            div.style.flex = 1;
        }
        div.style.transition = `${options.speed}ms cubic-bezier(.25, .8, .25, 1)`;
        // Hover rules for div.
        div.onmouseenter = () => {
            let textContainer = Array.from(document.getElementsByClassName('text-button-container'));
            setTimeout(() => {
                textContainer.forEach(container => {
                    container.style.opacity = 0;
                });
                div.style.opacity = 1;
                div.style.transform = 'scale(1)';
                if (textContainer[i] !== undefined) {
                    textContainer[i].style.opacity = 1;
                }
                div.style.flex = options.featuredWidth;
            }, 0);
            if (options.shadow === true) {
                div.style.boxShadow = '0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.44)';
            }
        };
        div.onmouseleave = () => {
            let textContainer = Array.from(document.getElementsByClassName('text-button-container'));
            div.style.boxShadow = 'none';
            div.style.flex = 1;
            div.style.opacity = options.opacity;
            if (textContainer[i] !== undefined) {
                textContainer[i].style.opacity = 0;
            };
        };
        // Create text and button.
        const tBCont = document.createElement('div');
        tBCont.classList.add('text-button-container');
        tBCont.style.display = 'flex';
        tBCont.style.flexDirection = 'column';
        tBCont.style.alignItems = 'center';
        tBCont.style.maxWidth = '80%';
        tBCont.style.backgroundColor = options.captionBkgColor;
        tBCont.style.margin = '5%';
        tBCont.style.padding = '5%';
        tBCont.style.borderRadius = options.radius;
        if (options.featuredImage === i) {
            tBCont.style.opacity = 1;
        } else {
            tBCont.style.opacity = 0;
        }
        tBCont.style.transition = `${options.speed}ms cubic-bezier(.25, .8, .25, 1)`;
        const text = document.createElement('p');
        text.style.wordWrap = 'break-word';
        text.innerHTML = options.captions[i];
        const link = document.createElement('a');
        if (options.linksInNewTab === true) {
            link.target = '_blank';
            link.href = options.buttonLinks[i];
        } else {
            link.href = options.buttonLinks[i];
        }
        const button = document.createElement('button');
        button.innerHTML = options.buttons[i];
        link.appendChild(button);

        if (typeof options.captions[i] === 'string') {
            tBCont.appendChild(text);
        }
        if (typeof options.buttons[i] === 'string') {
            tBCont.appendChild(link);
        }

        if (options.captions[i] === undefined && options.buttons[i] === undefined) {
            tBCont.style.display = 'none';
        }
        div.appendChild(tBCont);



        container.appendChild(div);
    });
};

const undefinedUserOptions = (defaultOptions, userOptions) => {
    Object.keys(defaultOptions).forEach(option => {
        if (userOptions[option] === undefined) {
            userOptions[option] = defaultOptions[option];
        }
    });
};

const mediaQueries = (options) => {
    let trueQueries = [];
    Object.keys(options.media).forEach(query => {
        if (window.matchMedia(`(max-width: ${query}px)`).matches) {
            trueQueries.push(query);
        }
    });
    let smallestQuery = Math.min(...trueQueries);
    let toRemove = options.media[smallestQuery];
    let images = Array.from(document.getElementsByClassName('vg-img'));
    images.forEach((image, i) => {
        if (toRemove === undefined) {
            image.style.display = 'flex';
        } else {
            if (toRemove.includes(i)) {
                image.style.display = 'none';
            } else {
                image.style.display = 'flex';
            }
        }
    });
};

const verticalGallery = (options) => {

    const defaultOptions = {
        images: [],
        captions: [],
        buttons: [],
        buttonLinks: [],
        linksInNewTab: true,
        captionPosition: 'bottom',
        captionBkgColor: 'rgba(255,255,255,0.75)',
        featuredImage: undefined,
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
        featuredWidth: 5,
        radius: 0,
        scale: 1
    };

    if (options === undefined) {
        options = defaultOptions;
    };

    undefinedUserOptions(defaultOptions, options);

    const container = document.getElementById('vg-container');

    setContainerStyles(container, options);
    createGalleryContents(container, options.images, options);

    mediaQueries(options);

    window.onresize = () => {
        mediaQueries(options);
    };
};

export {
    verticalGallery as vg
};