const fs = require('fs');
let code = fs.readFileSync('src/data/movieData.js', 'utf8');

const additions = {
  pushpa: { year: 2021, language: 'Telugu' },
  jawan: { year: 2023, language: 'Hindi' },
  kgf: { year: 2022, language: 'Kannada' },
  rrr: { year: 2022, language: 'Telugu' },
  pathaan: { year: 2023, language: 'Hindi' },
  baahubali: { year: 2015, language: 'Telugu' },
  kalki: { year: 2024, language: 'Telugu' },
  salaar: { year: 2023, language: 'Telugu' },
  leo: { year: 2023, language: 'Tamil' },
  vikram: { year: 2022, language: 'Tamil' },
  dangal: { year: 2016, language: 'Hindi' },
  war: { year: 2019, language: 'Hindi' },
  kantara: { year: 2022, language: 'Kannada' },
  animal: { year: 2023, language: 'Hindi' },
  kabirsingh: { year: 2019, language: 'Hindi' },
  matrix: { year: 1999, language: 'English' },
  john_wick: { year: 2014, language: 'English' },
  dune: { year: 2021, language: 'English' },
  batman: { year: 2022, language: 'English' },
  barbie: { year: 2023, language: 'English' }
};

for (const key in additions) {
  const regex = new RegExp(`(${key}: \\{[\\s\\S]*?poster: "[^"]+",)`);
  code = code.replace(regex, `$1\n    id: "${key}",\n    type: "movie",\n    year: ${additions[key].year},\n    language: "${additions[key].language}",`);
}

fs.writeFileSync('src/data/movieData.js', code);
console.log("Updated data");
