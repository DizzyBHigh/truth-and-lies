$(document).ready(function () {
  let gameData = [
    {
      'name': 'Team One',
      'score': 0,
      'teamdata': [
        {
          name: 'Dizzy High',
          captain: true,
          facts: [
            {'fact': 'I Paid 2 90 year old ladies to go to a nightclub', 'truth': true},
            {'fact': 'I am a secret balloon burster', 'truth': false},
            {'fact': 'I massage the petals of flowers', 'truth': false}
          ],
        },
        {
          name: 'Johnny Liarface',
          captain: false,
          items: [
            {'fact': 'I masturbate on busses', 'truth': false},
            {'fact': 'green makes me instanly vomit', 'truth': true},
            {'fact': 'My dog died when i was five because i stabbed it', 'truth': false}
          ],
        },
        {
          name: 'Jenny FirePants',
          color: 'warning',
          captain: false,
          items: [
            {'fact': 'Ive had 9 abortions', 'truth': false},
            {'fact': 'I cooked a meal for the queen', 'truth': false},
            {'fact': 'I was banned from church', 'truth': true}
          ],
        }
      ]
    },
    {
      name: 'Team Two',
      score: 0,
      teamdata: [
        {
          name: 'Cece Lederer',
          captain: true,
          items: [
            {'fact': 'I often dance naked in my hallway', 'truth': true},
            {'fact': 'Ive shot a lion in Zambia', 'truth': false},
            {'fact': 'Ive never been in a supermarket', 'truth': false}
          ],
        },
        {
          name: 'Bob the Blaggard',
          captain: false,
          items: [
            {'fact': 'Me and Cece made out last night', 'truth': false},
            {'fact': 'I have kept count of how many flies ive killed in my lifetime', 'truth': true},
            {
              'fact': 'I find dog food makes a really good gravy on schnitzels when its heated up in the microwave.',
              'truth': false
            }
          ],
        },
        {
          name: 'Frankie Fibalot',
          captain: false,
          items: [
            {'fact': 'I hold the world record for number of times you can say I in 1 minute', 'truth': false},
            {'fact': 'I can hold my breath for longer than 7 minutes', 'truth': false},
            {'fact': 'My first job when i left school was a teacher', 'truth': true}
          ],
        }
      ]
    }
  ];

  // Init The Game
  let initGame = function (gameData) {
    console.log('init');
   
  };

  let flipCards = function(){
    $('.gc').toggleClass('gamecard-hover');
  }
  $('#reveal').click(flipCards);
  initGame();

});
