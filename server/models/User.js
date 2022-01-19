const { Schema, model } = require('mongoose');

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
                type: Schema.Types.ObjectId,
                ref: 'Item'
            }
        ]
    }
);

userSchema.set('toJSON', { getters: true, virtuals: false, versionKey: false });

const User = model('User', userSchema);

module.exports = User;