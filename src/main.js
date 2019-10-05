$(document).ready(function () {


  let teams = [];
  let cCards = [];
  let cPlayer =[];
  let cTeam = [];

  $.fn.equalHeights = function(){
    var max_height = 0;
    $(this).each(function(){
      max_height = Math.max($(this).height(), max_height);
    });
    $(this).each(function(){
      $(this).height(max_height);
    });
  };

  $.fn.adjustTextSize = function (set_max_size, min_size) {
    min_size = min_size || 12; // if no value then set a default one
    var string, width, line, initFontSize, returnFontSize, ratio;

    return this.each(function() {
      // Store the object
      var $this = $(this);

      var resizer = function () {
        string = $this;
        string.html('<span style="white-space: nowrap;">' + string.html() + '</span>');

        width = string.width();
        line = $(string.children('span'));
        initFontSize = parseInt(string.css('font-size'));
        ratio = width/line.width();

        returnFontSize = initFontSize*ratio;

        if (set_max_size && returnFontSize > initFontSize) {
          returnFontSize = initFontSize;
        }

        if (min_size && returnFontSize < min_size) {
          returnFontSize = min_size;
        }

        string.css('font-size',returnFontSize);
        while (line.width() >= width) {
          if (min_size && returnFontSize <= min_size) {
            string.html(line.html());
            return false;
          }
          string.css('font-size', --returnFontSize);
        }
        string.html(line.html());
      }

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize orientationchange', resizer);
    });
  };


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
  };
  let setPlayerName = function(tIndex, team, player, pIndex){
    console.log(player.name, pIndex);
    let newPlayer = '<div class="row"><div id="t'+tIndex+'-p'+pIndex+'" class="h2 card shadow player"></div></div>';
    $('#t'+tIndex+'-players').append(newPlayer);
    $('#t' + tIndex + '-p' + pIndex).html(player.name)
        .data("player", player)// sets player data; //sets Name on button
        .data("cards", player.cards) // sets card data
        .data("team", team); // sets team data
  };

  let setCurrentPlayer = function(player){
    $('#current-player').html(player.name); 
  };

  let buildCards = function () {
    console.log('building cards');
    $('.back').removeClass('true false').addClass('c-bkg');
    cCards.forEach(function(card, index) {
      console.log(card);
        $('#card-'+index +' .inner').html(card.fact);
    });
  };
  $('.header-row').click(function(){
    $('.gc').addClass('gamecard-hover');
  });

  $('#game-details').on('click', '.player', function(){
    //hide cards
    $('.gc').removeClass('gamecard-hover');
    $('.a-btn, .t-btn').removeClass('true false');
    
    cTeam = $(this).data("team");
    cPlayer = $(this).data("player");
    cCards = $(this).data("cards");

    setCurrentPlayer(cPlayer);
    $('.player').removeClass('active');
    $(this).addClass('active')
    .addClass('active')
    .data("player", cPlayer) // sets player data
    .data("cards", cCards) // sets card data
    .data("team", cTeam); // sets team data
    clearTeamChoices();
    clearAudChoices();
    buildCards();
  });

  $('.gamecard').click(function(){
    $(this).addClass('gamecard-hover');
  });
  
  $('#current-player').click(function(){
      $('.player.active').addClass('played').removeClass('active');
      let avote = $('.avote').data('vote');
      let tvote = $('.tvote').data('vote');
      let answer = getTruth(cCards);
      console.log({'answer': answer});
      setCardResults();
      setVoteResult('avote','.avote', avote, answer);
      setVoteResult('tvote','.tvote', tvote, answer);
  });
  
  let setCardResults = function(){
      cCards.forEach(function(card, index){
        if(card.truth === true){
          $('#card-' + index).addClass('true').removeClass('c-bkg');

        }else{
          $('#card-' + index).addClass('false').removeClass('c-bkg');
        } 
      })
  };
  let setVoteResult = function(type, selector, vote, answer){
    console.log({'type': type, 'selector': selector, 'vote': vote, 'answer': answer });
    
    if(vote === answer){
      console.log('answer correct');
      $(selector).addClass('true').removeClass(type);
      
    }else{
      console.log('answer wrong');
      $(selector).addClass('false').removeClass(type);
    }
  };

  let getTruth = function(){
    return ( cCards.map(function (e) { return e.truth; }).indexOf(true) ); 
  };
  
  let clearTeamChoices = function(){
    $('.t-btn').removeClass('tvote').removeClass('true').removeClass('false');
  };
  let clearAudChoices = function () {
    $('.a-btn').removeClass('avote').removeClass('true').removeClass('false');
  };
  
  
  $('.t-btn').click(function(){
    clearTeamChoices();
    $(this).addClass('tvote');
  });
  
  $('.a-btn').click(function () {
    clearAudChoices();
    $(this).addClass('avote');
  });

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
  $('.load-lies').click(function () {
    loadData().then(data => {
      console.log({"data" : data});
      teams = data.teams; // save teams
      //loop teams
      teams.forEach(function (team, tIndex) {
        setTeamName(team, tIndex);
        //loop players
        team.players.forEach(function (player, pIndex) {
          setPlayerName(tIndex, team, player, pIndex);
        });
      });
      console.log({"teams": teams});
    }).catch(error => {
      console.log(error);
    });
  });
});
