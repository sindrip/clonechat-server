// DEPENDENCIES
const express = require('express');

// APP
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});