function findAuthorById(authors, id) {
  //same business as in the accounts, except with author
  //uses .find to match author id to the other input, id
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  //I believe we're trying to match the id to books.id
  //should be the same as above but different value in key/value
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  //should split the books which are borrowed and those that are not
  //First thought is just create two arrays, one with books.borrows[0].returned == false
  //then second array doing the same thing but with true, then return [arr1, arr2]
  let notBorrowed = books.filter((book) => book.borrows[0].returned === true)
  let borrowed = books.filter((book) => book.borrows[0].returned === false)
  //hmm maybe theres a more efficient way to do this, but it worked!
  return [borrowed, notBorrowed]
}

function getBorrowersForBook(book, accounts) {
  //return an array for a book of all borrowers with their info and return status. 
  //limit that to 10 borrowers.
  
  //I think this means the book.borrows, which means create a var for book.borrows.ids
  const {borrows} = book;
  //this map is just to cleanly create an array to match against the accounts
  //to speed up the algo I should limit it to the first 10 somehow. 
  const borrowerIds = borrows.map((index) => index)
  let shortenedBorrowerIds = borrowerIds.slice(0,10);
  //now I have to match each borrowerId to the accounts.id and add the object to an array
  
//clear head, first the book will have an array of borrows that has an id and returned status
//next I need to attached the account information to each borrows status
  let answer = shortenedBorrowerIds.map((obj) => {
    //within here, create a variable to hold the matching account info
    const matchingAccount = accounts.find((account) => account.id === obj.id)
    return{...obj, ...matchingAccount}

  })

  return answer
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
