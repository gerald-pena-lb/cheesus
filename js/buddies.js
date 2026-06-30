/* ==========================================================================
   Anima Christi — Saint Buddies
   Each buddy is a cute chibi saint with a personality, encouraging
   catchphrases, a color palette, an attribute, and a signature sound.
   Chibi avatars are drawn as inline SVG (no images, no licensing, offline).
   ========================================================================== */
const SAINTS = [
  { id:"carlo", name:"St. Carlo", full:"St. Carlo Acutis", title:"Patron of Gamers", feast:"Oct 12",
    personality:"A modern teen who loved video games and computers — and loved Jesus most of all. He called the Eucharist his “highway to Heaven.”",
    cheers:["Level up your faith! 🎮","New high score!","You're leveling up!","Keep going, that was epic!"],
    look:{skin:"#f1bd95", robe:"#e63946", trim:"#ffffff", head:"hair", hair:"#3a2a1a"}, attr:"🎮", motif:"playful" },

  { id:"francis", name:"St. Francis", full:"St. Francis of Assisi", title:"Friend of Animals", feast:"Oct 4",
    personality:"Gentle and joyful, St. Francis loved every creature great and small and called the sun his brother.",
    cheers:["The animals say hello! 🐦","Peace and all good!","God shines in every sunrise!","Beautifully done!"],
    look:{skin:"#f3c19a", robe:"#8a5a2b", trim:"#6b4421", head:"hood", beard:"#6b4a2b"}, attr:"🐦", motif:"gentle" },

  { id:"therese", name:"St. Thérèse", full:"St. Thérèse of Lisieux", title:"The Little Flower", feast:"Oct 1",
    personality:"Sweet and humble, she taught us to do small things with great love.",
    cheers:["I'll send you a rose! 🌹","Small things, great love!","You're doing wonderfully!","So proud of you!"],
    look:{skin:"#f6caa6", robe:"#7a4a28", trim:"#e9dcc3", head:"veil", veil:"#3b2a1c"}, attr:"🌹", motif:"twinkle" },

  { id:"joan", name:"St. Joan", full:"St. Joan of Arc", title:"The Brave Knight", feast:"May 30",
    personality:"Fearless and faithful, St. Joan stood up bravely for what is right.",
    cheers:["Courage — onward! ⚔️","Be brave like a knight!","God gives us strength!","Victory!"],
    look:{skin:"#f3c19a", robe:"#9aa3ad", trim:"#6c757d", head:"helmet", hair:"#caa46a"}, attr:"⚔️", motif:"fanfare" },

  { id:"george", name:"St. George", full:"St. George", title:"The Dragon Slayer", feast:"Apr 23",
    personality:"Bold and brave, St. George never backed down from doing good.",
    cheers:["Slay your fears! 🐉","Be a hero today!","Stand tall and true!","Mighty work!"],
    look:{skin:"#e8b48c", robe:"#d65a5a", trim:"#9aa3ad", head:"helmet", hair:"#3a2a1a"}, attr:"🐉", motif:"fanfare" },

  { id:"nicholas", name:"St. Nicholas", full:"St. Nicholas of Myra", title:"The Gift Giver", feast:"Dec 6",
    personality:"Kind and generous — the holy bishop who became the real Santa Claus!",
    cheers:["A gift for you! 🎁","Give, and you'll receive!","Joy to you!","Wonderful!"],
    look:{skin:"#f1bd95", robe:"#c0392b", trim:"#f4d35e", head:"mitre", beard:"#ffffff"}, attr:"🎁", motif:"playful" },

  { id:"clare", name:"St. Clare", full:"St. Clare of Assisi", title:"The Peaceful Light", feast:"Aug 11",
    personality:"Calm and prayerful, St. Clare trusted God in everything.",
    cheers:["Shine God's light! ☀️","Stay peaceful and kind!","Beautiful work!","Grace to you!"],
    look:{skin:"#f3c19a", robe:"#9a8f7a", trim:"#cabfa6", head:"veil", veil:"#5a5040"}, attr:"☀️", motif:"holy" },

  { id:"lorenzo", name:"San Lorenzo", full:"St. Lorenzo Ruiz", title:"First Filipino Saint", feast:"Sep 28",
    personality:"A faithful family man from the Philippines who loved God to the very end.",
    cheers:["Mabuhay! Keep going! 📿","Faithful to the end!","Proud of you, kaibigan!","Galing!"],
    look:{skin:"#c98a52", robe:"#3a6ea5", trim:"#e9dcc3", head:"hair", hair:"#141414"}, attr:"📿", motif:"twinkle" },

  { id:"pedro", name:"San Pedro", full:"St. Pedro Calungsod", title:"The Young Hero", feast:"Apr 2",
    personality:"A brave Filipino teenager who shared his faith with courage and joy.",
    cheers:["Young and brave! ✝️","Tara, let's learn!","You've got this!","Ang galing mo!"],
    look:{skin:"#c98a52", robe:"#2e8b57", trim:"#f4d35e", head:"hair", hair:"#141414"}, attr:"🌴", motif:"playful" },

  { id:"pio", name:"Padre Pio", full:"St. Pio of Pietrelcina", title:"The Prayer Warrior", feast:"Sep 23",
    personality:"A holy friar whose motto was: pray, hope, and don't worry.",
    cheers:["Pray, hope, don't worry!","Heaven is cheering for you!","Well done, little one!","Keep praying!"],
    look:{skin:"#e8b48c", robe:"#6b4a2b", trim:"#4a3320", head:"hood", beard:"#cfcfcf"}, attr:"🕊️", motif:"holy" },

  { id:"mary", name:"Mama Mary", full:"The Blessed Virgin Mary", title:"Mother of God", feast:"all year 💙",
    personality:"The loving mother of Jesus — and our mother too. She always says yes to God.",
    cheers:["I'm praying for you! 💙","Do whatever He tells you.","My child, you shine!","I love you, anak!"],
    look:{skin:"#f6caa6", robe:"#3b6fb6", trim:"#ffffff", head:"veil", veil:"#dfe7f5"}, attr:"🌹", motif:"holy" },
];

