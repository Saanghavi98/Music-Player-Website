const fine = [
    {
        number:"1",
        album:"Fine",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Golden",
        artist:"Harry Styles",
        audio:"songs/01. Golden.mp3",
        src: "music-1"
    },
    {
        number:"2",
        album:"Fine",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Watermelon Sugar",
        artist:"Harry Styles",
        audio:"songs/02. Watermelon Sugar.mp3",
        src: "music-2"
    },
    {
        number:"3",
        album:"Fine",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Adore You",
        artist:"Harry Styles",
        audio:"songs/03. Adore You.mp3",
        src: "music-3"
    },
    {
        number:"4",
        album:"Fine",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Lights Up",
        artist:"Harry Styles",
        audio:"songs/04. Lights Up.mp3",
        src: "music-4"
    },
    {
        number:"5",
        album:"Fine",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Cherry",
        artist:"Harry Styles",
        audio:"songs/05. Cherry.mp3",
        src: "music-5"
    },
    {
        number:"6",
        album:"Fine",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Falling",
        artist:"Harry Styles ",     
        audio:"songs/06. Falling.mp3",
        src: "music-6"
    },
    {
        number:"7",
        album:"Fine",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"To Be So Lonely",
        artist:"Harry Styles",
        audio:"songs/07. To Be So Lonely.mp3",
        src: "music-7"
    },
    {
        number:"8",
        album:"Fine",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"She",
        artist:"Harry Styles",
        audio:"songs/08. She.mp3",
        src: "music-8"
    },
    {
        number:"9",
        album:"Fine",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Treat People With Kindness",
        artist:"Harry Styles",
        audio:"songs/11. Treat People With Kindness.mp3",
        src: "music-9"
    },
    {
        number:"10",
        album:"Fine",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Fine Line",
        artist:"Harry Styles",
        audio:"songs/12. Fine Line.mp3",
        src: "music-10"
    }, 
]


//Function of the controls
let playerImage = document.querySelector('.playerImage');
let currentSongName = document.querySelector('.currentSongName');
let play = document.getElementById('play');
let audio = document.querySelector('.audio');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let shuffle = document.getElementById('shuffle');
let cover = document.querySelectorAll('.cover'); 
let singerName = document.querySelector('.singerName');
let albumName = document.querySelector('.albumName');

let currentSong = 0;

function loadSong(){
    let music = fine[currentSong];
    playerImage.src = music.img;
    cover.src = music.img;
    singerName.textContent = music.singer;
    albumName.textContent = music.album;
    currentSongName.textContent = music.song;
    audio.src = music.audio;
    audio.play();
    }


window.addEventListener('DOMContentLoaded', function(){
    loadSong();
    })

    play.addEventListener('click', function(){
        if(audio.paused || audio.currentTime <= 0){
        audio.play()
        play.classList.remove('fa-play-circle')
        play.classList.add('fa-pause-circle')
        }
        else{
            audio.pause();
            play.classList.remove('fa-pause-circle');
            play.classList.add('fa-play-circle');
        }
    })
    
    let nextSong = () =>{
        currentSong++;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        if (currentSong > fine.length-1){
            currentSong = 0;
        }
        loadSong();
    }
    
    let prevSong = () => {
        currentSong--;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        if(currentSong < 0){
            currentSong = fine.length-1;
        }
        loadSong();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*fine.length);
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        loadSong();
    })

//updating progress bar with current song duration
let progressBar = document.querySelector('.progress-bar');
audio.addEventListener('timeupdate', (e)=>{
    let currentTime = e.target.currentTime;
    let duration = e.target.duration;
    let progressWidth = (currentTime/duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

        //update song duration
        let songCurrentTime = document.querySelector('.current');
        let songDurationTime = document.querySelector('.duration');
    audio.addEventListener('loadeddata', ()=>{
        let audioDuration = audio.duration;
        let totalMin = Math.floor(audioDuration/60);
        let totalSec = Math.floor(audioDuration%60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`
        }
        songDurationTime.innerText = `${totalMin}:${totalSec}`;
    })      

      //update current song 
        let currentMin = Math.floor(currentTime/60);
        let currentSec = Math.floor(currentTime%60);
        if(currentSec < 10){
            currentSec = `0${currentSec}`
        }
        songCurrentTime.innerText = `${currentMin}:${currentSec}`;
    
})


//updating song on click 
let progressArea = document.querySelector('.progress-area');
    progressArea.addEventListener('click', (e)=>{
     let progressWidthValue = progressArea.clientWidth;
let clickedOffSetX = e.offsetX;
let songDuration = audio.duration;

audio.currentTime = (clickedOffSetX / progressWidthValue)*songDuration;   
    })


//creating the song list
let songsList = document.querySelector('.songsList')

for(let i = 0; i < fine.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${fine[i].number}</p>
    <p class="songName">${fine[i].song}</p>
    <p class="artist">${fine[i].artist}</p>
    <p class="time" id="${fine[i].src}"></p>
    <audio class="${fine[i].src}" src="${fine[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${fine[i].src}`)
  let liAudioTag = document.querySelector(`.${fine[i].src}`)

  liAudioTag.addEventListener('loadeddata', () => {
    let audioDuration = liAudioTag.duration;
    let totalMin = Math.floor(audioDuration/60);
    let totalSec = Math.floor(audioDuration%60);
    if(totalSec < 10){
        totalSec = `0${totalSec}`
    }
    liAudioDuration.innerText = `${totalMin}:${totalSec}`;
  })

}


let song = document.querySelectorAll('.song')
Array.from(song).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        music = fine[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

