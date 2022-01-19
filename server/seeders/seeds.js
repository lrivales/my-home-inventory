const faker = require('faker');
const { Convert } = require('mongo-image-converter');

const db = require('../config/connection');
const { User } = require('../models/index');

db.once('open', async () => {
    await db.dropDatabase();

    const userCategories = [];
    const images = [];
    const userItems = [];
    const userData = [];

    // create fake categories
    for (let i = 0; i < 10; i += 1) {
        const categoryName = faker.random.word;

        userCategories.push({ categoryName })
    }

    console.log('Categories: ' + userCategories);

    // function for converting image to string using mongo-image-converter
    const convertImage = async (img) => {
        try {
            const convertedImage = await Convert(img)
            if (convertedImage) {
                images.push({ convertedImage });
                console.log('Converted Image: ' + convertedImage);
            } else {
                console.log('The file is not in format of image/jpeg or image/png');
            }
        } catch (error) {
            console.warn(error);
        }
    }

    // create fake images
    for (let i = 0; i < 50; i += 1) {
        const imageToConvert = faker.image.image;
        console.log('Image to Convert: ' + imageToConvert);
        convertImage(imageToConvert);
    }

    console.log('Images: ' + images);

    // create fake items
    for (let i =0; i < 50; i += 1) {
        const randomImageIndex = Math.random(Math.floor() * images.length); //pick random image
        const randomCategoryIndex = Math.random(Math.floor() * userCategories.length); //pick random category

        const itemName = faker.commerce.product;
        const brand = faker.company.companyName;
        const model = faker.commerce.productName;
        const value = faker.finance.amount;
        const image = images[randomImageIndex];
        const category = userCategories[randomCategoryIndex];

        userItems.push({ itemName, brand, model, value, image, category })
    }

    console.log('Items: ' + userItems);

    // create fake users
    for (let i = 0; i < 5; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();
        const categories = userCategories;
        const items = userItems;
        userData.push({ username, email, password, categories, userItems });
    }
    
    console.log('User Items: ' + userData);
    
    // const createdUsers = await User.collection.insertMany(userData);
});