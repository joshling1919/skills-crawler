# Skills-Crawler

**Process:**
1. Visit site
2. Grab all links to job postings
3. Visit next page (if it exists) and repeat above steps
4. Visit those links to job postings
5. Scan for keywords
6. Store/count specific keywords into database

**Ways to render the data:**
1. By job board
2. By time 

**Methodology:**
1. Keywords that are listed multiple times on a job posting are only counted
once. For example, if a job posting mentions 'javascript' twice, it only counts
it once. 
2. On Indeed, since sponsored postings seem to be showing up multiple times,
I try to ignore them by not selecting anything with class '.jobtitle'. 

**Current Development Approach**
1. Reference the MERN.io quick setup app as an example of a fully-fledged MERN application.
2. Incrementally build out the different parts of this app on a smaller scale.

Plan of attack:
1. Fully set up Express
2. Set up express to communicate with MongoDB through Mongoose
3. Set up React to talk to Express 
4. Add D3 to render the data 