function getSaint(id) { return SAINTS.find(s => s.id === id) || SAINTS[0]; }

/* ----- chibi SVG generator ----- */
function chibiSVG(id, size) {
  const s = getSaint(id); const L = s.look; size = size || 120;
  const skin = L.skin, robe = L.robe, trim = L.trim || "#fff";
  const halo = `<ellipse cx="50" cy="13" rx="19" ry="5.5" fill="none" stroke="#ffd23f" stroke-width="3.4"/>`;
  const head = `<circle cx="50" cy="40" r="21" fill="${skin}"/>`;
  const face = `
    <circle cx="42.5" cy="40" r="2.6" fill="#3a2f33"/>
    <circle cx="57.5" cy="40" r="2.6" fill="#3a2f33"/>
    <circle cx="37.5" cy="46" r="3.1" fill="#ff9aa2" opacity="0.55"/>
    <circle cx="62.5" cy="46" r="3.1" fill="#ff9aa2" opacity="0.55"/>
    <path d="M44 48 Q50 53 56 48" stroke="#3a2f33" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  let cap = "";
  if (L.head === "hair")
    cap = `<path d="M28 39 Q29 18 50 18 Q71 18 72 39 Q66 28 50 27 Q34 28 28 39 Z" fill="${L.hair}"/>`;
  else if (L.head === "hood")
    cap = `<path d="M26 44 Q25 15 50 15 Q75 15 74 44 L69 41 Q70 23 50 23 Q30 23 31 41 Z" fill="${robe}"/>`;
  else if (L.head === "veil")
    cap = `<path d="M25 46 Q23 13 50 13 Q77 13 75 46 Q73 30 50 28 Q27 30 25 46 Z" fill="${L.veil || trim}"/>`;
  else if (L.head === "helmet")
    cap = `<path d="M30 38 Q30 17 50 17 Q70 17 70 38 L64 36 Q64 25 50 25 Q36 25 36 36 Z" fill="#c3ccd6"/>
           <rect x="48.5" y="30" width="3" height="18" rx="1.4" fill="#c3ccd6"/>`;
  else if (L.head === "mitre")
    cap = `<path d="M37 30 Q50 1 63 30 Q50 25 37 30 Z" fill="${trim}" stroke="${robe}" stroke-width="1.6"/>
           <rect x="48.5" y="6" width="3" height="14" fill="${robe}"/><rect x="44" y="11" width="12" height="3" fill="${robe}"/>`;
  const beard = L.beard
    ? `<path d="M33 43 Q50 70 67 43 Q66 58 50 60 Q34 58 33 43 Z" fill="${L.beard}"/>` : "";
  const body = `<path d="M29 113 Q27 70 50 63 Q73 70 71 113 Z" fill="${robe}"/>
                <path d="M50 63 L43 113 L57 113 Z" fill="${trim}" opacity="0.65"/>`;
  const attr = `<text x="75" y="108" font-size="22" text-anchor="middle">${s.attr}</text>`;
  // order: halo, head, cap (crown/veil), face, beard, body, attribute
  return `<svg viewBox="0 0 100 122" width="${size}" height="${Math.round(size*1.22)}" xmlns="http://www.w3.org/2000/svg" class="chibi-svg" role="img" aria-label="${s.name}">
    ${halo}${head}${cap}${face}${beard}${body}${attr}</svg>`;
}
