const containerMouseEnter = options => {
    let images = Array.from(document.getElementsByClassName('vg-img'));
    let textContainers = Array.from(document.getElementsByClassName('text-button-container'));
    textContainers.forEach(container => {
        container.style.opacity = 0;
    });
    images.forEach(image => {
        Object.assign(image.style, {
            opacity: options.opacity,
            transform: `scale(${options.scale})`,
            borderRadius: options.radius,
            flex: 1
        })
    });
};

const containerMouseLeave = options => {
    let images = Array.from(document.getElementsByClassName('vg-img'));
    let textContainers = Array.from(document.getElementsByClassName('text-button-container'));
    images.forEach(image => {
        Object.assign(image.style, {
            opacity: 1,
            transform: 'scale(1)',
            borderRadius: 0
        })
    });
    if (options.featuredImage !== undefined && options.featuredImage < options.images.length) {
        images[options.featuredImage].style.flex = options.featuredWidth;
        textContainers[options.featuredImage].style.opacity = 1;
    };
};

const setContainerStylesEvents = (container, options) => {
    // Style container.
    Object.assign(container.style, {
        width: options.galleryWidth,
        height: options.galleryHeight,
        display: 'flex',
        userSelect: 'none',
        webkitUserSelect: 'none'
    });
    // Hover rules for container.
    'mouseenter touchstart'.split(' ').forEach(event => container.addEventListener(event, function () {
        containerMouseEnter(options)
    }));
    'mouseleave touchmove'.split(' ').forEach(event => container.addEventListener(event, function () {
        containerMouseLeave(options)
    }));
};

const imageMouseEnter = (div, options, i) => {
    let textContainers = Array.from(document.getElementsByClassName('text-button-container'));
    setTimeout(() => {
        textContainers[i].style.opacity = 1;
        Object.assign(div.style, {
            opacity: 1,
            transform: 'scale(1)',
            flex: options.featuredWidth
        });
    }, 0);
    if (options.shadow === true) div.style.boxShadow = '0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.44)';
};

const imageMouseLeave = (div, options, i) => {
    let textContainers = Array.from(document.getElementsByClassName('text-button-container'));
    textContainers[i].style.opacity = 0;
    Object.assign(div.style, {
        opacity: options.opacity,
        transform: `scale(${options.scale})`,
        flex: 1,
        boxShadow: 'none'
    });
};

const createCaptionContainer = (options, i) => {
    const tBCont = document.createElement('div');
    tBCont.classList.add('text-button-container');
    Object.assign(tBCont.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '80%',
        backgroundColor: options.captionBkgColor,
        margin: '5%',
        padding: '5%',
        borderRadius: options.radius,
        opacity: (options.featuredImage === i) ?
            1 : 0,
        transition: `${options.speed}ms cubic-bezier(.25, .8, .25, 1)`
    });
    return tBCont;
};

const createText = (options, i) => {
    const text = document.createElement('p');
    text.style.wordWrap = 'break-word';
    text.innerHTML = options.images[i].caption;
    return text;
};

const createButton = (options, i) => {
    const link = document.createElement('a');
    link.href = options.images[i].buttonLink;
    if (options.linksInNewTab === true) link.target = '_blank';
    const button = document.createElement('button');
    button.innerHTML = options.images[i].buttonText;
    link.appendChild(button);
    return link;
};

const createGalleryContents = (container, options) => {
    options.images.forEach((image, i) => {
        // Create and style div.
        const div = document.createElement('div');
        div.classList.add('vg-img');
        Object.assign(div.style, {
            display: 'flex',
            justifyContent: 'center',
            alignItems: (options.captionPosition === 'top') ?
                'flex-start' : (options.captionPosition === 'middle') ?
                'center' : 'flex-end',
            backgroundImage: `url('${image.image}')`,
            backgroundPosition: 'center',
            backgroundSize: 'auto 100%',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            flex: (options.featuredImage === i) ?
                options.featuredWidth : 1,
            transition: `${options.speed}ms cubic-bezier(.25, .8, .25, 1)`
        });
        // Hover rules for div.
        'mouseenter touchstart'.split(' ').forEach(event => div.addEventListener(event, function () {
            imageMouseEnter(div, options, i)
        }));
        'mouseleave touchmove'.split(' ').forEach(event => div.addEventListener(event, function () {
            imageMouseLeave(div, options, i)
        }));
        // Create text and button.
        const textButtonContainer = createCaptionContainer(options, i);
        const caption = createText(options, i);
        const button = createButton(options, i);
        // Append children if content is provided.
        if (typeof options.images[i].caption === 'string') textButtonContainer.appendChild(caption);
        if (typeof options.images[i].buttonText === 'string') textButtonContainer.appendChild(button);
        if (options.images[i].caption === undefined && options.images[i].buttonText === undefined) textButtonContainer.style.display = 'none';
        // Append text container to div.
        div.appendChild(textButtonContainer);
        // Append div to gallery container.
        container.appendChild(div);
    });
};

const undefinedUserOptions = (defaultOptions, userOptions) => {
    Object.keys(defaultOptions).forEach(option => {
        if (userOptions[option] === undefined) userOptions[option] = defaultOptions[option];
    });
};

const applyMediaQueries = options => {
    let toRemove = options.media[Math.min(...Object.keys(options.media).filter(query => window.matchMedia(`(max-width: ${query}px)`).matches))];
    let images = Array.from(document.getElementsByClassName('vg-img'));
    images.forEach((image, i) => {
        image.style.display = toRemove === undefined ?
            'flex' : toRemove.includes(i) ?
            'none' : 'flex';
    });
};

const buildGallery = options => {
    const container = document.getElementById('vg-container');
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
    options = options || defaultOptions;
    undefinedUserOptions(defaultOptions, options);
    setContainerStylesEvents(container, options);
    createGalleryContents(container, options);
    applyMediaQueries(options);
    window.onresize = () => {
        applyMediaQueries(options);
    };
};

export {buildGallery};