const express = require("express");
const mysql = require("mysql2"); // Use mysql2 for better support and pooling
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "meal_plan",
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your needs
  queueLimit: 0
});

// Function to get a connection from the pool
const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

app.get("/", (req, res) => {
  return res.json("From Backend Side");
});

app.get("/food", async (req, res) => {
  try {
    const connection = await getConnection();
    const sql = "SELECT * FROM food";
    connection.query(sql, (err, data) => {
      connection.release(); // Release the connection back to the pool
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  } catch (err) {
    return res.json(err);
  }
});

app.get("/favourites", async (req, res) => {
  try {
    const connection = await getConnection();
    const sql = "SELECT * FROM favourites";
    connection.query(sql, (err, data) => {
      connection.release(); // Release the connection back to the pool
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  } catch (err) {
    return res.json(err);
  }
});

app.get("/my_fridge", async (req, res) => {
  try {
    const connection = await getConnection();
    const sql = "SELECT * FROM my_fridge";
    connection.query(sql, (err, data) => {
      connection.release(); // Release the connection back to the pool
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  } catch (err) {
    return res.json(err);
  }
});

//post route:
app.post("/my_fridge", async (req, res) => {
  
  const { name, category, quantity, unit } = req.body; // Get data from request body
  console.log(req.body);
  
  if (!name || !category || !quantity || !unit) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const expiration_date = null; // You can set this dynamically if needed
  const added_date = new Date(); // Automatically set the current date
  const user_id = 1; // Set this dynamically based on your app's logic (e.g., logged-in user)

  try {
    const connection = await getConnection();
    const sql = "INSERT INTO my_fridge (user_id, food_name, category, quantity, unit, expiration_date, added_date) VALUES (?, ?, ?, ?, ?, ?, ?);"

    connection.query(
      sql,
      [user_id, name, category, quantity, unit, expiration_date, added_date],
      (err, result) => {
        connection.release(); // Release connection back to the pool

        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json({ message: "Food item added successfully", id: result.insertId });
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.listen(8081, () => {
  console.log("Server listening on port 8081");
});
