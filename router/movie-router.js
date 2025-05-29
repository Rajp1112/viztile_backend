const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Movie = require('../models/movie-model');

const moviesFilePath = path.join(__dirname, '../config/movies.json');
let moviesData = [];
try {
  moviesData = JSON.parse(fs.readFileSync(moviesFilePath, 'utf8'));
} catch (error) {
  console.error('Error reading movies file:', error.message);
}

router.get('/movies', async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const sort = req.query.sort || 'rating';
    let genre = req.query.genre || 'All';

    const genreOptions = [
      'All',
      'Action',
      'Drama',
      'Comedy',
      'Thriller',
      'Horror',
      'Romance',
      'Adventure',
      'Sci-Fi',
      'Fantasy',
    ];

    if (genre === 'All') {
      genre = genreOptions.filter((g) => g !== 'All');
    } else {
      genre = req.query.genre.split(',');
    }

    // Sorting
    const sortParams = req.query.sort
      ? req.query.sort.split(',')
      : [sort, 'asc'];
    let sortBy = {};
    sortBy[sortParams[0]] = sortParams[1];

    // Fetch Movies from File
    const movies = await Movie.find({
      name: { $regex: search, $options: 'i' },
      genre: { $in: genre },
    })
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Movie.countDocuments({
      genre: { $in: genre },
      name: { $regex: search, $options: 'i' },
    });

    res.status(200).json({
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.post('/movies', async (req, res) => {
  try {
    await Movie.insertMany(moviesData);
    console.log(moviesData);

    res.status(201).json({ message: 'Movies inserted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error inserting movies', error: error.message });
  }
});

module.exports = router;
