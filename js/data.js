/* ==========================================================================
   Cheesus — content & configuration
   --------------------------------------------------------------------------
   This is the ONLY file a non-coder needs to touch to add content.
   - ECONOMY ......... how many pesos things are worth
   - REWARDS ......... the starter Reward Store (parent can edit in-app too)
   - BADGES .......... milestone badges
   - WEEKS ........... the full 40-week journey map (titles + lesson list)
   - LESSONS ......... the actual lesson content (story + quiz)

   To add a new playable lesson: write its content in LESSONS using an id,
   then set built:true on the matching entry inside WEEKS. That's it.
   ========================================================================== */

const ECONOMY = {
  currencySymbol: "₱",
  currencyName: "pesos",
  weeklyTarget: 300,       // pesos/week goal she's aiming for
  totalWeeks: 40,
  lessonComplete: 25,      // for finishing a lesson
  perCorrect: 15,          // per correct quiz answer
  perfectBonus: 15,        // bonus for a perfect quiz
  dailyStreakBonus: 10,    // small bonus the first lesson each new day
  // A perfect 4-question lesson = 25 + (4×15) + 15 = 100. Three a week ≈ 300.
};

/* ---- Reward Store (starter set; fully editable in Parent Zone) ---------- */
const REWARDS = [
  { id: "r_icecream", emoji: "🍦", name: "Ice cream treat",            cost: 200 },
  { id: "r_screen",   emoji: "📱", name: "30 min extra screen time",   cost: 300 },
  { id: "r_movie",    emoji: "🎬", name: "Family movie night (you pick!)", cost: 500 },
  { id: "r_cash",     emoji: "💵", name: "₱100 real pocket money",     cost: 800 },
  { id: "r_toy",      emoji: "🧸", name: "A small surprise toy",       cost: 1000 },
  { id: "r_outing",   emoji: "🎡", name: "A day out of your choice",   cost: 1500 },
];

/* ---- Badges ------------------------------------------------------------- */
const BADGES = [
  { id: "b_first",   emoji: "🌱", name: "First Steps",     desc: "Finished your first lesson" },
  { id: "b_perfect", emoji: "💯", name: "Perfect!",        desc: "Got a perfect quiz" },
  { id: "b_streak3", emoji: "🔥", name: "On Fire",         desc: "3-day streak" },
  { id: "b_streak7", emoji: "⭐", name: "Faithful Week",   desc: "7-day streak" },
  { id: "b_ot",      emoji: "📜", name: "Old Testament",   desc: "Finished an Old Testament week" },
  { id: "b_easter",  emoji: "✝️", name: "He is Risen",     desc: "Learned the Easter story" },
  { id: "b_mary",    emoji: "🌹", name: "Mary's Child",    desc: "Learned about Mother Mary" },
  { id: "b_saint",   emoji: "😇", name: "Saint Seeker",    desc: "Met one of the saints" },
  { id: "b_week1",   emoji: "🏅", name: "Week One Done",   desc: "Completed all of Week 1" },
];

/* ==========================================================================
   THE 40-WEEK JOURNEY
   Each week: { week, unit, title, lessons:[ {id, title, built} ] }
   Only lessons with built:true are playable right now; the rest show
   "Coming soon" and are easy to fill in later.
   ========================================================================== */
