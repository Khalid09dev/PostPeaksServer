const mongoose = require('mongoose');

//Define the schema
const blogPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['Technology', 'Personal Development', 'Business & Marketing', 'Lifestyle', 'Health & Wellness', 'Education', 'Finance', 'Entertainment', 'News & Trends', 'DIY & Crafts']
        },
        thoughts: {
            type: String,
            required: [true, 'Thoughts cannot be empty'],
            trim: true
        },
        bannerUrl: {
            type: String,
            required: [true, 'Banner image is required']
        },
        userData: {
            name: { type: String, required: true },
            picture: { type: String, required: true }
        }, 
        createdAt: {
            type: String, 
            default: () => {
                const date = new Date();
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                });
            }
        }
    },
    {
        timestamps: true
    }
)

const BlogPost = mongoose.model('BlogPosts', blogPostSchema);

module.exports = BlogPost;