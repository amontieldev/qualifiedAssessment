function getTotalBooksCount(books) {

  //just have to return total books in array, nothing fancy
  return books.length;
}

function getTotalAccountsCount(accounts) {
  //same as above I think
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  //this one is a little fancier
  //I have to go through books, and then confirm that they are returned=false
  //I'll use memory and create a var for an array of these books
  //just gonna use the same algorithm used in books.js
  const rentedBooks = books.filter((book) => book.borrows[0].returned === false)
  return rentedBooks.length
}


function getMostCommonGenres(books) {
  //create an array of just the genres in the provided book collection
  const genreArray = books.map((book) => book.genre)
  //now to create a counter for each... 
  const counter = {};
  genreArray.map((genre) => {
    
    if(Object.keys(counter).includes(genre)){
      counter[genre] +=1;
    }else{
      counter[genre] = 1;

    }
    })
  //this is a second map to make our object an array. 
  //I'll just tack on the sort and slice to this function
  let counterArray = Object.keys(counter).map((genre) => {
    return {'name': genre, 'count': counter[genre]}
  }).sort((a,b) => b.count - a.count).slice(0,5)
  
  
  return counterArray

}

function getMostPopularBooks(books) {
  //goal is to create a similar array to the previous. 
  //I don't need to generate a counter like last time, i just need .borrows.length
  let bookPopularity = books.map((book) => {
    return {'name': book.title, 'count': book.borrows.length}
  }).sort((a,b) => b.count - a.count).slice(0,5)
  //I won't do it on the return statement but now just sort and trim
  return bookPopularity
}

function getMostPopularAuthors(books, authors) {
  //I think for this one I will need a counter
  //Author ID is how I will match the books to the author.
  //base this completely on the author then use a search for all matching books
  //I'll create the counter inside of the map, to just attach the full count
  //Probbly slow overall but it should work
  let authorBorrows = authors.map((author) => {
    let counter = 0;
    books.forEach((book) => {
      if(book.authorId == author.id){
        counter += book.borrows.length;
      }
    })
    
    return {name: author.name.first + " " + author.name.last, count: counter}
  }).sort((a,b) => b.count - a.count).slice(0,5)
  
  return authorBorrows
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

