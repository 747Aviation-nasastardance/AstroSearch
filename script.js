console.log("AstroSearch JavaScript connected!");
const urlParameters = new URLSearchParams(window.location.search);
const searchQuery = urlParameters.get("search");

if (searchQuery) {
  document.getElementById("homepagetop").style.display = "none";
  document.querySelector(".abovesearchbartext").style.display = "none";
  document.getElementById("homepagecentre").style.display = "none";
  document.getElementById("searchresults").style.display = "flex";
}

if (!searchQuery) {
  fetch("https://science.nasa.gov/wp-json/wp/v2/apod-basic/")
    .then((nasaImageResponse) => nasaImageResponse.json())
    .then((nasaImageData) => {
      const nasaImages = nasaImageData.filter(
        (image) => image.media_type === "image",
      );
      const currentImage = document.getElementById("current-image");
      const previousImage = document.getElementById("previous-image");
      const nextImage = document.getElementById("next-image");
      const imageTitle = document.getElementById("image-title");
      const carouselContainer = document.querySelector(
        ".carousel-image-container",
      );
      let currentImageIndex = 0;

      function displayImage() {
        currentImage.src = nasaImages[currentImageIndex].hdurl;
        imageTitle.textContent = nasaImages[currentImageIndex].title;
      }
      displayImage();

      nextImage.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % nasaImages.length;
        displayImage();
      });
      previousImage.addEventListener("click", () => {
        currentImageIndex =
          (currentImageIndex - 1 + nasaImages.length) % nasaImages.length;
        displayImage();
      });

      let nextPicture = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % nasaImages.length;
        displayImage();
      }, 5000);
      carouselContainer.addEventListener("mouseenter", () => {
        clearInterval(nextPicture);
      });

      carouselContainer.addEventListener("mouseleave", () => {
        nextPicture = setInterval(() => {
          currentImageIndex = (currentImageIndex + 1) % nasaImages.length;
          displayImage();
        }, 5000);
      });
    });
}
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", performSearch);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const searchQuery = searchInput.value.trim();
  if (searchQuery === "") {
    return;
  }
  window.location.search = "?search=" + encodeURIComponent(searchQuery);

  console.log("Searching for:", searchQuery);
}


if (searchQuery) {
  const propertiesContainer = document.getElementById("astronomy-properties");
  const notFound = document.getElementById("notfound");

function searchNASAImages(query) {
  const nasaURL =
    "https://images-api.nasa.gov/search?" +
    new URLSearchParams({
      title: query,
      media_type: "image",
      page_size: "50",
    });

  fetch(nasaURL)
    .then((response) => response.json())
    .then((data) => {
  const nasaImages = data.collection.items.filter((item) => {
  const imageData = item.data[0];

  const title = (imageData.title || "").toLowerCase();
  const description = (imageData.description || "").toLowerCase();
  const keywords = (imageData.keywords || []).map((keyword) =>
    keyword.toLowerCase()
  );

  if (title.includes("event") || description.includes("event")) {
    return false;
  }

  return (
    title.includes(query.toLowerCase()) ||
    keywords.some((keyword) => keyword.includes(query.toLowerCase()))
  );
});

const currentImage = document.getElementById("search-current-image");
const imageTitle = document.getElementById("search-image-title");
const previousButton = document.getElementById("search-previous-image");
const nextButton = document.getElementById("search-next-image");

if (nasaImages.length === 0) {
  imageTitle.textContent = "No images found.";
  return;
}

let currentIndex = 0;

function displayImage(index) {
  currentImage.src = nasaImages[index].links[0].href;
  imageTitle.textContent = nasaImages[index].data[0].title;
}

previousButton.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + nasaImages.length) % nasaImages.length;
  displayImage(currentIndex);
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % nasaImages.length;
  displayImage(currentIndex);
});

displayImage(currentIndex);
setInterval(() => {
  currentIndex = (currentIndex + 1) % nasaImages.length;
  displayImage(currentIndex);
}, 3000);
    })
    .catch((error) => console.error("NASA image search failed:", error));
}

searchNASAImages(searchQuery);

  const defaultObjects = {
  earth: {
    "Object Type": "Terrestrial Planet",
    Diameter: "12,742 km",
    Mass: "5.972 × 10²⁴ kg",
    Density: "5.51 g/cm³",
    "Orbital Period": "365.256 days",
    "Distance from Sun": "149.6 million km",
  },

  sun: {
    "Object Type": "G-type Main-Sequence Star",
    "Spectral Classification": "G2V",
    Diameter: "1.392 million km",
    Mass: "1.989 × 10³⁰ kg",
    "Surface Temperature": "Approximately 5,500 °C",
  },

  "milky way": {
    "Object Type": "Barred Spiral Galaxy",
    "Galaxy Classification": "SBbc",
    Diameter: "Approximately 100,000 light-years",
    "Number of Stars": "Approximately 100–400 billion",
    "Distance to Galactic Centre": "Approximately 26,000 light-years",
  },
};

  function displayProperty(label, value) {
    if (value === null || value === undefined || value === "") {
      return;
    }

    const paragraph = document.createElement("p");
    paragraph.textContent = label + ": " + value;
    propertiesContainer.appendChild(paragraph);
  }

  const defaultObject = defaultObjects[searchQuery.trim().toLowerCase()];

