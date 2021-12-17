const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //Select all Sounds
  const sounds = document.querySelectorAll(".sound-picker button");

  //Time Display
  const timeDisplay = document.querySelector(".time-display"); //corresponding to h3 in html

  //Select all buttons of timeSelect
  const timeSelect = document.querySelectorAll(".time-select button"); 

  //Get length of outline
  const outlineLength = outline.getTotalLength();

  //Duration corresponding to data attribute data-time in HTML
  //Its not the duration of entire song, its like a fake duration we are going to 
  //add such that when duration expires song stops
  let fakeDuration = 600;

  //to show animation
  outline.style.strokeDashoffset = outlineLength;
  outline.style.strokeDasharray = outlineLength;
  timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
    fakeDuration % 60
  )}`;
  
  //pick different sounds
  sounds.forEach(sound => {
    sound.addEventListener("click", function() {

    // data-sound and data-video corresponding to buttons of div class 'sound-picker' in HTML
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });


  //play sound
  play.addEventListener("click", function() {
    checkPlaying(song);
  });
  
  //select sound
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  //Create a function specific to stop and play the sounds and video
  const checkPlaying = song => {
    if (song.paused) {
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};

//function for animation of circle and text
song.ontimeupdate = () => {
  let currentTime = song.currentTime; //this function runs everytime song runs
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);

  //Animate the circle 
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  //Animate the text
  timeDisplay.textContent = `${minutes}:${seconds}`;

  //to stop when currentTime surpasses fakeDuration
  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
};
}

app();



