let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: 'deg',
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: 'px',
    },
    grayScale: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%',
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%',
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: '%',
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%',
    },
}

const filtersContainer = document.querySelector(".filters");
const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");

let file = null;
let image = null;

function createFilterElement(name, unit = "%", value, min, max){
    const div = document.createElement("div");
    div.classList.add("filter"); 

    const p = document.createElement("p");
    p.textContent = name;

    const input = document.createElement("input");
    // input.setAttribute("type", "range"); // ese bhi kr skte hain.
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    div.appendChild(p);
    div.appendChild(input);

    // Isse i can control those filters 
    // name here is referred to as key 
    input.addEventListener("input", (evt) => {
        // console.log(input.value);  
        // console.log(name);
        // console.log(filters[name]);
        filters[name].value = input.value; 
        applyFilter()
        // console.log(name, filters[name]);

    })

    return div;
}

function createFilters(){
    Object.keys(filters).forEach(key => {
    const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
    filtersContainer.appendChild(filterElement);
    })
}

createFilters();


// Jab bhi aap ek image select kroge to inpu:file ki value change hogi -> isiliye hmne change event lgaya 
imgInput.addEventListener("change", (evt) => {
    file = evt.target.files[0];
    const imagePlaceholder = document.querySelector(".placeholder");

    imageCanvas.style.display = "block";
    imagePlaceholder.style.display = "none";

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        imageCanvas.height = img.height;
        imageCanvas.width = img.width;
        canvasCtx.drawImage(img,0,0);
    }
})

function applyFilter(){

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);


    canvasCtx.filter = `brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayScale.value}${filters.grayScale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})`.trim();
    canvasCtx.drawImage(image,0,0);
}

resetBtn.addEventListener("click", () => {
    filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: 'deg',
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: 'px',
    },
    grayScale: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%',
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%',
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: '%',
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%',
    },
    }
    applyFilter();

    filtersContainer.innerHTML = "";
    createFilters();
});

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
});

const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    drama: {
        brightness: 105,
        contrast: 150,
        saturation: 130,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0,
    },

    vintage: {
        brightness: 95,
        contrast: 90,
        saturation: 70,
        hueRotation: 15,
        blur: 1,
        grayScale: 0,
        sepia: 40,
        opacity: 100,
        invert: 0,
    },

    oldSchool: {
        brightness: 90,
        contrast: 110,
        saturation: 60,
        hueRotation: 0,
        blur: 1,
        grayScale: 25,
        sepia: 50,
        opacity: 100,
        invert: 0,
    },

    cinematic: {
        brightness: 95,
        contrast: 130,
        saturation: 110,
        hueRotation: 5,
        blur: 0,
        grayScale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0,
    },

    moody: {
        brightness: 80,
        contrast: 140,
        saturation: 65,
        hueRotation: 10,
        blur: 0,
        grayScale: 10,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },

    blackWhite: {
        brightness: 100,
        contrast: 120,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayScale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    warm: {
        brightness: 105,
        contrast: 105,
        saturation: 120,
        hueRotation: 20,
        blur: 0,
        grayScale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0,
    },

    cool: {
        brightness: 95,
        contrast: 110,
        saturation: 90,
        hueRotation: 200,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    faded: {
        brightness: 110,
        contrast: 80,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        grayScale: 10,
        sepia: 20,
        opacity: 90,
        invert: 0,
    },

    vibrant: {
        brightness: 105,
        contrast: 120,
        saturation: 160,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    dreamy: {
        brightness: 115,
        contrast: 90,
        saturation: 110,
        hueRotation: 0,
        blur: 3,
        grayScale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },

    lomo: {
        brightness: 100,
        contrast: 130,
        saturation: 150,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },

    retro: {
        brightness: 95,
        contrast: 100,
        saturation: 80,
        hueRotation: 340,
        blur: 1,
        grayScale: 15,
        sepia: 30,
        opacity: 100,
        invert: 0,
    },

    noir: {
        brightness: 90,
        contrast: 170,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayScale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    neon: {
        brightness: 110,
        contrast: 150,
        saturation: 180,
        hueRotation: 280,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    soft: {
        brightness: 110,
        contrast: 90,
        saturation: 95,
        hueRotation: 0,
        blur: 2,
        grayScale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0,
    },

    spooky: {
        brightness: 75,
        contrast: 160,
        saturation: 40,
        hueRotation: 120,
        blur: 0,
        grayScale: 20,
        sepia: 0,
        opacity: 100,
        invert: 0,
    }
};

Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button");
    presetButton.classList.add("btn");
    presetButton.textContent = presetName;
    presetsContainer.appendChild(presetButton);

    presetButton.addEventListener("click", () => {
        const preset = presets[presetName];
        // console.log(preset);   
        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName];
        })

        applyFilter();
        filtersContainer.innerHTML = "";
        createFilters()
        
    })
})