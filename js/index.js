 
$(function () {

    // Define window variables
    
    var winHeight = window.innerHeight;
    var winWidth = window.innerWidth;
    
    // Define scene classes.
    var sceneClass = 'scene';
    var sceneActiveClass = sceneClass + '--active';
    var sceneEndedClass = sceneClass + '--ended';
    var fadeout = $('.scene');
    
    function setScene($el) {
    
    // Get bounding values from section.
    var bounding = $el.get(0).getBoundingClientRect();
    
    if (bounding.top > winHeight) {
    
    // Section is below the viewport.
    // Section has not ended or started, therefore remove classes.
    $el.find('.scene').removeClass(sceneActiveClass);
    $el.find('.scene').removeClass(sceneEndedClass);
    
    } else if (bounding.bottom < 0) {
    
    // Section is above the viewport.
    // Section has ended, therefore remove classes.
    $el.find('.scene').addClass(sceneEndedClass);
    $el.find('.scene').removeClass(sceneActiveClass);
    
    } else {
    
    // We're now inside the section, not below or above.
    // If top of section is at top of viewport, add class active.
    if (bounding.top <= 0) {
    $el.find('.scene').addClass(sceneActiveClass);
    }
    
    // If top of section is below top of viewport, remove class active.
    if (bounding.top > 0) {
    $el.find('.scene').removeClass(sceneActiveClass);
    }
    
    // If bottom of section is at bottom of viewport, add class ended.
    if (bounding.bottom <= (winHeight)) {
    $el.find('.scene').addClass(sceneEndedClass);
    
    }
    
    // If bottom of section is not at bottom of viewport, remove class ended.
    if (bounding.bottom > (winHeight)) {
    $el.find('.scene').removeClass(sceneEndedClass);
    
    // Scene classes function.
    }
    
    
    
    
    }
    }
    
    
    /* 
    * Scrolling videos
    *
    **/
    
    var $scrollVideoWrapper = $('.scroll-video');
    var scrollVideoWrapperHeight;
    var playbackConst = 1000;
    
    var scrollVideo = $('.scroll-video__video').get(0);
    scrollVideo.pause();
    scrollVideo.currentTime = 0;
    
    function setUpVideo(callback) {
    videoDuration = scrollVideo.duration;
    scrollVideoWrapperHeight = Math.floor(videoDuration) * playbackConst;
    $scrollVideoWrapper.height(scrollVideoWrapperHeight);
    $(scrollVideo).data('init', true);
    if (callback) callback();
    }
    
    $(scrollVideo).on('loadedmetadata', function () {
    setUpVideo(function () {
    requestAnimationFrame(renderLoop);
    });
    });
    
    
    var videoCheck = setInterval(function () {
    if (scrollVideo.readyState >= 2 && !$(scrollVideo).data('init')) {
    setUpVideo(function () {
    requestAnimationFrame(renderLoop);
    });
    clearInterval(videoCheck);
    }
    }, 100);
    
    var renderLoop = function () {
    var frameNumber = (window.pageYOffset) / playbackConst;
    if (!isNaN(frameNumber)) {
    scrollVideo.currentTime = frameNumber;
    
    }
    requestAnimationFrame(renderLoop);
    };
    
    /* 
    * Window Events
    *
    **/
    
    // Window resize event
    
    $(window).on('resize', function () {
    winHeight = window.innerHeight;
    winWidth = window.innerWidth;
    setUpVideo();
    });
    
    // Ready event
    setUpVideo();
    
    $(window).on('scroll', function () {
    $scrollVideoWrapper.each(function(){
    setScene($(this));
    
    });
    });
    
    });


    

