const category = ['Omelet ', 'Toast', 'Burger'];
const material = {
    'Bacon': 35,
    'Ham': 30,
    'Pork': 40,
    'PorkChop': 45,
    'Chicken': 40,
    'HashBrownCheese': 50,
    'LemonChicken': 50,
    'SmokedChicken': 55,
    'KaraChicken': 60,
    'FriedFish': 60
};
const drink = {
    'Juice': 25,
    'BlackTea': 25,
    'SoyMilk': 25,
    'MilkTea': 35
};

class Breakfast {
    constructor(categoryName, materialPrice, drinkPrice) {
        this.categoryName = categoryName;
        this.materialPrice = materialPrice;
        this.drinkPrice = drinkPrice;
        if (categoryName === 'Burger') {
            this.materialPrice += 5
        }
    }
    total() {
        return this.materialPrice + this.drinkPrice;
    }
}

let materialLength, DrinkLength, randomCategoryNum, randomMaterialNum, randomDrinkNum;
let boxArray = [];
let i, hasChild = false, oldLayer = 0;

function layerCount(layer, order) {
    switch (order.categoryName) {
        case 'Toast':
        case 'Burger':
            layer += 3
            break;
        case 'Omelet ':
            layer = 2;
            break;
        default:
            layer = 1;
    }
    console.log('layer:' + layer);
    return layer;
}

function breakFastGenerator(layer, order, boxArray) {
    for (i = 0; i < layer; i++) {
        if (i === (layer - 1) || i === 0 && layer != 2) {
            boxArray[i].style.backgroundSize = '95% 100%';
            //Burger
            if (order.categoryName === 'Burger') {
                //Burger-top-image
                boxArray[i].style.backgroundImage = 'url("./public/images/Burger-top.png")';
                //Burger-bottom-image
                if (i === (layer - 1)) {
                    boxArray[i].style.backgroundImage = 'url("./public/images/Burger-bottom.png")';
                }
            }
            //Toast-image
            else if (order.categoryName === 'Toast') {
                boxArray[i].style.backgroundImage = 'url("./public/images/Toast.png")';
            }
            //Omelet -image
            else {
                boxArray[i].style.backgroundImage = 'url("./public/images/eggRoll.png")';
            }
        }
        else {
            boxArray[i].style.backgroundImage =
                `url(./public/images/${Object.keys(material)[randomMaterialNum]}.png)`;
            boxArray[i].style.backgroundSize = '75% 90%';
            if (Object.keys(material)[randomMaterialNum] === 'friedFish'
            ) {
                console.log(Object.keys(material)[randomMaterialNum]);
                boxArray[i].style.backgroundImage = `url(./public/images/friedFish.png)`;
                boxArray[i].style.backgroundSize = '65% 55%';
            }
            //fiedFish-image-fix  
            if (i === layer - 2 && layer % 2 === 0 && layer != 2) {
                boxArray[i].style.backgroundImage = 'url("./public/images/egg.png")';
            }
            //plus egg
        }
    }
}

function randomColor() {
    const r = Math.random() * 256;
    const g = Math.random() * 256;
    const b = Math.random() * 256;
    const detail = document.querySelector('.detail')
    detail.style.color = `rgb(${r}, ${g}, ${b})`;
}

//button click
const btn = document.querySelector('.click');
btn.addEventListener('click', generate);

function generate() {
    let layer = 0, perHeight = 0, foodName;
    const main = document.querySelector('.main');

    materialLength = Object.keys(material).length; //10
    DrinkLength = Object.keys(drink).length; //4
    randomCategoryNum = Math.floor(Math.random() * category.length); //0~2
    randomMaterialNum = Math.floor(Math.random() * materialLength); //0~9
    randomDrinkNum = Math.floor(Math.random() * DrinkLength); //0~3

    const order = new Breakfast(category[randomCategoryNum], material[Object.keys(material)[randomMaterialNum]], drink[Object.keys(drink)[randomDrinkNum]]);

    ///plus egg
    if (Math.floor(Math.random() * 2) === 1 && order.categoryName !== 'Omelet ') {
        layer += 1;
        order.materialPrice += 5;
        order.hasEgg = true;
    }

    layer = layerCount(layer, order);
    perHeight = 500 / layer;

    //remove div
    if (hasChild == true) {
        for (i = 0; i < oldLayer; i++) {
            main.removeChild(boxArray[i]);
        }
    }
    oldLayer = layer;

    //add div
    for (i = 0; i < layer; i++) {
        boxArray[i] = document.createElement("div");
        boxArray[i].style.height = `${perHeight}px`;
        boxArray[i].style.backgroundRepeat = 'no-repeat';
        boxArray[i].style.backgroundPosition = 'center';
        main.appendChild(boxArray[i]);
        hasChild = true;
    }

    breakFastGenerator(layer, order, boxArray);
    const detail = document.querySelector('.detail');
    foodName = Object.keys(material)[randomMaterialNum];
    if (order.hasEgg === true) {
        foodName += ' & Egg';
    }
    foodName += ' ' + order.categoryName;
    detail.innerHTML = `<h1>${foodName} with ${Object.keys(drink)[randomDrinkNum]}</h1>`;
    const detailPrice = document.createElement('h1');
    detail.append(detailPrice);
    detailPrice.innerHTML = 'Price: ' + order.total();

    randomColor();
    console.log(`Category:${order.categoryName}
        Layer: ${layer}
        Material:${Object.keys(material)[randomMaterialNum]}
        Drink: ${Object.keys(drink)[randomDrinkNum]}
        M_price: ${order.materialPrice}
        D_price: ${order.drinkPrice}
        Total: ${order.total()}`
    );
}

