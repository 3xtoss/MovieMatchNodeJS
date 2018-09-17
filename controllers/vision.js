
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
 //Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */



const fileName = 'images.jpeg';
// Detect similar images on the web to a local file
client
  .webDetection(fileName)
  .then(results => {
    const webDetection = results[0].webDetection;
    console.log(Object.keys(webDetection));
    if (webDetection.fullMatchingImages.length) {
      console.log(
        `Full matches found: ${webDetection.fullMatchingImages.length}`
      );
      webDetection.fullMatchingImages.forEach(image => {
        console.log(`  URL: ${image.url}`);
        console.log(`  Score: ${image.score}`);
      });
    }

    if (webDetection.partialMatchingImages.length) {
      console.log(
        `Partial matches found: ${webDetection.partialMatchingImages.length}`
      );
      webDetection.partialMatchingImages.forEach(image => {
        console.log(`  URL: ${image.url}`);
        console.log(`  Score: ${image.score}`);
      });
    }

    if (webDetection.webEntities.length) {
      console.log(`Web entities found: ${webDetection.webEntities.length}`);
      webDetection.webEntities.forEach(webEntity => {
        console.log(`  Description: ${webEntity.description}`);
        console.log(`  Score: ${webEntity.score}`);
      });
    }

    if (webDetection.bestGuessLabels.length) {
      console.log(
        `Best guess labels found: ${webDetection.bestGuessLabels.length}`
      );
      webDetection.bestGuessLabels.forEach(label => {
        console.log(`  Label: ${label.label}`);
      });
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
