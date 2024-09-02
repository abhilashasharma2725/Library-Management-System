const apiKey = ''; // Replace with your API key if needed

async function searchBooks() {
    const query = document.getElementById('search-bar').value;
    const url =` https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.items) {
            displayBooks(data.items);
        } else {
            displayBooks([]);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('book-list').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('slide');
        bookDiv.innerHTML = `
            <h3>${book.volumeInfo.title}</h3>
            <p><strong>Author:</strong> ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
            <p><strong>Published:</strong> ${book.volumeInfo.publishedDate || 'N/A'}</p>
            <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'}" alt="${book.volumeInfo.title}" />
            <p><a href="${book.volumeInfo.infoLink}" target="_blank">Read more</a></p>
        `;
        bookList.appendChild(bookDiv);
    });

    currentSlideIndex = 0;
    showSlides();
}

let currentSlideIndex = 0;

function moveSlide(step) {
    currentSlideIndex += step;
    showSlides();
}

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    const offset = -currentSlideIndex * (slides[0].offsetWidth + 20);
    document.querySelector('.slides').style.transform = `translateX(${offset}px)`;
}

// Initial setup
window.onload = function() {
    document.querySelector('.next').addEventListener('click', () => moveSlide(1));
    document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
};