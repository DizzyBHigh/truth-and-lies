$(document).ready(function () {
  let gameData = [
    {
      'name': 'Team One',
      'score': 0,
      'teamdata': [
        {
          name: 'Dizzy High',
          captain: true,
          score: 0,
          facts: [
            { 'fact': 'I Paid 2 90 year old ladies to go to a nightclub', 'truth': true },
            { 'fact': 'I am a secret balloon burster', 'truth': false },
            { 'fact': 'I massage the petals of flowers', 'truth': false }
          ],
          votes: {
            audience: -1,
            team: -1,
          }
        },
        {
          name: 'Johnny Liarface',
          captain: false,
          score: 0,
          items: [
            { 'fact': 'I masturbate on busses', 'truth': false },
            { 'fact': 'green makes me instanly vomit', 'truth': true },
            { 'fact': 'My dog died when i was five because i stabbed it', 'truth': false }
          ],
          votes: {
            audience: -1,
            team: -1,
          }
        },
        {
          name: 'Jenny FirePants',
          color: 'warning',
          captain: false,
          score: 0,
          items: [
            { 'fact': 'Ive had 9 abortions', 'truth': false },
            { 'fact': 'I cooked a meal for the queen', 'truth': false },
            { 'fact': 'I was banned from church', 'truth': true }
          ],
          votes: {
            audience: -1,
            team: -1,
          }
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
          score: 0,
          items: [
            { 'fact': 'I often dance naked in my hallway', 'truth': true },
            { 'fact': 'Ive shot a lion in Zambia', 'truth': false },
            { 'fact': 'Ive never been in a supermarket', 'truth': false }
          ],
          votes: {
            audience: -1,
            team: -1,
          }
        },
        {
          name: 'Bob the Blaggard',
          captain: false,
          score: 0,
          items: [
            { 'fact': 'Me and Cece made out last night', 'truth': false },
            { 'fact': 'I have kept count of how many flies ive killed in my lifetime', 'truth': true },
            {
              'fact': 'I find dog food makes a really good gravy on schnitzels when its heated up in the microwave.',
              'truth': false
            }
          ],
          votes: {
            audience: -1,
            team: -1,
          }
        },
        {
          name: 'Frankie Fibalot',
          captain: false,
          score: 0,
          items: [
            { 'fact': 'I hold the world record for number of times you can say I in 1 minute', 'truth': false },
            { 'fact': 'I can hold my breath for longer than 7 minutes', 'truth': false },
            { 'fact': 'My first job when i left school was a teacher', 'truth': true }
          ],
          votes: {
            audience: -1,
            team: -1,
          }
        }
      ]
    }
  ];
  let teams = [];
  let cCards = [];
  let cPlayer =[];
  let cTeam = [];

  let loadData = function () {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: "data/data.json", // Using our resources.json file to serve results
        dataType: 'json',
        success: function (data) {
          resolve(data);
        },
        error: function (error) {
          reject(error)
        },
      })
    })
  };
  //load in the data
  loadData().then(data => {
    teams = data.teams; // save teams
    //loop teams
    teams.forEach(function (team, tIndex) { 
      setTeamName(team, tIndex)
      //loop players
      team.players.forEach(function (player, pIndex) {
        setPlayerName(tIndex, team, player, pIndex);   
      });
    });
  }).catch(error => {
    console.log(error);
  });

  let setTeamName = function(team, tIndex){
    console.log({ "value": team }, { "index": tIndex });
    $('#t' + tIndex + '-name').html(team.name);
  }
  let setPlayerName = function(tIndex, team, player, pIndex){
    console.log(player.name, pIndex);
    $('#t' + tIndex + '-p' + pIndex).html(player.name); //sets Name on button
    $('#t' + tIndex + '-p' + pIndex).data("player", player); // sets player data
    $('#t' + tIndex + '-p' + pIndex).data("cards", player.cards); // sets card data
    $('#t' + tIndex + '-p' + pIndex).data("team", team); // sets team data
  }

  let setCurrentPlayer = function(player){
    $('#current-player').html(player.name); 
  }

  let buildCards = function () {
    console.log('building cards');
    $('.back').removeClass('true false');
    $('.back').addClass('c-bkg');
    cCards.forEach(function(card, index) {
      console.log(card);
        $('#card-'+index +' .inner').html(card.fact);
    });
  }
  let flipCards = function () {
    $('.gc').toggleClass('gamecard-hover');
  };
  $('#reveal').click(function(){
    $('.gc').addClass('gamecard-hover');
  });

  $('.player').click(function () {
    //hide cards
    $('.gc').removeClass('gamecard-hover');
    $('.a-btn, .t-btn').removeClass('true false');
    
    cTeam = $(this).data("team");
    cPlayer = $(this).data("player");
    cCards = $(this).data("cards");
    buildCards();
    setCurrentPlayer(cPlayer);
    $('.player').removeClass('active');
    $(this).addClass('active');
    $('#current-player').addClass('active');
    $('#current-player').data("player", cPlayer); // sets player data
    $('#current-player').data("cards", cCards); // sets card data
    $('#current-player').data("team", cTeam); // sets team data
    clearTeamChoices();
    clearAudChoices();
  })
  $('.gamecard').click(function(){
    $(this).addClass('gamecard-hover');
  })

  
  $('#current-player').click(function(){
      $('.player.active').addClass('played').removeClass('active');
      let avote = $('.avote').data('vote');
      let tvote = $('.tvote').data('vote');
      let answer = getTruth(cCards);
      console.log({'answer': answer});
      setCardResults();
      setVoteResult('avote','.avote', avote, answer);
      setVoteResult('tvote','.tvote', tvote, answer);
  })
  
  let setCardResults = function(){
      cCards.forEach(function(card, index){
        if(card.truth === true){
          $('#card-' + index).addClass('true');   
          $('#card-' + index).removeClass('c-bkg');        
        }else{
          $('#card-' + index).addClass('false');
          $('#card-' + index).removeClass('c-bkg');     
        } 
      })
  }
  let setVoteResult = function(type, selector, vote, answer){
    console.log({'type': type, 'selector': selector, 'vote': vote, 'answer': answer })
    
    if(vote === answer){
      console.log('answer correct');
      $(selector).addClass('true').removeClass(type);
      
    }else{
      console.log('answer wrong');
      $(selector).addClass('false').removeClass(type);
    }
  }

  let getTruth = function(){
    return ( cCards.map(function (e) { return e.truth; }).indexOf(true) ); 
  }
  
  let clearTeamChoices = function(){
    $('.t-btn').removeClass('tvote');
    $('.t-btn').removeClass('true');
    $('.t-btn').removeClass('false');
  }
  let clearAudChoices = function () {
    $('.a-btn').removeClass('avote');
    $('.a-btn').removeClass('true');
    $('.a-btn').removeClass('false');
  }
  
  
  $('.t-btn').click(function(){
    clearTeamChoices();
    $(this).addClass('tvote');
  })
  
  $('.a-btn').click(function () {
    clearAudChoices();
    $(this).addClass('avote');
  })




  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });

});
