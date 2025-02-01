// script.js
document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('video', document.querySelector('input[type="file"]').files[0]);

  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    if (data.videoUrl) {
      document.getElementById('videoContainer').style.display = 'block';
      document.getElementById('videoPlayer').src = data.videoUrl;
    }
  })
  .catch(error => {
    console.error('Error uploading video:', error);
  });
});
