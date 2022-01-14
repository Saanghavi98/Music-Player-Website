//songs data

const essentials = [
    {
        number:1,
        album:"Essentials",
        singer:"The Beatles",
        img:"folder.jpg",
        song:"I Want To Hold Your Hand",
        artist:"The Beatles",
        audio:"songs/1.  I Want To Hold Your Hand (Remastered).mp3",
        src: "music-1"
    },
    {
        number:2,
        album:"Essentials",
        singer:"The Beatles",
        img:"folder.jpg",
        song:"A Hard Day's Night",
        artist:"The Beatles",
        audio:"songs/2.  A Hard Day's Night (Remastered).mp3",
        src: "music-2"

    },
    {
        number:3,
        album:"Essentials",
        singer:"The Beatles",
        img:"folder.jpg",
        song:"Help!",
        artist:"The Beatles",
        audio:"songs/3.  Help! (Remastered).mp3",
        src: "music-3"
    },
    {
        number:4,
        album:"Essentials",
        singer:"The Beatles",
        img:"folder.jpg",
        song:"Strawberry Fields Forever",
        artist:"The Beatles",
        audio:"songs/4.  Strawberry Fields Forever (Remastered).mp3",
        src: "music-4"
    },
    {
        number:5,
        album:"Essentials",
        singer:"The Beatles",
        img:"folder.jpg",
        song:"Hey Jude",
        artist:"The Beatles",
        audio:"songs/5.  Hey Jude (Remastered).mp3",
        src: "music-5"

    },
    {
        number:6,
        album:"Essentials",
        singer:"The Beatles",
        img:"folder.jpg",
        song:"Ticket To Ride",
        artist:"The Beatles",
        audio:"songs/6.  Ticket To Ride (Remastered).mp3",
        src: "music-6"

    },
    {
        number:7,
        album:"Essentials",
        singer:"The Beatles",
        img:"folder.jpg",
        song:"In My Life",
        artist:"The Beatles",
        audio:"songs/7.  In My Life (Remastered).mp3",
        src: "music-7"

    },
    {
        number:8,
        album:"Essentials",
        singer:"The Beatles",
        img:"folder.jpg",
        song:"Here Comes The Sun",
        artist:"The Beatles",
        audio:"songs/8.  Here Comes The Sun (Remastered).mp3",
        src: "music-8"
    },
    {
        number:9,
        album:"Essentials",
        singer:"The Beatles",
        img:"folder.jpg",
        song:"Can't Buy Me Love",
        artist:"The Beatles",
        audio:"songs/9.  Can't Buy Me Love (Remastered).mp3",
        src: "music-9"
    },
    {
        number:10,
        album:"Essentials",
        singer:"The Beatles",
        img:"folder.jpg",
        song:"Let It Be",
        artist:"The Beatles",
        audio:"songs/10.  Let It Be.mp3",
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
    let music = essentials[currentSong];
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
        if (currentSong > essentials.length-1){
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
            currentSong = essentials.length-1;
        }
        loadSong();
        audio.play();     
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*essentials.length);
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

for(let i = 0; i < essentials.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${essentials[i].number}</p>
    <p class="songName">${essentials[i].song}</p>
    <p class="artist">${essentials[i].artist}</p>
    <p class="time" id="${essentials[i].src}"></p>
    <audio class="${essentials[i].src}" src="${essentials[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${essentials[i].src}`)
  let liAudioTag = document.querySelector(`.${essentials[i].src}`)

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
        music = essentials[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

