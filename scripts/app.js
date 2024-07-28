// fetch data from dataJson in order to have 2 languaged web-content
function getData() {
  fetch("../data/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setInitialLanguage(data); // initial language with fetched data
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function setInitialLanguage(data) {
  document.querySelectorAll(".set-lang-container").forEach((container) => {
    let defaultLang = container.querySelector(".def_language");
    let selectingLanguage = container.querySelector(".selecting_language");

    let currentLanguage =
      defaultLang.textContent.trim() === "En" ? "en" : "geo";
    updateContent(container, data[currentLanguage]);

    selectingLanguage.addEventListener("click", () => {
      setLanguage(container, data);
    });
  });
}

function setLanguage(container, data) {
  const defaultLang = container.querySelector(".def_language");
  const selectingLanguage = container.querySelector(".selecting_language");

  let currentLanguage;
  if (selectingLanguage.textContent.trim() === "En") {
    selectingLanguage.textContent = "ქარ";
    defaultLang.textContent = "En";
    currentLanguage = "en";
  } else {
    selectingLanguage.textContent = "En";
    defaultLang.textContent = "ქარ";
    currentLanguage = "geo";
  }
  updateContent(container, data[currentLanguage]);
}

function updateContent(container, languageData) {
  if (!languageData) {
    console.error("No language data available");
    return;
  }

  // Update content within the specific container
  headerContent(languageData);
  mainContent(languageData, container);
}

// In this headerContent function, it's similar to a component where you can enter code to specify what the header needs.
function headerContent(languageData) {
  document.querySelector("#subscribe").textContent =
    languageData.header_section.subscribe;
  document.querySelectorAll(".tbc-logo-large").forEach((value) => {
    value.src = languageData.images.tbc_logo.large;
  });

  document.querySelector("#header-nav").innerHTML = `
    <ul>
    <li class="nav_link" id="products">${languageData.header_section.products.title}</li>
    <li class="nav_link" id="offers">${languageData.header_section.offers.title}</li>
    <li class="nav_link" id="concept_space">${languageData.header_section.concept_space.title}</li>
    </ul>
    `;

  const navLinks = document.querySelectorAll(".nav_link");
  let lastClickedLink = null; // To keep track of the last clicked link

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Check if the content div already exists
      let contentDiv = document.querySelector("#content");

      // If the same link is clicked and content is displayed, hide it
      if (
        lastClickedLink === this &&
        contentDiv &&
        contentDiv.style.display === "block"
      ) {
        contentDiv.style.display = "none";
        document.querySelector(".dropDown-menu").style.display = "none";
        lastClickedLink = null; // Reset the last clicked link
        return;
      }

      // If a different link is clicked, remove existing content div to recreate fresh content
      if (contentDiv) {
        contentDiv.remove();
      }

      // Create a new div to display the list
      contentDiv = document.createElement("div");
      contentDiv.id = "content";

      // Determine which list to map based on the clicked element's id
      let list;
      if (this.id === "products") {
        list = languageData.header_section.products.list;
      } else if (this.id === "offers") {
        list = languageData.header_section.offers.list;
      } else if (this.id === "concept_space") {
        list = languageData.header_section.concept_space.list;
      }

      // Mapping the list items to the content div
      const ul = document.createElement("ul");
      list.forEach((item) => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.textContent = item.text;
        anchor.href = item.href;
        listItem.appendChild(anchor);
        ul.appendChild(listItem);
      });
      contentDiv.appendChild(ul);
      contentDiv.style.display = "block";
      document.querySelector(".dropDown-menu").style.display = "block";

      this.appendChild(contentDiv);

      // Update the last clicked link
      lastClickedLink = this;
    });
  });

  // this bug fixed

  const buttonMenuContainer = document.querySelector("#button-menu-container");

  buttonMenuContainer.innerHTML = `
    <div class="btn-menu-wrapper"> ${languageData.main_part.button_menu_content
      .map(
        (item) =>
          ` <div class="button-menu-icon-container">${item.svg} <div class="button-menu-icon"><p>${item.text}</p></div></div>`
      )
      .join("")}
      </div>

      <div class="button-menu-triger">
        <img src="./images/icons/ellipsesIcon.svg" id="btn-icon" />
      </div>
    `;

  const container = document.querySelector(".button-menu-triger");

  container.addEventListener("click", () => {
    document.querySelector(".btn-menu-wrapper").classList.toggle("appear");
  });
  const image = document.getElementById("btn-icon");
  const newImageSrc = "./images/icons/closeIcon.svg";

  container.addEventListener("click", function () {
    if (image.src.includes("ellipsesIcon")) {
      image.src = newImageSrc;
    } else if (image.src.includes("closeIcon")) {
      image.src = "./images/icons/ellipsesIcon.svg";
    }
  });

  // when you click tbc header logo this dropDown will dissapear

  document.querySelector("#tbc-logo-large").addEventListener("click", () => {
    document.querySelector("#content").style.display = "none";
    document.querySelector(".dropDown-menu").style.display = "none";
  });

  document.querySelector(".home-txt").textContent =
    languageData.main_part.page_name;

  ///
  //   burger-menu-nav contentq

  document.querySelector("#burger-menu-nav").innerHTML = `
<div class="nav-heading-wrapper ">
  <div>
    <div class="burger-menu-nav-head general-padding">
      <h3>${languageData.header_section.products.title}</h3>
      <img src="./images/icons/dropDownBlueIcon.svg" alt="Dropdown Icon" />
    </div>

    <nav class="burger-menu-nav-content general-padding">
      <ul>
        ${languageData.header_section.products.list
          .map((item) => `<li><a href=${item.href}>${item.text}</a></li>`)
          .join("")}
      </ul>
    </nav>
  </div>

  <div>
    <div class="burger-menu-nav-head general-padding ">
      <h3>${languageData.header_section.offers.title}</h3>
      <img src="./images/icons/dropDownBlueIcon.svg" alt="Dropdown Icon" />
    </div>

    <nav class="burger-menu-nav-content general-padding">
      <ul>
        ${languageData.header_section.offers.list
          .map((item) => `<li><a href=${item.href}>${item.text}</a></li>`)
          .join("")}
      </ul>
    </nav>
  </div>

  <div>
    <div class="burger-menu-nav-head general-padding">
      <h3>${languageData.header_section.concept_space.title}</h3>
      <img src="./images/icons/dropDownBlueIcon.svg" alt="Dropdown Icon" />
    </div>

    <nav class="burger-menu-nav-content general-padding">
      <ul>
        ${languageData.header_section.concept_space.list
          .map((item) => `<li><a href=${item.href}>${item.text}</a></li>`)
          .join("")}
      </ul>
    </nav>
  </div>


</div>
<div class="general-padding">
<h3>${languageData.footer_section.contact.title}</h3>
  <address>${languageData.footer_section.contact.list
    .map(
      (item) =>
        `<div style='display:flex; gap:0.7rem;align-items:center;'><img src=${item.icon} /><li>${item.content}</li></div>`
    )
    .join("")}</address>
  <h3>${languageData.footer_section.follow.title}</h3>
 <div class="social-container">
    <div><svg width="17" height="16" viewBox="0 0 17 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_167_7547)"><path d="M9.83464 9.00163H11.5013L12.168 6.33496H9.83464V5.00163C9.83464 4.31496 9.83464 3.66829 11.168 3.66829H12.168V1.42829C11.9506 1.39963 11.13 1.33496 10.2633 1.33496C8.4533 1.33496 7.16797 2.43963 7.16797 4.46829V6.33496H5.16797V9.00163H7.16797V14.6683H9.83464V9.00163Z"></path></g><defs><clipPath id="clip0_167_7547"><rect width="16" height="16" fill="white" transform="translate(0.5 0.000976562)"></rect></clipPath></defs></svg></div> 

    <div><svg width="17" height="16" viewBox="0 0 17 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi bi-instagram">   <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"></path> </svg></div>
     </div>
    </div>
  </div>
  </div>
  `;

  // header accordion
  document.querySelectorAll(".burger-menu-nav-head").forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      content.classList.toggle("show");
      document.querySelectorAll(".burger-menu-nav-content").forEach((nav) => {
        if (nav !== content) {
          nav.classList.remove("show");
        }
      });
    });
  });
}

