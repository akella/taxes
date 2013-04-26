$(document).ready(function() {

//datepicker
if ($('.js-dp').length > 0) {
  $('.js-dp').datepicker({
    inline: true,
    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
    'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthNamesShort: ['Январь','Февраль','Март','Апрель','Май','Июнь',
    'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
    dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
    dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    weekHeader: 'Не',
    dateFormat: 'dd.mm.yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    hideIfNoPrevNext: true,
    afterAdjustDate: function(){        
      
    },
    onSelect: function() { 
      
    }
  });
};  

// Бегущая строка
function tape_move () {
  // текущий сдвиг текста относительно левой границы блока бегущей строки
  var craw_line_offset;
  var timeOut = null;
  var enableR = false;
  // функция инициализации бегущей строки
  function enableCrawLine(craw) {
    craw_line_offset = craw ? craw : 0;
    // ширина текстового блока
    if(document.getElementById('marquee_text')) {
      var craw_line_width = document.getElementById('marquee_text').offsetWidth;
      moveCrawLine(craw_line_width);
    }
    return false;
  }
  // функция пошагового сдвига
  function moveCrawLine(w) {
    var lefttime;
    var container_width = document.getElementById('marquee_container').offsetWidth;
    // шаг (в пикселях), с которым будем перемещать текст
    var step = 1;
    // задержка между перемещениями на step пикселей
    var tdelay = 20;
    // ширина текстового блока
    w = parseInt(w);
    // если блок не "заехал" за левую границу
    if (craw_line_offset<(w+container_width)) {
        // сдвигаем блок на шаг влево
        craw_line_offset = craw_line_offset + step;
    } else {
      // иначе начинаем все с начала
      craw_line_offset = 0;
    }
    enableR = true;
    // изменяем позицию текстового блока
    document.getElementById('marquee_text').style.left = parseInt(container_width-craw_line_offset)+'px';
    // рекурсивно вызываем функцию сдвига с заданной задержкой
    timeOut = setTimeout(function() {
      moveCrawLine(w);
    }, tdelay);    
  }
  // вызов инициализирующей функции
  enableCrawLine(0);
  $('.tape__play').click(function(event) {
    if(enableR) {
      clearTimeout(timeOut);
      enableR = false;
    }
    else {
      enableCrawLine(0);
    }
    return false;
  });
  $('.tape__pause').click(function(event) {
    if(enableR) {
      clearTimeout(timeOut);
      enableR = false;
    }
    else {
      enableCrawLine(craw_line_offset);
    }
    return false;
  });
};
tape_move();

//sliders
if ($('.js-sl').length > 0) {
  $('.js-sl').each(function() {
    var navi = $(this).prev().find('.js-sl-navi');
    $(this).cycle({ 
      fx: 'fade', 
      speed: 'fast', 
      timeout: 0, 
      wrap: false,
      activePagerClass: 'active',
      pager:  navi,
      pagerAnchorBuilder: function(index, el) {
        index++;
        return '<button>' + index + '</button>';
      }
    });
  });
};

//tabs
if ($('.js-tab').length > 0) {
  $('.js-tab li').click(function() {
    if (!$(this).hasClass('active')) {
      var tab = $(this).attr('data-item');
      $(this).parent().children().removeClass('active');
      $(this).parent().parent().parent().find('.js-tab-item').hide();
      $(this).addClass('active');
      $('#' + tab).show();
    };
  })
};

//js-gallery
if ($('.js-gallery').length > 0) {
  $('.js-gallery li').click(function() {
    if (!$(this).hasClass('active')) {
      var pic = $(this).attr('data-item');
      var text = $(this).find('p').text();
      $(this).parent().children('li').removeClass('active');
      $(this).parent().prev().find('img').attr('src', pic);
      $(this).parent().prev().find('p').text(text);
      $(this).addClass('active');
    };
  })  
  $('.js-gallery li').first().addClass('active');
  function gallery_class() {
    var pic = $(this).next().attr('data-item');
    var text = $(this).next().find('p').text();
    $(this).parent().prev().find('img').attr('src', pic);
    $(this).parent().prev().find('p').text(text); 
  };
  function gallery_sl() {     
    $('.js-gallery-move li.active').each(function() {        
      if ($('.js-gallery-move li').last().hasClass('active')) {
        $(this).removeClass('active');
        $('.js-gallery-move li').first().addClass('active');
        var pic = $('.js-gallery-move li').first().attr('data-item');
        var text = $('.js-gallery-move li').first().find('p').text();
        $(this).parent().prev().find('img').attr('src', pic);
        $(this).parent().prev().find('p').text(text); 
      }
      else {
        $(this).removeClass('active');
        $(this).next().addClass('active');         
        var pic = $(this).next().attr('data-item');
        var text = $(this).next().find('p').text();
        $(this).parent().prev().find('img').attr('src', pic);
        $(this).parent().prev().find('p').text(text); 
      }
    });
  };
  setInterval(gallery_sl, 5000);
};

//services
jQuery.fn.scrollableAddClones = function() {
  var scrollable;
  if (!(scrollable = $(this).data('scrollable')) || !scrollable.getConf().circular)
    return;
  var nodes = scrollable.getItems();
  var length = nodes.length;
  var clonedClass = scrollable.getConf().clonedClass;
  var wrap = scrollable.getItemWrap(); 
  for (var i = 1; i <= 6; i++) {
    nodes.eq(i % length).clone().addClass(clonedClass).appendTo(wrap);
  }
}
if ($('.js-scl').length > 0) {
  $('.js-scl').scrollable({
    items: '.js-scl-items',
    prev: '.js-scl-prev',
    next: '.js-scl-next',
    circular: true
  });
  $('.js-scl').scrollableAddClones();
};

//slider
if ($('.js-slider').length > 0) {
  $('.js-slider').each(function() {
    var slider = $(this);
    var slider_items = $(this).children();
    var slider_prev = $(this).prev().find('.js-slider-prev');
    var slider_next = $(this).prev().find('.js-slider-next');
    slider.scrollable({
      items: slider_items,
      prev: slider_prev,
      next: slider_next
    });
    var api = slider.data('scrollable');
    var size = api.getSize();   
    slider.prev().find('.js-slider-all').html(size); 
    var current = api.getIndex();
    slider.prev().find('.js-slider-current').html(++current);   
    api.onSeek(function() {
      current = api.getIndex();
      slider.prev().find('.js-slider-current').html(++current);
    });
  });  
};
//accordeon
if ($('.js-accord').length > 0) {
  $('.js-accord').liteAccordion({
    containerWidth : 480,                   
    containerHeight : 277,                 
    headerWidth: 31
  });
};

//accordeon navigation
$('.js-accord-nav h3').click( function(){
  var accord = $(this).next('ul');
  if (accord.length > 0) {
    if (!$(this).hasClass('active')) {
      $('.js-accord-nav h3').removeClass('active');
      $(this).addClass('active');
      $('.js-accord-nav ul').slideUp();
      $(this).next().slideDown();
      return false;
    };
  };  
});

//low list
$(".low-list__roll").hide();
$(".js-low-accord").children("li").children("a").click(function(){
  if ($(this).hasClass("is-active")) {
    $(this).next().hide();
    $(this).next().next().hide();
    $(this).removeClass("is-active");
    $(this).children("i").text("+");
  }
  else {
    $(".low-list__cont").hide();
    $(".low-list__roll").hide();
    $(".low-list").children("li").children("a").removeClass("is-active");
    $(".low-list").children("li").children("a").children("i").text("+");
    $(this).next().show();
    $(this).next().next().show();
    $(this).addClass("is-active");
    $(this).children("i").text("-");
  }
  return false;
});
$(".low-list").children("li").children(".low-list__roll").click(function(){
  $(this).hide();
  $(".low-list__cont").hide();
  $(this).prev().prev().removeClass("is-active");
  $(this).prev().prev().children("i").text("+");
  return false;
});
$(".low-list__more").click(function(){
  if ($(this).hasClass("js-active")) {
    $(this).next().hide();
    $(this).removeClass("js-active");
    $(this).children("i").text("+");
  }
  else {
    $(this).next().show();
    $(this).addClass("js-active");
    $(this).children("i").text("-");
  }
});

//messgae container
$(".js-message-cont").hide();
$(".js-roll-message").click(function(){
  if ($(this).hasClass("is-active")) {
    $(this).parent().children(".js-message-cont").slideUp("fast");
    $(this).removeClass("is-active");
    $(this).children("span").text("Розгорнути");
  }
  else {
    $(this).parent().children(".js-message-cont").slideDown("fast");
    $(this).addClass("is-active");
    $(this).children("span").text("Згорнути");
  }
});

//popup for poll results
$(".js-result").click(function() {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(".l-progress").slideUp();
  }
  else {
    $(this).addClass('active');
    $(".l-progress").slideDown();
  };  
  return false;
});
$(".progress__close").click( function(){
  $(".l-progress").slideUp();
  $(".js-result").removeClass('active');
  return false;
});

//table sort
if ($(".js-table-sort").length > 0) {
  $(".js-table-sort").tablesorter({
    cssHeader: ""
  }); 
};

//auth
$('.js-auth').click( function(){
  $('.auth').slideDown();
  return false;
});
$('.js-auth-close').click( function(){
  $('.auth').slideUp();
  return false;
});

$(".js-table-sort").tablesorter({
    cssHeader: ""
}); 

});


//scroll
$(window).scroll(function() {
  if ($(window).scrollTop() > 108) {
    $('.nav').addClass('nav_fixed');
    $('.header').css('margin-bottom', '35px');
  }
  else {
    $('.nav').removeClass('nav_fixed');
    $('.header').css('margin-bottom', '0');
  }
});