const WEEKS = [
  // ---- Unit A: Old Testament Highlights (1–7) ----
  { week:1, unit:"Old Testament", title:"In the Beginning", lessons:[
    { id:"creation",     title:"God Creates the World",        built:true },
    { id:"adam_eve",     title:"Adam, Eve & the First Promise", built:true },
    { id:"noah",         title:"Noah and the Great Flood",     built:true },
  ]},
  { week:2, unit:"Old Testament", title:"God's Promise to Abraham", lessons:[
    { id:"abraham",  title:"Abraham's Call", built:false },
    { id:"isaac",    title:"The Promised Son", built:false },
    { id:"jacob",    title:"Jacob's Ladder", built:false },
  ]},
  { week:3, unit:"Old Testament", title:"Joseph in Egypt", lessons:[
    { id:"joseph_dreams", title:"Joseph's Colorful Coat", built:false },
    { id:"joseph_sold",   title:"Sold by his Brothers", built:false },
    { id:"joseph_forgive",title:"Forgiveness in Egypt", built:false },
  ]},
  { week:4, unit:"Old Testament", title:"Moses & the Exodus", lessons:[
    { id:"burning_bush", title:"The Burning Bush", built:false },
    { id:"red_sea",      title:"Passover & the Red Sea", built:false },
    { id:"commandments", title:"The Ten Commandments", built:false },
  ]},
  { week:5, unit:"Old Testament", title:"Entering the Promised Land", lessons:[
    { id:"jericho", title:"Joshua & the Walls of Jericho", built:false },
    { id:"gideon",  title:"Brave Gideon", built:false },
    { id:"ruth",    title:"Ruth's Loyalty", built:false },
  ]},
  { week:6, unit:"Old Testament", title:"Kings of Israel", lessons:[
    { id:"samuel", title:"God Calls Samuel", built:false },
    { id:"david_goliath", title:"David & Goliath", built:false },
    { id:"psalms", title:"King David & the Psalms", built:false },
  ]},
  { week:7, unit:"Old Testament", title:"Wisdom & the Prophets", lessons:[
    { id:"solomon", title:"Wise King Solomon", built:false },
    { id:"daniel",  title:"Daniel in the Lions' Den", built:false },
    { id:"prophets",title:"The Prophets Promise a Savior", built:false },
  ]},

  // ---- Unit B: The Life of Jesus (8–22) ----
  { week:8, unit:"New Testament", title:"Waiting for Jesus", lessons:[
    { id:"annunciation", title:"The Annunciation – Mary Says Yes", built:true },
    { id:"visitation",   title:"Mary Visits Elizabeth", built:false },
    { id:"baptist_born", title:"John the Baptist is Born", built:false },
  ]},
  { week:9, unit:"New Testament", title:"The First Christmas", lessons:[
    { id:"nativity",  title:"The Birth of Jesus", built:true },
    { id:"shepherds", title:"The Shepherds & the Angels", built:false },
    { id:"wise_men",  title:"The Three Wise Men", built:false },
  ]},
  { week:10, unit:"New Testament", title:"Jesus as a Child", lessons:[
    { id:"presentation", title:"Presented in the Temple", built:false },
    { id:"flight_egypt", title:"The Flight to Egypt", built:false },
    { id:"boy_jesus",    title:"Jesus in the Temple at 12", built:false },
  ]},
  { week:11, unit:"New Testament", title:"Jesus Begins His Mission", lessons:[
    { id:"baptism",     title:"Jesus is Baptized", built:false },
    { id:"temptation",  title:"Tested in the Desert", built:false },
    { id:"first_disciples", title:"The First Disciples", built:false },
  ]},
  { week:12, unit:"New Testament", title:"Miracles of Jesus (1)", lessons:[
    { id:"water_wine", title:"Water into Wine", built:false },
    { id:"healings",   title:"Jesus Heals the Sick", built:false },
    { id:"storm",      title:"Calming the Storm", built:false },
  ]},
  { week:13, unit:"New Testament", title:"Miracles of Jesus (2)", lessons:[
    { id:"feeding5000", title:"Feeding the 5,000", built:false },
    { id:"walk_water",  title:"Walking on Water", built:false },
    { id:"lazarus",     title:"Raising Lazarus", built:false },
  ]},
  { week:14, unit:"New Testament", title:"Jesus the Teacher", lessons:[
    { id:"beatitudes", title:"The Beatitudes", built:false },
    { id:"our_father", title:"The Our Father", built:false },
    { id:"salt_light", title:"Salt & Light", built:false },
  ]},
  { week:15, unit:"New Testament", title:"Stories Jesus Told (1)", lessons:[
    { id:"sower",        title:"The Sower", built:false },
    { id:"good_sam",     title:"The Good Samaritan", built:true },
    { id:"lost_sheep",   title:"The Lost Sheep", built:false },
  ]},
  { week:16, unit:"New Testament", title:"Stories Jesus Told (2)", lessons:[
    { id:"prodigal", title:"The Prodigal Son", built:false },
    { id:"mustard",  title:"The Mustard Seed", built:false },
    { id:"talents",  title:"The Talents", built:false },
  ]},
  { week:17, unit:"New Testament", title:"A Friend to All", lessons:[
    { id:"zacchaeus", title:"Zacchaeus up the Tree", built:false },
    { id:"children",  title:"Let the Children Come", built:false },
    { id:"martha",    title:"Mary & Martha", built:false },
  ]},
  { week:18, unit:"New Testament", title:"The Twelve Apostles", lessons:[
    { id:"twelve", title:"The Twelve are Chosen", built:false },
    { id:"peter_rock", title:"Peter the Rock", built:false },
    { id:"transfiguration", title:"The Transfiguration", built:false },
  ]},
  { week:19, unit:"New Testament", title:"Holy Week Begins", lessons:[
    { id:"palm_sunday", title:"Palm Sunday", built:false },
    { id:"temple_cleansing", title:"Jesus & the Temple", built:false },
    { id:"greatest_cmd", title:"The Greatest Commandment", built:false },
  ]},
  { week:20, unit:"New Testament", title:"The Last Supper", lessons:[
    { id:"last_supper", title:"The Last Supper & the First Eucharist", built:false },
    { id:"washing_feet", title:"Washing the Disciples' Feet", built:false },
    { id:"gethsemane", title:"The Garden of Gethsemane", built:false },
  ]},
  { week:21, unit:"New Testament", title:"The Cross", lessons:[
    { id:"arrest", title:"Jesus is Arrested", built:false },
    { id:"way_cross", title:"The Way of the Cross", built:false },
    { id:"good_friday", title:"Good Friday", built:false },
  ]},
  { week:22, unit:"New Testament", title:"Easter — He is Risen!", lessons:[
    { id:"resurrection", title:"The Resurrection", built:true },
    { id:"emmaus", title:"The Road to Emmaus", built:false },
    { id:"breakfast_sea", title:"Breakfast by the Sea", built:false },
  ]},

  // ---- Unit C: The Church is Born (23–28) ----
  { week:23, unit:"The Church", title:"The Spirit Comes", lessons:[
    { id:"ascension", title:"Jesus Returns to Heaven", built:false },
    { id:"pentecost", title:"Pentecost – the Holy Spirit", built:false },
    { id:"first_christians", title:"The First Christians", built:false },
  ]},
  { week:24, unit:"The Church", title:"The Apostles' Mission", lessons:[
    { id:"peter_church", title:"Peter Leads the Church", built:false },
    { id:"stephen", title:"Stephen, the First Martyr", built:false },
    { id:"philip", title:"Philip Spreads the News", built:false },
  ]},
  { week:25, unit:"The Church", title:"Saul Becomes Paul", lessons:[
    { id:"damascus", title:"The Road to Damascus", built:false },
    { id:"paul_mission", title:"Paul's Great Mission", built:false },
    { id:"paul_letters", title:"Paul's Letters", built:false },
  ]},
  { week:26, unit:"The Church", title:"The Good News Spreads", lessons:[
    { id:"paul_journeys", title:"Paul's Journeys", built:false },
    { id:"shipwreck", title:"Shipwreck & Rome", built:false },
    { id:"revelation", title:"A Promise of Heaven", built:false },
  ]},
  { week:27, unit:"The Church", title:"What Catholics Believe", lessons:[
    { id:"trinity", title:"The Holy Trinity", built:false },
    { id:"the_mass", title:"What Happens at Mass", built:true },
    { id:"sacraments", title:"The Seven Sacraments", built:false },
  ]},
  { week:28, unit:"The Church", title:"Talking to God", lessons:[
    { id:"sign_cross", title:"The Sign of the Cross", built:false },
    { id:"how_pray", title:"How to Pray", built:false },
    { id:"guardian_angel", title:"Your Guardian Angel", built:false },
  ]},

  // ---- Unit D: Our Mother Mary (29–32) ----
  { week:29, unit:"Mother Mary", title:"Who is Mary?", lessons:[
    { id:"mary_mother", title:"Mary, Mother of God", built:true },
    { id:"hail_mary", title:"The Hail Mary", built:true },
    { id:"immaculate", title:"The Immaculate Conception", built:true },
  ]},
  { week:30, unit:"Mother Mary", title:"Mary's Life", lessons:[
    { id:"mary_visitation", title:"The Visitation", built:true },
    { id:"mary_cross", title:"Mary at the Foot of the Cross", built:true },
    { id:"mary_apostles", title:"Mary & the Early Church", built:true },
  ]},
  { week:31, unit:"Mother Mary", title:"When Mary Appeared", lessons:[
    { id:"guadalupe", title:"Our Lady of Guadalupe", built:true },
    { id:"lourdes", title:"Our Lady of Lourdes", built:true },
    { id:"fatima", title:"Our Lady of Fatima", built:true },
  ]},
  { week:32, unit:"Mother Mary", title:"Honoring Our Mother", lessons:[
    { id:"rosary", title:"The Holy Rosary", built:true },
    { id:"assumption", title:"The Assumption", built:true },
    { id:"marian_feasts", title:"Mary's Special Days", built:true },
  ]},

  // ---- Unit E: Heroes of the Faith — the Saints (33–37) ----
  { week:33, unit:"The Saints", title:"The First Saints", lessons:[
    { id:"st_peter_paul", title:"St. Peter & St. Paul", built:true },
    { id:"st_nicholas", title:"St. Nicholas (the real Santa!)", built:true },
    { id:"st_lucy", title:"St. Lucy of Light", built:true },
  ]},
  { week:34, unit:"The Saints", title:"Brave Saints", lessons:[
    { id:"st_george", title:"St. George & the Dragon", built:true },
    { id:"st_joan", title:"St. Joan of Arc", built:true },
    { id:"st_sebastian", title:"St. Sebastian", built:true },
  ]},
  { week:35, unit:"The Saints", title:"Gentle Saints", lessons:[
    { id:"st_francis", title:"St. Francis of Assisi", built:true },
    { id:"st_clare", title:"St. Clare", built:true },
    { id:"st_anthony", title:"St. Anthony, Finder of Lost Things", built:true },
  ]},
  { week:36, unit:"The Saints", title:"Teaching Saints", lessons:[
    { id:"st_therese", title:"St. Thérèse, the Little Flower", built:true },
    { id:"st_augustine", title:"St. Augustine", built:true },
    { id:"st_aquinas", title:"St. Thomas Aquinas", built:true },
  ]},
  { week:37, unit:"The Saints", title:"Modern Saints & Heroes", lessons:[
    { id:"st_lorenzo", title:"St. Lorenzo Ruiz (first Filipino saint)", built:true },
    { id:"st_pedro", title:"St. Pedro Calungsod", built:true },
    { id:"mother_teresa", title:"St. Teresa of Calcutta", built:true },
    { id:"st_pio", title:"St. Padre Pio", built:true },
    { id:"st_carlo", title:"St. Carlo Acutis", built:true },
  ]},

  // ---- Unit F: The Church Today (38–40) ----
  { week:38, unit:"The Church Today", title:"The Pope & the Vatican", lessons:[
    { id:"who_pope", title:"Who is the Pope?", built:false },
    { id:"vatican", title:"Vatican City", built:false },
    { id:"conclave", title:"How a Pope is Chosen", built:false },
  ]},
  { week:39, unit:"The Church Today", title:"The Popes of Our Time", lessons:[
    { id:"popes_today", title:"From St. John Paul II to Pope Leo XIV", built:true },
    { id:"jp2", title:"St. John Paul II", built:false },
    { id:"vatican2", title:"A Renewed Church (Vatican II)", built:false },
  ]},
  { week:40, unit:"The Church Today", title:"Living Your Faith", lessons:[
    { id:"helping", title:"Loving Your Neighbor", built:false },
    { id:"communion_saints", title:"The Saints in Heaven", built:false },
    { id:"your_journey", title:"Your Faith Journey Continues", built:false },
  ]},
];

/* ==========================================================================
   LESSON CONTENT
   Each lesson: {
     theme: gradient key (see styles.css .scene-* classes),
     emoji: big hero emoji,
     reads: [ {h, p}, ... ]  story "cards"
     verse: { text, ref }    a memorable Golden Verse
     video: "" or youtube id (left empty until you approve a video shortlist)
     badge: optional badge id awarded on completion
     quiz: [ {q, options:[...], answer: index, explain} ]
   }
   Text is written kid-friendly and faithful to Catholic teaching, ready for
   your (or your parish's) review.
   ========================================================================== */
