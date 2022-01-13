const romance = [
    {
        number:"1",
        song:"Shameless",
        album: "Romance",
        singer: "Camila Cabello",
        img: "folder.jpg",
        artist:"Camila Cabello",
        audio:"songs/01. Shameless.mp3",
        src: "music-1"
        
    },
    {
        number:"2",
        song:"Living Proof",
        album: "Romance",
        singer:"Camila Cabello",
        img: "folder.jpg",
        artist:"Camila Cabello",
        audio:"songs/02. Living Proof.mp3",
        src: "music-2"
    },
    {
        number:"3",
        song:"Should've Said it",
        album: "Romance",
        singer:"Camila Cabello",
        img: "folder.jpg",
        artist:"Camila Cabello",
        audio:"songs/03. Should've Said it.mp3",
        src: "music-3"
    },
    {
        number:"4",
        song:"Senorita",
        album: "Romance",
        singer:"Camila Cabello",
        img: "folder.jpg",
        artist:"Shawn Mendes, Camila Cabello",
        audio:"songs/04. Senorita (Feat. Shawn Mendes).mp3",
        src: "music-4"
    },
    {
        number:"5",
        song:"Liar",
        album: "Romance",
        singer:"Camila Cabello",
        img: "folder.jpg",
        artist:"Camila Cabello",
        audio:"songs/05. Liar.mp3",
        src: "music-5"
    },
    {
        number:"6",
        song:"Bad Kind Of Butterflies",
        album: "Romance",
        singer:"Camila Cabello",
        img: "folder.jpg",
        artist:"Camila Cabello",
        audio:"songs/06. Bad Kind Of Butterflies.mp3",
        src: "music-6"
    },
    {
        number:"7",
        song:"Easy",
        album: "Romance",
        singer:"Camila Cabello",
        img: "folder.jpg",
        artist:"Camila Cabello",
        audio:"songs/07. Easy.mp3",
        src: "music-7"
    },
    {
        number:"8",
        song:"Feel It Twice",
        album: "Romance",
        singer:"Camila Cabello",
        img: "folder.jpg",
        artist:"Camila Cabello",
        audio:"songs/08. Feel It Twice.mp3",
        src: "music-8"
    },
    {
        number:"9",
        song:"Cry For Me",
        album: "Romance",
        singer:"Camila Cabello",
        img: "folder.jpg",
        artist:"Camila Cabello",
        audio:"songs/10. Cry For Me.mp3",
        src: "music-9"
    },
    {
        number:"10",
        song:"First Man",
        album: "Romance",
        singer:"Camila Cabello",
        img: "folder.jpg",
        artist:"Camila Cabello",
        audio:"songs/13. First Man.mp3",
        src: "music-10"
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
    let music = romance[currentSong];
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
        if (currentSong > romance.length-1){
            currentSong = 0;
        }
        loadSong();
    }
    
    let prevSong = () => {
        currentSong--;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        if(currentSong < 0){
            currentSong = romance.length-1;
        }
        loadSong();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*romance.length);
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

for(let i = 0; i < romance.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${romance[i].number}</p>
    <p class="songName">${romance[i].song}</p>
    <p class="artist">${romance[i].artist}</p>
    <p class="time" id="${romance[i].src}"></p>
    <audio class="${romance[i].src}" src="${romance[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${romance[i].src}`)
  let liAudioTag = document.querySelector(`.${romance[i].src}`)

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
        music = romance[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

