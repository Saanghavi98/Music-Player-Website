const lover = [
    {
        number:"1",
        album: "Lover",
        singer: "Taylor Swift",
        img: "folder.jpg",
        song:"Lover",
        artist:"Taylor Swift",
        audio:"songs/01 - Lover.mp3",
        src: "music-1"
        
    },
    {
        number:"2",
        album: "Lover",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"The Man",
        artist:" Taylor Swift",
        audio:"songs/02 - The Man.mp3",
        src: "music-2"
    },
    {
        number:"3",
        album: "Lover",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Miss Americana & The Heartbreak Prince",
        audio:"songs/03 - Miss Americana & The Heartbreak Prince.mp3",
        artist:"Taylor Swift",
        src: "music-3"
    },
    {
        number:"4",
        album: "Lover",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Paper Rings",
        artist:"Taylor Swift",
        audio:"songs/04 - Paper Rings.mp3",
        src: "music-4"
    },
    {
        number:"5",
        album: "Lover",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Cornelia Streets",
        artist:"Taylor Swift",
        audio:"songs/05 - Cornelia Street.mp3",
        src: "music-5"
    },
    {
        number:"6",
        album: "Lover",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Death By A Thousand Cuts",
        artist:"Taylor Swift",
        audio:"songs/06 - Death By A Thousand Cuts.mp3",
        src: "music-6"
    },
    {
        number:"7",
        album: "Lover",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"London Boy",
        artist:"Taylor Swift",
        audio:"songs/07 - London Boy.mp3",
        src: "music-7"
    },
    {
        number:"8",
        album: "Lover",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Soon You'll Get Better",
        artist:"Dixie Chicks, Taylor Swift",
        audio:"songs/08 - Soon You’ll Get Better (feat. Dixie Chicks).mp3",
        src: "music-8"
    },
    {
        number:"9",
        album: "Lover",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"You Need To Calm Down",
        artist:"Taylor Swift",
        audio:"songs/09 - You Need To Calm Down.mp3",
        src: "music-9"
    },
    {
        number:"10",
        album: "Lover",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Me!",
        artist:"Brendon Urie of Panic! At The Disco, Taylor Swift",
        audio:"songs/10- ME! (feat. Brendon Urie of Panic! At The Disco).mp3",
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
    let music = lover[currentSong];
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
        if (currentSong > lover.length-1){
            currentSong = 0;
        }
        loadSong();
    }
    
    let prevSong = () => {
        currentSong--;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        if(currentSong < 0){
            currentSong = lover.length-1;
        }
        loadSong();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*lover.length);
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

for(let i = 0; i < lover.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${lover[i].number}</p>
    <p class="songName">${lover[i].song}</p>
    <p class="artist">${lover[i].artist}</p>
    <p class="time" id="${lover[i].src}"></p>
    <audio class="${lover[i].src}" src="${lover[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${lover[i].src}`)
  let liAudioTag = document.querySelector(`.${lover[i].src}`)

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
        music = lover[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

