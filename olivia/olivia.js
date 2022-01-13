const sour = [
    {
        number:"1",
        album: "Sour",
        singer: "Olivia Rodrigo",
        img: "folder.jpg",
        song:"Brutal",
        artist:"Olivia Rodrigo",
        audio:"songs/01 - brutal .mp3",
        src: "music-1"
        
    },
    {
        number:"2",
        album: "Sour",
        singer:"Olivia Rodrigo",
        img: "folder.jpg",
        song:"Traitor",
        artist:" Olivia Rodrigo",
        audio:"songs/02 - traitor .mp3",
        src: "music-2"
    },
    {
        number:"3",
        album: "Sour",
        singer:"Olivia Rodrigo",
        img: "folder.jpg",
        song:"Drivers License",
        audio:"songs/03 - drivers license .mp3",
        artist:"Olivia Rodrigo",
        src: "music-3"
    },
    {
        number:"4",
        album: "Sour",
        singer:"Olivia Rodrigo",
        img: "folder.jpg",
        song:"1 Step Forward",
        artist:"Olivia Rodrigo",
        audio:"songs/04 - 1 step forward, 3 steps back .mp3",
        src: "music-4"
    },
    {
        number:"5",
        album: "Sour",
        singer:"Olivia Rodrigo",
        img: "folder.jpg",
        song:"Deja Vu",
        artist:"Olivia Rodrigo",
        audio:"songs/05 - deja vu .mp3",
        src: "music-5"
    },
    {
        number:"6",
        album: "Sour",
        singer:"Olivia Rodrigo",
        img: "folder.jpg",
        song:"Good 4 U",
        artist:"Olivia Rodrigo",
        audio:"songs/06 - good 4 u .mp3",
        src: "music-6"
    },
    {
        number:"7",
        album: "Sour",
        singer:"Olivia Rodrigo",
        img: "folder.jpg",
        song:"Enough For You",
        artist:"Olivia Rodrigo",
        audio:"songs/07 - enough for you .mp3",
        src: "music-7"
    },
    {
        number:"8",
        album: "Sour",
        singer:"Olivia Rodrigo",
        img: "folder.jpg",
        song:"Happier",
        artist:"Olivia Rodrigo",
        audio:"songs/08 - happier .mp3",
        src: "music-8"
    },
    {
        number:"9",
        album: "Sour",
        singer:"Olivia Rodrigo",
        img: "folder.jpg",
        song:"Jealousy,Jealousy",
        artist:"Olivia Rodrigo",
        audio:"songs/09 - jealousy, jealousy .mp3",
        src: "music-9"
    },
    {
        number:"10",
        album: "Sour",
        singer:"Olivia Rodrigo",
        img: "folder.jpg",
        song:"Favourite Crime",
        artist:"Olivia Rodrigo",
        audio:"songs/10 - favorite crime .mp3",
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
    let music = sour[currentSong];
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
        if (currentSong > sour.length-1){
            currentSong = 0;
        }
        loadSong();
    }
    
    let prevSong = () => {
        currentSong--;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        if(currentSong < 0){
            currentSong = sour.length-1;
        }
        loadSong();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*sour.length);
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

for(let i = 0; i < sour.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${sour[i].number}</p>
    <p class="songName">${sour[i].song}</p>
    <p class="artist">${sour[i].artist}</p>
    <p class="time" id="${sour[i].src}"></p>
    <audio class="${sour[i].src}" src="${sour[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${sour[i].src}`)
  let liAudioTag = document.querySelector(`.${sour[i].src}`)

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
        music = sour[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

