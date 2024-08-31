import readline from "readline";
import Library from "./index.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let library = new Library();

function userInteraction() {
  console.log(
    "---------------------Welcome to Library Management System-------------------------------------"
  );
  console.log(
    "---------------------------------------------------------------------------------------------"
  );
  console.log(
    "----------------Choose Any Of The Operations You Want To Perform------------------------------"
  );
  console.log(
    "---------------------------------------------------------------------------------------------"
  );
  console.log("1 . Add Book");
  console.log("2 . Borrow Book");
  console.log("3 . Return Book");
  console.log("4 . See All Available Books");
  console.log("5 . Quit");
  console.log(
    "---------------------------------------------------------------------------------------------"
  );

  rl.question("Which Operation would you like to perform? ", (n) => {
    switch (Number(n)) {
      case 1:
        addBook();
        break;
      case 2:
        borrowBook();
        break;
      case 3:
        returnBook();
        break;
      case 4:
        viewBooks();
        break;
      case 5:
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid choice, please try again.");
        userInteraction();
    }
  });
}

function addBook() {
  rl.question("ISBN: ", (isbn) => {
    rl.question("Title: ", (title) => {
      rl.question("Author: ", (author) => {
        rl.question("Year: ", (year) => {
          library.addBook(isbn, title, author, year);
          console.log("Book Added Successfully");
          console.log(
            "---------------------------------------------------------------------------------------------"
          );
          continuePrompt();
        });
      });
    });
  });
}

function borrowBook() {
  rl.question("Enter the ISBN of the book to borrow: ", (isbn) => {
    rl.question(
      "Enter the date when you'll return the book (e.g., 2024-09-10): ",
      (date) => {
        try {
          library.borrowBook(isbn, date);
          console.log("Book Borrowed Successfully");
        } catch (error) {
          console.log(error.message);
        }
        console.log(
          "---------------------------------------------------------------------------------------------"
        );
        continuePrompt();
      }
    );
  });
}

function returnBook() {
  rl.question("Enter the ISBN of the book to return: ", (isbn) => {
    try {
      library.returnBook(isbn);
      console.log("Book Returned Successfully");
    } catch (error) {
      console.log(error.message);
    }
    console.log(
      "---------------------------------------------------------------------------------------------"
    );
    continuePrompt();
  });
}

function viewBooks() {
  const availableBooks = library.viewBooks();
  if (availableBooks.length > 0) {
    console.log("Available Books:");
    availableBooks.forEach((title, index) => {
      console.log(`${index + 1}. ${title}`);
    });
  } else {
    console.log("No books are available.");
  }
  console.log(
    "---------------------------------------------------------------------------------------------"
  );
  continuePrompt();
}

function continuePrompt() {
  rl.question(
    "Do you want to perform another operation? (yes/no): ",
    (answer) => {
      if (answer.toLowerCase() === "yes") {
        userInteraction();
      } else {
        console.log("Goodbye!");
        rl.close();
      }
    }
  );
}

// Start the interaction
userInteraction();
