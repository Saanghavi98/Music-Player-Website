const harry = [
    {
        number:"1",
        album:"Harry",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Meet Me In The Hallway",
        artist:"Harry Styles",
        audio:"songs/01. Meet Me In The Hallway.mp3",
        src: "music-1"
    },
    {
        number:"2",
        album:"Harry",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Sign Of The Times",
        artist:"Harry Styles",
        audio:"songs/02. Sign Of The Times.mp3",
        src: "music-2"
    },
    {
        number:"3",
        album:"Harry",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Carolina",
        artist:"Harry Styles",
        audio:"songs/03. Carolina.mp3",
        src: "music-3"
    },
    {
        number:"4",
        album:"Harry",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Two Ghosts",
        artist:"Harry Styles",
        audio:"songs/04. Two Ghosts.mp3",
        src: "music-4"
    },
    {
        number:"5",
        album:"Harry",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Sweet Creatures",
        artist:"Harry Styles",
        audio:"songs/05. Sweet Creature.mp3",
        src: "music-5"
    },
    {
        number:"6",
        album:"Harry",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Only Angel",
        artist:"Harry Styles ",     
        audio:"songs/06. Only Angel.mp3",
        src: "music-6"
    },
    {
        number:"7",
        album:"Harry",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Kiwi",
        artist:"Harry Styles",
        audio:"songs/07. Kiwi.mp3",
        src: "music-7"
    },
    {
        number:"8",
        album:"Harry",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Ever Since New York",
        artist:"Harry Styles",
        audio:"songs/08. Ever Since New York.mp3",
        src: "music-8"
    },
    {
        number:"9",
        album:"Harry",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"Woman",
        artist:"Harry Styles",
        audio:"songs/09. Woman.mp3",
        src: "music-9"
    },
    {
        number:"10",
        album:"Harry",
        singer:"Harry Styles",
        img: "folder.jpg",
        song:"From The Dinning Table",
        artist:"Harry Styles",
        audio:"songs/10. From The Dining Table.mp3",
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
    let music = harry[currentSong];
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
        if (currentSong > harry.length-1){
            currentSong = 0;
        }
        loadSong();
    }
    
    let prevSong = () => {
        currentSong--;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        if(currentSong < 0){
            currentSong = harry.length-1;
        }
        loadSong();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*harry.length);
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

for(let i = 0; i < harry.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${harry[i].number}</p>
    <p class="songName">${harry[i].song}</p>
    <p class="artist">${harry[i].artist}</p>
    <p class="time" id="${harry[i].src}"></p>
    <audio class="${harry[i].src}" src="${harry[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${harry[i].src}`)
  let liAudioTag = document.querySelector(`.${harry[i].src}`)

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
        music = harry[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
cons