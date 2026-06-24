let filters = {
    Brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Hue: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    Grayscale: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
    Opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
}

const filtersContainer = document.querySelector(".filters");

const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetbtn = document.querySelector("#reset-btn");
const downloadbtn = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");

let file = null;
let image = null;

function createFilterElement(name, unit ="%", value, min, max){

    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    p.innerText = name;


    div.appendChild(p)
    div.appendChild(input)



    input.addEventListener("input", (e) => {
        filters[name].value = input.value;
        applyFilters()
    })

    return div;
}

function createFilters() {
    Object.keys(filters).forEach(key => {


    const filterElement = createFilterElement(
        key,
        filters[key].unit,
        filters[key].value,
        filters[key].min,
        filters[key].max,
    )

    filtersContainer.appendChild(filterElement);
})
}

createFilters();

imageInput.addEventListener("change", (event) => {

    const file = event.target.files[0];
    const imgplace = document.querySelector(".placeholder");
    imgplace.style.display = "none";
    imageCanvas.style.display = "flex";

    const Img = new Image();
    Img.src = URL.createObjectURL(file);

    Img.onload = () => {

        image = Img;
        imageCanvas.width = Img.width
        imageCanvas.height = Img.height
        canvasCtx.drawImage(Img, 0, 0)
    }

})

function applyFilters () {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)

    canvasCtx.filter = `brightness(${filters.Brightness.value}${filters.Brightness.unit}) contrast(${filters.Contrast.value}${filters.Contrast.unit}) saturate(${filters.Saturation.value}${filters.Saturation.unit}) hue-rotate(${filters.Hue.value}${filters.Hue.unit}) grayscale(${filters.Grayscale.value}${filters.Grayscale.unit}) opacity(${filters.Opacity.value}${filters.Opacity.unit}) `

    canvasCtx.drawImage(image, 0 ,0)
}

resetbtn.addEventListener("click", () => {
    filters = {
    Brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Hue: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    Grayscale: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
    Opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
}
    applyFilters();
    
    filtersContainer.innerHTML = "";
    createFilters();
});

downloadbtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "Edited-Image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
})

const presets = {
    Dreamy: {
        Brightness: 120,
        Contrast: 80,
        Saturation: 130,
        Hue: 15,
        Grayscale: 5,
        Opacity: 100
    },
    Cinematic: {
        Brightness: 95,
        Contrast: 135,
        Saturation: 120,
        Hue: 10,
        Grayscale: 0,
        Opacity: 100
    },

    CoolBlue: {
        Brightness: 105,
        Contrast: 110,
        Saturation: 120,
        Hue: 200,
        Grayscale: 0,
        Opacity: 100
    },

    WarmSunset: {
        Brightness: 115,
        Contrast: 105,
        Saturation: 140,
        Hue: 30,
        Grayscale: 0,
        Opacity: 100
    },

    RetroFilm: {
        Brightness: 105,
        Contrast: 95,
        Saturation: 75,
        Hue: 40,
        Grayscale: 10,
        Opacity: 100
    },
};

Object.keys(presets).forEach(presetName => {
    const presetbtn = document.createElement("button");
    presetbtn.classList.add("btn");
    presetbtn.innerHTML = presetName;
    presetsContainer.appendChild(presetbtn);

    presetbtn.addEventListener("click", () => {
        const preset = presets[presetName];

        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName]
            applyFilters();

            filtersContainer.innerHTML = "";
            createFilters();
        })
    })
})

