// console.log('Lets write javascipt');
// let currentSong = new Audio();
// let songs;
// let currFolder;

// function secondsToMinutesSeconds(seconds) {
//     if (isNaN(seconds) || seconds < 0) {
//         return "00:00";
//     }

//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);

//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(remainingSeconds).padStart(2, '0');

//     return `${formattedMinutes}:${formattedSeconds}`;
// }


// async function getSongs(folder) {
//     currFolder = folder;
//     let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
//     let respose = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = respose;
//     let as = div.getElementsByTagName("a")

//     songs = []

//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href.split(`/${folder}/`)[1])
//         }
//     }
 

//     //show all the songs in playlist 
//     let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
//     songUL.innerHTML = ""
//     for (const song of songs) {
//         songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="img/music.svg" alt="">
//                             <div class="info">
//                                 <div> ${song.replaceAll("%20", " ")} </div>
//                                 <div>Khush</div>
//                             </div>
//                             <div class="playnow"> 
//                                 <span>Play Now</span>
//                                 <img class="invert" src="img/play.svg" alt="  ">
//                             </div> </li>`;
//     }

//     //Attach an event listner to each song 
//     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
//         e.addEventListener("click", element => {
//             playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
//         })
//     })

    
//     return songs

// }

// const playMusic = (track, pause = false) => {
//     currentSong.src = `/${currFolder}/` + track
//     if (!pause) {
//         currentSong.play()
//         play.src = "img/pause.svg"
//     }
//     document.querySelector(".songinfo").innerHTML = decodeURI(track)
//     document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

// }

// async function displayAlbums() {
//     let a = await fetch(`http://127.0.0.1:3000/songs/`)
//     let respose = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = respose;
//     let anchors = div.getElementsByTagName("a")
//     let cardContainer = document.querySelector(".cardContainer")
//     let array = Array.from(anchors)
//        for (let index = 0; index < array.length; index++) {
//         const e = array[index];
        

//         if (e.href.includes("/songs")) {
//             let folder = (e.href.split("/").slice(-2)[0])

//             //Get the metadata of the folder
//             let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
//             let respose = await a.json();
//             console.log(respose)
//             cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
//                         <div class="play">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
//                                 fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
//                                 <path d="M5 20V4L19 12L520Z" stroke="#141B34" fill="#000" stroke-width="1.5"
//                                     stroke-linejoin="round" />
//                             </svg>
//                         </div>
                        
//                         <img src="/songs/${folder}/cover.jpg" alt="">
//                         <h2>${respose.title}</h2>
//                         <p>${respose.description}</p>
//                     </div>`
//         }
//     }

//     // Load the playlist whenever card is clicked
//     Array.from(document.getElementsByClassName("card")).forEach(e => {
//         e.addEventListener("click", async item => {
//             let songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
//             playMusic(songs[0])
//         })
//     })

// }

// async function main() {
//     //Get the list of all songs
//     await getSongs("songs/ncs")
//     playMusic(songs[0], true)

//     //Display all the albums on the page
//     displayAlbums()


//     //Attach an event listener to play, next and previous
//     play.addEventListener("click", () => {
//         if (currentSong.paused) {
//             currentSong.play()
//             play.src = "img/pause.svg"
//         }
//         else {
//             currentSong.pause()
//             play.src = "img/play.svg"
//         }
//     })

//     //Listen for timeupdate event
//     currentSong.addEventListener("timeupdate", () => {
//         document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
//         document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
//     })

//     //Add an event listener to seekbar
//     document.querySelector(".seekbar").addEventListener("click", e => {
//         let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
//         document.querySelector(".circle").style.left = percent + "%";
//         currentSong.currentTime = ((currentSong.duration) * percent) / 100
//     })

//     //Add an event listener to hamburger
//     document.querySelector(".hamburger").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "0"
//     })

//     //Add an event listener for close button
//     document.querySelector(".close").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "-120%"
//     })


//     //Add an event listener to previous 
//     previous.addEventListener("click", () => {
//         console.log("Previous clicked")
//         currentSong.pause()

//         let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
//         if ((index - 1) >= 0) {
//             playMusic(songs[index - 1])
//         }

//     })

//     //Add an event listener to next 
//     next.addEventListener("click", () => {
//         console.log("Next clicked")
//         currentSong.pause()

