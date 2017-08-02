document.addEventListener("DOMContentLoaded", function(event) {
    Barba.Pjax.start();
    Barba.Prefetch.init();
    Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
        const js = container.querySelector("script");
        if (js === null) {
            return;
        }

        eval(js.innerHTML);
        if (typeof pageReady === "function") {
            pageReady(container);
        }
    });
    if (typeof pageReady === "function") {
        pageReady(document);
    }
});
