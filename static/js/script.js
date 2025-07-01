// ======== Dark Mode Toggle =========
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  themeToggle.textContent = body.classList.contains("dark-mode")
    ? "🌞 Light Mode"
    : "🌙 Dark Mode";
});

// ======== City Form Validation =========
const form = document.querySelector("form");
const cityInput = document.querySelector("input[name='city']");

form?.addEventListener("submit", function (e) {
  const city = cityInput.value.trim();

  if (city === "") {
    e.preventDefault();
    alert("Please enter a city name.");
    cityInput.focus();
  } else if (!/^[a-zA-Z\s]+$/.test(city)) {
    e.preventDefault();
    alert("Enter a valid city (letters and spaces only).");
    cityInput.focus();
  }
});

// ========== Loader Logic ==========
const loader = document.getElementById("loader");

form?.addEventListener("submit", function (e) {
  const city = cityInput.value.trim();

  if (city === "") {
    e.preventDefault();
    alert("Please enter a city name.");
    cityInput.focus();
  } else if (!/^[a-zA-Z\s]+$/.test(city)) {
    e.preventDefault();
    alert("Enter a valid city (letters and spaces only).");
    cityInput.focus();
  } else {
    // ✅ If valid input, show loader
    loader.style.display = "block";
  }
});

// ========== Forecast Chart Toggle ==========
const forecastTypeSelect = document.getElementById("forecast-type");
const chartDiv = document.getElementById("forecast-plot");

const labels = ( forecast_data.dates | tojson );
const temps1 = ( forecast_data.temps | tojson );
const humidity1 = ( forecast_data.humidity | tojson );

function plotForecast(type) {
    let values = type === "humidity" ? humidity1 : temps1;
    let yTitle = type === "humidity" ? "Humidity (%)" : "Temperature (°C)";
    let chartTitle = type === "humidity" ? "Humidity Forecast" : "Temperature Forecast";

    const trace = {
        x: labels,
        y: values,
        type: "scatter",
        mode: "lines+markers",
        name: type.charAt(0).toUpperCase() + type.slice(1),
        line: { color: "#17BECF" }
    };

    const layout = {
        title: chartTitle,
        xaxis: { title: "Date" },
        yaxis: { title: yTitle }
    };

    Plotly.newPlot(chartDiv, [trace], layout);
}

// Initial plot
plotForecast("temperature");

// Change handler
forecastTypeSelect?.addEventListener("change", (e) => {
    plotForecast(e.target.value);
});