const LESSONS = {

  /* ---------------- Week 1 ---------------- */
  creation: {
    theme:"dawn", emoji:"🌅", badge:"b_first",
    reads:[
      { h:"In the beginning…", p:"Before anything existed, there was God. God decided to make a beautiful world out of love. On the very first day He said, “Let there be light!” — and light appeared. God is so powerful that He creates just by speaking." },
      { h:"Six days of wonders", p:"God made the sky and seas, the land with plants and trees, the sun, moon and stars, the fish and birds, and all the animals. After each one God looked and saw that it was good." },
      { h:"The very best part", p:"Last of all, God made people — a man and a woman — in His own image, to know Him and love Him. Then on the seventh day God rested. That is why Sunday is a special day of rest and worship for us." },
    ],
    verse:{ text:"In the beginning, God created the heavens and the earth.", ref:"Genesis 1:1" },
    video:"https://www.youtubekids.com/search?q=Bible+story+creation+for+kids",
    quiz:[
      { q:"What did God create on the very first day?", options:["The animals","Light","The stars","People"], answer:1, explain:"God said “Let there be light!” and there was light." },
      { q:"Whose image are people made in?", options:["The animals'","God's","The angels'","No one's"], answer:1, explain:"We are made in the image of God — that makes every person special." },
      { q:"What did God do on the seventh day?", options:["Made the sun","Rested","Made fish","Started over"], answer:1, explain:"God rested on the seventh day, which is why we keep Sunday holy." },
      { q:"How did God look at what He made?", options:["He was unhappy","He saw that it was good","He ignored it","He was tired"], answer:1, explain:"After each part of creation, God saw that it was good." },
    ],
  },

  adam_eve: {
    theme:"garden", emoji:"🍎",
    reads:[
      { h:"The beautiful garden", p:"God placed the first people, Adam and Eve, in a wonderful garden called Eden. They were friends with God and had everything they needed. God gave them just one rule: not to eat fruit from one special tree." },
      { h:"A hard choice", p:"A sneaky serpent tricked them into breaking that one rule. By choosing to disobey God, sin and sadness entered the world for the first time. This is sometimes called “the Fall.”" },
      { h:"God's loving promise", p:"Even then, God did not stop loving them. He made a promise that one day a Savior would come to make things right again. That promise points all the way forward to Jesus!" },
    ],
    verse:{ text:"The Lord God is merciful and gracious, slow to anger.", ref:"Psalm 103:8" },
    video:"https://www.youtubekids.com/search?q=Adam+and+Eve+Bible+story+for+kids",
    quiz:[
      { q:"What was the one rule God gave Adam and Eve?", options:["Don't swim","Don't eat from one special tree","Don't sleep","Don't sing"], answer:1, explain:"They could enjoy everything except fruit from one special tree." },
      { q:"Who tricked them into disobeying?", options:["A lion","A serpent","An angel","A bird"], answer:1, explain:"A sneaky serpent tempted them to break God's rule." },
      { q:"Did God stop loving them after they sinned?", options:["Yes, forever","No — He promised a Savior","He left the garden","He made a new world"], answer:1, explain:"God still loved them and promised a Savior — who would be Jesus." },
    ],
  },

  noah: {
    theme:"sea", emoji:"🌈", badge:"b_ot",
    reads:[
      { h:"One faithful family", p:"After a long time, many people had become unkind and forgot about God. But one good man named Noah still loved and listened to God." },
      { h:"Build an ark!", p:"God told Noah to build a giant boat — an ark — and to bring his family and two of every kind of animal aboard. Then it rained for forty days and forty nights, and the whole earth flooded." },
      { h:"The rainbow promise", p:"When the waters went down, God set a rainbow in the sky as a sign of His promise to always care for the world. Now whenever we see a rainbow, we can remember God keeps His promises." },
    ],
    verse:{ text:"I set my rainbow in the cloud, and it shall be a sign of the covenant.", ref:"Genesis 9:13" },
    video:"https://www.youtubekids.com/search?q=Noah%27s+ark+Bible+story+for+kids",
    quiz:[
      { q:"What did God ask Noah to build?", options:["A temple","A giant boat (ark)","A tower","A bridge"], answer:1, explain:"God told Noah to build an ark to keep his family and the animals safe." },
      { q:"How many of each animal did Noah bring?", options:["One","Two","Ten","A hundred"], answer:1, explain:"Noah brought two of every kind of animal." },
      { q:"What did God put in the sky as a promise?", options:["A star","A rainbow","A cloud","The moon"], answer:1, explain:"The rainbow is the sign of God's promise to care for the world." },
      { q:"Why did God choose Noah?", options:["He was the richest","He still loved and obeyed God","He was the strongest","He had a boat already"], answer:1, explain:"Noah was faithful to God when others had forgotten Him." },
    ],
  },

  /* ---------------- Week 8 — Mary ---------------- */
  annunciation: {
    theme:"sky", emoji:"👼", badge:"b_mary",
    reads:[
      { h:"A surprising visitor", p:"In the town of Nazareth lived a young girl named Mary who loved God with her whole heart. One day God sent the angel Gabriel to her. “Hail, full of grace, the Lord is with you!” the angel said." },
      { h:"God's special plan", p:"Gabriel told Mary that God had chosen her to be the mother of His Son, Jesus, the Savior the world had waited for. Mary was amazed and wondered how this could be." },
      { h:"Mary says “Yes”", p:"Mary trusted God completely. She answered, “I am the servant of the Lord; let it be done to me as you say.” Because Mary said yes, Jesus would come into the world. We honor Mary as the Mother of God." },
    ],
    verse:{ text:"Behold, I am the handmaid of the Lord. Let it be done to me according to your word.", ref:"Luke 1:38" },
    video:"https://www.youtubekids.com/search?q=the+Annunciation+Mary+Bible+story+for+kids",
    quiz:[
      { q:"Which angel visited Mary?", options:["Michael","Gabriel","Raphael","Peter"], answer:1, explain:"The angel Gabriel was sent by God to Mary." },
      { q:"What did the angel say Mary would become?", options:["A queen of a country","The mother of Jesus","A teacher","An angel"], answer:1, explain:"Mary was chosen to be the mother of Jesus, the Son of God." },
      { q:"How did Mary answer God?", options:["She said no","She ran away","She said yes — “let it be done to me”","She asked for gold"], answer:2, explain:"Mary trusted God and said yes to His plan." },
      { q:"What do the first words of the Hail Mary come from?", options:["Gabriel's greeting to Mary","A song","A king's letter","Noah"], answer:0, explain:"“Hail Mary, full of grace” comes from Gabriel's greeting." },
    ],
  },

  /* ---------------- Week 9 — Christmas ---------------- */
  nativity: {
    theme:"night", emoji:"⭐",
    reads:[
      { h:"The journey to Bethlehem", p:"Mary and her husband Joseph traveled to the town of Bethlehem. When they arrived, every inn was full and there was no room for them to stay." },
      { h:"Born in a stable", p:"So Jesus, the Son of God, was born in a humble stable among the animals. Mary wrapped Him in swaddling cloths and laid Him in a manger — the box where animals eat. The King of all the world chose to come gently and poor." },
      { h:"Good news of great joy", p:"That night angels filled the sky, telling shepherds, “Today a Savior is born!” The shepherds hurried to see the baby Jesus. This is the first Christmas — the day God came to be with us." },
    ],
    verse:{ text:"For unto you is born this day a Savior, who is Christ the Lord.", ref:"Luke 2:11" },
    video:"https://www.youtubekids.com/search?q=nativity+birth+of+Jesus+story+for+kids",
    quiz:[
      { q:"In what town was Jesus born?", options:["Nazareth","Jerusalem","Bethlehem","Rome"], answer:2, explain:"Jesus was born in Bethlehem." },
      { q:"Where was baby Jesus laid?", options:["In a golden bed","In a manger","In a boat","In a temple"], answer:1, explain:"Mary laid Jesus in a manger because there was no room at the inn." },
      { q:"Who first heard the good news from the angels?", options:["Kings","Shepherds","Soldiers","Fishermen"], answer:1, explain:"Angels announced Jesus' birth to shepherds in the fields." },
      { q:"What does Christmas celebrate?", options:["The day Jesus was born","The Resurrection","Noah's flood","Pentecost"], answer:0, explain:"Christmas is the birthday of Jesus — God coming to be with us." },
    ],
  },

  /* ---------------- Week 15 — Parable ---------------- */
  good_sam: {
    theme:"road", emoji:"❤️",
    reads:[
      { h:"A tricky question", p:"A man asked Jesus, “Who is my neighbor?” Instead of just answering, Jesus told a story to show what real love looks like." },
      { h:"Left on the road", p:"A traveler was attacked by robbers and left hurt on the road. A priest walked by and crossed to the other side. A temple helper did the same. Neither one stopped to help." },
      { h:"The one who cared", p:"Then a Samaritan came along — someone people looked down on. He stopped, bandaged the man's wounds, and paid for his care. Jesus said, “Go and do the same.” A neighbor is anyone who needs our love." },
    ],
    verse:{ text:"Love your neighbor as yourself.", ref:"Mark 12:31" },
    video:"https://www.youtubekids.com/search?q=Good+Samaritan+Bible+story+for+kids",
    quiz:[
      { q:"What happened to the traveler?", options:["He got lost","Robbers hurt him","He fell asleep","He found gold"], answer:1, explain:"Robbers attacked him and left him hurt on the road." },
      { q:"Who finally stopped to help?", options:["The priest","The temple helper","The Samaritan","A soldier"], answer:2, explain:"The Samaritan — someone others looked down on — stopped to help." },
      { q:"What did Jesus tell us to do?", options:["“Go and do the same”","“Walk away”","“Stay home”","“Ask for money”"], answer:0, explain:"Jesus said to go and show love like the Good Samaritan." },
      { q:"Who is our “neighbor”?", options:["Only family","Only friends","Anyone who needs our love","People next door only"], answer:2, explain:"A neighbor is anyone who needs our help and love." },
    ],
  },

  /* ---------------- Week 22 — Easter ---------------- */
  resurrection: {
    theme:"sunrise", emoji:"✝️", badge:"b_easter",
    reads:[
      { h:"A sad morning", p:"After Jesus died on the cross on Good Friday, His friends were very sad. His body was placed in a tomb cut from rock, and a huge stone was rolled in front of it." },
      { h:"The empty tomb", p:"Early on Sunday morning, some women came to the tomb — but the stone was rolled away and the tomb was empty! An angel said, “He is not here; He has risen, just as He said!”" },
      { h:"He is risen!", p:"Jesus was alive again! He had risen from the dead, conquering sin and death forever. This is Easter, the greatest and happiest day for Christians. Because Jesus rose, we have the hope of heaven." },
    ],
    verse:{ text:"He is not here; for he has risen, as he said.", ref:"Matthew 28:6" },
    video:"https://www.youtubekids.com/search?q=Easter+resurrection+of+Jesus+story+for+kids",
    quiz:[
      { q:"On what day did Jesus rise?", options:["Friday","Saturday","Sunday","Monday"], answer:2, explain:"Jesus rose on Easter Sunday." },
      { q:"What did the women find at the tomb?", options:["It was empty","It was locked","It was gone","Jesus sleeping"], answer:0, explain:"The stone was rolled away and the tomb was empty." },
      { q:"What did the angel announce?", options:["“Go home”","“He has risen!”","“Wait here”","“Be afraid”"], answer:1, explain:"The angel said, “He is not here; He has risen!”" },
      { q:"Why is Easter so important?", options:["It's a holiday off school","Jesus rose and gives us hope of heaven","It's springtime","People get eggs"], answer:1, explain:"Easter celebrates Jesus rising from the dead, our greatest hope." },
    ],
  },

  /* ---------------- Week 35 — A Saint ---------------- */
  st_francis: {
    theme:"forest", emoji:"🐦", badge:"b_saint",
    reads:[
      { h:"A rich young man", p:"Long ago in Assisi, Italy, lived a young man named Francis. His family was wealthy and he loved fine clothes and parties. But Francis felt that something was missing." },
      { h:"Choosing God", p:"One day Francis heard God calling him to a simpler life. He gave away his riches to follow Jesus and to help the poor and the sick. He wore a plain brown robe and owned almost nothing — and he was filled with joy!" },
      { h:"Brother to all creation", p:"Francis loved everything God made. He called the sun “brother” and the moon “sister,” and even preached to the birds. He started the Franciscan order. We remember St. Francis on October 4th." },
    ],
    verse:{ text:"Lord, make me an instrument of your peace.", ref:"Prayer of St. Francis" },
    video:"https://www.youtubekids.com/search?q=Saint+Francis+of+Assisi+for+kids",
    quiz:[
      { q:"Where was St. Francis from?", options:["Assisi, Italy","Paris, France","Bethlehem","Manila"], answer:0, explain:"St. Francis came from Assisi in Italy." },
      { q:"What did Francis do with his riches?", options:["Kept them","Gave them away to follow Jesus","Hid them","Bought a castle"], answer:1, explain:"He gave away his wealth to live simply and help the poor." },
      { q:"What did Francis call the sun and moon?", options:["Brother and Sister","King and Queen","Big and Little","Day and Night"], answer:0, explain:"He called the sun “brother” and the moon “sister” because he loved all God's creation." },
      { q:"What group did St. Francis start?", options:["The Franciscans","The Apostles","The shepherds","The wise men"], answer:0, explain:"St. Francis founded the Franciscan order." },
    ],
  },

  /* ---------------- Week 39 — Modern Popes ---------------- */
  popes_today: {
    theme:"royal", emoji:"⛪",
    reads:[
      { h:"The Pope, our shepherd", p:"Jesus chose St. Peter to be the first leader, or shepherd, of His Church. Ever since, there has always been a Pope to guide Catholics around the world. Let's meet some of the popes of recent times." },
      { h:"St. John Paul II & Benedict XVI", p:"St. John Paul II (Pope from 1978–2005) traveled to more countries than any pope before and especially loved young people; he is now a saint. Pope Benedict XVI, a gentle and brilliant teacher, led the Church next." },
      { h:"Pope Francis & Pope Leo XIV", p:"Pope Francis (2013–2025) was the first pope from the Americas. He reminded everyone to care for the poor and for our planet. After him, Pope Leo XIV became pope in 2025 — the first pope born in the United States. He continues to guide and love the whole Church today." },
    ],
    verse:{ text:"You are Peter, and upon this rock I will build my Church.", ref:"Matthew 16:18" },
    video:"https://www.youtubekids.com/search?q=the+Pope+Catholic+Church+for+kids",
    quiz:[
      { q:"Who was the very first Pope?", options:["St. Paul","St. Peter","St. Francis","John Paul II"], answer:1, explain:"Jesus chose St. Peter to lead His Church — the first Pope." },
      { q:"Which recent pope is now a saint?", options:["St. John Paul II","Benedict XVI","Leo XIV","Pius"], answer:0, explain:"Pope St. John Paul II was declared a saint in 2014." },
      { q:"Pope Francis was the first pope from where?", options:["Asia","The Americas","Africa","Australia"], answer:1, explain:"Pope Francis (from Argentina) was the first pope from the Americas." },
      { q:"Who is the Pope today?", options:["Pope Leo XIV","Pope Francis","Pope Benedict","St. Peter"], answer:0, explain:"Pope Leo XIV became pope in 2025 — the first pope born in the United States." },
    ],
  },

};

