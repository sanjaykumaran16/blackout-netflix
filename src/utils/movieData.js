// Movie data with real posters and cast information
// Using TMDB image URLs (publicly accessible) and real cast names

export const featuredMovie = {
  id: 1,
  title: "Stranger Things",
  description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
  image: "https://image.tmdb.org/t/p/w1280/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
  year: "2024",
  rating: "TV-14",
  seasons: "4 Seasons",
  cast: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour, Gaten Matarazzo",
  genres: "Sci-Fi, Horror, Drama, Mystery"
};

export const movieCategories = [
  {
    title: "Trending Now",
    movies: [
      {
        id: 2,
        title: "The Crown",
        image: "https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg",
        description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
        year: "2016",
        cast: "Claire Foy, Olivia Colman, Imelda Staunton, Matt Smith, Tobias Menzies",
        genres: "Drama, History"
      },
      {
        id: 3,
        title: "Breaking Bad",
        image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
        description: "A high school chemistry teacher diagnosed with cancer turns to producing meth to secure his family's future.",
        year: "2008",
        cast: "Bryan Cranston, Aaron Paul, Anna Gunn, RJ Mitte, Dean Norris",
        genres: "Crime, Drama, Thriller"
      },
      {
        id: 4,
        title: "Wednesday",
        image: "https://image.tmdb.org/t/p/w500/jeGtaMwGxPmQN5xM4ClnwPQcNQz.jpg",
        description: "Wednesday Addams attempts to master her psychic ability while uncovering the mystery that haunted her parents.",
        year: "2022",
        cast: "Jenna Ortega, Gwendoline Christie, Riki Lindhome, Jamie McShane, Hunter Doohan",
        genres: "Comedy, Crime, Fantasy"
      },
      {
        id: 5,
        title: "The Witcher",
        image: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
        description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people are often more wicked than beasts.",
        year: "2019",
        cast: "Henry Cavill, Anya Chalotra, Freya Allan, Joey Batey, MyAnna Buring",
        genres: "Action, Adventure, Drama, Fantasy"
      },
      {
        id: 6,
        title: "Dark",
        image: "https://image.tmdb.org/t/p/w500/5Lo4WFYxNTqJXq179f0VYz5lJN.jpg",
        description: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
        year: "2017",
        cast: "Louis Hofmann, Karoline Eichhorn, Lisa Vicari, Maja Schöne, Oliver Masucci",
        genres: "Crime, Drama, Mystery, Sci-Fi, Thriller"
      },
      {
        id: 7,
        title: "Ozark",
        image: "https://image.tmdb.org/t/p/w500/5y5TSiR8B0TjJU5f0R5Sq7WqyJn.jpg",
        description: "A financial advisor drags his family from Chicago to the Missouri Ozarks to launder money for a Mexican drug cartel.",
        year: "2017",
        cast: "Jason Bateman, Laura Linney, Julia Garner, Sofia Hublitz, Skylar Gaertner",
        genres: "Crime, Drama, Thriller"
      },
      {
        id: 26,
        title: "House of Cards",
        image: "https://image.tmdb.org/t/p/w500/hKWxWjFwnM5j2e7pJXcqC6oO7xm.jpg",
        description: "A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.",
        year: "2013",
        cast: "Kevin Spacey, Robin Wright, Kate Mara, Corey Stoll, Michael Kelly",
        genres: "Drama, Thriller"
      },
      {
        id: 27,
        title: "Orange Is the New Black",
        image: "https://image.tmdb.org/t/p/w500/ekaa7YjGPTkFLcPhwWXTnARfDmy.jpg",
        description: "Piper Chapman is sentenced to 15 months in a women's federal prison for her involvement with a drug runner.",
        year: "2013",
        cast: "Taylor Schilling, Laura Prepon, Uzo Aduba, Danielle Brooks, Natasha Lyonne",
        genres: "Comedy, Crime, Drama"
      }
    ]
  },
  {
    title: "Popular on Netflix",
    movies: [
      {
        id: 8,
        title: "Money Heist",
        image: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
        description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
        year: "2017",
        cast: "Úrsula Corberó, Álvaro Morte, Itziar Ituño, Pedro Alonso, Paco Tous",
        genres: "Action, Crime, Drama, Mystery, Thriller"
      },
      {
        id: 9,
        title: "The Last of Us",
        image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
        description: "Twenty years after a fungal outbreak ravages the planet, survivors Joel and Ellie embark on a brutal journey across post-pandemic America.",
        year: "2023",
        cast: "Pedro Pascal, Bella Ramsey, Gabriel Luna, Anna Torv, Nick Offerman",
        genres: "Action, Adventure, Drama, Horror, Thriller"
      },
      {
        id: 10,
        title: "Squid Game",
        image: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
        description: "Hundreds of cash-strapped contestants accept an invitation to compete in children's games for a tempting prize, but the stakes are deadly.",
        year: "2021",
        cast: "Lee Jung-jae, Park Hae-soo, Wi Ha-joon, HoYeon Jung, O Yeong-su",
        genres: "Action, Drama, Horror, Mystery, Thriller"
      },
      {
        id: 11,
        title: "Black Mirror",
        image: "https://image.tmdb.org/t/p/w500/5a6az40L3T3cQWjH3rmUCDr1gUx.jpg",
        description: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
        year: "2011",
        cast: "Various (Anthology Series)",
        genres: "Drama, Sci-Fi, Thriller"
      },
      {
        id: 12,
        title: "Peaky Blinders",
        image: "https://image.tmdb.org/t/p/w500/6PX0r5TRRU5y0jZ70My1romtgSX.jpg",
        description: "A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps.",
        year: "2013",
        cast: "Cillian Murphy, Paul Anderson, Helen McCrory, Sophie Rundle, Finn Cole",
        genres: "Crime, Drama"
      },
      {
        id: 13,
        title: "Narcos",
        image: "https://image.tmdb.org/t/p/w500/7qZ4m4kLxsHxVDv6x1QyxV3j0Kp.jpg",
        description: "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country.",
        year: "2015",
        cast: "Wagner Moura, Boyd Holbrook, Pedro Pascal, Joanna Christie, Maurice Compte",
        genres: "Biography, Crime, Drama, History, Thriller"
      },
      {
        id: 28,
        title: "Bridgerton",
        image: "https://image.tmdb.org/t/p/w500/ne8l6t5j7qHqgx49L3j3M5Lz0jK.jpg",
        description: "The eight close-knit siblings of the Bridgerton family look for love and happiness in London high society.",
        year: "2020",
        cast: "Phoebe Dynevor, Regé-Jean Page, Jonathan Bailey, Nicola Coughlan, Claudia Jessie",
        genres: "Drama, Romance"
      },
      {
        id: 29,
        title: "The Queen's Gambit",
        image: "https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
        description: "In a 1950s orphanage, a young girl reveals an astonishing talent for chess and begins an unlikely journey to stardom while grappling with addiction.",
        year: "2020",
        cast: "Anya Taylor-Joy, Bill Camp, Moses Ingram, Isla Johnston, Christiane Seidel",
        genres: "Drama"
      }
    ]
  },
  {
    title: "Action Movies",
    movies: [
      {
        id: 14,
        title: "Extraction",
        image: "https://image.tmdb.org/t/p/w500/nygOUcBKPHFTbxsYRFZVePqgPK6.jpg",
        description: "A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.",
        year: "2020",
        cast: "Chris Hemsworth, Rudhraksh Jaiswal, Randeep Hooda, Golshifteh Farahani, Pankaj Tripathi",
        genres: "Action, Thriller"
      },
      {
        id: 15,
        title: "The Gray Man",
        image: "https://image.tmdb.org/t/p/w500/8cXbitsS6dWQ5gfMTZdorpAAzEH.jpg",
        description: "When the CIA's most skilled mercenary accidentally uncovers dark agency secrets, he becomes a target and is hunted around the world.",
        year: "2022",
        cast: "Ryan Gosling, Chris Evans, Ana de Armas, Jessica Henwick, Regé-Jean Page",
        genres: "Action, Thriller"
      },
      {
        id: 16,
        title: "Red Notice",
        image: "https://image.tmdb.org/t/p/w500/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
        description: "An Interpol agent tracks the world's most wanted art thief and teams up with a rival thief to catch an elusive criminal.",
        year: "2021",
        cast: "Dwayne Johnson, Ryan Reynolds, Gal Gadot, Ritu Arya, Chris Diamantopoulos",
        genres: "Action, Comedy, Crime, Thriller"
      },
      {
        id: 17,
        title: "The Old Guard",
        image: "https://image.tmdb.org/t/p/w500/2IyO2rAb9cyY3VLDnV4j64lcf51.jpg",
        description: "A covert team of immortal mercenaries is suddenly exposed and must now fight to keep their identity a secret.",
        year: "2020",
        cast: "Charlize Theron, KiKi Layne, Matthias Schoenaerts, Marwan Kenzari, Luca Marinelli",
        genres: "Action, Fantasy, Thriller"
      },
      {
        id: 18,
        title: "Army of the Dead",
        image: "https://image.tmdb.org/t/p/w500/z8CExJekGrEThbpMXAmDvv5UR9P.jpg",
        description: "Following a zombie outbreak in Las Vegas, a group of mercenaries take the ultimate gamble, venturing into the quarantine zone to pull off the greatest heist.",
        year: "2021",
        cast: "Dave Bautista, Ella Purnell, Omari Hardwick, Ana de la Reguera, Theo Rossi",
        genres: "Action, Crime, Horror, Thriller"
      },
      {
        id: 19,
        title: "Extraction 2",
        image: "https://image.tmdb.org/t/p/w500/7gKI9hpEMcZUQpNgKrkDzJp2NSF.jpg",
        description: "A hardened mercenary's mission becomes a soul-searching race to survive when he's sent into Bangladesh to rescue a drug lord's kidnapped son.",
        year: "2023",
        cast: "Chris Hemsworth, Golshifteh Farahani, Adam Bessa, Olga Kurylenko, Daniel Bernhardt",
        genres: "Action, Thriller"
      },
      {
        id: 30,
        title: "John Wick",
        image: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
        description: "An ex-hit-man comes out of retirement to track down the gangsters that took everything from him.",
        year: "2014",
        cast: "Keanu Reeves, Michael Nyqvist, Alfie Allen, Willem Dafoe, Dean Winters",
        genres: "Action, Crime, Thriller"
      },
      {
        id: 31,
        title: "Mad Max: Fury Road",
        image: "https://image.tmdb.org/t/p/w500/hA2ple9q4xIC5sj3Z5xILQz5zZD.jpg",
        description: "In a post-apocalyptic wasteland, Max teams up with a mysterious woman to escape from a tyrannical warlord.",
        year: "2015",
        cast: "Tom Hardy, Charlize Theron, Nicholas Hoult, Hugh Keays-Byrne, Josh Helman",
        genres: "Action, Adventure, Sci-Fi, Thriller"
      }
    ]
  },
  {
    title: "Comedy Movies",
    movies: [
      {
        id: 20,
        title: "Murder Mystery",
        image: "https://image.tmdb.org/t/p/w500/6sX8gYj1eHMfBGjZj5hcvHhJY3.jpg",
        description: "A New York cop and his wife go on a European vacation to reinvigorate the spark in their marriage, but end up framed for murder.",
        year: "2019",
        cast: "Adam Sandler, Jennifer Aniston, Luke Evans, Terence Stamp, Gemma Arterton",
        genres: "Action, Comedy, Crime, Mystery"
      },
      {
        id: 21,
        title: "The Wrong Missy",
        image: "https://image.tmdb.org/t/p/w500/5j5kppbcElJa4Mz1R5iR3H3xXqN.jpg",
        description: "Tim thinks he's invited the woman of his dreams on a work retreat to Hawaii, but he accidentally invites a nightmare from a blind date instead.",
        year: "2020",
        cast: "David Spade, Lauren Lapkus, Nick Swardson, Geoff Pierson, Sarah Chalke",
        genres: "Comedy, Romance"
      },
      {
        id: 22,
        title: "Do Revenge",
        image: "https://image.tmdb.org/t/p/w500/v7hdWmL4KtH8TkHl6QSg5h3k4KB.jpg",
        description: "A dethroned queen bee at a posh private high school strikes a secret deal with an unassuming new student to exact revenge on each other's enemies.",
        year: "2022",
        cast: "Camila Mendes, Maya Hawke, Austin Abrams, Rish Shah, Talia Ryder",
        genres: "Comedy, Crime, Drama"
      },
      {
        id: 23,
        title: "Glass Onion: A Knives Out Mystery",
        image: "https://image.tmdb.org/t/p/w500/vDGr1Y8l3sRE8vA8RJP6T5f2F1q.jpg",
        description: "Tech billionaire Miles invites his friends for a getaway on his private Greek island, but when someone turns up dead, Detective Benoit investigates.",
        year: "2022",
        cast: "Daniel Craig, Edward Norton, Janelle Monáe, Kathryn Hahn, Leslie Odom Jr.",
        genres: "Comedy, Crime, Drama, Mystery, Thriller"
      },
      {
        id: 24,
        title: "The Bubble",
        image: "https://image.tmdb.org/t/p/w500/6sX8gYj1eHMfBGjZj5hcvHhJY3.jpg",
        description: "A group of actors stuck inside a pandemic bubble at a hotel attempt to complete a sequel to an action franchise film.",
        year: "2022",
        cast: "Karen Gillan, Iris Apatow, Fred Armisen, Maria Bakalova, David Duchovny",
        genres: "Comedy"
      },
      {
        id: 25,
        title: "Senior Year",
        image: "https://image.tmdb.org/t/p/w500/7qZ4m4kLxsHxVDv6x1QyxV3j0Kp.jpg",
        description: "After waking from a 20-year coma, a woman returns to high school to complete her senior year and become prom queen.",
        year: "2022",
        cast: "Rebel Wilson, Angourie Rice, Justin Hartley, Sam Richardson, Zoë Chao",
        genres: "Comedy"
      },
      {
        id: 32,
        title: "The Good Place",
        image: "https://image.tmdb.org/t/p/w500/6q39M22dSUQUQVkAY28TEWHqBD9.jpg",
        description: "A woman struggles to understand what it means to be good after she dies and ends up in a heaven-like afterlife.",
        year: "2016",
        cast: "Kristen Bell, Ted Danson, William Jackson Harper, Jameela Jamil, Manny Jacinto",
        genres: "Comedy, Fantasy"
      },
      {
        id: 33,
        title: "Schitt's Creek",
        image: "https://image.tmdb.org/t/p/w500/qIhsuhoIYR5yTnDta0IL4senbeN.jpg",
        description: "When rich video-store magnate Johnny Rose and his family suddenly find themselves broke, they are forced to leave their pampered lives.",
        year: "2015",
        cast: "Eugene Levy, Catherine O'Hara, Dan Levy, Annie Murphy, Emily Hampshire",
        genres: "Comedy"
      }
    ]
  },
  {
    title: "Sci-Fi & Fantasy",
    movies: [
      {
        id: 34,
        title: "Dune",
        image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        description: "Paul Atreides leads a rebellion to restore his family's reign over the desert planet Arrakis.",
        year: "2021",
        cast: "Timothée Chalamet, Rebecca Ferguson, Oscar Isaac, Josh Brolin, Stellan Skarsgård",
        genres: "Action, Adventure, Drama, Sci-Fi"
      },
      {
        id: 35,
        title: "The Mandalorian",
        image: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
        description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
        year: "2019",
        cast: "Pedro Pascal, Gina Carano, Carl Weathers, Giancarlo Esposito, Emily Swallow",
        genres: "Action, Adventure, Fantasy, Sci-Fi, Western"
      },
      {
        id: 36,
        title: "The Umbrella Academy",
        image: "https://image.tmdb.org/t/p/w500/scZlQQYnDVlnpxFTxaIv2g0UngJ.jpg",
        description: "A family of former child heroes, now grown apart, must reunite to continue to protect the world.",
        year: "2019",
        cast: "Ellen Page, Tom Hopper, David Castañeda, Emmy Raver-Lampman, Robert Sheehan",
        genres: "Action, Comedy, Drama, Fantasy, Sci-Fi"
      },
      {
        id: 37,
        title: "The Boys",
        image: "https://image.tmdb.org/t/p/w500/mY7SeH4HFFxW1hiI6cWawCR6S6O.jpg",
        description: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
        year: "2019",
        cast: "Karl Urban, Jack Quaid, Antony Starr, Erin Moriarty, Dominique McElligott",
        genres: "Action, Comedy, Crime, Drama, Sci-Fi"
      },
      {
        id: 38,
        title: "Westworld",
        image: "https://image.tmdb.org/t/p/w500/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg",
        description: "Set at the intersection of the near future and the reimagined past, explore a world in which every human appetite can be indulged.",
        year: "2016",
        cast: "Evan Rachel Wood, Jeffrey Wright, Thandie Newton, Tessa Thompson, Ed Harris",
        genres: "Drama, Mystery, Sci-Fi, Thriller, Western"
      }
    ]
  }
];
