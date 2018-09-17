var express = require('express');
var fs = require('fs');
var util = require('util');
var mime = require('mime');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});


var path = require('path');
var gcloud = require('@google-cloud/vision');
const client = new gcloud.ImageAnnotatorClient();

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname + '/about.html'));
});

app.post('/upload', upload.single('filename'), function(req, res, next) {

  var types = ['labels'];

// Send the image to the Cloud Vision API

client.webDetection(req.file.path, types, function(err, detections, apiResponse) {
if (err) {
  res.end('Cloud Vision Error');
} else {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<body>');

  // Base64 the image so we can display it on the page
  res.write('<img width=200 src="' + base64Image(req.file.path) + '"><br>');

  // Write out the JSON output of the Vision API
  var x = JSON.stringify(detections, null, 4);
  var object = JSON.parse(x);
  console.log(object['webDetection']);
  console.log(object['webDetection']['bestGuessLabels']);
  var label = object['webDetection']['bestGuessLabels'][0]['label'];

  console.log(label);
  // Delete file (optional)
  res.write('<p>' + label + '</p>');
  fs.unlinkSync(req.file.path);

  res.end('</body>');
}
});
});

app.listen(9000, () => {
  console.log('Example app listening on port 9000')
});



function base64Image(src) {
  var data = fs.readFileSync(src).toString('base64');
  return util.format('data:%s;base64,%s', mime.lookup(src), data);
}



/*
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */


/*
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
*/