document
  .querySelector(".hamburger-menu")
  .addEventListener("click", function () {
    this.classList.toggle("active");
    document.querySelector("#burger-menu-nav").classList.toggle("active");
    document.querySelector(".main_part").classList.toggle("active");
    document.querySelector("header").classList.toggle("active");
  });

// in this function are content which includes main elements and footer elements

function mainContent(languageData, container) {
  document.querySelector("#banner-txt-content").innerHTML = `
     <h1>${languageData.main_part.banners_content.banner_concept.heading} </h1>
     <p> ${languageData.main_part.banners_content.banner_concept.text}</p>
    <a href="https://tbcconcept.ge/ge/products/kits"><button class="main-btn strong"><img src=${languageData.main_part.banners_content.banner_concept.icon} /> <span>${languageData.main_part.banners_content.banner_concept.btn_text}</span></button></a>
    `;

  document.querySelector("#banner-txt-content-private-banker").innerHTML = `
     <h1>${languageData.main_part.banners_content.banner_private_banker.heading} </h1>
     <p> ${languageData.main_part.banners_content.banner_private_banker.text}</p>
    <a href="https://tbcconcept.ge/ge/products/kits"><button class="main-btn strong"> <span>${languageData.main_part.banners_content.banner_concept.btn_text}</span></button></a>
    `;

  // ibank section
  document.querySelector(".ibank-wrapper").innerHTML = `
          <h2>${languageData.main_part.ibank_content.title}</h2>
                        <picture>
                            <source media="(max-width: 767px)" srcset="./images/ibank/ibank_mobile.png">
                            <source media="(max-width: 1023px)" srcset="./images/ibank/ibank_tablet.png">
                            <img src="./images/ibank/ibank_desktop.png" loading="lazy" width="370" height="350"
                                class="get-app_img" style="object-fit: cover;">
                        </picture>
                        <p>${languageData.main_part.ibank_content.text}</p>
                        <button class="download-btn"><img src="./images/icons/downloadIcon.svg" alt="">
                            ${languageData.main_part.ibank_content.btn_content}</button>
                        <div class="stores-container">
                            <a href="https://play.google.com/store/apps/details?id=com.icomvision.bsc.tbc&hl=en">
                                <img src="./images/icons/googlestore_logo.svg" alt="">
                           </a>
                            <a href="https://apps.apple.com/us/app/tbc-bank/id766598432">
                                <div><img src="./images/icons/appstore_logo.svg" alt=""></div>
                         </a>
                        </div> 
    `;

  // tbc message
  document.querySelector("#tbc_message").innerHTML = `
    <div class="general-padding">
    <div class="layout_container">
     <p>${languageData.main_part.tbc_message} </p></div>
     </div>
    `;

  // package wrapper content
  document.querySelector(".package-wrapper").innerHTML = `
  ${languageData.main_part.package.list
    .map(
      (item) => `
    <div class="package-card">
     <div class="text-overlay">
         <h3>${item.title}</h3>
         <a href=""> <img src=${item.icon} /> <span> ${item.btn_text}</span></a>
      
     </div>
     <div class="package-img-container">
         <img src=${item.img} alt="">
     </div>
      </div>
    `
    )
    .join("")}
    
    `;

  document.querySelector("#concept_general_numb").innerHTML = `
    ${languageData.main_part.concept_numbers
      .map(
        (item) => `<div><span>${item.number}</span> <p>${item.text}</p></div>`
      )
      .join("")}
    `;

  //offers section

  document.querySelector("#offer-header").innerHTML = `
  <h2>${languageData.main_part.offer_section.heading}</h2>
  <a class="strong">
  <svg data-v-562b0aec="" width="16" height="16" viewbox="0 0 16 16" fill="#182cc0" xmlns="http://www.w3.org/2000/svg"><path data-v-562b0aec="" d="M9.7987 2.86675L14.4654 7.53341C14.732 7.80008 14.732 8.20008 14.4654 8.46675L9.7987 13.1334C9.53203 13.4001 9.13203 13.4001 8.86537 13.1334C8.5987 12.8667 8.5987 12.4667 8.86537 12.2001L12.3987 8.66675H1.9987C1.5987 8.66675 1.33203 8.40008 1.33203 8.00008C1.33203 7.60008 1.5987 7.33341 1.9987 7.33341H12.3987L8.86537 3.80008C8.73203 3.66675 8.66536 3.53341 8.66536 3.33341C8.66536 3.13341 8.73203 3.00008 8.86537 2.86675C9.13203 2.60008 9.53203 2.60008 9.7987 2.86675Z"></path></svg>
<p>${languageData.main_part.offer_section.allOffers}</p>
</a>
  `;
  document.querySelector(".offers-card-wrapper").innerHTML = `
    ${languageData.main_part.offer_section.list
      .map(
        (item) => `
       <div class="offer-card">
          <div class="offer-card-content">
             <div class="offer-img-container">
                 <img class="offer-img" src=${item.img} alt="" />
             <div class="logo-container">
                <img class="logo-img" src=${item.imgIcon} alt="" />
              </div>
                </div>
                    <div class="offer-content">
                        <div>${item.category_list
                          .map((category) => `<span>${category}</span>`)
                          .join("")}</div>
                        <h3>${item.title}</h3>
                    </div>
              </div>
            </div>
    `
      )
      .join("")}
  `;
  // offers slider logic

  const sliderWrapper = document.querySelector(".offers-card-wrapper");
  const slides = document.querySelectorAll(".offer-card");
  const prevButton = document.querySelector(".slider-prev");
  const nextButton = document.querySelector(".slider-next");
  const scrollIndicator = document.querySelector(".scroll-indicator");
  let currentIndex = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let slideWidth = slides[0].offsetWidth + 30;
  let visibleSlides = 3;

  function setSliderPosition() {
    sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
    updateScrollIndicator();
  }

  function updateButtonColors(activeButton) {
    const prevSvgPaths = prevButton.querySelectorAll("svg path");
    const nextSvgPaths = nextButton.querySelectorAll("svg path");

    prevSvgPaths.forEach(
      (path) => (path.style.fill = activeButton === "next" ? "#555f62" : "blue")
    );
    nextSvgPaths.forEach(
      (path) => (path.style.fill = activeButton === "prev" ? "#555f62" : "blue")
    );
  }

  function updateScrollIndicator() {
    const totalWidth = slideWidth * slides.length;
    const sliderWidth = sliderWrapper.offsetWidth;
    const maxTranslate = totalWidth - sliderWidth;
    const progress = Math.abs(currentTranslate / maxTranslate);
    const indicatorWidth = Math.max((sliderWidth / totalWidth) * 100, 5);

    scrollIndicator.style.width = `${indicatorWidth}%`;
    scrollIndicator.style.transform = `translateX(${
      progress * (sliderWidth - (indicatorWidth / 100) * sliderWidth)
    }px)`;
  }

  function startDrag(event) {
    isDragging = true;
    startPos = event.type.includes("mouse")
      ? event.clientX
      : event.touches[0].clientX;
    sliderWrapper.style.transition = "none";
  }

  function endDrag() {
    isDragging = false;
    sliderWrapper.style.transition = "transform 0.3s ease";
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < slides.length - visibleSlides) {
      currentIndex += 1;
    }
    if (movedBy > 100 && currentIndex > 0) {
      currentIndex -= 1;
    }
    currentTranslate = -currentIndex * slideWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  function drag(event) {
    if (!isDragging) return;
    event.preventDefault();
    const currentPosition = event.type.includes("mouse")
      ? event.clientX
      : event.touches[0].clientX;
    const distance = currentPosition - startPos;
    currentTranslate = prevTranslate + distance;
    setSliderPosition();
  }

  function moveToSlide(index) {
    currentIndex = index;
    currentTranslate = -currentIndex * slideWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      moveToSlide(currentIndex - 1);
      updateButtonColors("prev");
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < slides.length - visibleSlides) {
      moveToSlide(currentIndex + 1);
      updateButtonColors("next");
    }
  });

  sliderWrapper.addEventListener("mousedown", startDrag);
  sliderWrapper.addEventListener("mouseup", endDrag);
  sliderWrapper.addEventListener("mouseleave", endDrag);
  sliderWrapper.addEventListener("mousemove", drag);
  sliderWrapper.addEventListener("touchstart", startDrag);
  sliderWrapper.addEventListener("touchend", endDrag);
  sliderWrapper.addEventListener("touchmove", drag);

  sliderWrapper.addEventListener("dragstart", (e) => e.preventDefault());
  const images = sliderWrapper.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });

  function recalculateValues() {
    slideWidth = slides[0].offsetWidth + 30;
    visibleSlides = window.innerWidth <= 768 ? 1 : 3;
    currentTranslate = -currentIndex * slideWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  window.addEventListener("resize", recalculateValues);
  recalculateValues();

  //accordion
  document.querySelector(".accordion-container").innerHTML = `
  
  <div class="accordion-item general-padding">
    <div class="accordion-header layout_container"> <h3> ${
      languageData.footer_section.products.title
    }</h3><img src="./images/icons/dropDown_icon.svg"/>
    </div>
    <div class="accordion-content layout_container">
    <ul>${languageData.footer_section.products.list
      .map((item) => `<li>${item}</li>`)
      .join("")}
    </ul>
    </div>
  </div>
  <div class="accordion-item general-padding">
    <div class="accordion-header layout_container"><h3>  ${
      languageData.footer_section.lifestyle.title
    } </h3><img src="./images/icons/dropDown_icon.svg"/></div>
    <div class="accordion-content layout_container">
    <ul>${languageData.footer_section.lifestyle.list
      .map((item) => `<li>${item}</li>`)
      .join("")}
    </ul>
    </div>
  </div>

  <div class="accordion-item general-padding">
    <div class="accordion-header layout_container" > <h3> ${
      languageData.footer_section.concept_space.title
    } </h3> <img src="./images/icons/dropDown_icon.svg"/></div>
    <div class="accordion-content layout_container">
    <ul>${languageData.footer_section.concept_space.list
      .map((item) => `<li>${item}</li>`)
      .join("")}
    </ul>
    </div>
  </div>


  <div class="contact-container general-padding">

  <div class="layout_container" >
  <h3>${languageData.footer_section.contact.title}</h3>
  <address>${languageData.footer_section.contact.list
    .map(
      (item) =>
        `<div style='display:flex; gap:0.7rem;align-items:center;'><img src=${item.icon} /><li>${item.content}</li></div>`
    )
    .join("")}</address>

    <h3>${languageData.footer_section.follow.title}
    <div class="social-container">
    <div>
    <svg width="17" height="16" viewBox="0 0 17 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_167_7547)"><path d="M9.83464 9.00163H11.5013L12.168 6.33496H9.83464V5.00163C9.83464 4.31496 9.83464 3.66829 11.168 3.66829H12.168V1.42829C11.9506 1.39963 11.13 1.33496 10.2633 1.33496C8.4533 1.33496 7.16797 2.43963 7.16797 4.46829V6.33496H5.16797V9.00163H7.16797V14.6683H9.83464V9.00163Z"></path></g><defs><clipPath id="clip0_167_7547"><rect width="16" height="16" fill="white" transform="translate(0.5 0.000976562)"></rect></clipPath></defs></svg></div> 

    <div><svg width="17" height="16" viewBox="0 0 17 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi bi-instagram">   <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"></path> </svg></div>
     </div>
  </div>
  </div>
  `;

  document.querySelector("#footer-copyright").innerHTML = `
  <div><img src="./images/icons/tbc-logo-tiny.svg" /> <p>${
    languageData.footer_section.copyright.text
  }</div>
  <div>${languageData.footer_section.copyright.links
    .map((item) => `<li><a href=${item.href}>${item.text} </a></li>`)
    .join("")}</div>
  `;

  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      // Close all other contents
      document.querySelectorAll(".accordion-content").forEach((content) => {
        if (content !== header.nextElementSibling) {
          content.style.display = "none";
          content.previousElementSibling.querySelector("img").style.transform =
            "rotate(0deg)";
        }
      });

      // Toggle the clicked content
      const content = header.nextElementSibling;
      content.style.display =
        content.style.display === "block" ? "none" : "block";
      const img = header.querySelector("img");
      img.style.transform =
        content.style.display === "block" ? "rotate(180deg)" : "rotate(0deg)";
    });
  });

  //awards slider section Important
  document.querySelector(
    "#award-heading"
  ).innerHTML = `${languageData.main_part.award_section.heading}`;
  document.querySelector(".award-card-wrapper").innerHTML = `
  ${languageData.main_part.award_section.list
    .map(
      (item) => `<div class="award-card">
                 <div class="award-card-content">
                    <div>
                        <img src=${item.img} alt="" />
                    </div>
                    <h3>
                        ${item.title}
                    </h3>
                    <p>${item.company_name}</p>
                </div>
            </div>
    `
    )
    .join("")}
  `;
  // award slider important
  const responsiveAwardSliderWrapper = document.querySelector(
    ".award-card-wrapper"
  );
  const responsiveAwardSlides = document.querySelectorAll(".award-card");
  const responsivePrevButton = document.querySelector(".award-slider-prev");
  const responsiveAwardNextButton =
    document.querySelector(".award-slider-next");
  const responsiveAwardScrollInidicator = document.querySelector(
    ".award-scroll-indicator"
  );
  let responsiveAwardCurrentIndex = 0;
  let responsiveAwardIsDragging = false;
  let responsiveAwardStartPos = 0;
  let responsiveAwardCurrentTranslate = 0;
  let responsiveAwardPrevTranslate = 0;
  let responsiveAwardSlideWidth = responsiveAwardSlides[0].offsetWidth + 25;
  let responsiveAwardVisibleSlides = 3;

  function setResponsiveSliderPosition() {
    responsiveAwardSliderWrapper.style.transform = `translateX(${responsiveAwardCurrentTranslate}px)`;
    updateresponsiveAwardScrollInidicator();
  }

  function updateResponsiveButtonColors(activeButton) {
    const prevSvgPaths = responsivePrevButton.querySelectorAll("svg path");
    const nextSvgPaths = responsiveAwardNextButton.querySelectorAll("svg path");

    prevSvgPaths.forEach(
      (path) => (path.style.fill = activeButton === "next" ? "#555f62" : "blue")
    );
    nextSvgPaths.forEach(
      (path) => (path.style.fill = activeButton === "prev" ? "#555f62" : "blue")
    );
  }

  function updateresponsiveAwardScrollInidicator() {
    // Calculate the maximum translate distance the slider can move
    const maxTranslate =
      responsiveAwardSlideWidth * responsiveAwardSlides.length -
      responsiveAwardSliderWrapper.offsetWidth;

    // Prevent division by zero and handle cases where the maxTranslate is less than or equal to 0
    if (maxTranslate <= 0) {
      responsiveAwardScrollInidicator.style.width = "100%";
      responsiveAwardScrollInidicator.style.transform = `translateX(0px)`;
      return;
    }

    // Calculate the progress as a percentage of the total possible movement
    const progress = Math.abs(responsiveAwardCurrentTranslate / maxTranslate);

    // Calculate the width of the indicator based on the proportion of the visible slides
    const indicatorWidth = Math.max(
      (responsiveAwardSliderWrapper.offsetWidth /
        (responsiveAwardSlideWidth * responsiveAwardSlides.length)) *
        100,
      5
    );

    responsiveAwardScrollInidicator.style.width = `${indicatorWidth}%`;

    responsiveAwardScrollInidicator.style.transform = `translateX(${
      progress *
      (responsiveAwardSliderWrapper.offsetWidth -
        (indicatorWidth / 100) * responsiveAwardSliderWrapper.offsetWidth)
    }px)`;
  }

  function startResponsiveDrag(event) {
    responsiveAwardIsDragging = true;
    responsiveAwardStartPos = event.type.includes("mouse")
      ? event.clientX
      : event.touches[0].clientX;
    responsiveAwardSliderWrapper.style.transition = "none";
  }

  function endResponsiveDrag() {
    responsiveAwardIsDragging = false;
    responsiveAwardSliderWrapper.style.transition = "transform 0.3s ease";
    const movedBy =
      responsiveAwardCurrentTranslate - responsiveAwardPrevTranslate;
    if (
      movedBy < -100 &&
      responsiveAwardCurrentIndex <
        responsiveAwardSlides.length - responsiveAwardVisibleSlides
    ) {
      responsiveAwardCurrentIndex += 1;
    }
    if (movedBy > 100 && responsiveAwardCurrentIndex > 0) {
      responsiveAwardCurrentIndex -= 1;
    }
    responsiveAwardCurrentTranslate =
      -responsiveAwardCurrentIndex * responsiveAwardSlideWidth;
    responsiveAwardPrevTranslate = responsiveAwardCurrentTranslate;
    setResponsiveSliderPosition();
  }

  function dragResponsive(event) {
    if (!responsiveAwardIsDragging) return;
    event.preventDefault();
    const currentPosition = event.type.includes("mouse")
      ? event.clientX
      : event.touches[0].clientX;
    const distance = currentPosition - responsiveAwardStartPos;
    responsiveAwardCurrentTranslate = responsiveAwardPrevTranslate + distance;
    setResponsiveSliderPosition();
  }

  function moveToResponsiveSlide(index) {
    responsiveAwardCurrentIndex = index;
    responsiveAwardCurrentTranslate =
      -responsiveAwardCurrentIndex * responsiveAwardSlideWidth;
    responsiveAwardPrevTranslate = responsiveAwardCurrentTranslate;
    setResponsiveSliderPosition();
  }

  responsivePrevButton.addEventListener("click", () => {
    if (responsiveAwardCurrentIndex > 0) {
      moveToResponsiveSlide(responsiveAwardCurrentIndex - 1);
      updateResponsiveButtonColors("prev");
    }
  });

  responsiveAwardNextButton.addEventListener("click", () => {
    if (
      responsiveAwardCurrentIndex <
      responsiveAwardSlides.length - responsiveAwardVisibleSlides
    ) {
      moveToResponsiveSlide(responsiveAwardCurrentIndex + 1);
      updateResponsiveButtonColors("next");
    }
  });

  responsiveAwardSliderWrapper.addEventListener(
    "mousedown",
    startResponsiveDrag
  );
  responsiveAwardSliderWrapper.addEventListener("mouseup", endResponsiveDrag);
  responsiveAwardSliderWrapper.addEventListener(
    "mouseleave",
    endResponsiveDrag
  );
  responsiveAwardSliderWrapper.addEventListener("mousemove", dragResponsive);
  responsiveAwardSliderWrapper.addEventListener(
    "touchstart",
    startResponsiveDrag
  );
  responsiveAwardSliderWrapper.addEventListener("touchend", endResponsiveDrag);
  responsiveAwardSliderWrapper.addEventListener("touchmove", dragResponsive);

  responsiveAwardSliderWrapper.addEventListener("dragstart", (e) =>
    e.preventDefault()
  );
  const responsiveImages = responsiveAwardSliderWrapper.querySelectorAll("img");
  responsiveImages.forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });

  function recalculateResponsiveValues() {
    responsiveAwardSlideWidth = responsiveAwardSlides[0].offsetWidth + 25;
    responsiveAwardVisibleSlides = window.innerWidth <= 768 ? 1 : 3;
    responsiveAwardCurrentTranslate =
      -responsiveAwardCurrentIndex * responsiveAwardSlideWidth;
    responsiveAwardPrevTranslate = responsiveAwardCurrentTranslate;
    setResponsiveSliderPosition();
    updateresponsiveAwardScrollInidicator();
  }

  window.addEventListener("resize", recalculateResponsiveValues);
  recalculateResponsiveValues();

  // // product heading

  document.querySelector(
    "#product-heading"
  ).innerHTML = `${languageData.main_part.products_section.heading}`;

  // // products slider section
  document.querySelector("#products-wrapper").innerHTML = `
  ${languageData.main_part.products_section.list1
    .map(
      (item) => `
    <div class="product-card">
        <div class="product-img-container">
            <img src=${item.img} alt="" />
        </div>
        <div class="product-card-container">
            <h2>${item.title}</h2>
            <div>
                <p>${item.text}
                </p>
            </div>
        </div>
    </div>
    `
    )
    .join("")}
    `;

  // product slider
  const productSliderWrapper = document.querySelector(".products-wrapper");
  const productSlides = document.querySelectorAll(".product-card");
  const productScrollIndicator = document.querySelector(
    ".product-scroll-indicator"
  );
  let currentProductIndex = 0;
  let isProductDragging = false;
  let productStartPos = 0;
  let currentProductTranslate = 0;
  let prevProductTranslate = 0;
  let productSlideWidth = productSlides[0].offsetWidth + 30;

  function setProductSliderPosition() {
    productSliderWrapper.style.transform = `translateX(${currentProductTranslate}px)`;
    updateProductScrollIndicator();
  }

  function updateProductScrollIndicator() {
    const totalWidth = productSlideWidth * productSlides.length;
    const sliderWidth = productSliderWrapper.offsetWidth;
    const maxTranslate = totalWidth - sliderWidth;
    const progress = Math.abs(currentProductTranslate / maxTranslate);
    const indicatorWidth = Math.max((sliderWidth / totalWidth) * 100, 5);

    productScrollIndicator.style.width = `${indicatorWidth}%`;
    productScrollIndicator.style.transform = `translateX(${
      progress * (sliderWidth - (indicatorWidth / 100) * sliderWidth)
    }px)`;
  }

  function startProductDrag(event) {
    isProductDragging = true;
    productStartPos = event.type.includes("mouse")
      ? event.clientX
      : event.touches[0].clientX;
    productSliderWrapper.style.transition = "none";
  }

  function endProductDrag() {
    isProductDragging = false;
    productSliderWrapper.style.transition = "transform 0.3s ease";
    const movedBy = currentProductTranslate - prevProductTranslate;
    if (movedBy < -100 && currentProductIndex < productSlides.length - 1) {
      currentProductIndex += 1;
    }
    if (movedBy > 100 && currentProductIndex > 0) {
      currentProductIndex -= 1;
    }
    currentProductTranslate = -currentProductIndex * productSlideWidth;
    prevProductTranslate = currentProductTranslate;
    setProductSliderPosition();
  }

  function productDrag(event) {
    if (!isProductDragging) return;
    event.preventDefault();
    const currentPosition = event.type.includes("mouse")
      ? event.clientX
      : event.touches[0].clientX;
    const distance = currentPosition - productStartPos;
    currentProductTranslate = prevProductTranslate + distance;
    setProductSliderPosition();
  }

  function recalculateProductValues() {
    productSlideWidth = productSlides[0].offsetWidth + 30;
    currentProductTranslate = -currentProductIndex * productSlideWidth;
    prevProductTranslate = currentProductTranslate;
    setProductSliderPosition();
  }
  const productImages = productSliderWrapper.querySelectorAll("img");
  productImages.forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });
  // Initial setup and event listeners
  window.addEventListener("resize", recalculateProductValues);
  productSliderWrapper.addEventListener("mousedown", startProductDrag);
  productSliderWrapper.addEventListener("mouseup", endProductDrag);
  productSliderWrapper.addEventListener("mouseleave", endProductDrag);
  productSliderWrapper.addEventListener("mousemove", productDrag);
  productSliderWrapper.addEventListener("touchstart", startProductDrag);
  productSliderWrapper.addEventListener("touchend", endProductDrag);
  productSliderWrapper.addEventListener("touchmove", productDrag);
  recalculateProductValues();
}

getData();
