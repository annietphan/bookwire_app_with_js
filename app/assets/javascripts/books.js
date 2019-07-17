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
      .then((response) => response.json())
      .then(data => console.log(data))
  })
}
