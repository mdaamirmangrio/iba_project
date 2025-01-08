// api to find books in search bar
document.getElementById("fetchbtn").onclick = findBooks;

// Main search function    
function findBooks() { 
    let searchText = document.getElementById("bookinput").value;
   
    if (!searchText) {
        alert("Please type a book name!");
        return;
    }
    

    document.getElementById('section2').style.display = 'none';
    document.getElementById('hrbreak').style.display = 'none';
    document.getElementById('eduheading').style.display = 'none';
    
    // Showing loading message
    let bookcontainer = document.getElementById("container");
    bookcontainer.innerHTML = "<p>Loading...</p>";
    
    // Geting books from library
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(response => response.json())
        .then(data => showBooks(data.docs))
        .catch(() => bookcontainer.innerHTML = "Can't find books right now!");
}

// Showing books on the page
function showBooks(books) {
    let bookcontainer = document.getElementById("container");
    bookcontainer.innerHTML = "";

    if (!books || books.length === 0) {
        bookcontainer.innerHTML = "No books found! Try something else.";
        return;
    }
    
    // Showing first 8 books
    books.slice(0, 8).forEach(book => {
        let bookCard = document.createElement("div");
        bookCard.className = "container1";
        
        // Geting book cover image
        let coverImage = book.cover_i 
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/150?text=No+Image";
            
        // Adding book details
        bookCard.innerHTML = `
            <img class="primg" src="${coverImage}" alt="Book cover" />
            <h3>${book.title || "No Title"}</h3>
            <p>By: ${book.author_name?.[0] || "Unknown Author"}</p>
            <p>Year: ${book.first_publish_year || "Unknown"}</p>
            <div class="btn">
                <button class="get">Read</button>
                <button class="get">Download PDF</button>
            </div>
            <button class="cart">Add to Cart</button>
        `;
        
        bookcontainer.appendChild(bookCard);
    });
}
// ---------------------------------------------------------------//

// function to link pages
  function openPage(url) {
      window.open(url, '_blank');
  }
  

//   JSON file data input

const bookContainer = document.getElementById('container');
function renderBooks(books) {
  books.forEach(book => {

    bookElement = document.createElement('div');
    bookElement.className = 'container1';

    bookElement.innerHTML = `
    <div class="imgpic"> 
      <img class="primg" src="${book.image}" alt="Book Image not available">
    </div>
      <h3 class="title" >${book.title}</h3>
      <p class="author" >by ${book.author}</p>
      <h3 class="price" >$${book.price}</h3>
      <div class="btn">
        <a href="${book.readUrl}" target="_blank"><button class="get">Read</button></a>
        <a href="${book.downloadUrl}" target="_blank"><button class="get">Download PDF</button></a>
      </div>
      <button class="cart">Add to Cart</button>
    `;

    bookContainer.appendChild(bookElement);
  });
}

alert('please open in live server to fetch data')
fetch('products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch the JSON file.');
    }
    return response.json();
  })
  .then(data => renderBooks(data))
  .catch(error => console.error('Error:', error));


  // for scrooling
  function scrollToEducation() {
    const edusection = document.getElementById('eduheading');
    edusection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  /////add to cart section 
// Function to create and add book elements

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("cart")) {
      const bookElement = event.target.closest(".container1");

      if (!bookElement) {
          alert("Error: Book details not found.");
          return;
      }
      const imagePath = bookElement.querySelector(".primg")?.getAttribute("src");
      const title = bookElement.querySelector(".title")?.innerText || "Unknown Title";
      const author = bookElement.querySelector(".author")?.innerText.replace("Author: ", "") || "Unknown Author";
      const price = bookElement.querySelector(".price")?.innerText.replace("Price: ", "") || "Unknown Price";

      // Save to localStorag
      const cartItem = {imagePath, title, author, price };
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`"${title}" added to cart!`);
  }
});


