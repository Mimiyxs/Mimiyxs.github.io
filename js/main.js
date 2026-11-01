
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");
    const year = document.getElementById("year");

    if (year) year.textContent = new Date().getFullYear();

    let menuToggle = document.querySelector(".menu-toggle");
    if (navbar && navLinks && !menuToggle) {
        menuToggle = document.createElement("button");
        menuToggle.className = "menu-toggle";
        menuToggle.type = "button";
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-controls", "primary-navigation");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        navLinks.id = "primary-navigation";
        navbar.insertBefore(menuToggle, navLinks);
    }

    function closeMenu() {
        if (!navLinks || !menuToggle) return;
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    }

    menuToggle?.addEventListener("click", () => {
        const open = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        menuToggle.innerHTML = open
            ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    });

    navItems.forEach(link => link.addEventListener("click", closeMenu));

    document.addEventListener("click", event => {
        if (navbar && navLinks?.classList.contains("open") && !navbar.contains(event.target)) {
            closeMenu();
        }
    });

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navItems.forEach(link => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        }, { rootMargin: "-35% 0px -55% 0px" });

        sections.forEach(section => sectionObserver.observe(section));

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });

        document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
    } else {
        document.querySelectorAll(".reveal").forEach(element => element.classList.add("visible"));
    }

    const contactForm = document.getElementById("contact-form");
    contactForm?.addEventListener("submit", event => {
        event.preventDefault();
        const data = new FormData(contactForm);
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim();
        const message = String(data.get("message") || "").trim();

        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(`Hi Camille,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
        window.location.href = `mailto:camille.phantt@gmail.com?subject=${subject}&body=${body}`;
    });
});
