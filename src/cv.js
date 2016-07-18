(function() {

  var templates = {};

  $.get('src/templates/bloc.hbs', function (data) {
    templates.bloc = data;
  }, 'html');

  $.get('src/templates/competence.hbs', function (data) {
    templates.competence = data;
  }, 'html');

  $.get('src/templates/mission.hbs', function (data) {
    templates.mission = data;
  }, 'html');

  $.getJSON('src/cv.json', function (cv) {
      console.log(cv);

      $.get('src/templates/header.hbs', function (data) {
        var template = Handlebars.compile(data);
        $('.cv').html(template(cv));

        if(cv.json.length) {
          $.getJSON(cv.json+'.json', function (json) {
            $.each(json.cv, function(index, section) {
              if(section.type in templates) {
                compile(templates[section.type], section);
              }
            });
            checkURLs();
          });
        }
      }, 'html');
  });

  function compile(hbs, json) {
    title(json);
    var template = Handlebars.compile(hbs);
    $('.cv').append(template(json));
    //console.log(json);
  }

  function checkURLs() {
    $.each($('p, li'), function(index, tag) {
      var html = $(tag).html().replace(/\((.+?)\)\[(.+?)\]/, '<a href="$2">$1</a>');
      //console.log(html);
      $(tag).html(html);
    });

    /*var test = "(1st price of the competition « Mobile territory » of SITG)[http://ge.ch/sitg/evenements/journees-du-sitg/2011/concours-un-territoire-mobile] - Mobile software GeTri development using the open database of SITG."
    console.log(test);
    console.log(test.replace(/\((.+?)\)\[(.+?)\]/, '<a href="$2">$1</a>'));
    console.log(test);*/
  }

  function title(json) {
    var title = $('<h1/>');
    if('subtitle' in json) {
      title.html(json.title+' <span> - '+json.subtitle+'</span>');
    }
    else {
      title.html(json.title);
    }
    if(('pagebreak' in json) && json.pagebreak) {
      title.attr('style','page-break-before:always;');
    }
    title.appendTo('.cv');
  }
}());
