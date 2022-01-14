const folklore = [
    {
        number:"1",
        song:"The 1",
        album: "Folklore",
        singer: "Taylor Swift",
        img: "folder.jpg",
        artist:"Taylor Swift",
        audio:"songs/01 the 1.mp3",
        src: "music-1"
        
    },
    {
        number:"2",
        song:"Cardigan",
        album: "Folklore",
        singer: "Taylor Swift",
        img: "folder.jpg",
        artist:"Taylor Swift",
        audio:"songs/02 cardigan.mp3",
        src: "music-2"
    },
    {
        number:"3",
        song:"The Last Great American Dynasty",
        album: "Folklore",
        singer: "Taylor Swift",
        img: "folder.jpg",
        artist:"Taylor Swift",
        audio:"songs/03 the last great american dynasty.mp3",
        src: "music-3"
    },
    {
        number:"4",
        song:"Exile",
        album: "Folklore",
        singer: "Taylor Swift",
        img: "folder.jpg",
        artist:"Taylor Swift",
        audio:"songs/04 exile.mp3",
        src: "music-4"
    },
    {
        number:"5",
        song:"My Tears Ricochet",
        album: "Folklore",
        singer: "Taylor Swift",
        img: "folder.jpg",
        artist:"Taylor Swift",
        audio:"songs/05 my tears ricochet.mp3",
        src: "music-5"
    },
    {
        number:"6",
        song:"Mirrrorball",
        album: "Folklore",
        singer: "Taylor Swift",
        img: "folder.jpg",
        artist:"Taylor Swift",
        audio:"songs/06 mirrorball.mp3",
        src: "music-6"
    },
    {
        number:"7",
        song:"Seven",
        album: "Folklore",
        singer: "Taylor Swift",
        img: "folder.jpg",
        artist:"Taylor Swift",
        audio:"songs/07 seven.mp3",
        src: "music-7"
    },
    {
        number:"8",
        song:"August",
        album: "Folklore",
        singer: "Taylor Swift",
        img: "folder.jpg",
        artist:"Taylor Swift",
        audio:"songs/08 august.mp3",
        src: "music-8"
    },
    {
        number:"9",
        song:"This Is Me Trying",
        album: "Folklore",
        singer: "Taylor Swift",
        img: "folder.jpg",
        artist:"Taylor Swift",
        audio:"songs/09 this is me trying.mp3",
        src: "music-9"
    },
    {
        number:"10",
        song:"Illicit Affairs",
        album: "Folklore",
        singer: "Taylor Swift",
        img: "folder.jpg",
        artist:"Taylor Swift",
        audio:"songs/10 illicit affairs.mp3",
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
    let music = folklore[currentSong];
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
        if (currentSong > folklore.length-1){
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
            currentSong = folklore.length-1;
        }
        loadSong();
        audio.play();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*folklore.length);
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

for(let i = 0; i < folklore.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${folklore[i].number}</p>
    <p class="songName">${folklore[i].song}</p>
    <p class="artist">${folklore[i].artist}</p>
    <p class="time" id="${folklore[i].src}"></p>
    <audio class="${folklore[i].src}" src="${folklore[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${folklore[i].src}`)
  let liAudioTag = document.querySelector(`.${folklore[i].src}`)

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
        music = folklore[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

