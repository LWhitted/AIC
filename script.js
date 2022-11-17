let page = 1;

const fetchAndDisplayImage = async () => {
    let searchString = document.getElementsByClassName('search-bar')[0].value;
    let urlEncodedSearchString = encodeURIComponent(searchString);
    const result = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${urlEncodedSearchString}&fields=id,title,thumbnail,date_display,artist_titles,image_id&page=${page}`);
    const parsedResponse = await result.json();
    console.log(parsedResponse)
    const htmlArray = [];
    for (let i = 0; i < parsedResponse.data.length; i++) {
        const src = `https://www.artic.edu/iiif/2/${parsedResponse.data[i].image_id}/full/843,/0/default.jpg`
        const imgHtml =
            ` <div id="artCards"class="row align-items-center"></div>
        <div class="col">
                            <div class="card" style="width: 18rem;">
                                <img src="${src}" class="card-img-top" alt="art image">
                                <div class="card-body">
                                  <h5 class="card-title">${parsedResponse.data[i].title}</h5>
                                  <p class="card-text">Artist(s):${parsedResponse.data[i].artist_titles}</p> 
                                  <p class="card-text">Dates displayed: ${parsedResponse.data[i].date_display}</p>
                                  <div class="bs-example">
                                  <button type="button" class="btn btn-secondary ms-2" data-bs-toggle="popover" title="Art Details" data-bs-trigger="hover"
                    data-bs-content="${parsedResponse.data[i].thumbnail.alt_text}">More Info!</button>
                              </div>
                                  </div>
                        </div>
                          </div>`
        htmlArray.push(imgHtml)

        const htmlString = htmlArray.join('');
        document.getElementById("imageContainer").innerHTML = htmlString;
        
        $(document).ready(function(){
            $('[data-bs-toggle="popover"]').popover();
          });
    }
}

const myForm = document.getElementById('search-form');
myForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    fetchAndDisplayImage();
});



const paginationContainer = document.getElementsByClassName("pagination")[0];

const removeActiveClass = () => {
    const currentActiveButton = document.getElementById(page);
    currentActiveButton.className = "pageNumber";
}

const addActiveClass = (pageNumber) => {
    const newActiveButton = document.getElementById(pageNumber);
    newActiveButton.className = "active pageNumber"
}

paginationContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("pageNumber") && event.target.id != page) {
        removeActiveClass();
        page = event.target.id;
        addActiveClass(page)
        fetchAndDisplayImage();
    }
})

const decrementButton = document.getElementById("decrement");
const incrementButton = document.getElementById("increment");

decrementButton.addEventListener("click", () => {
    if (page > 1) {
        removeActiveClass();
        page--
        addActiveClass(page);
        fetchAndDisplayImage();
    }
})

incrementButton.addEventListener("click", () => {
    if (page < 6) {
        removeActiveClass();
        page++
        addActiveClass(page);
        fetchAndDisplayImage();
    }
})