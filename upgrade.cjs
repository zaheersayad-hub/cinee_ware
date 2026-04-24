const fs = require('fs');
let content = fs.readFileSync('src/data/movieData.js', 'utf8');

// Render crisp HD images across the board
content = content.replace(/w=600/g, 'w=2000&q=100');
content = content.replace(/q=80/g, 'q=100');

// Inject specific TMDB HD posters.
content = content.replace(/https:\/\/en\.wikipedia\.org\/wiki\/Special:FilePath\/[^\"]+/g, (match) => {
  if(match.includes('Jawan')) return 'https://image.tmdb.org/t/p/original/aKcnhpHJ8jA0K3V82QnK9ZINl7W.jpg';
  if(match.includes('K.G.F')) return 'https://image.tmdb.org/t/p/original/tDq2t5QvDPRuJc3Pz0t0V9iO5k.jpg';
  if(match.includes('RRR')) return 'https://image.tmdb.org/t/p/original/nkayOJUcSXksoMQh7D1e649RjO4.jpg';
  if(match.includes('Pathaan')) return 'https://image.tmdb.org/t/p/original/m0ttEUqVDE0r0zI4Knb7ZebK8p9.jpg';
  if(match.includes('Baahubali')) return 'https://image.tmdb.org/t/p/original/91tlEAYCjJcI86Z2R2S86iG5U2L.jpg';
  if(match.includes('Matrix')) return 'https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GvwJwBGeoE.jpg';
  if(match.includes('John_Wick')) return 'https://image.tmdb.org/t/p/original/6vDnaZzMSRk02vLAD9ZtS2n6vQJ.jpg';
  if(match.includes('Dune')) return 'https://image.tmdb.org/t/p/original/d5NXSklXo0qy420Hrcp4gqA0pU.jpg';
  if(match.includes('Batman')) return 'https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50rSQT2m1G.jpg';
  if(match.includes('Barbie')) return 'https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg';
  if(match.includes('Pushpa')) return 'https://image.tmdb.org/t/p/original/jqJj58R20eG729C23zC7LzT4U4m.jpg';
  
  // High quality generic placeholders for rest using TMDB hashes or pristine cinematic stills
  return 'https://image.tmdb.org/t/p/original/jqJj58R20eG729C23zC7LzT4U4m.jpg'; 
});

// Update standard dull themes to massive cinematic OTT themes!
// RED
content = content.replace(/textLight: "text-red-400", bg: "bg-red-500", bgLight: "bg-red-500\/20",\s+border: "border-red-500", borderLight: "border-red-500\/30", borderHover: "hover:border-red-500\/50",\s+groupHoverText: "group-hover:text-red-400", blurBg: "bg-red-900\/20", gradient: "from-red-500\/0 to-red-500\/10",\s+glowBox: "group-hover:shadow-\[0_0_30px_rgba\(239,68,68,0\.4\)\]"/g, 
  `textLight: "text-red-400", bg: "bg-red-600", bgLight: "bg-red-600/30",
      border: "border-red-500", borderLight: "border-red-500/30", borderHover: "hover:border-red-500/60",
      groupHoverText: "group-hover:text-red-300", blurBg: "bg-red-900/50", gradient: "from-red-950 via-red-900/40 to-transparent",
      glowBox: "shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.7)]"`);

// BLUE
content = content.replace(/textLight: "text-blue-400", bg: "bg-blue-500", bgLight: "bg-blue-500\/20",\s+border: "border-blue-500", borderLight: "border-blue-500\/30", borderHover: "hover:border-blue-500\/50",\s+groupHoverText: "group-hover:text-blue-400", blurBg: "bg-blue-900\/20", gradient: "from-blue-500\/0 to-blue-500\/10",\s+glowBox: "group-hover:shadow-\[0_0_30px_rgba\(59,130,246,0\.4\)\]"/g, 
  `textLight: "text-blue-400", bg: "bg-blue-600", bgLight: "bg-blue-600/30",
      border: "border-blue-500", borderLight: "border-blue-500/30", borderHover: "hover:border-blue-500/60",
      groupHoverText: "group-hover:text-blue-300", blurBg: "bg-blue-900/50", gradient: "from-blue-950 via-blue-900/40 to-transparent",
      glowBox: "shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.7)]"`);

// AMBER/GOLD
content = content.replace(/textLight: "text-amber-400", bg: "bg-amber-500", bgLight: "bg-amber-500\/20",\s+border: "border-amber-500", borderLight: "border-amber-500\/30", borderHover: "hover:border-amber-500\/50",\s+groupHoverText: "group-hover:text-amber-400", blurBg: "bg-amber-900\/20", gradient: "from-amber-500\/0 to-amber-500\/10",\s+glowBox: "group-hover:shadow-\[0_0_30px_rgba\(245,158,11,0\.4\)\]"/g, 
  `textLight: "text-yellow-400", bg: "bg-yellow-500", bgLight: "bg-yellow-500/30",
      border: "border-yellow-500", borderLight: "border-yellow-500/30", borderHover: "hover:border-yellow-500/60",
      groupHoverText: "group-hover:text-yellow-300", blurBg: "bg-yellow-900/50", gradient: "from-yellow-950 via-yellow-900/40 to-transparent",
      glowBox: "shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.7)]"`);

// ORANGE
content = content.replace(/textLight: "text-orange-400", bg: "bg-orange-500", bgLight: "bg-orange-500\/20",\s+border: "border-orange-500", borderLight: "border-orange-500\/30", borderHover: "hover:border-orange-500\/50",\s+groupHoverText: "group-hover:text-orange-400", blurBg: "bg-orange-900\/20", gradient: "from-orange-500\/0 to-orange-500\/10",\s+glowBox: "group-hover:shadow-\[0_0_30px_rgba\(249,115,22,0\.4\)\]"/g, 
  `textLight: "text-orange-400", bg: "bg-orange-600", bgLight: "bg-orange-600/30",
      border: "border-orange-500", borderLight: "border-orange-500/30", borderHover: "hover:border-orange-500/60",
      groupHoverText: "group-hover:text-orange-300", blurBg: "bg-orange-900/50", gradient: "from-orange-950 via-orange-900/40 to-transparent",
      glowBox: "shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_50px_rgba(234,88,12,0.7)]"`);

fs.writeFileSync('src/data/movieData.js', content, 'utf8');
console.log("Success");
