// globals
let mouseDown = false;
let heading = Math.floor(Math.random() * 360);
let pitch = 0;
let panorama;
let rotateSpeed = 100;
let rotateDirection = Math.random() < 0.5 ? -1 : 1;

function init() {
  panorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'),
  {
    pov: { heading: heading, pitch: pitch },
    zoom: .5,
    disableDefaultUI: true,
    addressControl: true,
  });

  //get pano data and print to screen
  panorama.setPano(panoramas[Math.floor(Math.random() * panoramas.length)]);

  // rotates the panorama
  let rotate = setInterval(rotatePanoStep, 30);

  function rotatePanoStep() {
    if (mouseDown) {
      return;
    }
    currentPov = panorama.getPov();
    // if the user changed the POV
    let dif = heading - currentPov.heading;
    if (dif != 0) {
      // Make sure the rotation matches the new direction
      rotateDirection = (dif > 180 || dif < -180) == dif > 0 ? 1 : -1;
      // keep the POV pitch angle the same
      pitch = currentPov.pitch;
    }

    heading = currentPov.heading + (rotateSpeed / 2000 * rotateDirection);
    panorama.setPov({heading: heading, pitch: pitch});
  }
}

document.body.onmousedown = function () {
  mouseDown = true;
}
document.body.onmouseup = function () {
  mouseDown = false;
}

// cleanup
window.onload = function () {
  document.getElementsByClassName("gmnoprint gm-style-cc")[0].remove();
  document.getElementsByClassName("gm-style-cc")[1].remove();
  document.getElementsByClassName("gmnoprint")[1].style.right = 0;
}
