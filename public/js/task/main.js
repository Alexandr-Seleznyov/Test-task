'use strict';

// Эта часть скрипта отработает после загрузки DOM
document.addEventListener("DOMContentLoaded", function(){

    var windowResize, // Функция для изменения некоторых свойств элементов при изменении ширины окна
        menu = document.querySelector(".header .menu"), // Меню хедера
        but = document.querySelector(".header .menu-button"); // Кнопка меню


    // ================================================================================
    // Изменение ширины экрана
    // ================================================================================
    windowResize = function() {
        var winSize = document.documentElement.clientWidth,
            container = document.querySelector(".container"),
            containerMargin,            // .container -> MARGIN

            header = document.querySelector(".header"),

            serviceTitle = document.querySelector(".service-header .service-title"),
            serviceTitlePadding,        // .service-title -> PADDING-TOP
            serviceTitleFontSize,       // .service-title -> FONT-SIZE

            serviceDescription = document.querySelector(".service-header .service-description"),
            serviceDescriptionFontSize, // .service-description -> FONT-SIZE
            serviceDescriptionPadding,  // .service-description -> PADDING-TOP
            serviceDescriptionHeight,   // .service-description -> HEIGHT

            serviceBlock = document.querySelectorAll(".service-block"),
            lenSB = serviceBlock.length, // количество
            serviceBlockPadding,        // .service-block -> PADDING-BOTTOM
            serviceBlockWidth,          // .service-block -> WIDTH
            serviceBlockTxt = document.querySelectorAll(".service-block .txt"),
            serviceBlockTxtPadding,     // .service-block .txt -> PADDING-TOP
            serviceBlockTxtFont,        // .service-block .txt -> FONT-SIZE
            serviceBlockTxtSpan = document.querySelectorAll(".service-block .txt span"),
            lenSBTS = serviceBlockTxtSpan.length, // количество
            serviceBlockTxtSpanFont,    // .service-block .txt span -> FONT-SIZE

            offerHeader = document.querySelector(".offer-header"),
            offerHeaderHeight,          // .offer-header -> HEIGHT
            offerHeaderP = document.querySelector(".offer-header p"),
            offerHeaderPFont,           // .offer-header p -> FONT-SIZE

            offerBlockContent = document.querySelector(".offer-content"),
            offerBlockContentPadding,   // .offer-content -> PADDING-LEFT
            offerBlock = document.querySelectorAll(".offer-block"),
            lenOB = offerBlock.length,  // количество
            offerBlockWidth,            // .offer-block -> WIDTH
            offerBlockWrapper = document.querySelectorAll(".offer-block .wrapper"),
            offerBlockWrapperMargin,    // .offer-block .wrapper -> MARGIN

            // Элемент фона
            bodyBack = document.querySelector("body"),
            bodyBackSize,               // body -> background-size
            bodyBackTop,                // body -> background-position: top
            bodyBackRight,              // body -> background-position: right

            resizeValue; // Функция

        // Для контроля ширины видимой части окна
        console.log(winSize + ' px - Ширина рабочей области окна');

        // Функция для определения величины, которая зависит от ширины видимой части окна
        // Например:
        // При ширине браузера 1920px, отступы контейнера по 170px (xMax)
        // При ширине браузера 320px, отступы контейнера по 0px (xMin)
        // Следовательно: отступ = 170 * (ширина - 320) / 1600
        resizeValue = function(xMin, xMax) {
            var wMax = 1920,
                wMin = 320;

            return (xMax - xMin) * (winSize - wMin) / (wMax - wMin) + xMin;
        };

        // Ограничения
        winSize = winSize > 2000 ? 2000 : winSize < 320 ? 320 : winSize;

        containerMargin = resizeValue(0, 170);
        containerMargin += 14; // Корректировка при PixelPerfect

        serviceTitlePadding = resizeValue(76, 145);
        serviceTitleFontSize = resizeValue(56, 100);

        serviceDescriptionFontSize = resizeValue(18, 20);
        serviceDescriptionPadding = resizeValue(32, 97);
        serviceDescriptionHeight = resizeValue(224, 185);

        // Полученая ширина контейнера должна содержать максимум 5 блоков
        // Минимальная ширина блока задана в css
        serviceBlockWidth = (winSize - 2 * containerMargin) / 5;
        serviceBlockWidth -= 4; // Корректировка при PixelPerfect
        serviceBlockPadding = resizeValue(34, 100);
        serviceBlockTxtPadding = resizeValue(22, 49);
        serviceBlockTxtFont = resizeValue(16, 19);
        serviceBlockTxtSpanFont = resizeValue(17, 21);

        offerHeaderHeight = resizeValue(75, 152);
        offerHeaderPFont = resizeValue(45, 60);

        offerBlockContentPadding = resizeValue(0, 116);
        offerBlockWidth = (winSize - 2 * containerMargin - 116 - offerBlockContentPadding) / 2;
        offerBlockWidth -= 4; // Корректировка при PixelPerfect
        offerBlockWrapperMargin = resizeValue(5, 62);

        bodyBackSize = resizeValue(190, 390);
        bodyBackTop = resizeValue(-80, -21);
        bodyBackRight = resizeValue(-110, -100);


        // Внесение изменений в style
        container.style.marginLeft = containerMargin + "px";
        container.style.marginRight = containerMargin + "px";

        serviceTitle.style.paddingTop = serviceTitlePadding + "px";
        serviceTitle.style.fontSize = serviceTitleFontSize + "px";

        serviceDescription.style.fontSize = serviceDescriptionFontSize + "px";
        serviceDescription.style.paddingTop = serviceDescriptionPadding + "px";
        serviceDescription.style.height = serviceDescriptionHeight + "px";

        offerHeader.style.height = offerHeaderHeight + "px";
        offerHeaderP.style.fontSize = offerHeaderPFont + "px";

        offerBlockContent.style.paddingLeft = offerBlockContentPadding + "px";

        bodyBack.style.backgroundSize = bodyBackSize + "px";
        bodyBack.style.backgroundPosition = "top " + bodyBackTop + "px right " + bodyBackRight + "px";

        // header.style.width = (winSize - 2 * containerMargin)+ "px";


        for (var i = 0; i < lenSB; i++) {
            serviceBlock[i].style.paddingBottom = serviceBlockPadding + "px";
            serviceBlock[i].style.width = serviceBlockWidth + "px";
            serviceBlockTxt[i].style.paddingTop = serviceBlockTxtPadding + "px";
            serviceBlockTxt[i].style.fontSize = serviceBlockTxtFont + "px";
        };

        for (var i = 0; i < lenSBTS; i++) {
            serviceBlockTxtSpan[i].style.fontSize = serviceBlockTxtSpanFont + "px";
        };

        for (var i = 0; i < lenOB; i++) {
            offerBlock[i].style.width = offerBlockWidth > 282 ? offerBlockWidth + "px" : "";
            offerBlockWrapper[i].style.marginLeft = offerBlockWrapperMargin + "px";
            offerBlockWrapper[i].style.marginRight = offerBlockWrapperMargin + "px";
        };

    };


    windowResize();

    window.onresize = function(event) {
        windowResize();
    };




    // ================================================================================
    // Кнопка меню
    // ================================================================================
    but.addEventListener("click", function(){
        if (menu.style.display && menu.style.display !== "none") {
            menu.style.display = "";
        } else {
            menu.style.display = "inline-block";
        };
    });



    // ================================================================================
    // Меню
    // ================================================================================
    menu.addEventListener("click", function(e){
        var a = e.target.tagName === 'A' ? e.target : null,
            elements;

        if (a) {
            elements = menu.getElementsByTagName('A');
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove("selected");
            };
            a.classList.add("selected");
        };
    });




    // ================================================================================
    // Подгрузка страница, по мере доскролливания
    // ================================================================================
    var service = document.querySelector(".service-content"),
        offer = document.querySelector(".offer-content"),
        offerTitle = document.querySelector(".ajax-offer"),
        footer = document.querySelector(".ajax-footer"),
        scrollTop = 0,      // Высота прокрученной области
        windHeight,         // Высота окна браузера
        pageHeight,         // Высота всей страницы
        countService = 0,   // Добавлено  блоков service
        countOffer = 0,     // Добавлено  блоков offer
        limit,              // Количество добавляемых блоков за один запрос
        isService = true,   // false - Все блоки Service уже добавлены
        isOffer = true,     // false - Все блоки Offer уже добавлены
        isLoading = false,  // true - идёт загрузка данных. false - можно загружать
        obj_request,        // Запрс
        obj_response,       // Ответ
        addBlocks,          // Функция добавления html блоков
        xhr = new XMLHttpRequest();


    // xhr.timeout = 30000; // Максимальная продолжительность запроса (в миллисекундах)

    xhr.ontimeout = function() {
        console.log('Запрос превысил максимальное время.');
    };

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return false;

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
        addBlocks(obj_response);
        windowResize();
        window.onscroll();
    };

    addBlocks = function(obj_response) {

        if (obj_response.method === 'getServices') {
            isService = obj_response.limit === obj_response.result.length ? true : false;
            obj_response.result.forEach(function(e){

                service.innerHTML += '<div class="service-block">'+
                    '<center><a href="' + e['href'] + '"><img src="' + e['icon'] + '"/></a></center>' +
                    '<p class="txt">' + e['description'] + '</p>' +
                    '</div>';

            });
        } else if (obj_response.method === 'getOffers') {

            isOffer = obj_response.limit === obj_response.result.length ? true : false;
            obj_response.result.forEach(function(e){

                offer.innerHTML += '<div class="offer-block">' +
                    '<div class="wrapper">' +
                    '<a href="' + e['href'] + '"><img src="' + e['icon'] + '"/></a>' +
                    '<p class="txt"><span>' + e['title'] + '</span><br>' + e['description'] + '</p>' +
                    '</div>' +
                    '</div>';

            });

        } else {
            console.log('Неопределённый ответ сервера: method: ' + obj_response.method);
        };

    };






    window.onscroll = function() {

        if ( (!isService && !isOffer) || isLoading ) {
            return false;
        }

        windHeight = document.documentElement.clientHeight;;
        pageHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        scrollTop = window.pageYOffset;

        // if ((pageHeight - scrollTop) >= windHeight * 2) {
        if ((pageHeight - scrollTop) >= windHeight * 1.8) {
            return false;
        }

        // ========================================================
        // Выполнение ДО Ajax запроса
        // ========================================================
        if (isLoading) {
            return false;
        };

        isLoading = true;

        if (isService) {

            limit = countService > 0 ? 1 : 5;
            obj_request = {
                method: 'getServices',
                limit: limit,
                offset: countService
            };
            countService += limit;

        } else {

            limit = 1;
            obj_request = {
                method: 'getOffers',
                limit: limit,
                offset: countOffer
            };
            countOffer += limit;

        };

        // ========================================================
        // Ajax запрос
        // ========================================================
        // console.log('Загружаются данные ...');
        xhr.open('POST', 'api', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(obj_request));

    };

    window.onscroll();

});