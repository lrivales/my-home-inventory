const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
                value: {
                    type: Number
                },
                image: {
                    type: String
                },
                tags: [
                    {
                        tag: {
                            type: String
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

// setup pre-middleware for encrypting passwords
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the encrypted password
userSchema.method('checkPassword', async function(password) {
    return bcrypt.compare(password, this.password)
});

const User = model('User', userSchema);

module.exports = { User };