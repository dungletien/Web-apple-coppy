// load
function load(selector, path) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`Element with selector ${selector} not found`);
        return;
    }

    const cached = localStorage.getItem(path);
    if (cached) {
        element.innerHTML = cached;
    }

    fetch(path)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Failed to fetch ${path}`);
            }
            return res.text();
        })
        .then((html) => {
            if (html !== cached) {
                element.innerHTML = html;
                localStorage.setItem(path, html);
            }
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            window.dispatchEvent(new Event("template-loaded"));
        });
}

window.addEventListener("template-loaded", () => {
    // Your existing dropdown functionality here
});

// search
document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const searchDesc = document.getElementById("search-desc");

    searchForm.addEventListener("click", function () {
        if (searchDesc.style.display === "block") {
            searchDesc.style.display = "none";
        } else {
            searchDesc.style.display = "block";
        }
    });

    //CLick out
    document.addEventListener("click", function (event) {
        console.log(event.target);
        if (event.target != searchForm && !searchDesc.contains(event.target)) {
            searchDesc.style.display = "none";
        }
    });
});

// đổi màu nền trong header
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav");
    const header = document.querySelector("header");
    // const overlay = document.querySelector("main");

    links.forEach((link) => {
        link.addEventListener("mouseover", () => {
            header.style.backgroundColor = "#f5f5f7";
            header.style.transition = "background-color 0.2s ease";
            // overlay.style.backgroundColor = "#f5f5f7";
        });
        link.addEventListener("mouseout", () => {
            header.style.backgroundColor = "";
            // overlay.style.display = "block";
        });
    });
});

// vòng lặp ảnh
document.addEventListener("DOMContentLoaded", (event) => {
    const images = document.querySelectorAll("#hero-as-img img");
    let currentIndex = 0;

    function showNextImage() {
        // Ẩn ảnh hiện tại
        images[currentIndex].classList.remove("active");

        // Tăng chỉ số hiện tại
        currentIndex = (currentIndex + 1) % images.length;

        // Hiển thị ảnh tiếp theo
        images[currentIndex].classList.add("active");
    }

    // Thiết lập khoảng thời gian chuyển đổi ảnh (3 giây)
    setInterval(showNextImage, 3000);
});

// search
document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("search-box");
    const searchForm = document.getElementById("search-form");

    searchBox.addEventListener("focus", () => {
        searchForm.classList.add("active");
    });

    searchBox.addEventListener("blur", () => {
        searchForm.classList.remove("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Lấy chiều cao của thẻ main
    var mainContent = document.getElementById("main-content");
    var mainHeight = mainContent.offsetHeight;

    // Áp dụng chiều cao đó cho pseudo-element ::before của thẻ form
    var styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
        `
        #search-form::before {
            height: ${mainHeight}px;
        }
    `,
        styleSheet.cssRules.length
    );
});

//browse trong accessories
// document.addEventListener("DOMContentLoaded", function () {
//     const button1 = document.getElementById("button1");
//     const button2 = document.getElementById("button2");
//     const info1 = document.getElementById("info1");
//     const info2 = document.getElementById("info2");

//     button1.addEventListener("click", function () {
//         info1.style.display = "block";
//         info2.style.display = "none";
//     });

//     button2.addEventListener("click", function () {
//         info2.style.display = "block";
//         info1.style.display = "none";
//     });
// });

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Remove the active class from all tab buttons
    tablinks = document.getElementsByClassName("btn-be");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add an active class to the button
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.className += " active";
}

function toggleShowAll(tabName) {
    var tabContent = document.getElementById(tabName);
    var hiddenItems = tabContent.querySelectorAll(".item-be.hidden");
    var showAllButton = document.querySelector(".browse-line .btn");

    hiddenItems.forEach((item) => {
        if (item.style.display === "none" || item.style.display === "") {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// Set default tab to be open
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("info1").style.display = "block";
    document.getElementById("info1").classList.add("active");
    document.getElementById("button1").classList.add("active");
});

document.addEventListener("DOMContentLoaded", function () {
    const button1 = document.querySelector("#button1");
    const button2 = document.querySelector("#button2");
    const beline1 = document.querySelector(".be-line1");
    const beline2 = document.querySelector(".be-line2");

    button1.addEventListener("click", function () {
        beline1.style.display = "block";
        beline2.style.display = "none";
    });

    button2.addEventListener("click", function () {
        beline2.style.display = "block";
        beline1.style.display = "none";
    });
});

// featured
let currentIndex = 2;

function showSlide(index) {
    const carouselContainer = document.querySelector(".list-fd");
    const totalItems = document.querySelectorAll(".slide").length;
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    if (index >= totalItems) {
        currentIndex = totalItems - 1;
    } else if (index < 0) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    // Toggle button visibility
    prevButton.style.display = currentIndex === 0 ? "none" : "block";
    nextButton.style.display =
        currentIndex === totalItems - 1 ? "none" : "block";

    const offset = -currentIndex * 100;
    carouselContainer.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Initial call to set the correct state
showSlide(currentIndex);
