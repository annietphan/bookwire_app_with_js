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
    fetch(`/my_books.json`)
      .then(response => response.json())
      .then(books => {
        $('#js-content').html('')
        books.forEach(book => {
          let newBook = new Book(book)
          console.log(newBook)
        })
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
