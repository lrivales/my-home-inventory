const { Schema, model } = require('mongoose');

const categorySchema = (
    {
        name: {
            type: String,
            unique: true
        }
    }
);

categorySchema.set('toJSON', { getters: true, virtuals: false, versionKey: false });

const Category = model('Category', categorySchema);

module.exports = Category;