'use strict';

document.addEventListener("DOMContentLoaded", function(){

    // ================================================================================
    // Полифилы:
    // ================================================================================

    // matches
    (function(e){
        e.matches || (e.matches = e.matchesSelector||function(selector){
            var matches = document.querySelectorAll(selector),
                th = this;
            return Array.prototype.some.call(matches, function(e){
                return e === th;
            });
        });
    })(Element.prototype);


    // closest
    (function() {
        // проверяем поддержку
        if (!Element.prototype.closest) {
        // реализуем
            Element.prototype.closest = function(css) {
                var node = this;

                while (node) {
                    if (node.matches(css)) return node;
                    else node = node.parentElement;
                }
                return null;
            };
        };
    })();


    // remove
    (function(e){
        if (!('remove' in e)) {
            e.remove = function() {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                };
            };
        };
    })(Element.prototype);



    // ================================================================================
    // Меню
    // ================================================================================
    var menu = document.querySelector(".header .menu");

    menu.addEventListener("click", function(e){
        var p = e.target.tagName === 'P' ? e.target : null,
            elements;

        if (p) {
            elements = menu.getElementsByTagName('P');

            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove("selected");
            };

            document.querySelector(".main-info").classList.remove("selected");
            document.querySelector(".service-info").classList.remove("selected");
            document.querySelector(".offer-info").classList.remove("selected");

            p.classList.add("selected");
            document.querySelector("." + p.getAttribute("info")).classList.add("selected");
        };
    });




    // ================================================================================
    // AJAX FORM MAIN
    // 1. Перехват событий форм - 'submit' и отмена действий браузера по этому событию
    // 2. Обработка данных
    // 3. Отправка данных
    // 4. Получение данных
    // ================================================================================
    var allButtons = document.querySelectorAll("input[type='submit']"),
        AjaxAPI,             // Функция - отправка запроса в API через Ajax
        submitAjaxMain,      // callback для события формы ajaxForm-main-'id'
        submitAjaxServiceOffer, // callback для событий форм
        ButtonName,          // Имя действия (add, set, del)
        setServiceOffer,     // Функция - запрос данных о service или offer по его id
        setServiceOfferView, // Функция - Обновление отображения внешнего вида блока
        addServiceOffer,     // Функция - запрос данных о всех блоках service или offer
        addServiceOfferView, // Функция - Обновление всех блоков service или offer и переход на добавленный
        removeServiceOfferView, // Функция - Обновление отображения внешнего вида
        labelID,             // Якорь - после добавления, переходим на него
        addMassege,
        clickButt,
        isLoading = false;  // true - идёт загрузка данных. false - можно загружать



    // Инициализация после загрузки документа
    function init(){
        var formMain = document.querySelector("form[name*='ajaxForm-main-']"),
            formServiceAll = document.querySelectorAll("form[name*='ajaxForm-service-']"),
            formOfferAll = document.querySelectorAll("form[name*='ajaxForm-offer-']");

        formMain.addEventListener('submit', submitAjaxMain, false);

        for (var i = 0; i < formServiceAll.length; i++) {
            formServiceAll[i].addEventListener('submit', submitAjaxServiceOffer, false);
        };

        for (var i = 0; i < formOfferAll.length; i++) {
            formOfferAll[i].addEventListener('submit', submitAjaxServiceOffer, false);
        };

        textAriaSVG();

        discription();

        return false;
    };


    // Обработчик события загрузки документа
    window.addEventListener('load', init, false);



    clickButt = function(e) {
            ButtonName = e.target.name;
    };


    for(var i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener('click', clickButt);
    };


    setServiceOffer = function(form, name) {
        var data,
            id;

        if (name === 'service') {
            id = form.name.replace("ajaxForm-service-", "");
            data = {
                method: 'getServicesID',
                id: id
            }
        } else if (name === 'offer') {
            id = form.name.replace("ajaxForm-offer-", "");
            data = {
                method: 'getOfferID',
                id: id
            }
        } else {
            return false;
        }

        AjaxAPI(data, form);
    };



    setServiceOfferView = function(e, name){
        var block;

        if ( name === 'service') {

            block = document.querySelector("#bs-" + e.result[0].id + " .service-block");
            block.innerHTML = "";
            block.innerHTML = '<div class="service-block">'+
                '<center><a href="' + e.result[0].href + '"><img src="' + e.result[0].icon + '"/></a></center>' +
                '<p class="txt">' + e.result[0].description + '</p>' +
                '</div>';

        } else if (name === 'offer') {

            block = document.querySelector("#bo-" + e.result[0].id + " .offer-block");
            block.innerHTML = "";
            block.innerHTML = '<div class="offer-block">' +
                '<div class="wrapper">' +
                '<a href="' + e.result[0].href + '"><img src="' + e.result[0].icon + '"/></a>' +
                '<p class="txt"><span>' + e.result[0].title + '</span><br>' + e.result[0].description + '</p>' +
                '</div>' +
                '</div>';

        };
    };



    addServiceOffer = function(form, name) {
        var data,
            id;

        if (name === 'service') {

            data = {
                method: 'getServices'
            }

        } else if (name === 'offer') {

            data = {
                method: 'getOffers'
            }

        } else {
            return false;
        }

        AjaxAPI(data, form);
    };


