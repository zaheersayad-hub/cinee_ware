const https = require('https');
const movies = [
  { id: 690957, name: 'Pushpa' },
  { id: 693134, name: 'Kalki' },
  { id: 690956, name: 'Salaar' },
  { id: 1045944, name: 'Leo' },
  { id: 899112, name: 'Vikram' },
  { id: 360814, name: 'Dangal' },
  { id: 599157, name: 'War' },
  { id: 1042738, name: 'Kantara' },
  { id: 995133, name: 'Animal' },
  { id: 567609, name: 'Kabir Singh' }
];

async function fetchPoster(movie) {
  return new Promise((resolve) => {
    https.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
           const json = JSON.parse(data);
           console.log(`${movie.name}: ${json.poster_path}`);
        } catch(e) {}
        resolve();
      });
    }).on('error', () => resolve());
  });
}

(async () => {
  for(let m of movies) await fetchPoster(m);
})();
