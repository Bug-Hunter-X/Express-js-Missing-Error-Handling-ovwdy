const express = require('express');
const app = express();
app.use(express.json());
app.post('/users', (req, res) => {
  const user = req.body;
  // Input validation
  if (!user || !user.name || !user.email) {
    return res.status(400).send('Missing required user data');
  }

  db.createUser(user, (err, result) => {
    if (err) {
      console.error(err);
      // More specific error handling based on error type
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('User already exists');
      }
      return res.status(500).send('Internal Server Error');
    } else {
      res.status(201).send(result);
    }
  });
});

// ... other routes with error handling