//         let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
//         if ((index + 1) < songs.length) {
//             playMusic(songs[index + 1])
//         }
//     })

//     //Add an event to volume
//     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
//         console.log("Setting volume to", e.target.value, "/ 100")
//         currentSong.volume = parseInt(e.target.value) / 100
//     })


//     //Add event listener to mute the track
//     document.querySelector(".volume>img").addEventListener("click", e=>{
//         if(e.target.src.includes("img/volume.svg")){
//             e.target.src = e.target.src.replace("img/volume.svg" , "img/mute.svg") 
//             currentSong.volume = 0;
//             document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
//         }
//         else{
//             e.target.src = e.target.src.replace("img/mute.svg" , "img/volume.svg")
//             currentSong.volume = .10;
//             document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
//         }
//     })

// }

// main()
































console.log('Lets write JavaScript');
let currentSong = new Audio();
let songs = [];
let currFolder;

// Function to convert seconds into mm:ss format
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// Function to fetch the list of songs and artist info
async function getSongs(artistFolder) {
    const response = await fetch(`/songs/${artistFolder}/info.json`);
    const artistInfo = await response.json(); // Get artist metadata and song list
    
    const artistSongs = artistInfo.songs;  // List of songs for the artist
    const artistName = artistInfo.title;  // Artist name
    const artistDescription = artistInfo.description;  // Description
    const coverImage = artistInfo.cover;  // Cover image for the artist
    
    songs = artistSongs;  // Store the songs array globally
    currFolder = artistFolder;  // Store the current artist folder

    // Update the UI with the artist's details
    document.querySelector(".artist-name").innerText = artistName;
    document.querySelector(".artist-description").innerText = artistDescription;
    document.querySelector(".artist-cover").src = `/songs/${artistFolder}/${coverImage}`;

    // Populate the song list
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    
    artistSongs.forEach(song => {
        songUL.innerHTML += `
            <li>
                <img class="invert" src="img/music.svg" alt="">
                <div class="info">
                    <div>${song.replaceAll("%20", " ")}</div>
                    <div>${artistName}</div>
                </div>
                <div class="playnow"> 
                    <span>Play Now</span>
                    <img class="invert" src="img/play.svg" alt="  ">
                </div> 
            </li>`;
    });

    // Attach event listeners to each song
    Array.from(songUL.getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
    });

    return songs;
}

// Function to play the music
const playMusic = (track, pause = false) => {
    currentSong.src = `/songs/${currFolder}/` + track;

    if (!pause) {
        currentSong.play();
        document.querySelector(".play-pause").src = "img/pause.svg";
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

// Function to display all albums/artist cards
async function displayAlbums() {
    const artistFolders = ['artist1', 'artist2']; // List your artist folders here
    
    let cardContainer = document.querySelector(".cardContainer");
    
    for (let artistFolder of artistFolders) {
        // Fetch artist info (metadata)
        const response = await fetch(`/songs/${artistFolder}/info.json`);
        const artistInfo = await response.json();

        const artistName = artistInfo.title;
        const coverImage = artistInfo.cover;
        const description = artistInfo.description;

        // Add artist card to UI
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.folder = artistFolder;
        card.innerHTML = `
            <div class="play">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                     fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
                    <path d="M5 20V4L19 12L520Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                          stroke-linejoin="round" />
                </svg>
            </div>
            <img src="/songs/${artistFolder}/${coverImage}" alt="Artist Cover">
            <h2>${artistName}</h2>
            <p>${description}</p>
        `;
        cardContainer.appendChild(card);

        // Add event listener to load songs when the card is clicked
        card.addEventListener("click", async () => {
            await getSongs(artistFolder); // Load songs for the clicked artist
            playMusic(songs[0], true); // Auto-play the first song
        });
    }
}

// Main function to initialize the app
async function main() {
    // Display albums (artists)
    await displayAlbums();

    // Play/Pause button functionality
    document.querySelector(".play-pause").addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            document.querySelector(".play-pause").src = "img/pause.svg";
        } else {
            currentSong.pause();
            document.querySelector(".play-pause").src = "img/play.svg";
        }
    });

    // Time update functionality (to show current time of the song)
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
    });

    // Seekbar functionality (to skip to specific time)
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });
}

// Run the main function to initialize the app
main();
