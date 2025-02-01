// server.js
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static('frontend'));

// Middleware for file uploads
app.use(fileUpload());

// Endpoint to upload a video
app.post('/upload', (req, res) => {
  if (!req.files || !req.files.video) {
    return res.status(400).send('No video uploaded.');
  }

  const videoFile = req.files.video;
  const videoPath = path.join(__dirname, 'uploads', videoFile.name);

  if (videoFile.mimetype !== 'video/mp4') {
    return res.status(400).send('Only MP4 videos are allowed.');
  }

  if (videoFile.size > 100000000) { // Limit video size to 100MB (adjust as necessary)
    return res.status(400).send('Video is too large.');
  }

  // Save the video file
  videoFile.mv(videoPath, (err) => {
    if (err) return res.status(500).send(err);
    
    res.send({
      message: 'Video uploaded successfully.',
      videoUrl: `/uploads/${videoFile.name}`
    });
  });
});

// Serve uploaded videos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
