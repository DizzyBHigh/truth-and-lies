$(document).ready(function () {
  let gameData = [
    {
      'name': 'Team One',
      'score': 0,
      'teamdata': [
        {
          name: 'Dizzy High',
          color: 'warning',
          items: [
            {'fact': 'I Paid 2 90 year old ladies to go to a nightclub', 'truth': true},
            {'fact': 'I am a secret balloon burster', 'truth': false},
            {'fact': 'I massage the petals of flowers', 'truth': false}
          ],
        },
        {
          name: 'Johnny Liarface',
          color: 'warning',
          items: [
            {'fact': 'I masturbate on busses', 'truth': false},
            {'fact': 'green makes me instanly vomit', 'truth': true},
            {'fact': 'My dog died when i was five because i stabbed it', 'truth': false}
          ],
        },
        {
          name: 'Jenny FirePants',
          color: 'warning',
          items: [
            {'fact': 'Ive had 9 abortions', 'truth': false},
            {'fact': 'I cooked a meal for the queen', 'truth': false},
            {'fact': 'I was banned from church', 'truth': true}
          ],
        }
      ]
    },
    {
      'name': 'Team Two',
      'score': 0,
      'teamdata': [
        {
          name: 'Cece Lederer',
          color: 'warning',
          items: [
            {'fact': 'I often dance naked in my hallway', 'truth': true},
            {'fact': 'Ive shot a lion in Zambia', 'truth': false},
            {'fact': 'Ive never been in a supermarket', 'truth': false}
          ],
        },
        {
          name: 'Bob the Blaggard',
          color: 'warning',
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
          color: 'warning',
          items: [
            {'fact': 'I hold the world record for number of times you can say I in 1 minute', 'truth': false},
            {'fact': 'I can hold my breath for longer than 7 minutes', 'truth': false},
            {'fact': 'My first job when i left school was a teacher', 'truth': true}
          ],
        }
      ]
    }
  ];

  let gameRound = [
    {
      'round': 'Waiting To Start',
      'btn': 'Begin',
      'text': 'Get your Bingo Card',
      'img': './assets/img/blank-card.jpg'
    },
    {
      'round': 'Round One',
      'btn': 'Round One',
      'text': 'One Line or all 4 Corners',
      'img': './assets/img/one-line.gif'
    },
    {
      'round': 'Round Two',
      'btn': 'Round Two',
      'text': 'Two Lines same direction',
      'img': './assets/img/two-lines.gif'
    },
    {
      'round': 'Round Three',
      'btn': 'Round Three',
      'text': 'Three Lines same direction',
      'img': './assets/img/three-lines.gif'
    },
    {
      'round': 'Final Round',
      'btn': 'Final Round',
      'text': 'Full House - all squares',
      'img': './assets/img/full-house.jpg'
    }
  ];

  let gameScreen = '#game-screen';
  let t1Screen = '#team1-screen';
  let t2Screen = '#team2-screen';
  // Init The Game
  let initGame = function (gameData) {
    console.log('init');
    $('#game-screen').show();
    $('#team1-screen').hide();
    $('#team2-screen').hide();

  };

  initGame();


  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var slideCount = $('.slide').length;

  $('#game-screen').on('click', function () {
    
  });

  $('button#team-one').on('click', function () {
  

  });
  
  $('button#team-two').on('click', function () {


})
});
