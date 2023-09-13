// Based On https://github.com/webrtc/samples/tree/gh-pages/src/content/getusermedia/audio

function handleSuccess(stream) {
  if (window.stream) {
    window.stream.getAudioTracks().forEach(track => track.stop());
    window.stream = null;
  } else {
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.autoplay = true;
    window.stream = stream;
    audio.srcObject = stream;

    stream.oninactive = function() {
      console.log('Stream ended');
    };
  }
}

function handleError(e){
  console.log("ruin", e.message);
}

document.querySelector("#micTest").addEventListener('click', function(){
  if ( window.stream ) {
    this.innerText = "Test Microphone and Speaker";
  } else {
    this.innerText = "Stop Test";
  }
  if (navigator.mediaDevices) {
    const constraints = window.constraints = {
      audio: true, 
      video: false
    }
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError)
  }
});

document.querySelector('#soundTest').addEventListener('click', function(){
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.autoplay = true;
    audio.src = 'https://teste-sdk-rs.s3.amazonaws.com/Purr.wav';
})