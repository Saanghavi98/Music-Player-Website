const nothingToProve = [
    {
        number:"1",
        album: "Nothing To Prove",
        singer: "Lil Yachty",
        img: "folder.jpg",
        song:"Gimmie My Respect",
        artist:"Lil Yachty",
        audio:"songs/01. Gimmie My Respect.mp3",
        src: "music-1"
        
    },
    {
        number:"2",
        album: "Nothing To Prove",
        singer:"Lil Yachty",
        img: "folder.jpg",
        song:"Get Dripped",
        artist:"Playboi Carti, Lil Yachty",
        audio:"songs/02. Get Dripped (feat. Playboi Carti).mp3",
        src: "music-2"
    },
    {
        number:"3",
        album: "Nothing To Prove",
        singer:"Lil Yachty",
        img: "folder.jpg",
        song:"Riley From the Boondocks",
        audio:"songs/03. Riley From the Boondocks.mp3",
        artist:"Lil Yachty",
        src: "music-3"
    },
    {
        number:"4",
        album: "Nothing To Prove",
        singer:"Lil Yachty",
        img: "folder.jpg",
        song:"I'm the Mac",
        artist:"Lil Yachty",
        audio:"songs/04. I'm the Mac.mp3",
        src: "music-4"
    },
    {
        number:"5",
        album: "Nothing To Prove",
        singer:"Lil Yachty",
        img: "folder.jpg",
        song:"Yacht Club",
        artist:"Juice WRLD, Lil Yachty",
        audio:"songs/05. Yacht Club (feat. Juice WRLD).mp3",
        src: "music-5"
    },
    {
        number:"6",
        album: "Nothing To Prove",
        singer:"Lil Yachty",
        img: "folder.jpg",
        song:"SaintLaurentYSL",
        artist:"Lil Baby, Lil Yachty",
        audio:"songs/06. SaintLaurentYSL (feat. Lil Baby).mp3",
        src: "music-6"
    },
    {
        number:"7",
        album: "Nothing To Prove",
        singer:"Lil Yachty",
        img: "folder.jpg",
        song:"We Outta Here!",
        artist:"Young Nudy, Lil Yachty",
        audio:"songs/07. We Outta Here! (feat. Young Nudy).mp3",
        src: "music-7"
    },
    {
        number:"8",
        album: "Nothing To Prove",
        singer:"Lil Yachty",
        img: "folder.jpg",
        song:"Who Want the Smoke",
        artist:"Cardi B & Offset, Lil Yachty",
        audio:"songs/08. Who Want the Smoke_ (feat. Cardi B & Offset).mp3",
        src: "music-8"
    },
    {
        number:"9",
        album: "Nothing To Prove",
        singer:"Lil Yachty",
        img: "folder.jpg",
        song:"Worth It",
        artist:"Lil Yachty",
        audio:"songs/09. Worth It.mp3",
        src: "music-9"
    },
    {
        number:"10",
        album: "Nothing To Prove",
        singer:"Lil Yachty",
        img: "folder.jpg",
        song:"Everything Good, Everything Right",
        artist:"Lil Yachty",
        audio:"songs/10. Everything Good, Everything Right.mp3",
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
    let music = nothingToProve[currentSong];
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
        if (currentSong > nothingToProve.length-1){
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
            currentSong = nothingToProve.length-1;
        }
        loadSong();
        audio.play();
    }
    
    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    
    shuffle.addEventListener('click', function(){
        currentSong = Math.floor(Math.random()*nothingToProve.length);
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

for(let i = 0; i < nothingToProve.length; i++){
    let singleSong = `
    <li class="song" id="${i}">
    <p class="number">${nothingToProve[i].number}</p>
    <p class="songName">${nothingToProve[i].song}</p>
    <p class="artist">${nothingToProve[i].artist}</p>
    <p class="time" id="${nothingToProve[i].src}"></p>
    <audio class="${nothingToProve[i].src}" src="${nothingToProve[i].audio}">
  </li>`;
  songsList.insertAdjacentHTML('beforeend', singleSong)

  let liAudioDuration = document.querySelector(`#${nothingToProve[i].src}`)
  let liAudioTag = document.querySelector(`.${nothingToProve[i].src}`)

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
        music = nothingToProve[e.target.id];
        console.log(e.target.id)
        currentSongName.textContent = music.song;
        audio.src = music.audio;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        audio.play();

    })
})
console.log(song)

