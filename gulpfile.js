var gulp = require("gulp"),                // Подключаем gulp
    scss = require('gulp-sass'),           // Компиляция SCSS
    cssmin = require("gulp-cssmin"),       // Минимизация CSS
    browserSync = require('browser-sync'), // Запуск сервера и обновление при изменении файла

    // Пути для копирования файлов
    path_views_from = "task_frontend/views/*.php",
    path_views_to = "resources/views/task",

    path_images_from = "task_frontend/img/**/*",
    path_images_to = "public/img/task",

    path_js_from = "task_frontend/js/*.js",
    path_js_to = "public/js/task",

    path_scss_from = "task_frontend/scss//**/*.scss",
    path_css_to = "public/css/task",

    path_fonts_from = "task_frontend/fonts/**/*.*",
    path_fonts_to = "public/fonts/task/";



// Запуск сервера и обновление при изменении файла
// test-task.local - домен (Open Server) для автоматического обновления
gulp.task('browserSync', function() {
    browserSync({
        proxy: 'test-task.local'
    });
});


// Стили
// Компиляция и копирование
gulp.task("scss", function () {
  gulp.src(path_scss_from)
    .pipe(scss().on('error', scss.logError))
    // .pipe(scss({outputStyle: 'compressed'})) // Сжатие css
    // .pipe(cssmin())
    .pipe(gulp.dest(path_css_to))
    .pipe(browserSync.reload({stream:true}));
});


// Представления
// Копирование без изменений
gulp.task("php_views", function(){
    gulp.src(path_views_from)
        .pipe(gulp.dest(path_views_to))
        .pipe(browserSync.reload({stream:true}));
});


// Картинки
// Копирование без изменений
gulp.task("images", function(){
    gulp.src(path_images_from)
        .pipe(gulp.dest(path_images_to))
        .pipe(browserSync.reload({stream:true}));
});


// Файлы JavaScript
// Копирование без изменений
gulp.task("js", function(){
    gulp.src(path_js_from)
        .pipe(gulp.dest(path_js_to))
        .pipe(browserSync.reload({stream:true}));
});


// Шрифты
// Копирование без изменений
gulp.task("fonts", function(){
    gulp.src(path_fonts_from)
        .pipe(gulp.dest(path_fonts_to))
        .pipe(browserSync.reload({stream:true}));
});


// Прослушка
gulp.task("watch", function(){
    gulp.watch(path_scss_from, ["scss"]);
    gulp.watch(path_views_from, ["php_views"]);
    gulp.watch(path_images_from, ["images"]);
    gulp.watch(path_js_from, ["js"]);
    gulp.watch(path_fonts_from, ["fonts"]);
})


// При старте копируем, потом слушаем:
gulp.task("default",
    [
      "scss",
      "php_views",
      "images",
      "js",
      "fonts",
      "browserSync",
      "watch"
    ], function(){
});