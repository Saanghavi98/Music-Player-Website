const phoenix = [
    {
        number:"1",
        song:"Anywhere",
        album: "Phoenix",
        singer: "Rita Ora",
        img: "folder.jpg",
        artist:"Rita Ora",
        audio:"songs/1. Anywhere.mp3",
        src: "music-1"
        
    },
    {
        number:"2",
        song:"Let You Love Me",
        album: "Phoenix",
        singer:"Rita Ora",
        img: "folder.jpg",
        artist:"Rita Ora",
        audio:"songs/2. Let You Love Me.mp3",
        src: "music-2"
    },
    {
        number:"3",
        song:"Lonely Together",
        album: "Phoenix",
        singer:"Rita Ora",
        img: "folder.jpg",
        artist:"Avicii, Rita Ora",
        audio:"songs/3. Lonely Together.mp3",
        src: "music-3"
    },
    {
        number:"4",
        song:"New Look",
        album: "Phoenix",
        singer:"Rita Ora",
        img: "folder.jpg",
        artist:"Rita Ora",
        audio:"songs/4. New Look.mp3",
        src: "music-4"
    },
    {
        number:"5",
        song:"Your Song",
        album: "Phoenix",
        singer:"Rita Ora",
        img: "folder.jpg",
        artist:"Rita Ora",
        audio:"songs/5. Your Song.mp3",
        src: "music-5"
    },
    {
        number:"6",
        song:"Only Want You",
        album: "Phoenix",
        singer:"Rita Ora",
        img: "folder.jpg",
        artist:"Rita Ora",
        audio:"songs/6. Only Want You.mp3",
        src: "music-6"
    },
    {
        number:"7",
        song:"First Time High",
        album: "Phoenix",
        singer:"Rita Ora",
        img: "folder.jpg",
        artist:"Rita Ora",
        audio:"songs/7. First Time High.mp3",
        src: "music-7"
    },
    {
        number:"8",
        song:"For You (Fifty Shades Freed)",
        album: "Phoenix",
        singer:"Rita Ora",
        img: "folder.jpg",
        artist:"Liam Payne, Rita Ora",
        audio:"songs/8. For You (Fifty Shades Freed).mp3",
        src: "music-8"
    },
    {
        number:"9",
        song:"Summer Love",
        album: "Phoenix",
        singer:"Rita Ora",
        img: "folder.jpg",
        artist:"Rudimental, Rita Ora",
        audio:"songs/9. Summer Love.mp3",
        src: "music-9"
    },
    {
        number:"10",
        song:"Girls",
        album: "Phoenix",
        singer:"Rita Ora",
        img: "folder.jpg",
        artist:"Rita Ora, Charlie XCX, Cardi B, Bebe Rexha",
        audio:"songs/10. Girls (feat. Cardi B, Bebe Rexha & Charli XCX).mp3",
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
    let music = phoenix[currentSong];
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
        if (currentSong > phoenix.length-1){
            currentSong = 0;
        }
        loadSong();
    }
    
    let prevSong = () => {
        currentSong--;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        if(currentSong < 0){
            currentSong = phoenix.length-1;
        }
        loadSong();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*phoenix.length);
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

for(let i = 0; i < phoenix.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${phoenix[i].number}</p>
    <p class="songName">${phoenix[i].song}</p>
    <p class="artist">${phoenix[i].artist}</p>
    <p class="time" id="${phoenix[i].src}"></p>
    <audio class="${phoenix[i].src}" src="${phoenix[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${phoenix[i].src}`)
  let liAudioTag = document.querySelector(`.${phoenix[i].src}`)

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
        music = phoenix[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

