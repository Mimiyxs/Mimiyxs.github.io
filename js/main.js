
document.addEventListener("DOMContentLoaded", () => {
    /*
       TABLE OF CONTENTS

       1. ELEMENT SELECTION
       2. MOBILE NAVIGATION
       3. STICKY HEADER OFFSET
       4. SECTION NAVIGATION
       5. ACTIVE SECTION HIGHLIGHT
       6. CONTACT FORM
       7. INITIALIZATION */


    // 1. ELEMENT SELECTION
    const siteHeader = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");
    const contactForm = document.querySelector("#contact-form");

    // 2. MOBILE NAVIGATION
    function setMenuState(isOpen) {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.toggle("open", isOpen);
        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
        updateHeaderOffset();
    }

    menuToggle?.addEventListener("click", () => {
        const isOpen = navLinks?.classList.contains("open");
        setMenuState(!isOpen);
    });


    // 3. STICKY HEADER OFFSET
    function getHeaderHeight() {
        return siteHeader ? Math.ceil(siteHeader.getBoundingClientRect().height): 0;
    }

    function updateHeaderOffset() {
        const height = getHeaderHeight();
        document.documentElement.style.setProperty(
            "--sticky-header-height",
            `${height + 12}px`
        );
    }

    // 4. SECTION NAVIGATION (scolling)
    document.addEventListener("click", (event) => {

        const link = event.target.closest('a[href^="#"]');
        if (!link) return;
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const targetSection = document.getElementById(
            targetId.slice(1)
        );
        if (!targetSection) return;
        event.preventDefault();

        setMenuState(false); // Close mobile menu before calculating scroll position

        // Calculate target position
        const sectionTop =
            targetSection.getBoundingClientRect().top +
            window.scrollY;

        const scrollPosition = sectionTop - getHeaderHeight();

        // Smoothly scroll to the selected section
        window.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: "smooth"
        });

        // Update URL without reloading
        history.replaceState(null, "", targetId);
    });

    // 5. ACTIVE SECTION HIGHLIGHT

    let scrollScheduled = false;
    function updateActiveSection() {
        let currentSection = "home";
        const threshold = window.innerHeight * 0.35;

        sections.forEach((section) => {

            if (section.getBoundingClientRect().top <= threshold) {
                currentSection = section.id;
            }
        });
        navItems.forEach((link) => {

            const isActive =
                link.getAttribute("href") === `#${currentSection}`;
            link.classList.toggle("active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    function scheduleActiveSectionUpdate() {
        if (scrollScheduled) return;
        scrollScheduled = true;
        requestAnimationFrame(() => {
            updateActiveSection();
            scrollScheduled = false;
        });
    }

    // 6. CONTACT FORM
    contactForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        const subject = encodeURIComponent(
            `Portfolio message from ${name}`
        );
        const body = encodeURIComponent(
            `Hello Camille,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
        );
        // open mail app
        window.location.href =
            `mailto:camille.phantt@gmail.com?subject=${subject}&body=${body}`;
    });

    // 7. INITIALIZATION
    function handleResize() {
        updateHeaderOffset();
        scheduleActiveSectionUpdate();
    }
    updateHeaderOffset();
    updateActiveSection();

    // Scroll and resize listeners
    window.addEventListener(
        "scroll",
        scheduleActiveSectionUpdate,
        { passive: true }
    );
    window.addEventListener("resize", handleResize);
});
