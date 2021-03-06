// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file
client
  .labelDetection('images.jpeg')

  .then(results => {
    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
    return labels;
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

  function hello() {
    alert('Hello');
  }