//     $discrArray = function ($txt) {
//         $result = explode('<br>', $txt);
//         for ($i = 0; $i < 4; $i++) {
//             if (!isset($result[$i])) {
//                 $result[$i] = '';
//             }
//             // $result[$i] = strip_tags($result[$i]);
//         }
//         return $result;
//     };

//     $checked = function($txt) {
//         return substr($txt, -7) === '</span>' ? 'checked' : '';
//     };

    function discrArray(txt) {
        var result = txt.split('<br>');
        for(var i = 0; i < 4; i++) {
            if (!result[i]) {
                result[i] = '';
            };
        };
        return result;
    };


    function checked(txt) {
        return txt.indexOf('<span>') < 0 ? '' : 'checked';
    };


    addServiceOfferView = function(e, name) {
        var elementInfo,
            stringHtml,
            blockHTML,
            pMessage,
            str;

        if ( name === 'service') {

            elementInfo = document.querySelector(".service-info");
            elementInfo.innerHTML = '';
            stringHtml = '<h1>Service information:</h1>';
            for (var i = 0; i < e.result.length; i++) {

                str = (function() {
                    var txt = '';
                    for (var k = 0; k < 4; k++) {
                        txt += '<input type="checkbox" name="bold' + (k + 1) + '" ' + checked(discrArray(e.result[i].description)[k]) +'>' +
                        '<textarea rows="1" name="description' + (k + 1) + '">' + discrArray(e.result[i].description)[k].replace('<span>', '').replace('</span>', '') + '</textarea>';
                    };
                    return txt; 
                })();

                stringHtml += 
                '<div class="service" id="bs-' + e.result[i].id + '">' +
                    '<div class="result">' +
                        '<div class="service-block">' +
                            '<center>' +
                                '<a href="' + e.result[i].href + '"><img src="' + e.result[i].icon + '"/></a>'+
                            '</center>' +
                            '<p class="txt">' + e.result[i].description + '</p>'+
                        '</div>' +
                    '</div>' +
                    '<div class="edit">' +
                        '<form method="POST" action="" name="ajaxForm-service-' + e.result[i].id + '"> <br />' +
                            '<h3>Order:</h3>' +
                            '<input type="number" step name="order" maxlength="11" value="' + e.result[i].order + '"/>' +
                            '<h3>URL:</h3>' +
                            '<input type="url" name="href" value="' + e.result[i].href + '"/>' +
                            '<h3>Description:</h3>' +
                            '<textarea rows="4" name="description">' + e.result[i].description + '</textarea>' +

                            // description 1, 2, 3, 4  checkbox 1, 2, 3, 4
                            str +

                            '<h3>Icon:</h3>' +
                            '<textarea rows="1" maxlength="191" name="icon">' + e.result[i].icon + '</textarea>' +
                            '<textarea rows="1" readonly name="SVG"  value="\n"></textarea>' +
                            '<input type="submit" name="add" value="Insert"/>' +
                            '<input type="submit" name="set" value="Update"/>' +
                            '<input type="submit" name="del" value="Delete"/>' +
                            '<p class="message"></p>' +
                        '</form>' +
                    '</div>' +
                '</div>';
            };

            elementInfo.innerHTML = stringHtml;
            labelID = 'bs-' + labelID;

        } else if (name === 'offer') {

            elementInfo = document.querySelector(".offer-info");
            elementInfo.innerHTML = '';
            stringHtml = '<h1>Our offer information:</h1>';
            for (var i = 0; i < e.result.length; i++) {
                stringHtml += 
                '<div class="offer" id="bo-' + e.result[i].id + '">' +
                    '<div class="result">' +
                        '<div class="offer-block">' +
                            '<div class="wrapper">' +
                                '<a href="' + e.result[i].href + '"><img src="' + e.result[i].icon + '"/></a>' +
                                '<p class="txt"><span>' + e.result[i].title + '</span><br>' + e.result[i].description + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="edit">' +
                        '<form method="POST" action="" name="ajaxForm-offer-' + e.result[i].id + '"><br />' +
                            '<h3>Order:</h3>' +
                            '<input type="number" step name="order" maxlength="11" value="' + e.result[i].order + '"/>' +
                            '<h3>URL:</h3>' +
                            '<textarea rows="1" maxlength="191" name="href">' + e.result[i].href + '</textarea>' +
                            '<h3>Title:</h3>' +
                            '<textarea rows="1" name="title">' + e.result[i].title + '</textarea>' +
                            '<h3>Description:</h3>' +
                            '<textarea rows="4" name="description">' + e.result[i].description + '</textarea>' +
                            '<h3>Icon:</h3>' +
                            '<textarea rows="1" maxlength="191" name="icon">' + e.result[i].icon + '</textarea>' +
                            '<textarea rows="1" readonly name="SVG"  value="\n"></textarea>' +
                            '<input type="submit" name="add" value="Insert"/>' +
                            '<input type="submit" name="set" value="Update"/>' +
                            '<input type="submit" name="del" value="Delete"/>' +
                            '<p class="message"></p>' +
                        '</form>' +
                    '</div>' +
                '</div>';
            };

            elementInfo.innerHTML = stringHtml;
            labelID = 'bo-' + labelID;

        } else {
            return false;
        }

        // ===============================================================================================
        // ВАЖНО - появились новые объекты, им тоже нужны события
        eventUpdate();
        textAriaSVG();
        // console.log('События обновлены !!!');
        // ===============================================================================================



        // =================== ЯКОРЬ ===============================
        // Быстрый переход
        // window.location.hash = labelID;

        // Анимированный переход
        var V, // коэф. - чем меньше, тем быстрее
            w, // Высота прокрутки
            t, // Отступ от окна браузера до id
            start;

            V = 0.1;
            w = window.pageYOffset;
            t = document.querySelector('#' + labelID).getBoundingClientRect().top;
            start = null;

        requestAnimationFrame(step);

        function step(time) {
            var r,
                progress;

            if (start === null) {
                start = time;
            };

            progress = time - start,
            r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = labelID;
            };
        };
        // =========================================================



        pMessage = document.querySelector("#" + labelID + " .message");
        pMessage.innerHTML = addMassege;
        pMessage.style.color = "#2E8200";
    };





    removeServiceOfferView = function(e, name) {
        var block;

        if ( name === 'service') {

            block = document.querySelector("#bs-" + e.id);

        } else if (name === 'offer') {

            block = document.querySelector("#bo-" + e.id);

        };


        // ===================== Анимация ==============================
        var h = 780, // Высота блока 780 -> 0
            hTime = 1000; // Время анимации ms

        block.style.height = h + 'px';
        block.style.paddingTop = '0px';
        block.style.paddingBottom = '0px';

        animate(function(timePassed) {
          block.style.height = h - h * timePassed / hTime + 'px';
        }, hTime);

        setTimeout(function(){
            block.remove();
        }, hTime + 500);
        // =============================================================

    };





    AjaxAPI = function(data, form, isFile) {
        var xhr = new XMLHttpRequest(),
            obj_response,
            message = form.querySelector(".message");

        function massegeUpdate(){
            message.innerHTML = obj_response.description;
            message.style.color = obj_response.result === 0 ? "#8F0000" : "#2E8200";
        };

        // xhr.timeout = 30000; // Максимальная продолжительность запроса (в миллисекундах)

        xhr.ontimeout = function() {
            console.log('Запрос превысил максимальное время.');
        };

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                console.log('Ошибка');
            } else {

                obj_response = JSON.parse(xhr.responseText);
                // console.log('Данные получены!');
            };

            // ========================================================
            // Выполнение ПОСЛЕ завершения Ajax запроса
            // ========================================================
            isLoading = false;
            // Обработка ответа
            switch (obj_response.method) {
                case 'setMainInfo' :
                    massegeUpdate();
                    break;

                case 'setService' :
                    massegeUpdate();
                    setServiceOffer(form, 'service'); // Обновление блока - запрашиваем данные через Ajax - API
                    break;
                case 'getServicesID' :
                    setServiceOfferView(obj_response, 'service'); // Обновление блока - меняем внешний вид
                    break;
                case 'addService' :
                    labelID = obj_response.result;
                    addMassege = obj_response.description;
                    addServiceOffer(form, 'service'); // Обновление всех блоков - запрашиваем данные через Ajax - API
                    break;
                case 'getServices' :
                    addServiceOfferView(obj_response, 'service'); // Обновление всех блоков и переход на добавленный
                    break;
                case 'removeServiceID' :
                    removeServiceOfferView(obj_response, 'service'); // Удаление блока со страницы
                    break;

                case 'setOffer' :
                    massegeUpdate();
                    setServiceOffer(form, 'offer'); // Обновление блока - запрашиваем данные через Ajax - API
                    break;
                case 'getOfferID' :
                    setServiceOfferView(obj_response, 'offer'); // Обновление блока - меняем внешний вид
                    break;
                case 'addOffer' :
                    labelID = obj_response.result;
                    addMassege = obj_response.description;
                    addServiceOffer(form, 'offer'); // Обновление всех блоков - запрашиваем данные через Ajax - API
                    break;
                case 'getOffers' :
                    addServiceOfferView(obj_response, 'offer'); // Обновление всех блоков и переход на добавленный
                    break;
                case 'removeOfferID' :
                    removeServiceOfferView(obj_response, 'offer'); // Удаление блока со страницы
                    break;
            }

            // Обновить блок

        };

        // ========================================================
        // Ajax запрос
        // ========================================================
        if (isLoading) {
            return false;
        };
        isLoading = true;
        // console.log('Загружаются данные ...');
        xhr.open('POST', 'api', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(data));
    };




    // ==============================================================================
    // MAIN
    // ==============================================================================
    submitAjaxMain = function(e) {
        var id, // Постоянное значение, НО на будущее будем его учитывать.
            data, // Отправляемый объект
            rowData = {}, // Объект со всеми полями и их значениями
            elements = e.target.elements, // Все элементы формы
            p; // Элемент 'p' - для вывода сообщения

        e.preventDefault(); // Отмена действия браузера

        id = e.target.name.replace("ajaxForm-main-", "");
        rowData['id'] = parseInt(id);

        // Заполняем rowData данными из формы
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].type === "textarea" || elements[i].type === "text") {

                rowData[elements[i].name] = elements[i].value;

            };
        };

        // Формируем объект для отправки
        if (ButtonName === 'set') {
            data = {
                method: 'setMainInfo',
                row: rowData
            };

            // Отправляем объект
            AjaxAPI(data, e.target);
        };

        return false;
    };



    // ==============================================================================
    // SERVICE и OFFER
    // ==============================================================================
    submitAjaxServiceOffer = function(e) {
        var name, // 'offer' или 'service'
            id,
            data, // Отправляемый объект
            rowData = {}, // Объект со всеми полями и их значениями
            elements = e.target.elements, // Все элементы формы
            inFile; // Отправляемый SVG файл

        e.preventDefault(); // Отмена действия браузера

        if (e.target.name.substring(0,14) === 'ajaxForm-offer') {
            name = 'offer';
        } else if (e.target.name.substring(0,16) === 'ajaxForm-service') {
            name = 'service';
        } else {
            return false;
        };


        if (name === 'service') {
            id = e.target.name.replace("ajaxForm-service-", "");
        } else if (name === 'offer') {
            id = e.target.name.replace("ajaxForm-offer-", "");
        };

        // Заполняем rowData данными из формы
        rowData['id'] = parseInt(id);

        if (ButtonName === 'set' || ButtonName === 'add') {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].type === "textarea" ||
                    elements[i].type === "text" ||
                    elements[i].type === "number" ||
                    elements[i].type === "url") {

                    rowData[elements[i].name] = elements[i].value;

                };
            };
        }

        // ===============================================
        // UPDATE
        // ===============================================
        if (ButtonName === 'set') {

            if (name === 'service') {
                data = {
                    method: 'setService',
                    row: rowData
                };
            } else if (name === 'offer') {
                data = {
                    method: 'setOffer',
                    row: rowData
                };
            };

            AjaxAPI(data, e.target); // Отправляем объект

        // ===============================================
        // INSERT
        // ===============================================
        } else if (ButtonName === 'add') {

            if (name === 'service') {
                data = {
                    method: 'addService',
                    row: rowData
                };
            } else if (name === 'offer') {
                data = {
                    method: 'addOffer',
                    row: rowData
                };
            };

            AjaxAPI(data, e.target); // Отправляем объект

        // ===============================================
        // DELETE
        // ===============================================
        } else if (ButtonName === 'del') {

            if (name === 'service') {
                data = {
                    method: 'removeServiceID',
                    id: id
                };
            } else if (name === 'offer') {
                data = {
                    method: 'removeOfferID',
                    id: id
                };
            };

            AjaxAPI(data, e.target); // Отправляем объект
        };


        return false;
    };




    function eventUpdate() {

        var formServiceAll = document.querySelectorAll("form[name*='ajaxForm-service-']"),
            formOfferAll = document.querySelectorAll("form[name*='ajaxForm-offer-']"),
            allButtonsNew = document.querySelectorAll("input[type='submit']");

        // Переназначаем события
        for (var i = 0; i < formServiceAll.length; i++) {
            formServiceAll[i].addEventListener('submit', submitAjaxServiceOffer, false);
        };

        for (var i = 0; i < formOfferAll.length; i++) {
            formOfferAll[i].addEventListener('submit', submitAjaxServiceOffer, false);
        };

        for(var i = 0; i < allButtonsNew.length; i++) {
            allButtonsNew[i].addEventListener('click', clickButt);
        };

    };



    // Классическая функция для анимации
    function animate(draw, duration) {
        var start = performance.now();

        requestAnimationFrame(function animate(time) {
            // определить, сколько прошло времени с начала анимации
            var timePassed = time - start;

            // возможно небольшое превышение времени, в этом случае зафиксировать конец
            if (timePassed > duration) timePassed = duration;

            // нарисовать состояние анимации в момент timePassed
            draw(timePassed);

            // если время анимации не закончилось - запланировать ещё кадр
            if (timePassed < duration) {
                requestAnimationFrame(animate);
            };

        });
    };






    // ======================================================================================
    // Вставка SVG через textArea
    // ======================================================================================
    // - Создание множественного фона (матрица)
    // - Обработка событий мышки по секторам этого фона
    // - Загрузка новой SVG иконки в TextArea



    // Инициализация textAriaSVG после загрузки документа - в функции init()
    var textAriaSVG = function(){
        var textAreaAll = document.querySelectorAll('textarea[name="SVG"]'),
            textAreaIcon,
            positionX,
            positionY,
            countIconX = 0,
            countIconY = 0,
            countIconXMax = 5,
            TxtInnerHTML = '',
            arrayX = [],
            arrayY = [],

            // Параметры иконок (CSS) (значения в px):
            sizeX = 71,
            sizeY = 71,
            paddingXY = 15,
            backImage = '',
            backPosition = '';


        // Массив имён файлов иконок
        svgFileNameAll = svgFileNameAll.slice(2);

        svgFileNameAll.forEach(function(e) {

            backImage += "url('img/task/icons/" + e + "'),";

            positionX = paddingXY + countIconX * ( 2 * paddingXY + sizeX );
            positionY = paddingXY + countIconY * ( paddingXY + sizeY );

            backPosition += positionX + "px " + positionY + "px,";

            arrayX.push(positionX);
            arrayY.push(positionY);

            countIconX++;

            if (countIconX === countIconXMax) {
                countIconX = 0;
                countIconY++;
            }
        });


        // Убираем последнюю запятую:
        backImage = backImage.slice(0,-1);
        backPosition = backPosition.slice(0,-1);


// document.querySelector('textarea[name="SVG"]:after').style.backgroundImage = "url('img/task/icons/101.svg')";
// textAreaAll[0].style.backgroundImage = "url('img/task/icons/201.svg')";
// textAreaAll[0].style.backgroundImage = "url('data:image/svg+xml, img/task/icons/201.svg')";
// textAreaAll[0].style.backgroundPosition = "15px 15px";

        for (var i = 0; i < textAreaAll.length; i++) {
        // for (var i = 0; i < 1; i++) {

            // Установка стилей
            textAreaAll[i].style.backgroundImage = backImage;
            textAreaAll[i].style.backgroundPosition = backPosition;
            textAreaAll[i].style.backgroundSize = sizeX + "px " + sizeY + "px";
            for (var k = 0; k < countIconY; k++) {
                TxtInnerHTML += "\n";
            };
            // textAreaAll[i].innerHTML = TxtInnerHTML;
            textAreaAll[i].value = TxtInnerHTML;
            TxtInnerHTML = '';

            // Установка событий
            textAreaAll[i].addEventListener('click', mouseIconClick);
            textAreaAll[i].addEventListener('mousemove', mouseIconMove);

            textAreaIcon = textAreaAll[i].closest('form').querySelector('textarea[name="icon"]');
            textAreaIcon.addEventListener('input', iconInput);
        };



        function iconInput(e, textareaIcon) {
            var formName,
                imgIcon,
                id;

            if (!textareaIcon) {
                textareaIcon = e.target;
            };

            // innerHTML и value отличаются
            textareaIcon.innerHTML = textareaIcon.value;


            // Обновим иконку в .result
            formName = textareaIcon.closest('form').name;

            if (formName.substring(0,16) === 'ajaxForm-service') {

                id = formName.replace("ajaxForm-service-", "");
                imgIcon = document.querySelector("#bs-" + id + " .service-block img");

            } else if (formName.substring(0,14) === 'ajaxForm-offer') {

                id = formName.replace("ajaxForm-offer-", "");
                imgIcon = document.querySelector("#bo-" + id + " .offer-block img");

            } else {
                return false;
            };

            imgIcon.setAttribute('src', textareaIcon.value);
        };


        function mouseIconClick(e) {
            mouseTextArea(e, 'click');
        };


        function mouseIconMove(e) {
            mouseTextArea(e, 'mousemove');
        };


        function mouseTextArea(e, eventName) {
            var x,
                y,
                indexX,
                indexY,
                indexFile,
                isSelect = false,
                textareaIcon;

                x = e.offsetX;
                y = e.offsetY + e.target.scrollTop;

                indexX = Math.floor(x / ( 2 * paddingXY + sizeX ));
                indexY = Math.floor(y / ( paddingXY + sizeY ));
                indexFile = countIconXMax * indexY + indexX;

                if ( indexFile < svgFileNameAll.length &&
                     x <= arrayX[indexX] + sizeX) {

                    isSelect = y <= (arrayY[ countIconXMax * indexY ] + sizeY) ? true : false;

                } else {
                    isSelect = false;
                };


                if (isSelect && eventName === 'mousemove') {
                    e.target.style.cursor = "pointer";
                
                } else if (isSelect && eventName === 'click') {

                    textareaIcon = e.target.closest('form').querySelector('textarea[name="icon"]');
                    textareaIcon.value = textareaIcon.innerHTML = 'img/task/icons/' + svgFileNameAll[ indexFile ];
                    iconInput(null, textareaIcon);

                } else if (!isSelect && eventName === 'mousemove') {
                    e.target.style.cursor = "default";
                };

        };

    }; // textAriaSVG();



    // ======================================================================================
    // Description: События и парсинг
    // ======================================================================================
    var discription;

    discription = function() {
        var desc,
            bold,
            serviceAll = document.querySelectorAll(".service");

        for (var i = 0; i < serviceAll.length; i++) {
            for(var k = 0; k < 4; k++) {

                desc = serviceAll[i].querySelector('textarea[name="description' + (k + 1) + '"');
                desc.addEventListener('input', gather);
                bold = serviceAll[i].querySelector('input[name="bold' + (k + 1) + '"');
                bold.addEventListener('change', gather);
            };
        };


        function gather(e) {
            var id,
                d,
                descN,
                boldN,
                t,
                innerHTML = '';

            id = e.target.closest('FORM').name.replace("ajaxForm-service-", "");
            d = e.target.closest('FORM').querySelector('textarea[name="description"]');
            t = document.querySelector('#bs-' + id + ' .result .txt');

            for (var i = 0; i < 4; i++) {
                boldN = e.target.closest('FORM').querySelector('input[name="bold' + (i + 1) + '"]').checked;
                descN = e.target.closest('FORM').querySelector('textarea[name="description' + (i + 1) + '"]').value;

                if (descN) {
                    innerHTML += boldN ? '<span>' + descN + '</span><br>' : descN + '<br>';
                };

            };

            innerHTML = innerHTML.substring(0, innerHTML.length - 4);
            d.value = d.innerHTML = t.innerHTML = innerHTML;
        };

    };


});