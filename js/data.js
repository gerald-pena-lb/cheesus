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
    { id:"the_mass", title:"What Happens at Mass", built:false },
    { id:"sacraments", title:"The Seven Sacraments", built:false },
  ]},
  { week:28, unit:"The Church", title:"Talking to God", lessons:[
    { id:"sign_cross", title:"The Sign of the Cross", built:false },
    { id:"how_pray", title:"How to Pray", built:false },
    { id:"guardian_angel", title:"Your Guardian Angel", built:false },
  ]},

  // ---- Unit D: Our Mother Mary (29–32) ----
  { week:29, unit:"Mother Mary", title:"Who is Mary?", lessons:[
    { id:"mary_mother", title:"Mary, Mother of God", built:false },
    { id:"hail_mary", title:"The Hail Mary", built:false },
    { id:"immaculate", title:"The Immaculate Conception", built:false },
  ]},
  { week:30, unit:"Mother Mary", title:"Mary's Life", lessons:[
    { id:"mary_visitation", title:"The Visitation", built:false },
    { id:"mary_cross", title:"Mary at the Foot of the Cross", built:false },
    { id:"mary_apostles", title:"Mary & the Early Church", built:false },
  ]},
  { week:31, unit:"Mother Mary", title:"When Mary Appeared", lessons:[
    { id:"guadalupe", title:"Our Lady of Guadalupe", built:false },
    { id:"lourdes", title:"Our Lady of Lourdes", built:false },
    { id:"fatima", title:"Our Lady of Fatima", built:false },
  ]},
  { week:32, unit:"Mother Mary", title:"Honoring Our Mother", lessons:[
    { id:"rosary", title:"The Holy Rosary", built:false },
    { id:"assumption", title:"The Assumption", built:false },
    { id:"marian_feasts", title:"Mary's Special Days", built:false },
  ]},

  // ---- Unit E: Heroes of the Faith — the Saints (33–37) ----
  { week:33, unit:"The Saints", title:"The First Saints", lessons:[
    { id:"st_peter_paul", title:"St. Peter & St. Paul", built:false },
    { id:"st_nicholas", title:"St. Nicholas (the real Santa!)", built:false },
    { id:"st_lucy", title:"St. Lucy of Light", built:false },
  ]},
  { week:34, unit:"The Saints", title:"Brave Saints", lessons:[
    { id:"st_george", title:"St. George & the Dragon", built:false },
    { id:"st_joan", title:"St. Joan of Arc", built:false },
    { id:"st_sebastian", title:"St. Sebastian", built:false },
  ]},
  { week:35, unit:"The Saints", title:"Gentle Saints", lessons:[
    { id:"st_francis", title:"St. Francis of Assisi", built:true },
    { id:"st_clare", title:"St. Clare", built:false },
    { id:"st_anthony", title:"St. Anthony, Finder of Lost Things", built:false },
  ]},
  { week:36, unit:"The Saints", title:"Teaching Saints", lessons:[
    { id:"st_therese", title:"St. Thérèse, the Little Flower", built:false },
    { id:"st_augustine", title:"St. Augustine", built:false },
    { id:"st_aquinas", title:"St. Thomas Aquinas", built:false },
  ]},
  { week:37, unit:"The Saints", title:"Saints Close to Home", lessons:[
    { id:"st_lorenzo", title:"St. Lorenzo Ruiz (first Filipino saint)", built:false },
    { id:"st_pedro", title:"St. Pedro Calungsod", built:false },
    { id:"mother_teresa", title:"St. Teresa of Calcutta", built:false },
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
