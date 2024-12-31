const cloudinary = require('../config/cloudinary');
const BlogPost = require('../models/BlogPosts');

exports.createBlogPost = async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;
        console.log('data', data);
        console.log('data', file);
        
        if(!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }

        //upload file to cloudinary
        const result = await cloudinary.uploader.upload_stream(
            { folder: 'post_banners' },
            async (error, result) => {
                if(error) {
                    console.error('Cloudinary Error:', error);
                    return res.status(500).json({ error: 'Failed to upload image '});
                }

                //prepare data for database
                const { title, category, thoughts, userData } = req.body;

                const newPost = new BlogPost({
                    title,
                    category, 
                    thoughts, 
                    bannerUrl: result.secure_url,
                    userData: JSON.parse(userData)
                })

                console.log('newPost', newPost)

                //save to mongoDB
                await newPost.save();

                res.status(201).json({ 
                    message: 'Post created successfully', 
                    post: newPost 
                });
                
            }
        )
        //pipe file buffer into the upload stream
        result.end(req.file.buffer);
    } catch (error) {
        console.error('Server Error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getBlogPost = async (req, res) => {
    try {
        // Get query parameters for pagination
        const page = parseInt(req.query.page) || 1;     
        const limit = parseInt(req.query.limit) || 9;   
        const skip = (page - 1) * limit;               

        // Fetch paginated data and total count
        const posts = await BlogPost.find()
            .sort({ createdAt: -1 }) 
            .skip(skip)              
            .limit(limit);           

        const totalPosts = await BlogPost.countDocuments();

        // Send paginated response
        res.status(200).json({
            posts,
            totalPosts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit)
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}