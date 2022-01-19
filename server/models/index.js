const { Schema, Types, model } = require('mongoose');

const categorySchema = (
    {
        categoryId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        categoryName: {
            type: String,
            unique: true,
            default: 'None'
        }
    }
);

const itemSchema = (
    {
        itemId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        itemName: {
            type: String,
            required: true
        },
        brand: {
            type: String
        },
        model: {
            type: String
        },
        value: {
            type: Number,
            required: true
        },
        image: {
            type: String
        },
        category: {
            type: categorySchema,
            default: 'None'
        }
    }
);

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
        categories: [categorySchema],
        items: [itemSchema]
    }
);

categorySchema.set('toJSON', { getters: true, virtuals: false, versionKey: false });
itemSchema.set('toJSON', { getters: true, virtuals: false, versionKey: false });
userSchema.set('toJSON', { getters: true, virtuals: false, versionKey: false });

const User = model('User', userSchema);

module.exports = User;