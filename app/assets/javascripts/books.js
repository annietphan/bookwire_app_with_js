// $(function() {
//   console.log('our js is actually loading!')
//   listenForClick()
// })
//
// function listenForClick() {
//   $("button#click-me").on('click', function (event) {
//     event.preventDefault()
//     console.log('you clicked a button')
//   })
// }
//
// function getReview() {
//   $.ajax({
//     url: 'http://localhost:3000/books'
//   })
// }

$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {
  $('.my_books').on('click', (event) => {
    event.preventDefault()
    history.pushState(null, null, "my_books")
    getMyBooks()
    // fetch(`/my_books.json`)
    //   .then(response => response.json())
    //   .then(books => {
    //     $('#js-content').html('')
    //     let header = '<h1><strong>My Books<strong></h1>'
    //     $('#js-content').append(header)
    //     books.forEach(book => {
    //       let newBook = new Book(book)
    //       let bookHtml = newBook.formatIndex()
    //       $('#js-content').append(bookHtml)
    //     })
    //   })
  })
  $(document).on('click', ".show_link", function(event) {
    event.preventDefault()
    $('#js-content').html('')
    let id = $(this).attr('data-id')
    fetch(`/books/${id}.json`)
    .then(response => response.json())
    .then(book => {
      let newBook = new Book(book)
      let bookHtml = newBook.formatShow()
      $('#js-content').append(bookHtml)
    })
  })

  $('#new_book').on('submit', function(event) {
    event.preventDefault()

    const values = $(this).serialize()

    $.post('/books', values)
      .done(function(data) {
        console.log(data)
      })
  })
}

const getMyBooks = () => {
  fetch(`/my_books.json`)
    .then(response => response.json())
    .then(books => {
      $('#js-content').html('')
      let header = '<h1><strong>My Books<strong></h1>'
      $('#js-content').append(header)
      books.forEach(book => {
        let newBook = new Book(book)
        let bookHtml = newBook.formatIndex()
        $('#js-content').append(bookHtml)
      })
    })
}



function Book(book) {
  this.id = book.id
  this.title = book.title
  this.author = book.author
  this.summary = book.summary
  this.book_image = book.book_image
  this.user = book.user
  this.reviews = book.reviews
  this.genre = book.genre
}

// add the rest of formatting in this method
Book.prototype.formatIndex = function() {
  let bookHtml = `
    <a href="/books/${this.id}" data-id='${this.id}' class ="show_link"><h3>${this.title}</h3></a>
  `
  return bookHtml
}

// add the rest of formatting in this method
Book.prototype.formatShow = function() {
  let bookHtml = `
    <h3>${this.title}</h3>
  `
  return bookHtml
}
