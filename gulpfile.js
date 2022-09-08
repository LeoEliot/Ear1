const { src, dest, parallel, series, watch } = require('gulp');

const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: '.' }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
}

function styles() {
	return src('scss/style.scss') // Выбираем источник: "app/sass/main.sass" или "app/less/main.less"
	.pipe(sass()) // Преобразуем значение переменной "preprocessor" в функцию
	//.pipe(concat('app.min.css')) // Конкатенируем в файл app.min.js
	//.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	//.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest('css/')) // Выгрузим результат в папку "app/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function watcher() {
  watch('scss/**/*.scss',styles);
  watch('index.html').on('change',browserSync.reload);
}

exports.browsersync = browsersync;
exports.default = parallel(browsersync, styles,watcher);