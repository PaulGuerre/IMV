const express = require('express');
const cors = require('cors');
const multer = require('multer');

const { getUsers, getMessages } = require('./fileManager');

const app = express();
const port = 7000;

// Set up Multer storage to define where and how files will be stored
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Set the file name to the original name
    }
});
  
const upload = multer({ storage: storage });

/**
 * CORS
 */
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

/**
 * Receive a zip file
 */
app.post('/file', upload.single('file'), (req, res) => {
    console.log('File successfully uploaded');
    res.send('File successfully uploaded');
});


/**
 * Return the list of users
 */
app.get('/users', (req, res) => {
    const fileID = req.query.fileID;

    getUsers(fileID).then(users => {
        console.log('List of users sent');
        res.send(users);
    }).catch(err => {
        console.log(err);
        res.status(404).send('The resource you are looking for does not exist');
    })
});

/**
 * Return the list of messages, the list of participants
 */
app.get('/messages', (req, res) => {
    const { fileID, user } = req.query;

    getMessages(fileID, user).then(data => {
        console.log('Messages and participants sent');        
        res.send(data);
    }).catch(err => {
        console.log(err);
        res.status(404).send('The resource you are looking for does not exist');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
