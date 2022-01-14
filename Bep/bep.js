const mastersOfTheSun = [
    {
        number:"1",
        album:"Masters Of The Sun",
        singer:"Black Eyed Peas",
        img:"folder.jpg",
        song:"Back To HipHop",
        artist:"Nas, Black Eyed Peas",
        audio:"songs/01. BACK 2 HIPHOP (feat. Nas).mp3" ,
        src: "music-1"
    },
    {
        number:"2",
        album:"Masters Of The Sun",
        singer:"Black Eyed Peas",
        img:"folder.jpg",
        song:"Yes Or No",
        artist:"Black Eyed Peas",
        audio:"songs/02. YES OR NO.mp3",
        src: "music-2"
    },
    {
        number:"3",
        album:"Masters Of The Sun",
        singer:"Black Eyed Peas",
        img:"folder.jpg",
        song:"Get Ready",
        artist:"Black Eyed Peas",
        audio:"songs/03. GET READY.mp3",
        src: "music-3"
    },
    {
        number:"4",
        album:"Masters Of The Sun",
        singer:"Black Eyed Peas",
        img:"folder.jpg",
        song:"4Ever",
        artist:"Esthero, Black Eyed Peas",
        audio:"songs/04. 4EVER (feat. Esthero).mp3",
        src: "music-4"
    },
    {
        number:"5",
        album:"Masters Of The Sun",
        singer:"Black Eyed Peas",
        img:"folder.jpg",
        song:"Constant",
        artist:"slick Rick, Black Eyed Peas",
        audio:"songs/05. CONSTANT pt.1 pt.2 (feat. Slick Rick).mp3",
        src: "music-5"
    },
    {
        number:"6",
        album:"Masters Of The Sun",
        singer:"Black Eyed Peas",
        img:"folder.jpg",
        song:"Dopeness",
        artist:"CL, Black Eyed Peas",
        audio:"songs/06. DOPENESS (feat. CL).mp3",
        src: "music-6"
    },
    {
        number:"7",
        album:"Masters Of The Sun",
        singer:"Black Eyed Peas",
        img:"folder.jpg",
        song:"All Around The World",
        artist:"Phife Dawg, Ali Shaheed Muhammad & Posdnuos, Black Eyed Peas",
        audio:"songs/07. ALL AROUND THE WORLD (feat. Phife Dawg, Ali Shaheed Muhammad & Posdnuos).mp3",
        src: "music-7"
    },
    {
        number:"8",
        album:"Masters Of The Sun",
        singer:"Black Eyed Peas",
        img:"folder.jpg",
        song:"New Wave",
        artist:"Black Eyed Peas",
        audio:"songs/08. NEW WAVE.mp3",
        src: "music-8"
        
    },
    {
        number:"9",
        album:"Masters Of The Sun",
        singer:"Black Eyed Peas",
        img:"folder.jpg",
        song:"Vibrations",
        artist:"Black Eyed Peas",
        audio:"songs/09. VIBRATIONS pt.1 pt.2.mp3",
        src: "music-9"
    },
    {
        number:"10",
        album:"Masters Of The Sun",
        singer:"Black Eyed Peas",
        img:"folder.jpg",
        song:"Wings",
        artist:"Nicole Scherzinger, Black Eyed Peas",
        audio:"songs/10. WINGS (feat. Nicole Scherzinger).mp3",
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
    let music = mastersOfTheSun[currentSong];
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
        if (currentSong > mastersOfTheSun.length-1){
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
            currentSong = mastersOfTheSun.length-1;
        }
        loadSong();
        audio.play();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*mastersOfTheSun.length);
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

for(let i = 0; i < mastersOfTheSun.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${mastersOfTheSun[i].number}</p>
    <p class="songName">${mastersOfTheSun[i].song}</p>
    <p class="artist">${mastersOfTheSun[i].artist}</p>
    <p class="time" id="${mastersOfTheSun[i].src}"></p>
    <audio class="${mastersOfTheSun[i].src}" src="${mastersOfTheSun[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${mastersOfTheSun[i].src}`)
  let liAudioTag = document.querySelector(`.${mastersOfTheSun[i].src}`)

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
        music = mastersOfTheSun[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

