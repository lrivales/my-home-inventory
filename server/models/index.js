const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
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
        items: [
            {
                name: {
                    type: String
                },
                description: {
                    type: String
                },
                purchaseDate: {
                    type: Date
                },
                value: {
                    type: Number
                },
                image: {
                    type: String
                },
                tags: [
                    {
                        tag: {
                            type: String,
                            unique: true
                        }
                    }   
                ]
            }
        ]
    },
    {
        toJSON: true,
        versionKey: false
    }
);

const User = model('User', userSchema);

module.exports = { User };