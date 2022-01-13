const confetti = [
    {
        number:"1",
        album:"Confetti",
        singer:"Little Mix",
        img: "folder.jpg",
        song:"Break Up Song",
        artist:"Little Mix",
        audio:"songs/01. Break Up Song.mp3",
        src: "music-1"
    },
    {
        number:"2",
        album:"Confetti",
        singer:"Little Mix",
        img: "folder.jpg",
        song:"Holiday",
        artist:"Little Mix",
        audio:"songs/02. Holiday.mp3",
        src: "music-2"
    },
    {
        number:"3",
        album:"Confetti",
        singer:"Little Mix",
        img: "folder.jpg",
        song:"Sweet Melody",
        artist:"Little Mix",
        audio:"songs/03. Sweet Melody.mp3",
        src: "music-3"
    },
    {
        number:"4",
        album:"Confetti",
        singer:"Little Mix",
        img: "folder.jpg",
        song:"Confetti",
        artist:"Little Mix",
        audio:"songs/04. Confetti.mp3",
        src: "music-4"
    },
    {
        number:"5",
        album:"Confetti",
        singer:"Little Mix",
        img: "folder.jpg",
        song:"Happiness",
        artist:"Little Mix",
        audio:"songs/05. Happiness.mp3",
        src: "music-5"
    },
    {
        number:"6",
        album:"Confetti",
        singer:"Little Mix",
        img: "folder.jpg",
        song:"Not a Pop Song",
        artist:"Little Mix ",     
        audio:"songs/06. Not a Pop Song.mp3",
        src: "music-6"
    },
    {
        number:"7",
        album:"Confetti",
        singer:"Little Mix",
        img: "folder.jpg",
        song:"Nothing But My Feelings",
        artist:"Little Mix",
        audio:"songs/07. Nothing But My Feelings.mp3",
        src: "music-7"
    },
    {
        number:"8",
        album:"Confetti",
        singer:"Little Mix",
        img: "folder.jpg",
        song:"Gloves Up",
        artist:"Little Mix",
        audio:"songs/08. Gloves Up.mp3",
        src: "music-8"
    },
    {
        number:"9",
        album:"Confetti",
        singer:"Little Mix",
        img: "folder.jpg",
        song:"A Mess(Happy 4 U)",
        artist:"Little Mix",
        audio:"songs/09. A Mess (Happy 4 U).mp3",
        src: "music-9"
    },
    {
        number:"10",
        album:"Confetti",
        singer:"Little Mix",
        img: "folder.jpg",
        song:"My Love Won't Let You Down",
        artist:"Little Mix",
        audio:"songs/10. My Love Won't Let You Down.mp3",
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
    let music = confetti[currentSong];
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
        if (currentSong > confetti.length-1){
            currentSong = 0;
        }
        loadSong();
    }
    
    let prevSong = () => {
        currentSong--;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        if(currentSong < 0){
            currentSong = confetti.length-1;
        }
        loadSong();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*confetti.length);
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

for(let i = 0; i < confetti.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${confetti[i].number}</p>
    <p class="songName">${confetti[i].song}</p>
    <p class="artist">${confetti[i].artist}</p>
    <p class="time" id="${confetti[i].src}"></p>
    <audio class="${confetti[i].src}" src="${confetti[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)
  let liAudioDuration = document.querySelector(`#${confetti[i].src}`)
  let liAudioTag = document.querySelector(`.${confetti[i].src}`)

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
        music = confetti[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

