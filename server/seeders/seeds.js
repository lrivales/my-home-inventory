const faker = require('faker');

const db = require('../config/connection');
const { User } = require('../models/index');

db.once('open', async () => {
    try {
        await db.dropDatabase();
        console.log('Database has been dropped.');
    } catch (error) {
        console.error(error);
    };

    // create fake users
    for (let user = 0; user < 5; user += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = 'password';

        const createdUser = await User.create({ username, email, password });
        console.log(createdUser);
    }

    console.log('Database has been seeded.');
    process.exit(0);
});