/** Express */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

/** Connect to MongoDB */
const mongoose = require('mongoose');
require('./db/mongoose');