const express = require('express');
const app = express();
app.use(express.json());

let newsPosts = [
    { id: 1, title: "PITP Batch 4 Classes", content: "Backend development has started!", author: "Admin" }
];

// 1. View All Posts
app.get('/news', (req, res) => {
    res.json(newsPosts);
});

// 2. View One Post (by ID)
app.get('/news/:id', (req, res) => {
    const post = newsPosts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send("Post not found!");
    res.json(post);
});

// 3. Write (Create) a new post
app.post('/news', (req, res) => {
    const newPost = {
        id: newsPosts.length + 1,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    newsPosts.push(newPost);
    res.status(201).json(newPost);
});

// 4. Edit (Update) only the title
app.patch('/news/:id', (req, res) => {
    const post = newsPosts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send("Post not found!");

    if (req.body.title) {
        post.title = req.body.title;
    }
    res.json(post);
});

/* CREATIVE SITUATION ANSWER:
The best choice for Ali is the PATCH method. 
Reason: PATCH is designed for "partial updates" (changing only one part, like a title), 
whereas PUT is used to replace the entire resource.
*/

// 5. Delete a post
app.delete('/news/:id', (req, res) => {
    newsPosts = newsPosts.filter(p => p.id !== parseInt(req.params.id));
    res.send("Post deleted successfully.");
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Question 2 Server is running on http://localhost:${PORT}`);
});