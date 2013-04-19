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
      $('.js-gallery li').removeClass('active');
      $(this).parent().prev().find('img').attr('src', pic);
      $(this).parent().prev().find('p').text(text);
      $(this).addClass('active');
    };
  })
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

//accordeon
$('.js-accord .accord__item').click(function() {
  if (!$(this).hasClass('active')) {
    $('.js-accord .accord__item').removeClass('active');
    $(this).addClass('active');
  };
});

});