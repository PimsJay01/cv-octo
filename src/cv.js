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
      //console.log(cv);
      $('title').html('CV '+cv.tri+' - '+cv.firstname+' '+cv.lastname)

      $.get('src/templates/header.hbs', function (data) {
        var template = Handlebars.compile(data);
        $('.cv').html(template(cv));

        $.getJSON('src/'+CV_LANGUAGE+'.json', function (json) {
          $.each(json.cv, function(index, section) {
            if(section.type in templates) {
              compile(templates[section.type], section);
            }
          });
          $('.octo-position').html(json.position);
          checkURLs();
        });
      }, 'html');
  });

  function compile(hbs, json) {
    title(json);
    var template = Handlebars.compile(hbs);
    $('.cv').append(template(json));
  }

  function checkURLs() {
    $.each($('p, li'), function(index, tag) {
      var html = $(tag).html()
          .replace(/\((.+?)\)\[(.+?)\]/, '<a href="$2">$1</a>');
      $(tag).html(html);
    });
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
