window.addEventListener('load', function () {
  document.querySelector('.preloader').classList.add('opacity-0');

  setTimeout(function () {
    document.querySelector('.preloader').style.display = 'none';
  }, 2000);
});

//PROFICIENCIES TAB
const tabs = document.querySelectorAll('.tabs ul li');
const tabsWrap = document.querySelectorAll('.tab-wrap');

tabs.forEach(function (tab, tab_index) {
  tab.addEventListener('click', function () {
    tabs.forEach(function (tab) {
      tab.classList.remove('tab-active');
    });

    tab.classList.add('tab-active');

    tabsWrap.forEach(function (content, content_index) {
      if (content_index == tab_index) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
  });
});

//PORTFOLIO ITEM FILTER

const filterContainer = document.querySelector('.portfolio-filter'),
  filterBtns = filterContainer.children,
  totalFilterBtn = filterBtns.length,
  portfolioItems = document.querySelectorAll('.portfolio-item'),
  totalPortfolioItem = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
  filterBtns[i].addEventListener('click', function () {
    filterContainer.querySelector('.active').classList.remove('active');
    this.classList.add('active');

    const filterValue = this.getAttribute('data-filter');
    for (let k = 0; k < totalPortfolioItem; k++) {
      if (filterValue === portfolioItems[k].getAttribute('data-category')) {
        portfolioItems[k].classList.remove('hide');
        portfolioItems[k].classList.add('show');
      } else {
        portfolioItems[k].classList.remove('show');
        portfolioItems[k].classList.add('hide');
      }
      if (filterValue === 'all') {
        portfolioItems[k].classList.remove('hide');
        portfolioItems[k].classList.add('show');
      }
    }
  });
}

//THEME SWITCHER

const links = document.querySelectorAll('.alternate-theme'),
  totalLinks = links.length;

function setActiveTheme(color) {
  for (let i = 0; i < totalLinks; i++) {
    if (color === links[i].getAttribute('title')) {
      links[i].removeAttribute('disabled');
    } else {
      links[i].setAttribute('disabled', 'true');
    }
  }
}

// MODE SWITCHER

const mode = document.querySelectorAll('.mode'),
  totalMode = mode.length;
for (let i = 0; i < totalMode; i++) {
  mode[i].addEventListener('change', function () {
    if (this.value === 'dark') {
      document.body.className = 'dark';
    } else {
      document.body.className = 'light';
    }
  });
}

document
  .querySelector('.toggle-theme-switcher')
  .addEventListener('click', () => {
    document.querySelector('.theme-switcher').classList.toggle('open');
  });

//NAV BAR

const nav = document.querySelector('.nav'),
  navList = nav.querySelectorAll('li'),
  totalNavList = navList.length,
  allSections = document.querySelectorAll('.section'),
  totalSections = allSections.length;

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector('a');
  a.addEventListener('click', function () {
    // remove back section class
    removeBackSectionClass();

    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector('a').classList.contains('active')) {
        // add back section class
        addBackSectionClass(j);
      }
      navList[j].querySelector('a').classList.remove('active');
    }

    this.classList.add('active');
    showSection(this);

    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}

function showSection(element) {
  for (let i = 0; i < totalSections; i++) {
    allSections[i].classList.remove('active');
  }

  const target = element.getAttribute('href').split('#')[1];
  document.querySelector('#' + target).classList.add('active');
}

function addBackSectionClass(num) {
  allSections[num].classList.add('back-section');
}

function removeBackSectionClass() {
  for (let i = 0; i < totalSections; i++) {
    allSections[i].classList.remove('back-section');
  }
}

function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector('a').classList.remove('active');
    const target = element.getAttribute('href').split('#')[1];
    if (
      target ===
      navList[i].querySelector('a').getAttribute('href').split('#')[1]
    ) {
      navList[i].querySelector('a').classList.add('active');
    }
  }
}

document.querySelector('.hire-me').addEventListener('click', function () {
  const sectionIndex = this.getAttribute('data-section-index');
  showSection(this);
  updateNav(this);
  removeBackSectionClass();
  addBackSectionClass(sectionIndex);
});

// HAMBURGER MENU

const navTogglerBtn = document.querySelector('.nav-toggler'),
  aside = document.querySelector('.aside');

navTogglerBtn.addEventListener('click', () => {
  asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
  aside.classList.toggle('open');
  navTogglerBtn.classList.toggle('open');
  for (let i = 0; i < totalSections; i++) {
    allSections[i].classList.toggle('open');
  }
}

// CONTACT FORM VALIDATION
function validation() {
  const name = document.getElementById('clientName').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const msg = document.getElementById('message').value;
  const errorMsg = document.getElementById('error-message');
  let text;

  errorMsg.style.padding = '10px';

  // name to have more than 5 characters
  if (name.length < 5) {
    text = 'Please enter a valid name';
    errorMsg.innerHTML = text;
    return false;
  }

  // email needs to have @ symbol and character length of more than 6
  if (email.indexOf('@') == -1 || email.length < 6) {
    text = 'Please enter a valid email address';
    errorMsg.innerHTML = text;
    return false;
  }

  // subject field needs to be filled in
  if (subject.length < 0) {
    text = 'Please enter subject value';
    errorMsg.innerHTML = text;
    return false;
  }
  // message needs to be a minimum of 5 characters
  if (msg.length <= 5) {
    text = 'Please enter more than 10 characters';
    errorMsg.innerHTML = text;
    return false;
  }

  alert('Email successfully submited!');
  return true;
}
