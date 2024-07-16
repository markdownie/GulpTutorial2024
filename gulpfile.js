
//Step 1
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';


import gulpSass from "gulp-sass";
import nodeSass from "node-sass";

import concat from 'gulp-concat';
import clean from 'gulp-clean';
    
const sass = gulpSass(nodeSass);



/*
    TOP LEVEL FUNCTIONS:

    gulp.task - define tasks
    gulp.src - Point to src files
    gulp.dest - Points to output folder
    gul.watch - Watches for changes
*/

/*
    From terminal: gulp all-tasks
    Install package:  npm install gulp-concat
*/


//  Test task message.
gulp.task('message', function(cb){
    console.log("Gulp is running....");
    cb();
});

gulp.task('default',  function(cb){
    console.log("Runs automaticaly");
    cb();
});



// 1) copy all html files to dist folder
 gulp.task('copyhtml', function(cb){
    console.log("Copy html....");
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
        cb();
});


// 2) Compress all images
//https://www.npmjs.com/package/gulp-imagemin
gulp.task('imagemin', function(cb){
   
        gulp.src('src/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/images'))
            cb();

});

// 3) Run SASS and copmile to css
gulp.task('sass', function(cb) {
    
    gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    cb();
});

// 4) minfy js with uglify
gulp.task('minify', function(cb){
   
    gulp.src('src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

    cb();

});

// 5 Concatinate all js files to dist folder all.js
gulp.task('concatDistScripts',  function(cb) {
    gulp.src('src/scripts/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('dist/js'));
    
      cb()
  });



  // 6 Minifiy the all.js file to all.min.js 
  gulp.task('minifyDistScript', function(cb){
   
    gulp.src('dist/js/all.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))

    cb();
});

// 7 Delete dist folder
// npm install --save-dev gulp-clean
gulp.task('clean', function(cb){
    gulp.src('dist/*', {read: false})
        .pipe(clean());

    cb();
});




// Run all tasks
//gulp.task('default',gulp.parallel('copyhtml', 'imagemin', 'sass', 'minify'));
gulp.task('all-tasks', gulp.series('copyhtml', 
'imagemin', 
'sass', 
'minify', 
'concatDistScripts',
//'minifyDistScript'
));


gulp.task('package', gulp.series('all-tasks'));
