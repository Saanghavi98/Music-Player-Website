const reputation = [
    {
        number:"1",
        album: "Reputation",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Ready For It?",
        artist:"Taylor Swift",
        audio:"songs/1  ...Ready For It_.mp3",
        src: "music-1"
        
    },
    {
        number:"2",
        album: "Reputation",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Don't Blame Me",
        artist:" Taylor Swift",
        audio:"songs/2 Don't Blame Me.mp3",
        src: "music-2"
    },
    {
        number:"3",
        album: "Reputation",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Delicate",
        audio:"songs/3 Delicate.mp3",
        artist:"Taylor Swift",
        src: "music-3"
    },
    {
        number:"4",
        album: "Reputation",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Gorgeous",
        artist:"Taylor Swift",
        audio:"songs/4 Gorgeous.mp3",
        src: "music-4"
    },
    {
        number:"5",
        album: "Reputation",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Getaway Car",
        artist:"Taylor Swift",
        audio:"songs/5 Getaway Car.mp3",
        src: "music-5"
    },
    {
        number:"6",
        album: "Reputation",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"King Of My Heart",
        artist:"Taylor Swift",
        audio:"songs/6 King Of My Heart.mp3",
        src: "music-6"
    },
    {
        number:"7",
        album: "Reputation",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Dancing With Our Hands Tied",
        artist:"Taylor Swift",
        audio:"songs/7 Dancing With Our Hands Tied.mp3",
        src: "music-7"
    },
    {
        number:"8",
        album: "Reputation",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Dress",
        artist:"Taylor Swift",
        audio:"songs/8 Dress.mp3",
        src: "music-8"
    },
    {
        number:"9",
        album: "Reputation",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"Call It What You Want",
        artist:"Taylor Swift",
        audio:"songs/9 Call It What You Want.mp3",
        src: "music-9"
    },
    {
        number:"10",
        album: "Reputation",
        singer:"Taylor Swift",
        img: "folder.jpg",
        song:"New Year's Day",
        artist:"Taylor Swift",
        audio:"songs/10 New Year's Day.mp3",
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
    let music = reputation[currentSong];
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
        if (currentSong > reputation.length-1){
            currentSong = 0;
        }
        loadSong();
    }
    
    let prevSong = () => {
        currentSong--;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        if(currentSong < 0){
            currentSong = reputation.length-1;
        }
        loadSong();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*reputation.length);
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

for(let i = 0; i < reputation.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${reputation[i].number}</p>
    <p class="songName">${reputation[i].song}</p>
    <p class="artist">${reputation[i].artist}</p>
    <p class="time" id="${reputation[i].src}"></p>
    <audio class="${reputation[i].src}" src="${reputation[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${reputation[i].src}`)
  let liAudioTag = document.querySelector(`.${reputation[i].src}`)

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
        music = reputation[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

