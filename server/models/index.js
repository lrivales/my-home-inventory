const { Schema, Types, model } = require('mongoose');
const bcrypt = require('bcrypt');

const ItemSchema = new Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        },
        value: {
            type: Number
        },
        image: {
            type: String
        }
    }
);

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            match: [/.+@.+\..+/, "Invalid email address."]
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        items: [ItemSchema]
    },
    {
        toJSON: true,
        versionKey: false
    }
);

// setup pre-middleware for encrypting passwords
// does not work for password updates
UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the encrypted password
UserSchema.method('checkPassword', async function(password) {
    return bcrypt.compare(password, this.password)
});

const User = model('User', UserSchema);

module.exports = { User };