if (defaultObject) {
  for (const [property, value] of Object.entries(defaultObject)) {
    displayProperty(property, value);
  }

  console.log("Displaying default object properties.");
} else {

  const mastURL =
    "https://mastresolver.stsci.edu/Santa-war/query?name=" +
    encodeURIComponent(searchQuery) +
    "&outputFormat=JSON";

  fetch(mastURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("SANTA HTTP error: " + response.status);
      }
      return response.json();
    })
    .then((mastData) => {
      if (
        mastData.resolvedCoordinate &&
        mastData.resolvedCoordinate.length > 0
      ) {
        const objectData = mastData.resolvedCoordinate[0];

        displayProperty("Canonical Name", objectData.canonicalName);
        displayProperty("Right Ascension (RA)", objectData.ra + "°");
        displayProperty("Declination (Dec)", objectData.decl + "°");
        displayProperty("Major Axis", objectData.majorAxis + "°");
        displayProperty("Minor Axis", objectData.minorAxis + "°");
        displayProperty("Database Classification", objectData.objectType);
        displayProperty("Position Angle", objectData.positionAngle + "°");
        displayProperty("Radius", objectData.radius + "°");

        console.log("SANTA object data:", objectData);
      } else {
        console.log("SANTA found no object. Trying ssoCard...");
        searchSsocard();
      }
    })
    .catch((error) => {
      console.error("SANTA search failed:", error);
      searchSsocard();
    });

  const ssocardQuery = /\d/.test(searchQuery)
    ? searchQuery.toUpperCase()
    : searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1).toLowerCase();

  function searchSsocard() {
    const ssocardURL =
      "https://ssp.imcce.fr/webservices/ssodnet/api/ssocard.php?q=" +
      encodeURIComponent(ssocardQuery);

    fetch(ssocardURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("ssoCard HTTP error: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("ssoCard response:", data);

        const card = data.parameters ? data : data[Object.keys(data)[0]];

        if (!card || !card.parameters) {
          throw new Error("No ssoCard available.");
        }

        const parameters = card.parameters;
        let propertyCount = 0;

        displayProperty("Object Name", card.name || card.title || searchQuery);
        displayProperty("Object Type", card.type);

        for (const [section, sectionData] of Object.entries(parameters)) {
          if (!sectionData || typeof sectionData !== "object") {
            continue;
          }

          for (const [property, propertyData] of Object.entries(sectionData)) {
            if (
              propertyData &&
              typeof propertyData === "object" &&
              !Array.isArray(propertyData) &&
              propertyData.value !== undefined
            ) {
              displayProperty(
                property.replaceAll("_", " "),
                propertyData.value,
              );
              propertyCount++;
            }
          }
        }

        if (propertyCount === 0) {
          propertiesContainer.innerHTML = "";
          throw new Error("No usable ssoCard properties.");
        }

        console.log("Displaying ssoCard properties.");
      })
      .catch((error) => {
        console.error("ssoCard search failed:", error);
        searchMiriade();
      });
  }
  function searchMiriade() {
  const quaeroURL =
    "https://api.ssodnet.imcce.fr/quaero/1/sso?q=" +
    encodeURIComponent(searchQuery);

  fetch(quaeroURL)
    .then((response) => response.json())
    .then((quaeroData) => {
      const objectData = quaeroData.data.find(
        (object) =>
          object.name.toLowerCase() === searchQuery.toLowerCase()
      );

      if (!objectData) {
        throw new Error("Object not found in Quaero.");
      }

      let prefix;

      if (objectData.type === "Planet") {
        prefix = "p";
      } else if (objectData.type === "Satellite") {
        prefix = "s";
      } else {
        throw new Error("Unsupported Miriade object type: " + objectData.type);
      }
      const miriadeURL =
        "https://ssp.imcce.fr/webservices/miriade/api/ephemcc.php" +
        "?-name=" + encodeURIComponent(prefix + ":" + objectData.name) +
        "&-type=" + encodeURIComponent(objectData.type) +
        "&-ep=now&-observer=500&-mime=json";

      return fetch(miriadeURL);
    })
    .then((response) => response.json())
    .then((miriadeData) => {
      console.log("Miriade response:", miriadeData);

      if (!miriadeData.sso || !miriadeData.sso.parameters) {
        throw new Error("No Miriade data available.");
      }
      const parameters = miriadeData.sso.parameters;
      displayProperty("Object Name", miriadeData.sso.name);
      displayProperty("Object Type", miriadeData.sso.type);

      if (parameters.diameter !== undefined) {
        displayProperty("Diameter", parameters.diameter + " km");
      }
      if (parameters.mass !== undefined) {
        displayProperty("Mass", parameters.mass);
      }
      if (parameters.orbital_period !== undefined) {
        displayProperty("Orbital Period", parameters.orbital_period);
      }
      if (parameters.dynamical_class) {
        displayProperty("Dynamical Class", parameters.dynamical_class);
      }
      console.log("Displaying Miriade properties.");
    })
    .catch((error) => {
      console.error("Miriade search failed:", error);
      notFound.style.display = "block";
    });
}
}
}
