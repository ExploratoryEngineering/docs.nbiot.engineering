function openSidebar() {
    document.getElementById("docs-sidebar").classList.add("docs-sidebar--open");
}

function closeSidebar() {
    document.getElementById("docs-sidebar").classList.remove("docs-sidebar--open");
}

function initSidebar() {
    const sidebarWidth = 260;

    document.getElementById("docs-menu-toggle").addEventListener("click", function(e) {
        if (document.getElementById("docs-sidebar").classList.contains("docs-sidebar--open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // hide sidebar on click outside
    document.addEventListener("click", function(e) {
        if (e.x <= sidebarWidth) {
            return;
        }

        closeSidebar();
    });

    // hide sidebar on scroll outside
    document.getElementById("docs-sidebar").addEventListener("touchstart", function(e) {
        if (e.changedTouches[0].pageX <= sidebarWidth) {
            return;
        }

        closeSidebar();
    }, false);
}

export { initSidebar, openSidebar, closeSidebar };
