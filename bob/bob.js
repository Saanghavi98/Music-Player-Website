const songsOfFreedom = [
    {
        number:"1",
        album:"Songs Of Freedom",
        singer: "Bob Marley",
        img:"folder.jpg",
        song:"No Woman No Cry",
        artist:"Bob Marley",
        audio:"songs/01-Bob Marley-No Woman No Cry (live at The Roxy).mp3",
        src: "music-1"
    },
    {
        number:"2",
        album:"Songs Of Freedom",
        singer: "Bob Marley",
        img:"folder.jpg",
        song:"Who The Cap Fit",
        artist:"Bob Marley",
        audio:"songs/02-Bob Marley-Who the Cap Fit.mp3",
        src: "music-2"
    },
    {
        number:"3",
        album:"Songs Of Freedom",
        singer: "Bob Marley",
        img:"folder.jpg",
        song:"Jah Live",
        artist:"Bob Marley",
        audio:"songs/03-Bob Marley-Jah Live.mp3",
        src: "music-3"
    },
    {
        number:"4",
        album:"Songs Of Freedom",
        singer: "Bob Marley",
        img:"folder.jpg",
        song:"Crazy Baldheads",
        artist:"Bob Marley",
        audio:"songs/04-Bob Marley-Crazy Baldheads.mp3",
        src: "music-4"
    },
    {
        number:"5",
        album:"Songs Of Freedom",
        singer: "Bob Marley",
        img:"folder.jpg",
        song:"War",
        artist:"Bob Marley",
        audio:"songs/05-Bob Marley-War.mp3",
        src: "music-5"
    },
    {
        number:"6",
        album:"Songs Of Freedom",
        singer: "Bob Marley",
        img:"folder.jpg",
        song:"Johnny Was",
        artist:"Bob Marley",
        audio:"songs/06-Bob Marley-Johnny Was.mp3",
        src: "music-6"
    },
    {
        number:"7",
        album:"Songs Of Freedom",
        singer: "Bob Marley",
        img:"folder.jpg",
        song:"Rat Race",
        artist:"Bob Marley",
        audio:"songs/07-Bob Marley-Rat Race.mp3",
        src: "music-7"
    },
    {
        number:"8",
        album:"Songs Of Freedom",
        singer: "Bob Marley",
        img:"folder.jpg",
        song:"Jammin'",
        artist:"Bob Marley",
        audio:"songs/08-Bob Marley-Jammin (12 single mix).mp3",
        src: "music-8"
    },
    {
        number:"9",
        album:"Songs Of Freedom",
        singer: "Bob Marley",
        img:"folder.jpg",
        song:"Waiting In Vain",
        artist:"Bob Marley",
        audio:"songs/09-Bob Marley-Waiting in Vain (advert mix).mp3",
        src: "music-9"
    },
    {
        number:"10",
        album:"Songs Of Freedom",
        singer: "Bob Marley",
        img:"folder.jpg",
        song:"Exodus",
        artist:"Bob Marley",
        audio:"songs/10-Bob Marley-Exodus (12 single mix).mp3",
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
    let music = songsOfFreedom[currentSong];
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
        if (currentSong > songsOfFreedom.length-1){
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
            currentSong = songsOfFreedom.length-1;
        }
        loadSong();
        audio.play();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*songsOfFreedom.length);
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

for(let i = 0; i < songsOfFreedom.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${songsOfFreedom[i].number}</p>
    <p class="songName">${songsOfFreedom[i].song}</p>
    <p class="artist">${songsOfFreedom[i].artist}</p>
    <p class="time" id="${songsOfFreedom[i].src}"></p>
    <audio class="${songsOfFreedom[i].src}" src="${songsOfFreedom[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${songsOfFreedom[i].src}`)
  let liAudioTag = document.querySelector(`.${songsOfFreedom[i].src}`)

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
        music = songsOfFreedom[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

