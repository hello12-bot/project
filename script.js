const milestones = [
  { year: "2005", title: "A debut at 18", text: "A red card, a first cap, and the start of a relationship with the national shirt that would last 21 years." },
  { year: "2008", title: "First gold", text: "Messi helps Argentina win Olympic gold in Beijing. The first international medal becomes the first promise kept." },
  { year: "2014", title: "So close to the summit", text: "Argentina reach the World Cup final. Messi wins the tournament's Golden Ball, but the trophy slips away in extra time." },
  { year: "2016", title: "The goodbye that wasn't", text: "After another Copa América final defeat, Messi announces his international retirement. The heartbreak is real. So is the comeback." },
  { year: "2021", title: "At last, the Copa", text: "At the Maracanã, Argentina beat Brazil. Messi lifts his first senior international trophy with his country." },
  { year: "2022", title: "The world is sky blue", text: "A World Cup final for the ages. Argentina win in Qatar; Messi scores twice and claims the Golden Ball again." },
  { year: "2024", title: "Back-to-back", text: "Argentina defend their Copa América crown. A second continental title makes the golden era a dynasty." },
  { year: "2026", title: "One final night", text: "After 21 years and a record-breaking career, Messi says farewell to Argentina in Buenos Aires. The last chapter ends where the love always lived: together." }
];

const timeline = document.querySelector("#timeline");

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

const shareButton = document.querySelector("#share-button");
shareButton.addEventListener("click", async () => {
  const shareData = { title: document.title, text: "A tribute to Lionel Messi and Argentina's № 10.", url: window.location.href };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      shareButton.innerHTML = "<span aria-hidden=\"true\">✓</span> Link copied";
    }
  } catch (error) {
    if (error.name !== "AbortError") shareButton.textContent = "Sharing unavailable";
  }
});