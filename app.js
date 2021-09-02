// spinner function
const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.display = displayStyle;
}

// toggle Search Result function
const toggleSearchResult = displayStyle =>{
    document.getElementById('search-list').style.display = displayStyle;
    document.getElementById('search-found').style.display = displayStyle;
}

// input text function
const searchBookText = () =>{
    const inputField = document.getElementById('input-field');
    toggleSpinner('block');
    toggleSearchResult('none');
    searchBook(inputField.value.toLowerCase());
    inputField.value = '';
}

// API call function
const searchBook = searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => myObj(data))
}

// object function
const myObj = data =>{
    // number of search found function 
    const searchFound = document.getElementById('search-found');
    searchFound.innerHTML = `
        <p <small class="text-dark">${data.numFound} search result found</small></p> 
    `;
    // search not found function
    const searchNotFound = document.getElementById('search-not-found');
    if(data.numFound === 0){
        toggleSpinner('none');
        toggleSearchResult('none');
        searchNotFound.innerHTML = `
        <h5> No Search Found. Try again</h5> 
    `;
    }
    // search list found function call
    books(data.docs);
}

// search list found function
const books = book =>{
    const container = document.getElementById('search-list');
    container.textContent = '';
    // for each function
    book.forEach(element => {
        const div = document.createElement('div');
        // dynamic image url
        const imgUrl = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`
        console.log(imgUrl)
        div.innerHTML = `
            <div class="col">
              <div class="card custom-card-height">
                <img class="custom-height" src="${imgUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text fw-bold text-success">Author: ${element.author_name}</p>
                    <p class="card-text">Publisher: ${element.publisher}</p>
                    <p class="card-text"><small class="text-muted">Fist published year: ${element.first_publish_year}</small></p>
                </div>
              </div>
            </div>
        `;
        container.appendChild(div);
        toggleSpinner('none');
        toggleSearchResult('flex');
    });
}