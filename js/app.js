/* ============================================
   Portfolio Template — Main Application
   ============================================ */

(function () {
  "use strict";

  /* ---------- Theme Management ---------- */
  const ThemeManager = {
    init() {
      const saved = localStorage.getItem("theme");
      const theme = saved || "dark";
      this.apply(theme);

      document.getElementById("theme-toggle").addEventListener("click", () => {
        const current =
          document.documentElement.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        this.apply(next);
        localStorage.setItem("theme", next);
      });
    },

    apply(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      const btn = document.getElementById("theme-toggle");
      btn.innerHTML = theme === "dark" ? "&#9788;" : "&#9790;";
      btn.setAttribute(
        "aria-label",
        `Switch to ${theme === "dark" ? "light" : "dark"} mode`
      );
    },
  };

  /* ---------- Typed Text Animation ---------- */
  const TypedText = {
    el: null,
    strings: [],
    stringIndex: 0,
    charIndex: 0,
    isDeleting: false,
    typeSpeed: 80,
    deleteSpeed: 40,
    pauseEnd: 2000,
    pauseStart: 500,

    init(elementId, strings) {
      this.el = document.getElementById(elementId);
      if (!this.el || !strings.length) return;
      this.strings = strings;
      this.tick();
    },

    tick() {
      const current = this.strings[this.stringIndex];
      if (this.isDeleting) {
        this.charIndex--;
      } else {
        this.charIndex++;
      }

      this.el.textContent = current.substring(0, this.charIndex);

      let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

      if (!this.isDeleting && this.charIndex === current.length) {
        delay = this.pauseEnd;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.stringIndex = (this.stringIndex + 1) % this.strings.length;
        delay = this.pauseStart;
      }

      setTimeout(() => this.tick(), delay);
    },
  };

  /* ---------- Navigation ---------- */
  const Navigation = {
    init() {
      this.buildNav();
      this.setupHamburger();
      this.setupScrollSpy();
    },

    buildNav() {
      const ul = document.getElementById("nav-links");
      CONFIG.nav.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        a.addEventListener("click", () => {
          ul.classList.remove("open");
          document
            .querySelector(".nav-hamburger")
            .classList.remove("active");
        });
        li.appendChild(a);
        ul.appendChild(li);
      });
    },

    setupHamburger() {
      const btn = document.querySelector(".nav-hamburger");
      const menu = document.getElementById("nav-links");
      btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        menu.classList.toggle("open");
      });
    },

    setupScrollSpy() {
      const navbar = document.querySelector(".navbar");
      const sections = document.querySelectorAll("section[id]");
      const links = document.querySelectorAll("#nav-links a");

      window.addEventListener("scroll", () => {
        // Navbar shadow
        navbar.classList.toggle("scrolled", window.scrollY > 50);

        // Active link
        let current = "";
        sections.forEach((section) => {
          const top = section.offsetTop - 100;
          if (window.scrollY >= top) {
            current = section.getAttribute("id");
          }
        });

        links.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });
      });
    },
  };

  /* ---------- Hero Section ---------- */
  function buildHero() {
    const { hero, name, avatarUrl } = CONFIG;
    document.getElementById("hero-greeting").textContent = hero.greeting;
    document.getElementById("hero-name").textContent = name;
    document.getElementById("hero-description").textContent = hero.description;

    const avatar = document.getElementById("hero-avatar");
    avatar.src = avatarUrl;
    avatar.alt = `${name} avatar`;

    const ctaBtn = document.getElementById("hero-cta");
    ctaBtn.textContent = hero.cta.text;
    ctaBtn.href = hero.cta.link;

    const ctaSecBtn = document.getElementById("hero-cta-secondary");
    ctaSecBtn.textContent = hero.ctaSecondary.text;
    ctaSecBtn.href = hero.ctaSecondary.link;

    TypedText.init("typed-text", hero.typedStrings);
  }

  /* ---------- About Section ---------- */
  function buildAbout() {
    const { about } = CONFIG;
    document.getElementById("about-title").textContent = about.title;
    document.getElementById("about-description").textContent =
      about.description;

    const container = document.getElementById("skills-list");
    about.skills.forEach((skill) => {
      const item = document.createElement("div");
      item.className = "skill-item";
      item.innerHTML = `
        <label>
          <span>${skill.name}</span>
          <span>${skill.level}%</span>
        </label>
        <div class="skill-bar">
          <div class="skill-bar-fill" data-width="${skill.level}"></div>
        </div>
      `;
      container.appendChild(item);
    });
  }

  /* ---------- Tech Stack ---------- */
  function buildTechStack() {
    const grid = document.getElementById("tech-grid");
    CONFIG.techStack.forEach((tech) => {
      const card = document.createElement("div");
      card.className = "tech-card fade-in";
      card.innerHTML = `
        <i class="${tech.icon}"></i>
        <span>${tech.name}</span>
      `;
      grid.appendChild(card);
    });
  }

  /* ---------- Projects from GitHub ---------- */
  const LANG_COLORS = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Shell: "#89e051",
    Vue: "#41b883",
    Dart: "#00B4AB",
    Kotlin: "#A97BFF",
    Swift: "#F05138",
    Lua: "#000080",
  };

  async function buildProjects() {
    const { projects, githubUsername } = CONFIG;
    document.getElementById("projects-title").textContent = projects.title;
    document.getElementById("projects-description").textContent =
      projects.description;

    const grid = document.getElementById("projects-grid");

    // Show loading
    grid.innerHTML = `
      <div class="projects-loading">
        <div class="spinner"></div>
        <p>Loading projects from GitHub...</p>
      </div>
    `;

    try {
      const res = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=${projects.sortBy}`
      );
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

      let repos = await res.json();

      if (projects.excludeForks) {
        repos = repos.filter((r) => !r.fork);
      }

      if (projects.sortBy === "stars") {
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      }

      repos = repos.slice(0, projects.maxRepos);

      grid.innerHTML = "";

      if (repos.length === 0) {
        grid.innerHTML = `
          <div class="projects-empty">
            <p>No public repositories found.</p>
          </div>
        `;
        return;
      }

      repos.forEach((repo) => {
        const card = document.createElement("div");
        card.className = "project-card fade-in";

        const langColor = LANG_COLORS[repo.language] || "#8b8b8b";

        card.innerHTML = `
          <div class="project-card-header">
            <span class="project-card-icon">&#128193;</span>
            <div class="project-card-links">
              <a href="${repo.html_url}" target="_blank" rel="noopener" aria-label="GitHub repo" title="View on GitHub">&#128279;</a>
              ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener" aria-label="Live demo" title="Live Demo">&#127760;</a>` : ""}
            </div>
          </div>
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description provided."}</p>
          <div class="project-card-footer">
            ${
              repo.language
                ? `<span class="project-lang">
                    <span class="project-lang-dot" style="background:${langColor}"></span>
                    ${repo.language}
                  </span>`
                : ""
            }
            <span class="project-stat">&starf; ${repo.stargazers_count}</span>
            <span class="project-stat">&#9906; ${repo.forks_count}</span>
          </div>
        `;
        grid.appendChild(card);
      });

      // Re-observe new fade-in elements
      observeFadeIns();
    } catch (err) {
      grid.innerHTML = `
        <div class="projects-empty">
          <p>Could not load projects. ${err.message}</p>
        </div>
      `;
    }
  }

  /* ---------- Contact ---------- */
  function buildContact() {
    const { contact, socials } = CONFIG;
    document.getElementById("contact-title").textContent = contact.title;
    document.getElementById("contact-description").textContent =
      contact.description;

    const emailLink = document.getElementById("contact-email");
    emailLink.href = `mailto:${contact.email}`;
    emailLink.textContent = contact.email;

    const socialsContainer = document.getElementById("contact-socials");
    socials.forEach((s) => {
      const a = document.createElement("a");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "social-link";
      a.setAttribute("aria-label", s.name);
      a.title = s.name;
      a.innerHTML = `<i class="${s.icon}"></i>`;
      socialsContainer.appendChild(a);
    });

    // Form submit (UI only)
    document.getElementById("contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = "Message Sent!";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        e.target.reset();
      }, 2500);
    });
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    const year = new Date().getFullYear();
    document.getElementById("footer-text").innerHTML =
      `&copy; ${year} ${CONFIG.name}. ${CONFIG.footer.text} <span class="heart">&hearts;</span>`;
  }

  /* ---------- Intersection Observer — Fade Ins ---------- */
  let fadeObserver;

  function observeFadeIns() {
    if (!fadeObserver) {
      fadeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              fadeObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
    }

    document.querySelectorAll(".fade-in:not(.visible)").forEach((el) => {
      fadeObserver.observe(el);
    });
  }

  /* ---------- Skill Bar Animation ---------- */
  function observeSkillBars() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll(".skill-bar-fill");
            fills.forEach((fill) => {
              fill.style.width = fill.dataset.width + "%";
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const skillsList = document.getElementById("skills-list");
    if (skillsList) observer.observe(skillsList);
  }

  /* ---------- Back to Top ---------- */
  function setupBackToTop() {
    const btn = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
      btn.classList.toggle("visible", window.scrollY > 400);
    });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    ThemeManager.init();
    Navigation.init();
    buildHero();
    buildAbout();
    buildTechStack();
    buildProjects();
    buildContact();
    buildFooter();
    observeFadeIns();
    observeSkillBars();
    setupBackToTop();

    // Set logo text
    document.getElementById("nav-logo").textContent =
      CONFIG.name.split(" ")[0];
  });
})();
