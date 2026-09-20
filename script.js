document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const projectTabs = document.querySelectorAll('.project-tab');
  const projectImages = document.querySelectorAll('.project-state');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  const setHeaderState = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  if (menuToggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = 'Menu';
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? 'Close' : 'Menu';
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  const showProject = (name) => {
    projectTabs.forEach((tab) => {
      const active = tab.dataset.project === name;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    projectImages.forEach((image) => {
      image.classList.toggle('active', image.dataset.projectImage === name);
    });
  };

  projectTabs.forEach((tab) => {
    const name = tab.dataset.project;
    tab.addEventListener('click', () => showProject(name));
    tab.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) showProject(name);
    });
    tab.addEventListener('focus', () => showProject(name));
  });
});
