const express = require('express');
const router = express.Router();




router.get('/:pageNumber', async (req, res) => {
  let fetchedJobs = [];
  let next = true;
  let count = null
  const fetchJobs = async (pageNumber = req.params.pageNumber) => {
const itDuunitApi = `https://duunitori.fi/api/v1/fdfadafa0ccb207844460fe7a7b9c73ecc9d1a04/jobentries?area=&format=json&page=${pageNumber}&page_size=100&search=&t=1729175939&tag0=tieto-+ja+tietoliikennetekniikka`
    const response = await fetch(itDuunitApi);
    const data = await response.json();
    fetchedJobs.push(...data.results);
    count = data.count
    if (!data.next) {
      next = false
    }
  };
  try {
    await fetchJobs();
    res.json({ fetchedJobs, next, count });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(401).json(error.message);
  }
});

module.exports = router;
