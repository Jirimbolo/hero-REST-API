//Tarvittavat 

require('dotenv').config();
const express = require('express');
const app = express();
const apiroutes = require('.api');
const database = require('./database');