/* ==========================================================================
   ADDED LESSONS — Holy Mass, the Mother Mary unit, and the Saints.
   (Appended with Object.assign so the main LESSONS block stays tidy.)
   Kid-friendly and faithful to Catholic teaching — ready for your review.
   ========================================================================== */
Object.assign(LESSONS, {

  /* ---------- Week 27: the Holy Mass ---------- */
  the_mass: {
    theme:"gold", emoji:"⛪",
    reads:[
      { h:"We gather as God's family", p:"At Mass we come together to worship God. We begin with the Sign of the Cross and ask God for mercy. The Mass has two big parts: the Liturgy of the Word and the Liturgy of the Eucharist." },
      { h:"The Liturgy of the Word", p:"We listen to readings from the Bible, ending with a Gospel about Jesus. The priest explains them in the homily. Then we stand and say what we believe in the Creed, and we pray for other people." },
      { h:"The Liturgy of the Eucharist", p:"Bread and wine are brought to the altar. The priest says the very words Jesus said at the Last Supper, and by God's power the bread and wine become the Body and Blood of Jesus. We pray the Our Father and share a sign of peace." },
      { h:"Communion and going forth", p:"Those who are ready receive Jesus in Holy Communion. At the end, the priest blesses us and sends us out: “Go in peace.” We leave ready to love and serve God and others all week." },
    ],
    verse:{ text:"Do this in memory of me.", ref:"Luke 22:19" },
    video:"https://www.youtubekids.com/search?q=parts+of+the+Catholic+Mass+for+kids",
    quiz:[
      { q:"What are the two big parts of the Mass?", options:["Songs and snacks","The Word and the Eucharist","Morning and night","Reading and recess"], answer:1, explain:"The Liturgy of the Word and the Liturgy of the Eucharist." },
      { q:"How does the Mass begin?", options:["The Sign of the Cross","A song only","Communion","The homily"], answer:0, explain:"We start with the Sign of the Cross." },
      { q:"During the Liturgy of the Word we…", options:["Eat lunch","Listen to the Bible and the Gospel","Go home","Play games"], answer:1, explain:"We listen to God's Word, including a Gospel about Jesus." },
      { q:"At the Eucharist, the bread and wine become…", options:["Just symbols","The Body and Blood of Jesus","A snack","Nothing"], answer:1, explain:"By God's power they truly become the Body and Blood of Jesus." },
    ],
  },

  /* ---------- Week 29: Who is Mary? ---------- */
  mary_mother: {
    theme:"marian", emoji:"👑", badge:"b_mary",
    reads:[
      { h:"The mother of Jesus", p:"Mary is the mother of Jesus. And because Jesus is truly God, we honor Mary as the Mother of God. She is the most blessed of all women." },
      { h:"Our mother too", p:"From the Cross, Jesus gave Mary to be the mother of all His followers. So Mary is our heavenly mother. She always leads us closer to her Son, Jesus." },
    ],
    verse:{ text:"Blessed are you among women, and blessed is the fruit of your womb.", ref:"Luke 1:42" },
    video:"https://www.youtubekids.com/search?q=Mary+mother+of+Jesus+for+kids",
    quiz:[
      { q:"Whose mother is Mary?", options:["Moses","Jesus","Peter","Noah"], answer:1, explain:"Mary is the mother of Jesus, the Son of God." },
      { q:"Because Jesus is God, we call Mary the…", options:["Queen of England","Mother of God","First saint","Best singer"], answer:1, explain:"We honor Mary as the Mother of God." },
      { q:"From the Cross, Jesus gave Mary to be…", options:["A teacher","Our mother too","A queen of a country","An angel"], answer:1, explain:"Jesus gave Mary to be the mother of all His followers." },
    ],
  },
  hail_mary: {
    theme:"rose", emoji:"🌹",
    reads:[
      { h:"A prayer from the Bible", p:"The Hail Mary begins with words straight from the Bible — the angel Gabriel's greeting, “Hail Mary, full of grace,” and Elizabeth's words, “Blessed are you among women.”" },
      { h:"Asking Mary to pray", p:"In the second part we ask, “Holy Mary, Mother of God, pray for us sinners.” Just like we ask a friend to pray for us, we ask Mary — and she brings our prayers to Jesus." },
    ],
    verse:{ text:"Hail Mary, full of grace, the Lord is with you.", ref:"based on Luke 1:28" },
    video:"https://www.youtubekids.com/search?q=Hail+Mary+prayer+for+kids",
    quiz:[
      { q:"The first words of the Hail Mary come from…", options:["A song","The angel Gabriel","A king","St. Peter"], answer:1, explain:"“Hail Mary, full of grace” is Gabriel's greeting." },
      { q:"In the Hail Mary we ask Mary to…", options:["Give us money","Pray for us","Build a church","Sing"], answer:1, explain:"We ask, “Holy Mary, Mother of God, pray for us.”" },
      { q:"When we ask Mary to pray, she…", options:["Ignores us","Brings our prayers to Jesus","Falls asleep","Says no"], answer:1, explain:"Mary always leads us to her Son and prays for us." },
    ],
  },
  immaculate: {
    theme:"marian", emoji:"✨",
    reads:[
      { h:"A special grace", p:"God had a beautiful plan: Mary would be the mother of Jesus. So from the very first moment of her life, God kept Mary free from all sin. We call this the Immaculate Conception." },
      { h:"A pure home for Jesus", p:"Because Mary was full of grace, she was the perfect home for Jesus to grow inside. We celebrate the Immaculate Conception on December 8th." },
    ],
    verse:{ text:"The Lord has done great things for me, and holy is his name.", ref:"Luke 1:49" },
    video:"https://www.youtubekids.com/search?q=Immaculate+Conception+Mary+for+kids",
    quiz:[
      { q:"The Immaculate Conception means Mary was…", options:["Very rich","Free from sin from the start","A queen","A teacher"], answer:1, explain:"God kept Mary free from sin from the first moment of her life." },
      { q:"Why did God give Mary this grace?", options:["To be Jesus' mother","To be famous","To rule a land","To win a prize"], answer:0, explain:"She would be the pure home for Jesus." },
      { q:"When do we celebrate it?", options:["December 8th","Easter","July 4th","Pentecost"], answer:0, explain:"The Immaculate Conception is celebrated on December 8th." },
    ],
  },

  /* ---------- Week 30: Mary's Life ---------- */
  mary_visitation: {
    theme:"garden", emoji:"🤰",
    reads:[
      { h:"Mary helps her cousin", p:"After the angel's visit, Mary hurried to help her older cousin Elizabeth, who was also expecting a baby (John the Baptist). It was a long journey, but Mary went with love." },
      { h:"A joyful leap", p:"When Mary arrived, Elizabeth's baby leaped for joy inside her! Mary praised God with a beautiful song we call the Magnificat: “My soul proclaims the greatness of the Lord.”" },
    ],
    verse:{ text:"My soul proclaims the greatness of the Lord.", ref:"Luke 1:46" },
    video:"https://www.youtubekids.com/search?q=the+Visitation+Mary+Elizabeth+for+kids",
    quiz:[
      { q:"Who did Mary go to help?", options:["Her cousin Elizabeth","A queen","A soldier","Noah"], answer:0, explain:"Mary went to help her cousin Elizabeth." },
      { q:"What did Elizabeth's baby do?", options:["Cried","Leaped for joy","Slept","Sang"], answer:1, explain:"Baby John leaped for joy inside Elizabeth." },
      { q:"Mary's song of praise is called the…", options:["Magnificat","Alphabet","Our Father","Hail Mary"], answer:0, explain:"Mary praised God with the Magnificat." },
    ],
  },
  mary_cross: {
    theme:"dusk", emoji:"✝️",
    reads:[
      { h:"Mary never left Jesus", p:"When Jesus suffered and died on the Cross, most people ran away. But Mary, His mother, stayed right there beside Him, even though her heart was breaking." },
      { h:"“Behold your mother”", p:"From the Cross, Jesus looked at Mary and at His friend John and said, “Behold your mother.” In that moment, Jesus gave Mary to be the mother of all of us." },
    ],
    verse:{ text:"Behold your mother.", ref:"John 19:27" },
    video:"https://www.youtubekids.com/search?q=Mary+at+the+foot+of+the+cross+for+kids",
    quiz:[
      { q:"Who stayed with Jesus at the Cross?", options:["Everyone","His mother Mary","Soldiers only","No one"], answer:1, explain:"Mary stayed beside Jesus to the end." },
      { q:"What did Jesus say from the Cross about Mary?", options:["“Behold your mother”","“Goodbye”","“Run away”","“Be afraid”"], answer:0, explain:"Jesus gave Mary to be our mother." },
      { q:"This shows us that Mary is…", options:["Our mother too","A stranger","A queen of a land","A teacher only"], answer:0, explain:"Jesus made Mary the mother of all His followers." },
    ],
  },
  mary_apostles: {
    theme:"sky", emoji:"🕊️",
    reads:[
      { h:"Praying with the Church", p:"After Jesus rose and returned to Heaven, His followers gathered to pray — and Mary was right there with them, praying like a loving mother." },
      { h:"Mother of the Church", p:"When the Holy Spirit came at Pentecost, Mary was with the apostles. That is why we call Mary the Mother of the Church. She still prays for all of us today." },
    ],
    verse:{ text:"They all devoted themselves to prayer, together with Mary the mother of Jesus.", ref:"Acts 1:14" },
    video:"https://www.youtubekids.com/search?q=Mary+and+the+apostles+Pentecost+for+kids",
    quiz:[
      { q:"After Jesus went to Heaven, Mary…", options:["Prayed with the apostles","Went on vacation","Disappeared","Built a boat"], answer:0, explain:"Mary prayed with the early Church." },
      { q:"Mary was present when the Holy Spirit came at…", options:["Christmas","Pentecost","Easter breakfast","The wedding"], answer:1, explain:"Mary was with the apostles at Pentecost." },
      { q:"So we also call Mary the…", options:["Mother of the Church","Mayor","Queen of Egypt","First apostle"], answer:0, explain:"Mary is the Mother of the Church." },
    ],
  },

  /* ---------- Week 31: When Mary Appeared ---------- */
  guadalupe: {
    theme:"rose", emoji:"🌹",
    reads:[
      { h:"A visit in Mexico", p:"In 1531, Mary appeared to a humble man named St. Juan Diego on a hill in Mexico. She spoke kindly and asked that a church be built so she could comfort her children." },
      { h:"Roses in winter", p:"As a sign, Mary filled Juan Diego's cloak with roses — in winter! When he opened the cloak, a beautiful picture of Mary was on it. That image, Our Lady of Guadalupe, is still treasured today." },
    ],
    verse:{ text:"Am I not here, I who am your Mother?", ref:"Words of Our Lady of Guadalupe" },
    video:"https://www.youtubekids.com/search?q=Our+Lady+of+Guadalupe+Juan+Diego+for+kids",
    quiz:[
      { q:"Where did Our Lady of Guadalupe appear?", options:["Mexico","France","Italy","Manila"], answer:0, explain:"Mary appeared in Mexico to St. Juan Diego." },
      { q:"What surprising sign did Mary give?", options:["Snow in summer","Roses in winter","A rainbow","A storm"], answer:1, explain:"Roses bloomed in winter as a sign." },
      { q:"What appeared on Juan Diego's cloak?", options:["A picture of Mary","Gold coins","A map","Letters"], answer:0, explain:"A beautiful image of Mary appeared on the cloak." },
    ],
  },
  lourdes: {
    theme:"marian", emoji:"💧",
    reads:[
      { h:"A girl named Bernadette", p:"In 1858 in Lourdes, France, a poor girl named St. Bernadette saw a beautiful Lady in a cave. The Lady asked people to pray and to turn back to God." },
      { h:"“I am the Immaculate Conception”", p:"The Lady told Bernadette, “I am the Immaculate Conception” — she was Mary! A spring of water appeared, and many sick people have been healed there ever since." },
    ],
    verse:{ text:"Do whatever he tells you.", ref:"John 2:5" },
    video:"https://www.youtubekids.com/search?q=Our+Lady+of+Lourdes+Bernadette+for+kids",
    quiz:[
      { q:"Who saw Mary at Lourdes?", options:["St. Bernadette","St. Juan Diego","St. Peter","St. Clare"], answer:0, explain:"St. Bernadette saw Mary in a cave in France." },
      { q:"Mary said, “I am the…”", options:["Queen of France","Immaculate Conception","Mother of cats","best singer"], answer:1, explain:"Mary revealed herself as the Immaculate Conception." },
      { q:"What appeared at Lourdes?", options:["A healing spring of water","A volcano","A castle","A rainbow"], answer:0, explain:"A spring appeared, and many are healed there." },
    ],
  },
  fatima: {
    theme:"sunrise", emoji:"☀️",
    reads:[
      { h:"Three shepherd children", p:"In 1917 in Fátima, Portugal, Mary appeared to three young shepherd children: Lúcia, Francisco, and Jacinta. She asked them to pray the Rosary every day for peace." },
      { h:"The miracle of the sun", p:"To show the visits were real, a great crowd saw the sun dance and spin in the sky! Mary's message was simple: pray, and love God." },
    ],
    verse:{ text:"Pray, pray a great deal, and make sacrifices for sinners.", ref:"Message of Fátima" },
    video:"https://www.youtubekids.com/search?q=Our+Lady+of+Fatima+for+kids",
    quiz:[
      { q:"Who did Mary appear to at Fátima?", options:["Three shepherd children","A king","Soldiers","A priest only"], answer:0, explain:"Mary appeared to Lúcia, Francisco, and Jacinta." },
      { q:"What did Mary ask them to pray?", options:["The Rosary","Nothing","A new song","A poem"], answer:0, explain:"Mary asked them to pray the Rosary daily." },
      { q:"What miracle did the crowd see?", options:["The sun dancing","Snow","A flood","A rainbow"], answer:0, explain:"Many people saw the miracle of the sun." },
    ],
  },

  /* ---------- Week 32: Honoring Our Mother ---------- */
  rosary: {
    theme:"royal", emoji:"📿",
    reads:[
      { h:"Praying with beads", p:"The Rosary is a special prayer using a string of beads. As our fingers move along the beads, we pray Our Fathers and Hail Marys." },
      { h:"Thinking about Jesus", p:"While we pray, we think about important moments — called mysteries — from the lives of Jesus and Mary, like His birth, His death, and His Resurrection. The Rosary helps our hearts grow peaceful and close to God." },
    ],
    verse:{ text:"Pray without ceasing.", ref:"1 Thessalonians 5:17" },
    video:"https://www.youtubekids.com/search?q=how+to+pray+the+Rosary+for+kids",
    quiz:[
      { q:"The Rosary is prayed using…", options:["A string of beads","A drum","A bell","A book only"], answer:0, explain:"We use rosary beads to count our prayers." },
      { q:"Which prayers do we say on the Rosary?", options:["Our Father and Hail Mary","Only songs","The alphabet","None"], answer:0, explain:"We pray Our Fathers and Hail Marys." },
      { q:"While praying, we think about…", options:["Mysteries from Jesus' life","Our homework","Cartoons","Lunch"], answer:0, explain:"We meditate on moments from the lives of Jesus and Mary." },
    ],
  },
  assumption: {
    theme:"sky", emoji:"🕊️",
    reads:[
      { h:"Taken up to Heaven", p:"At the end of her life on earth, Mary was taken up — body and soul — into Heaven. We call this the Assumption." },
      { h:"A sign of hope", p:"Mary is now the Queen of Heaven, close to her Son Jesus. Her Assumption is a happy promise that one day Heaven is waiting for us too. We celebrate it on August 15th." },
    ],
    verse:{ text:"He who is mighty has done great things for me.", ref:"Luke 1:49" },
    video:"https://www.youtubekids.com/search?q=the+Assumption+of+Mary+for+kids",
    quiz:[
      { q:"The Assumption means Mary was taken to Heaven…", options:["Body and soul","Only in a picture","By boat","In a dream"], answer:0, explain:"Mary was taken body and soul into Heaven." },
      { q:"In Heaven, Mary is the…", options:["Queen of Heaven","Mayor","Captain","Teacher"], answer:0, explain:"Mary is the Queen of Heaven, near her Son." },
      { q:"When do we celebrate the Assumption?", options:["August 15th","Christmas","Easter","New Year"], answer:0, explain:"The Assumption is celebrated on August 15th." },
    ],
  },
  marian_feasts: {
    theme:"gold", emoji:"🎉",
    reads:[
      { h:"Mary's special days", p:"Throughout the year the Church celebrates Mary with happy feast days: Mary, Mother of God (January 1), the Immaculate Conception (December 8), and the Assumption (August 15). Her birthday is September 8!" },
      { h:"The month of Mary", p:"The whole month of May is dedicated to Mary. Many children crown a statue of Mary with flowers — a tradition called the “May Crowning.” It's a joyful way to say, “We love you, Mama Mary!”" },
    ],
    verse:{ text:"All generations will call me blessed.", ref:"Luke 1:48" },
    video:"https://www.youtubekids.com/search?q=May+crowning+Mary+for+kids",
    quiz:[
      { q:"Which is a feast day of Mary?", options:["The Assumption","Thanksgiving","Halloween","Labor Day"], answer:0, explain:"The Assumption (Aug 15) is a feast of Mary." },
      { q:"Which month is specially dedicated to Mary?", options:["May","November","February","July"], answer:0, explain:"May is the month of Mary." },
      { q:"Crowning Mary's statue with flowers is called the…", options:["May Crowning","Big Game","Spring Sale","Parade"], answer:0, explain:"It's the joyful tradition of the May Crowning." },
    ],
  },

  /* ---------- Week 33: The First Saints ---------- */
  st_peter_paul: {
    theme:"royal", emoji:"🔑", badge:"b_saint",
    reads:[
      { h:"Peter, the rock", p:"Peter was a fisherman whom Jesus called to follow Him. Jesus said, “You are Peter, and on this rock I will build my Church,” and gave him the keys of the Kingdom. Peter became the very first Pope." },
      { h:"Paul, the missionary", p:"Paul once fought against Christians — until Jesus changed his heart. Then he traveled far and wide telling everyone about Jesus and wrote many letters in the Bible. Both Peter and Paul gave their lives for Jesus in Rome." },
    ],
    verse:{ text:"You are Peter, and upon this rock I will build my Church.", ref:"Matthew 16:18" },
    video:"https://www.youtubekids.com/search?q=Saint+Peter+and+Saint+Paul+for+kids",
    quiz:[
      { q:"Jesus called Peter the…", options:["Rock","Wind","Sea","Star"], answer:0, explain:"“You are Peter, and on this rock I will build my Church.”" },
      { q:"Peter became the first…", options:["Pope","King","Soldier","Doctor"], answer:0, explain:"Peter was the first Pope." },
      { q:"What did St. Paul write that's in the Bible?", options:["Many letters","Songs","Maps","Nothing"], answer:0, explain:"Paul wrote many letters teaching about Jesus." },
    ],
  },
  st_nicholas: {
    theme:"rose", emoji:"🎁",
    reads:[
      { h:"A generous bishop", p:"St. Nicholas was a kind bishop who lived long ago in a place called Myra. He loved God and loved helping the poor." },
      { h:"The real Santa Claus", p:"Nicholas secretly gave gifts to people in need, sometimes tossing gold through a window at night! His kindness is why we have Santa Claus today. We remember him on December 6th." },
    ],
    verse:{ text:"It is more blessed to give than to receive.", ref:"Acts 20:35" },
    video:"https://www.youtubekids.com/search?q=Saint+Nicholas+for+kids",
    quiz:[
      { q:"St. Nicholas was a kind…", options:["Bishop","Soldier","Sailor","King"], answer:0, explain:"He was a generous bishop of Myra." },
      { q:"What did he love to do?", options:["Secretly give gifts","Sleep all day","Collect gold","Travel only"], answer:0, explain:"He secretly gave gifts to the poor." },
      { q:"St. Nicholas became the inspiration for…", options:["Santa Claus","the Easter Bunny","a king","a knight"], answer:0, explain:"His kindness gave us Santa Claus." },
    ],
  },
  st_lucy: {
    theme:"gold", emoji:"🕯️",
    reads:[
      { h:"A name that means light", p:"St. Lucy was a brave young Christian girl. Her name means “light.” She loved Jesus so much that she gave her food and help to Christians who were hiding." },
      { h:"Shining for Jesus", p:"Even when it was dangerous to be a Christian, Lucy never hid her faith. She became a martyr, shining like a light for Jesus. We remember her on December 13th." },
    ],
    verse:{ text:"You are the light of the world.", ref:"Matthew 5:14" },
    video:"https://www.youtubekids.com/search?q=Saint+Lucy+for+kids",
    quiz:[
      { q:"What does the name Lucy mean?", options:["Light","Rain","Star","Gold"], answer:0, explain:"Lucy means “light.”" },
      { q:"How did Lucy help hiding Christians?", options:["Brought them food","Hid from them","Ran away","Told on them"], answer:0, explain:"She bravely brought them food and help." },
      { q:"Lucy is a model of…", options:["Brave faith","Laziness","Fear","Greed"], answer:0, explain:"She shone like a light for Jesus." },
    ],
  },

  /* ---------- Week 34: Brave Saints ---------- */
  st_george: {
    theme:"forest", emoji:"🐉",
    reads:[
      { h:"The brave soldier", p:"St. George was a soldier who loved God. A famous legend says a town was terrified of a fearsome dragon." },
      { h:"Facing the dragon", p:"George trusted God and bravely faced the dragon to save the people. The story reminds us to be brave and let God help us fight our fears and do what is good. We remember him on April 23rd." },
    ],
    verse:{ text:"Be strong and courageous; the Lord your God is with you.", ref:"Joshua 1:9" },
    video:"https://www.youtubekids.com/search?q=Saint+George+and+the+dragon+for+kids",
    quiz:[
      { q:"St. George was a brave…", options:["Soldier","Baker","Fisherman","Teacher"], answer:0, explain:"He was a soldier who loved God." },
      { q:"In the famous legend he faced a…", options:["Dragon","Lion","Storm","Giant"], answer:0, explain:"The legend tells of St. George and the dragon." },
      { q:"His story reminds us to be…", options:["Brave with God's help","Afraid","Selfish","Lazy"], answer:0, explain:"Be courageous and let God help us." },
    ],
  },
  st_joan: {
    theme:"dusk", emoji:"⚔️",
    reads:[
      { h:"A girl who heard God", p:"St. Joan of Arc was a young farm girl in France. She heard God calling her, through the voices of saints, to help save her country." },
      { h:"Brave and faithful", p:"Though she was young, Joan bravely led soldiers and trusted God completely. She stayed faithful even when it cost her life. Later the Church declared her a saint. Her feast is May 30th." },
    ],
    verse:{ text:"I can do all things through Christ who strengthens me.", ref:"Philippians 4:13" },
    video:"https://www.youtubekids.com/search?q=Saint+Joan+of+Arc+for+kids",
    quiz:[
      { q:"Where was St. Joan of Arc from?", options:["France","Spain","Egypt","Italy"], answer:0, explain:"Joan was a young farm girl in France." },
      { q:"What did Joan do bravely?", options:["Led soldiers, trusting God","Hid at home","Ran away","Gave up"], answer:0, explain:"She led soldiers and trusted God." },
      { q:"Joan teaches us to be…", options:["Brave and faithful","Fearful","Proud","Lazy"], answer:0, explain:"She stayed faithful to God to the end." },
    ],
  },
  st_sebastian: {
    theme:"forest", emoji:"🏹",
    reads:[
      { h:"A secret Christian", p:"St. Sebastian was a strong Roman soldier who secretly followed Jesus. He quietly encouraged other Christians to stay brave." },
      { h:"Faithful to the end", p:"When his faith was discovered, Sebastian would not give up Jesus. He became a martyr and is now the patron saint of athletes, because of his strength and courage. His feast is January 20th." },
    ],
    verse:{ text:"Be faithful unto death, and I will give you the crown of life.", ref:"Revelation 2:10" },
    video:"https://www.youtubekids.com/search?q=Saint+Sebastian+for+kids",
    quiz:[
      { q:"St. Sebastian was a Roman…", options:["Soldier","Farmer","Sailor","Baker"], answer:0, explain:"He was a strong Roman soldier." },
      { q:"He secretly was a…", options:["Christian","King","Pirate","Painter"], answer:0, explain:"He secretly followed Jesus." },
      { q:"He is the patron saint of…", options:["Athletes","Bakers","Pilots","Farmers"], answer:0, explain:"He is the patron of athletes for his strength and courage." },
    ],
  },

  /* ---------- Week 35: Gentle Saints (st_francis already built) ---------- */
  st_clare: {
    theme:"garden", emoji:"☀️",
    reads:[
      { h:"Following St. Francis", p:"St. Clare was a young woman from a rich family in Assisi. Inspired by St. Francis, she gave up her riches to live simply and follow Jesus with all her heart." },
      { h:"A light of peace", p:"Clare started a group of sisters called the Poor Clares, who pray and trust God for everything. Once, when she was sick, she saw the Mass on her wall — so she is the patron saint of television! Her feast is August 11th." },
    ],
    verse:{ text:"Love God and serve him with a glad heart.", ref:"based on Psalm 100:2" },
    video:"https://www.youtubekids.com/search?q=Saint+Clare+of+Assisi+for+kids",
    quiz:[
      { q:"St. Clare was inspired by…", options:["St. Francis","a king","a soldier","a sailor"], answer:0, explain:"She followed the example of St. Francis." },
      { q:"What did Clare give up?", options:["Her riches","Her food","Her name","Nothing"], answer:0, explain:"She gave up her riches to follow Jesus." },
      { q:"The sisters Clare started are called the…", options:["Poor Clares","Knights","Wise men","Shepherds"], answer:0, explain:"She founded the Poor Clares." },
    ],
  },
  st_anthony: {
    theme:"forest", emoji:"🔎",
    reads:[
      { h:"A wonderful preacher", p:"St. Anthony of Padua loved the Bible and could explain it so beautifully that huge crowds came to listen. He cared deeply for the poor." },
      { h:"Finder of lost things", p:"People love to ask St. Anthony for help finding lost things, with the little rhyme, “St. Anthony, please come around — something's lost and must be found!” His feast is June 13th." },
    ],
    verse:{ text:"Seek, and you will find.", ref:"Matthew 7:7" },
    video:"https://www.youtubekids.com/search?q=Saint+Anthony+of+Padua+for+kids",
    quiz:[
      { q:"St. Anthony was a great…", options:["Preacher","Pilot","Painter","Cook"], answer:0, explain:"He explained the Bible beautifully." },
      { q:"People ask St. Anthony to help find…", options:["Lost things","Lost dogs only","Treasure","Stars"], answer:0, explain:"He's known as the finder of lost things." },
      { q:"St. Anthony also cared for the…", options:["Poor","Rich only","Kings","Soldiers"], answer:0, explain:"He cared deeply for the poor." },
    ],
  },

  /* ---------- Week 36: Teaching Saints ---------- */
  st_therese: {
    theme:"rose", emoji:"🌹",
    reads:[
      { h:"The Little Flower", p:"St. Thérèse was a young nun in France who is called the “Little Flower.” She knew she couldn't do big, famous things — so she did little, ordinary things with great love." },
      { h:"The Little Way", p:"Thérèse taught her “Little Way”: smiling at someone, being patient, helping quietly — all for the love of God. She promised to send a shower of roses (blessings) from Heaven. Her feast is October 1st." },
    ],
    verse:{ text:"Do little things with great love.", ref:"St. Thérèse of Lisieux" },
    video:"https://www.youtubekids.com/search?q=Saint+Therese+Little+Flower+for+kids",
    quiz:[
      { q:"St. Thérèse is called the…", options:["Little Flower","Big Tree","Bright Star","Strong Rock"], answer:0, explain:"She is the “Little Flower.”" },
      { q:"Her “Little Way” means…", options:["Small things with great love","Big famous deeds","Being loud","Winning prizes"], answer:0, explain:"Do ordinary things with great love." },
      { q:"What did she promise to send from Heaven?", options:["A shower of roses","Snow","Letters","Gold"], answer:0, explain:"A shower of roses — blessings — from Heaven." },
    ],
  },
  st_augustine: {
    theme:"gold", emoji:"📖",
    reads:[
      { h:"A restless heart", p:"As a young man, St. Augustine made many wrong choices and forgot about God. But his mother, St. Monica, never stopped praying for him." },
      { h:"Finding peace in God", p:"At last Augustine turned to God and his life changed completely. He became a great bishop and teacher. He wrote, “Our hearts are restless until they rest in You, O God.” His feast is August 28th." },
    ],
    verse:{ text:"Our hearts are restless until they rest in you, O God.", ref:"St. Augustine" },
    video:"https://www.youtubekids.com/search?q=Saint+Augustine+for+kids",
    quiz:[
      { q:"Who prayed for young Augustine?", options:["His mother St. Monica","A king","A soldier","No one"], answer:0, explain:"His mother St. Monica prayed for him for years." },
      { q:"After he turned to God, Augustine became a…", options:["Bishop and teacher","Pirate","Farmer","Soldier"], answer:0, explain:"He became a great bishop and teacher." },
      { q:"He said our hearts are restless until they…", options:["Rest in God","Get rich","Win","Sleep"], answer:0, explain:"“…until they rest in You, O God.”" },
    ],
  },
  st_aquinas: {
    theme:"royal", emoji:"✍️",
    reads:[
      { h:"The quiet thinker", p:"St. Thomas Aquinas was so quiet as a student that classmates teased him, calling him the “dumb ox.” But his teacher said one day the whole world would hear him!" },
      { h:"Faith and reason", p:"Thomas became one of the greatest teachers ever. He showed that faith in God and using our minds go together beautifully. He wrote so much about God and even wrote hymns. His feast is January 28th." },
    ],
    verse:{ text:"Give us, O Lord, a heart to know you.", ref:"based on St. Thomas Aquinas" },
    video:"https://www.youtubekids.com/search?q=Saint+Thomas+Aquinas+for+kids",
    quiz:[
      { q:"As a student Thomas was nicknamed the…", options:["“dumb ox”","“fast fox”","“big bear”","“wise owl”"], answer:0, explain:"Classmates teased him as the “dumb ox,” but he was brilliant." },
      { q:"Thomas showed that faith and ___ go together.", options:["our minds (reason)","money","sports","music only"], answer:0, explain:"Faith and reason belong together." },
      { q:"He became one of the greatest…", options:["Teachers","Sailors","Kings","Farmers"], answer:0, explain:"He was a great teacher and writer about God." },
    ],
  },

  /* ---------- Week 37: Modern Saints & Heroes ---------- */
  st_lorenzo: {
    theme:"sea", emoji:"📿",
    reads:[
      { h:"The first Filipino saint", p:"St. Lorenzo Ruiz was a family man from Manila in the Philippines who helped in his church. He loved his wife and children and loved God." },
      { h:"Faithful to the end", p:"On a journey he was arrested for being a Christian and told to give up his faith to be set free. Lorenzo bravely said he would never deny God, even if he had a thousand lives. He is the first Filipino saint! His feast is September 28th." },
    ],
    verse:{ text:"I am a Christian, and I will die for God.", ref:"St. Lorenzo Ruiz" },
    video:"https://www.youtubekids.com/search?q=San+Lorenzo+Ruiz+for+kids",
    quiz:[
      { q:"St. Lorenzo Ruiz was the first saint from…", options:["The Philippines","Spain","Italy","Mexico"], answer:0, explain:"He is the first Filipino saint." },
      { q:"What was he before being a martyr?", options:["A family man who helped his church","A king","A soldier","A pirate"], answer:0, explain:"He was a husband and father from Manila." },
      { q:"When told to give up his faith, he…", options:["Refused, staying faithful","Agreed","Ran away","Hid"], answer:0, explain:"He would never deny God." },
    ],
  },
  st_pedro: {
    theme:"forest", emoji:"🌴",
    reads:[
      { h:"A brave young helper", p:"St. Pedro Calungsod was a teenage boy from the Philippines who helped a missionary priest teach people about Jesus, far away on the island of Guam." },
      { h:"Courage at a young age", p:"When they were attacked for their faith, young Pedro stayed loyal and protected the priest. He gave his life for Jesus while still a teenager — showing that even young people can be great saints! His feast is April 2nd." },
    ],
    verse:{ text:"Let no one look down on you because you are young.", ref:"1 Timothy 4:12" },
    video:"https://www.youtubekids.com/search?q=San+Pedro+Calungsod+for+kids",
    quiz:[
      { q:"St. Pedro Calungsod was a brave Filipino…", options:["Teenager","King","Sailor captain","Old monk"], answer:0, explain:"He was a teenage catechist helper." },
      { q:"Who did he help?", options:["A missionary priest","A king","A soldier","A merchant"], answer:0, explain:"He helped a missionary priest teach the faith in Guam." },
      { q:"Pedro shows us that…", options:["Even young people can be saints","Only adults matter","Faith is boring","Be afraid"], answer:0, explain:"Young people can be great saints too!" },
    ],
  },
  mother_teresa: {
    theme:"sky", emoji:"🤲",
    reads:[
      { h:"Love for the poorest", p:"St. Teresa of Calcutta — “Mother Teresa” — was a tiny nun with a huge heart. She left everything to care for the poorest and sickest people on the streets of India." },
      { h:"Small things, great love", p:"She started the Missionaries of Charity, sisters who serve the poor all over the world. Her famous words: “Do small things with great love.” Her feast is September 5th." },
    ],
    verse:{ text:"Whatever you did for the least of these, you did for me.", ref:"Matthew 25:40" },
    video:"https://www.youtubekids.com/search?q=Mother+Teresa+of+Calcutta+for+kids",
    quiz:[
      { q:"Mother Teresa cared most for the…", options:["Poorest and sickest","Richest","Kings","Famous"], answer:0, explain:"She served the poorest of the poor in India." },
      { q:"The sisters she started are the…", options:["Missionaries of Charity","Knights","Poor Clares","Shepherds"], answer:0, explain:"She founded the Missionaries of Charity." },
      { q:"Her famous saying is do small things with…", options:["Great love","Great speed","Loud noise","No effort"], answer:0, explain:"“Do small things with great love.”" },
    ],
  },
  st_pio: {
    theme:"deep", emoji:"🕊️",
    reads:[
      { h:"A holy friar", p:"St. Padre Pio was a friar in Italy who loved to pray. He spent many hours hearing people's confessions and helping them turn back to God." },
      { h:"Pray, hope, don't worry", p:"Padre Pio even carried the wounds of Jesus on his own body, called the stigmata. His advice for everyone was simple: “Pray, hope, and don't worry.” His feast is September 23rd." },
    ],
    verse:{ text:"Pray, hope, and don't worry.", ref:"St. Padre Pio" },
    video:"https://www.youtubekids.com/search?q=Saint+Padre+Pio+for+kids",
    quiz:[
      { q:"St. Padre Pio was a friar who loved to…", options:["Pray","Sleep","Travel only","Paint"], answer:0, explain:"He prayed for hours and helped many people." },
      { q:"He spent many hours hearing…", options:["Confessions","Music","The radio","Stories"], answer:0, explain:"He helped people in confession turn back to God." },
      { q:"His famous advice was: pray, hope, and…", options:["Don't worry","Hurry up","Be sad","Give up"], answer:0, explain:"“Pray, hope, and don't worry.”" },
    ],
  },
  st_carlo: {
    theme:"rose", emoji:"🎮",
    reads:[
      { h:"A saint who loved computers", p:"St. Carlo Acutis was a teenager in Italy — not long ago at all! He loved video games, soccer, and computers, just like kids today. But most of all, he loved Jesus in the Eucharist." },
      { h:"Highway to Heaven", p:"Carlo used his computer skills to build a website telling the world about miracles of the Eucharist. He called the Eucharist “my highway to Heaven.” He is one of the Church's newest young saints. His feast is October 12th." },
    ],
    verse:{ text:"The Eucharist is my highway to Heaven.", ref:"St. Carlo Acutis" },
    video:"https://www.youtubekids.com/search?q=Carlo+Acutis+for+kids",
    quiz:[
      { q:"What did young Carlo love (besides Jesus)?", options:["Video games and computers","Sailing","Farming","Painting"], answer:0, explain:"He loved video games, soccer, and computers." },
      { q:"What did Carlo build with his computer?", options:["A website about Eucharistic miracles","A video game","A robot","A car"], answer:0, explain:"He made a website about miracles of the Eucharist." },
      { q:"He called the Eucharist his…", options:["“highway to Heaven”","“favorite game”","“secret”","“homework”"], answer:0, explain:"“The Eucharist is my highway to Heaven.”" },
    ],
  },

});
