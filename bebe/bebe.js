
//song data
const all = [
    {
        number:1,
        album:"All Your Fault Pt.2",
        singer:"Bebe Rexha",
        img:"folder.jpg",
        song:"That's It",
        artist:"Gucci Mane, 2 Chainz, Bebe Rexha",
        audio:"songs/1 - That's It (feat. Gucci Mane & 2 Chainz).mp3",
        src: "music-1"
    },
    {
        number:2,
        album:"All Your Fault Pt.2",
        singer:"Bebe Rexha",
        img:"folder.jpg",
        song:"I Got Time",
        artist:"Bebe Rexha",
        audio:"songs/2 - I Got Time.mp3",
        src: "music-2"
    },
    {
        number:3,
        album:"All Your Fault Pt.2",
        singer:"Bebe Rexha",
        img:"folder.jpg",
        song:"The Way I Are (Dance With Somebody)",
        artist:"Lil Wayne, Bebe Rexha",
        audio:"songs/3 - The Way I Are (Dance With Somebody) [feat. Lil Wayne].mp3",
        src: "music-3"
    },
    {
        number:4,
        album:"All Your Fault Pt.2",
        singer:"Bebe Rexha",
        img:"folder.jpg",
        song:"(Not) The One",
        artist:"Bebe Rexha",
        audio:"songs/4 - (Not) The One.mp3",
        src: "music-4"
    },
    {
        number:5,
        album:"All Your Fault Pt.2",
        singer:"Bebe Rexha",
        img:"folder.jpg",
        song:"Comfortable",
        artist:"Kranium, Bebe Rexha",
        audio:"songs/5 - Comfortable (feat. Kranium).mp3",
        src: "music-5"

    },
    {
        number:6,
        album:"All Your Fault Pt.2",
        singer:"Bebe Rexha",
        img:"folder.jpg",
        song:"Meant to Be",
        artist:"Florida Georgia Line,Bebe Rexha",
        audio:"songs/6 - Meant to Be.mp3",
        src: "music-6"

    }
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
    let music = all[currentSong];
    playerImage.src = music.img;
    cover.src = music.img;
    singerName.textContent = music.singer;
    albumName.textContent = music.album;
    currentSongName.textContent = music.song;
    audio.src = music.audio;
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
    if (currentSong > all.length-1){
        currentSong = 0;
    }
    loadSong();
    audio.play();   
}

let prevSong = () => {
    currentSong--;
    play.classList.remove('fa-play-circle');
    play.classList.add('fa-pause-circle');
    if(currentSong < 0){
        currentSong = all.length-1;
    }
    loadSong();
    audio.play();    
}

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
audio.addEventListener('ended', nextSong);

shuffle.addEventListener('click', function(){
    currentSong = Math.floor(Math.random()*all.length);
    play.classList.remove('fa-play-circle');
    play.classList.add('fa-pause-circle');
    loadSong();
    audio.play();    
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

for(let i = 0; i < all.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${all[i].number}</p>
    <p class="songName">${all[i].song}</p>
    <p class="artist">${all[i].artist}</p>
    <p class="time" id="${all[i].src}"></p>
    <audio class="${all[i].src}" src="${all[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)
  
  let liAudioDuration = document.querySelector(`#${all[i].src}`)
  let liAudioTag = document.querySelector(`.${all[i].src}`)

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
        music = all[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();
    })




})


