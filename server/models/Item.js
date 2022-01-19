const { Schema, model } = require('mongoose');

const itemSchema = (
    {
        name: {
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
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    }
);

itemSchema.set('toJSON', { getters: true, virtuals: false, versionKey: false });

const Item = model('Item', itemSchema);

module.exports = Item;