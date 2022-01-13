const loveSongs = [
    {
        number:"1",
        album:"Love Songs",
        singer:"Britney Spears",
        img: "folder.jpg",
        song:"Everytime",
        artist:"Britney Spears",
        audio:"songs/1 Everytime.mp3",
        src: "music-1"
    },
    {
        number:"2",
        album:"Love Songs",
        singer: "Britney Spears",
        img: "folder.jpg",
        song:"Make Me",
        artist:"G-Eazy, Britney Spears",
        audio:"songs/2 Make Me... (feat. G-Eazy).mp3",
        src: "music-2"
    },
    {
        number:"3",
        album:"Love Songs",
        singer: "Britney Spears",
        img: "folder.jpg",
        song:"I'm Not a Girl, Not Yet a Woman",
        artist:"Britney Spears",
        audio:"songs/3 I'm Not a Girl, Not Yet a Woman.mp3",
        src: "music-3"
    },
    {
        number:"4",
        album:"Love Songs",
        singer: "Britney Spears",
        img: "folder.jpg",
        song:"Criminal",
        artist:"Britney Spears",
        audio:"songs/4 Criminal.mp3",
        src: "music-4"
    },
    {
        number:"5",
        album:"Love Songs",
        singer: "Britney Spears",
        img: "folder.jpg",
        song:"From The Bottom Of My Broken Heart",
        artist:"Britney Spears",
        audio:"songs/5 From the Bottom of My Broken Heart.mp3",
        src: "music-5"
    },
    {
        number:"6",
        album:"Love Songs",
        singer: "Britney Spears",
        img: "folder.jpg",
        song:"Unsual You",
        artist:"Bob Marley",
        audio:"songs/6 Unusual You.mp3",
        src: "music-6"
    },
    {
        number:"7",
        album:"Love Songs",
        singer: "Britney Spears",
        img: "folder.jpg",
        song:"Out From Under",
        artist:"Britney Spears",
        audio:"songs/7 Out from Under.mp3",
        src: "music-7"
    },
    {
        number:"8",
        album:"Love Songs",
        singer: "Britney Spears",
        img: "folder.jpg",
        song:"Trip To Your Heart",
        artist:"Britney Spears",
        audio:"songs/8 Trip to Your Heart.mp3",
        src: "music-8"
    },
    {
        number:"9",
        album:"Love Songs",
        singer: "Britney Spears",
        img: "folder.jpg",
        song:"When Your Eyes Say It",
        artist:"Britney Spears",
        audio:"songs/9 When Your Eyes Say It.mp3",
        src: "music-9"
    },
    {
        number:"10",
        album:"Love Songs",
        singer: "Britney Spears",
        img: "folder.jpg",
        song:"Heaven On Earth",
        artist:"Britney Spears",
        audio:"songs/10 Heaven On Earth.mp3",
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
    let music = loveSongs[currentSong];
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
        if (currentSong > loveSongs.length-1){
            currentSong = 0;
        }
        loadSong();
    }
    
    let prevSong = () => {
        currentSong--;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        if(currentSong < 0){
            currentSong = loveSongs.length-1;
        }
        loadSong();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*loveSongs.length);
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

for(let i = 0; i < loveSongs.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${loveSongs[i].number}</p>
    <p class="songName">${loveSongs[i].song}</p>
    <p class="artist">${loveSongs[i].artist}</p>
    <p class="time" id="${loveSongs[i].src}"></p>
    <audio class="${loveSongs[i].src}" src="${loveSongs[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${loveSongs[i].src}`)
  let liAudioTag = document.querySelector(`.${loveSongs[i].src}`)

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
        music = loveSongs[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

