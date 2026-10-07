const milestones = [
  { year: "2003", title: "The first call-up", text: "A teenager from Madeira makes his Portugal debut. The number on his back will become a global signature." },
  { year: "2004", title: "A first final", text: "Portugal reach the EURO final at home. The defeat hurts; the promise of what comes next is already there." },
  { year: "2008", title: "Europe's best", text: "Ronaldo wins his first UEFA Champions League title with Manchester United and his first Ballon d'Or." },
  { year: "2014—2018", title: "A European dynasty", text: "Four Champions League triumphs in five seasons with Real Madrid: the competition becomes his stage." },
  { year: "2016", title: "Portugal's first crown", text: "In Paris, Portugal win their first major international trophy. Ronaldo's leadership from the touchline becomes part of the story." },
  { year: "2019", title: "A new trophy, at home", text: "Portugal win the inaugural UEFA Nations League, adding another chapter to the country's rise." },
  { year: "2025", title: "Still adding chapters", text: "Portugal win the Nations League again. Ronaldo is still part of the story, more than two decades after his debut." }
];

const timeline = document.querySelector("#ronaldo-timeline");

for (const milestone of milestones) {
  const event = document.createElement("article");
  event.className = "timeline-event";
  event.innerHTML = `<time>${milestone.year}</time><h3>${milestone.title}</h3><p>${milestone.text}</p>`;
  timeline.append(event);
}

const events = [...document.querySelectorAll(".timeline-event")];

if ("IntersectionObserver" in window) {
  const eventObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.15 });
  events.forEach((event) => eventObserver.observe(event));
} else {
  events.forEach((event) => event.classList.add("is-visible"));
}

function updateTimelineProgress() {
  const bounds = timeline.getBoundingClientRect();
  const visibleDistance = Math.min(Math.max(window.innerHeight * 0.72 - bounds.top, 0), bounds.height);
  timeline.style.setProperty("--timeline-progress", `${(visibleDistance / bounds.height) * 100}%`);
}

window.addEventListener("scroll", updateTimelineProgress, { passive: true });
updateTimelineProgress();