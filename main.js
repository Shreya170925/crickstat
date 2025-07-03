const newsApiKey = "e73235bb2585489abd6f5a9e154d9045";
const cricApiKey = "b35e7e9f-85ef-4266-8848-52b41bd71332";

// === Section Toggle ===
document.getElementById("liveScoresBtn").addEventListener("click", () => {
  toggleSection("liveScoresSection");
  fetchLiveScores();
});

document.getElementById("newsBtn").addEventListener("click", () => {
  toggleSection("newsSection");
  fetchNewsGrid();
});

function toggleSection(id) {
  document.getElementById("liveScoresSection").style.display = "none";
  document.getElementById("newsSection").style.display = "none";
  document.getElementById(id).style.display = "block";
}

// === Live Scores ===
function fetchLiveScores() {
  const container = document.getElementById("liveScoresSection");
  container.innerHTML = "<p>Loading live scores...</p>";

  fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${cricApiKey}&offset=0`)
    .then(res => res.json())
    .then(data => {
      if (data.status !== "success") {
        container.innerHTML = "<p>Failed to load live scores.</p>";
        return;
      }

      container.innerHTML = data.data.map(match => `
        <div class="match-card">
          <h3>${match.name}</h3>
          <p>${match.teams?.join(" vs ")}</p>
          <p>${match.status}</p>
        </div>
      `).join("");
    })
    .catch(err => {
      container.innerHTML = `<p>Error: ${err.message}</p>`;
    });
}

// === News Grid ===
function fetchNewsGrid() {
  const newsGrid = document.querySelector(".news-grid");
  newsGrid.innerHTML = "<p>Loading news...</p>";

  fetch(`https://newsapi.org/v2/top-headlines?category=sports&language=en&apiKey=${newsApiKey}`)
    .then(res => res.json())
    .then(data => {
      if (!data.articles || data.articles.length === 0) {
        newsGrid.innerHTML = "<p>No news available right now.</p>";
        return;
      }

      newsGrid.innerHTML = data.articles.map(article => `
        <div class="news-article">
          <h4>${article.title}</h4>
          <p>${article.description || "No description"}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </div>
      `).join("");
    })
    .catch(err => {
      newsGrid.innerHTML = `<p>Error: ${err.message}</p>`;
    });
}
// Teams Button Click
document.getElementById("teamsBtn").addEventListener("click", () => {
  toggleSection("teamsSection");
});

// Rankings Button Click
document.getElementById("rankingsBtn").addEventListener("click", () => {
  toggleSection("rankingsSection");
});
// === News Slideshow ===
function startNewsSlideshow() {
  const container = document.getElementById("newsSlider");

  fetch(`https://newsapi.org/v2/top-headlines?category=sports&language=en&pageSize=10&apiKey=${newsApiKey}`)
    .then(res => res.json())
    .then(data => {
      if (!data.articles || data.articles.length === 0) {
        container.innerHTML = "<div>No headlines available.</div>";
        return;
      }

      container.innerHTML = data.articles.map(article => `
        <div class="news-card">
          <img src="${article.urlToImage || 'fallback.jpg'}" alt="News Image">
          <div class="content">
            <h3>${article.title}</h3>
          </div>
        </div>
      `).join("");
    })
    .catch(err => {
      container.innerHTML = `<div>Error: ${err.message}</div>`;
    });
}


startNewsSlideshow();
