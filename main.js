//-----------------------------------------------------------------------------------
// REGISTERS THE PLUGIN
gsap.registerPlugin(ScrollToPlugin);

//SCROLL EFFECT
let panels = gsap.utils.toArray(".section"),
    observer = ScrollTrigger.normalizeScroll(true),
    scrollTween;


function goToSection(i) {
  scrollTween = gsap.to(window, {
    scrollTo: {y: i * innerHeight, autoKill: false},
    duration: 1.2,
    onComplete: () => scrollTween = null,
    overwrite: true
  });
}

panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top bottom",
    end: "+=199%",
    onToggle: self => self.isActive && !scrollTween && goToSection(i)
  });
});

// just in case the user forces the scroll to an inbetween spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
ScrollTrigger.create({
  start: 0, 
  end: "max",
  snap: 1 / (panels.length - 1)
})


function playVideo() {
  var video = document.getElementById('video');
  video.play();
  document.querySelector('.play-button').style.display = 'none';
}

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// SCROLL SPY RIGHT SIDE CODE
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.section');
  const dots = document.querySelectorAll('.spy');

  function activateSpy(index) {
      dots.forEach((spy, i) => {
          if (i === index) {
              spy.classList.add('active');
          } else {
              spy.classList.remove('active');
          }
      });
  }

  function updateActiveSection() {
      let currentSectionIndex = 0;
      sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
              currentSectionIndex = index;
          }
      });
      activateSpy(currentSectionIndex);
  }

  window.addEventListener('scroll', updateActiveSection);

  // Call the updateActiveSection function on page load to highlight section1
  updateActiveSection();
});




const container = document.querySelector('.details-group');

  // Close all other details when one is shown
  container.addEventListener('sl-show', event => {
    [...container.querySelectorAll('sl-details')].map(details => (details.open = event.target === details));
  });