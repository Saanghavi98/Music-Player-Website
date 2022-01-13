let albumsData = [
    {   address:"bebe/bebe.html",
        image:"bebe/Folder.jpg",
        albumName:"All Your Fault pt.2",
        artistName:"Bebe Rexha",
    },
    {   address:"divide/divide.html",
        image:"divide/folder.jpg",
        albumName:"Divide",
        artistName:"Ed Sheeran",
    },
    {   address:"fine line/fine.html",
        image:"fine line/folder.jpg",
        albumName:"Fine Line",
        artistName:"Harry Styles",
    },
    {   address:"olivia/olivia.html",
        image:"olivia/folder.jpg",
        albumName:"Sour",
        artistName:"Olivia Rodrigo",
    },
    {   address:"lover/lover.html",
        image:"lover/folder.jpg",
        albumName:"Lover",
        artistName: "Taylor Swift",
    },
    {   address:"bep/bep.html",
        image:"bep/Folder.jpg",
        albumName:"Master Of The Sun",
        artistName:"Black Eyed Peas",
    },
    {   address:"britney/britney.html",
        image:"britney/folder.jpg",
        albumName:"Love Songs",
        artistName:"Britney Spears",
    },
    {   address:"folklore/folklore.html",
        image:"folklore/folder.jpg",
        albumName:"Folklore",
        artistName:"Taylor Swift",
    },
    {   address:"harry/harry.html",
        image:"harry/Folder.jpg",
        albumName:"Harry Styles",
        artistName:"Harry Styles",
    },
    {   address:"reputation/reputation.html",
        image:"reputation/folder.jpg",
        albumName:"Reputation",
        artistName:"Taylor Swift",
    },
    {   address:"romance/romance.html",
        image:"romance/folder.jpg",
        albumName:"Romance",
        artistName:"Camila Cabello",
    },
    {   address:"lil/lil.html",
        image:"lil/folder.jpg",
        albumName:"Nuthin' 2 Prove",
        artistName:"Lil Yachty",
    },
    {   address:"beatles/beatles.html",
        image:"beatles/folder.jpg",
        albumName:"Essentials",
        artistName:"The Beatles",
    },
    {   address:"ritaOra/rita.html",
        image:"ritaOra/folder.jpg",
        albumName:"Phoenix",
        artistName: "Rita Ora",
    },
    {   address:"bob/bob.html",
        image: "bob/folder.jpg",
        albumName:"Songs Of Freedom",
        artistName: "Bob Marley"
    },    
    {   address:"confetti/confetti.html",
        image:"confetti/folder.jpg",
        albumName:"Confetti",
        artistName:"Little Mix",
    },

]


let albums = document.querySelector('.albums')

for(let i = 0; i < albumsData.length; i++){
    let singleAlbum = `
    <div class="swiper-slide cover">
    <a href="${albumsData[i].address}">
    <img src="${albumsData[i].image}" alt="" class="coverImage">
    <h4 class="albumName">${albumsData[i].albumName}</h4>
    <p class="artistName">${albumsData[i].artistName}</p>
    </a>
    </div>
`;
  albums.insertAdjacentHTML('beforeend', singleAlbum)
}

