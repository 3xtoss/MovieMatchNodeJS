var img;
var img_upload;

function setup() {

  img = select('#dragInside');
  //canvas = createCanvas(100,100);
  //canvas.parent('#dragInside');
  //createCanvas(200,200);
  //background(0);
  img.dragOver(highlight);
  //img.dragOut(unhighlight);
  img.dragLeave(unhighlight);
  img.drop(gotFile,updateImage);
  //console.log(img);
}

function gotFile(file) {

  /*
  */
  //createP(file.name);
  //createP(file.type);
  //createP(file.size);

  //img_upload.parent('#div-block w-clearfix');
  img_upload = createImg(file.data).hide();
  var y = img_upload.attribute('src');
  //console.log(y);
  //img_upload.size(100,100);
  //console.log(img_upload);

  var x = select('#dragInside');
  x.attribute('src', y);
  //img_upload.parent('#dragInside');
  //img_upload.hide();
  //image(img_upload, 0, 0, 100, 100);
}

function updateImage() {
  var changeImage = document.getElementByyId('dragInside');
  //changeImage.src = img_upload.data
}

function printSomething() {
  document.write("hello");
}
function highlight() {
  img.style('background-color','#ccc');
}
function unhighlight() {
  img.style('background-color','#FFF');
}
