(function($) {
                                    
                                    var old_datepicker =  $.fn.datepicker;
                                    var old_generateHTML = $.datepicker._generateHTML;

                                    // и делигируем их новым
                                    $.datepicker._generateHTML = function(inst) {
                                            // получаем календарь ввиде raw-html
                                            var _generateHTML = old_generateHTML.apply(this, arguments),
                                            // выгребаем даты для этого календаря
                                            dates = inst.settings.hightlight.values;
                                            titles = inst.settings.hightlight.titles;

                                            // и начинаем расскрашивать
                                            for (var i in dates){
                                                    if (dates[i].getFullYear() == inst.drawYear && dates[i].getMonth() == inst.drawMonth && dates[i].getDate() != inst.currentDay){
                                                            _generateHTML = _generateHTML.replace(
                                                            // магия регулярок
                                                            new RegExp('<a class="([^"]+)" href="#">' + dates[i].getDate() + '</a>','i'),
                                                            function(link, classes){
                                                                    // еще больше магии
                                                                    return link.replace(classes, classes + ' ui-state-custom' + 
                                                                            (titles[i] ? '" title="'+ titles[i] : ''));
                                                            });
                                                    }
                                            }
                                            return _generateHTML;
                                    };

                                    // делегируем конструктор
                                    $.fn.datepicker = function(options){
                                            // новые опции преобразовываем к объекту
                                            options.hightlight = $.extend(
                                                    {format:$.datepicker._defaults.dateFormat, values:[], settings:{}},
                                                    options.hightlight
                                            );

                                            // сразу превращаем даты в объекты типа Date для того чтобы сохранить 
                                            options.hightlight.values = $.map(options.hightlight.values, function(value){
                                                    return $.datepicker.parseDate(options.hightlight.format, value, options.hightlight.settings);
                                            });

                                            return old_datepicker.apply(this, [options]);
                                    };
                                    
                               
                                })(jQuery);