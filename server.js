const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Task 1: Get all books
app.get("/api/books", async (req, res) => {
  try {
    // Fetch books from Google Books API related to JavaScript
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=javascript"
    );
    res.status(200).json(response.data.items); // Return book data
  } catch (error) {
    res.status(500).json({ message: "Error fetching books." });
  }
});

// Task 2: Get book by ISBN
app.get("/api/books/isbn/:isbn", async (req, res) => {
  const { isbn } = req.params;
  try {
    // Get book data by ISBN from Google Books API
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    res.status(200).json(response.data.items); // Return book data
  } catch (error) {
    res.status(500).json({ message: "Error fetching book by ISBN." });
  }
});

// Task 3: Get books by Author
app.get("/api/books/author/:author", async (req, res) => {
  const { author } = req.params;
  try {
    // Get books by author from Google Books API
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`
    );
    res.status(200).json(response.data.items); // Return book data
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by author." });
  }
});

// Task 4: Get books by Title
app.get("/api/books/title/:title", async (req, res) => {
  const { title } = req.params;
  try {
    // Get books by title from Google Books API
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`
    );
    res.status(200).json(response.data.items); // Return book data
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by title." });
  }
});

// Task 5: Get book Review (Mock example, Google Books API doesn't support reviews directly)
app.get("/api/books/review/:isbn", async (req, res) => {
  const { isbn } = req.params;
  try {
    // Placeholder for reviews (Google Books API doesn't directly return reviews)
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    // Returning mock reviews as an example
    res.status(200).json({ reviews: "This is a mock review for ISBN " + isbn });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book review." });
  }
});

// Task 6: Register New User (Mock example)
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Mock registration logic
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user." });
  }
});

// Task 7: Login User (Mock example)
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Mock login logic
    if (username === "user" && password === "password") {
      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in user." });
  }
});

// Task 8: Add or Modify Review (Mock example)
app.post("/api/review/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  try {
    // Mock logic for adding or modifying reviews
    res
      .status(200)
      .json({ message: `Review added/modified for ISBN: ${isbn}` });
  } catch (error) {
    res.status(500).json({ message: "Error adding or modifying review." });
  }
});

// Task 9: Delete Review (Mock example)
app.delete("/api/review/:isbn", async (req, res) => {
  const { isbn } = req.params;
  try {
    // Mock logic for deleting reviews
    res.status(200).json({ message: `Review deleted for ISBN: ${isbn}` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review." });
  }
});

// Task 10: Get all books using an async callback function
app.get("/api/books/asynccallback", async (req, res) => {
  // Defining a function that takes a callback
  const fetchBooks = (callback) => {
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=javascript")
      .then((response) => {
        callback(null, response.data.items); // callback with no error and books data
      })
      .catch((error) => {
        callback(error, null); // callback with error
      });
  };

  // Using the async callback function
  fetchBooks((error, books) => {
    if (error) {
      res.status(500).json({ message: "Error fetching books using callback." });
    } else {
      res.status(200).json(books); // Sending the fetched books as a response
    }
  });
});

// Task 11: Search by ISBN – Using Promises
app.get("/api/books/isbn/promise/:isbn", (req, res) => {
  const { isbn } = req.params;

  // Using Promise to fetch book by ISBN
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then((response) => {
      res.status(200).json(response.data.items); // Send the book data as a response
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching book by ISBN." });
    });
});

// Task 12: Search by Author – Using Promises
app.get("/api/books/author/promise/:author", (req, res) => {
  const { author } = req.params;

  // Using Promise to fetch books by author from the Google Books API
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`)
    .then((response) => {
      res.status(200).json(response.data.items); // Send the books data as a response
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching books by author." });
    });
});

// Task 13: Search by Title – Using Promises
app.get("/api/books/title/promise/:title", (req, res) => {
  const { title } = req.params;

  // Using Promise to fetch books by title from the Google Books API
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`)
    .then((response) => {
      res.status(200).json(response.data.items); // Send the books data as a response
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching books by title." });
    });
});

// Server listening on PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
