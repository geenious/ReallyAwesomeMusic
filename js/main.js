/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play



let searchInput = document.querySelector("#search");
let submit = document.querySelector("#submit");
let searchResults = document.querySelector("#search-results");
let url = "https://itunes.apple.com/search?term=";

let form = document.querySelector('form');
form.addEventListener('submit', function(evt){
  evt.preventDefault();

  let val = searchInput.value;
  let finalURL = url + val;

  fetch(finalURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    let html = `<h4>Search Results:</h4>`;

    for (let i = 0; i < data.results.length; i++) {
      let obj = data.results[i];
      html += `
        <div id="result">
          <div id="album" style="background-image: url('${obj.artworkUrl100}')"></div>
          <a id="track-link" href="#" title=" ${obj.previewUrl}">${obj.trackName}</a>
          <h4>${obj.artistName}</h4>
        </div>`;
    }
    searchResults.innerHTML = html;
    let track = document.querySelector("#search-results");
    let audio = document.querySelector("#music-player");

    track.addEventListener("click", function(evt) {
      console.log(evt.target.id);

      if (evt.target.tagName === "A") {
        console.log(evt.target.title);
        let audioSource = evt.target.title;

        audio.src = audioSource;
        audio.play();
      }
    });
  });
})
