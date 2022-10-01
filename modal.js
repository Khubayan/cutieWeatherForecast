//
const gridItems = document.querySelectorAll(".hover-effect");
const body = document.body;
const inputEl = document.getElementById("search-data");
const mContent = document.querySelectorAll(".m-content");
const dayForecast = document.querySelector(".grid-item-4");
const darkModalContent = document.querySelector('.modal-content');
let checkedCondL = "checked";
let checkedCondD = "";
// Select modal
const mpopup = document.getElementById("mpopupBox");

// Select trigger link
const mpLinkSetting = document.getElementById("mpopup-setting");
const mpLinkInfo = document.getElementById("mpopup-info");
const mpLinkCoffee = document.getElementById("mpopup-coffee");

// Select close action element
const close = document.getElementsByClassName("close")[0];

//only one checkbox
function onlyOne(checkbox) {
  let isChecked;
  const checkboxes = document.querySelectorAll(".m-content > span");
  checkboxes[checkbox].checked = true;
  isChecked = checkboxes[checkbox];
  if (isChecked.textContent == "Dark") {
    body.classList.add("dark-body");
    inputEl.classList.add("dark-input");
    gridItems.forEach(function (item) {
      item.classList.add("grid-item-dark");
    });
    dayForecast.classList.add("dark-day");
    darkModalContent.classList.add("dark-modal");
    checkedCondD = "checked";
    checkedCondL = "false";
  } else if (isChecked.textContent == "Light") {
    body.classList.remove("dark-body");
    inputEl.classList.remove("dark-input");
    gridItems.forEach(function (item) {
      item.classList.remove("grid-item-dark");
    });
    dayForecast.classList.remove("dark-day");
    darkModalContent.classList.remove("dark-modal");
    checkedCondL = "checked";
    checkedCondD = "false";
  }
}

// Open modal once the link is clicked
mpLinkSetting.onclick = function () {
  mpopup.style.display = "block";
  mContent[0].innerHTML = `
  <h3>Theme</h3>
  <span
    ><input
      id="dark"
      type="radio"
      name="check"
      style="width: 1.5rem"
      ${checkedCondD}
      onclick="onlyOne(0)"
    />Dark</span
  >
  <span
    ><input
      id="light"
      type="radio"
      name="check"
      style="width: 1.5rem"
      ${checkedCondL}
      onclick="onlyOne(1)" 
    />Light</span
  >
  `;
};

mpLinkInfo.onclick = function () {
  mpopup.style.display = "block";
  mContent[1].innerHTML = "";
  mContent[0].innerHTML = `
        <div class="modal-body">
            <p style="text-align: justify">CutieWeCast is weather forecast build natively by <a href="https://github.com/Khubayan" target="_blank">iamnotanerd</a> with HTML absolutely, CSS, and JavaScript. Some codes of CutieWeCast are copy-pasted from some sites or forums like StackOverflow.</p>
            <p style="text-align: justify">This cute weather forecast is made from free or open source projects such as APIs, images, fonts, and references. You can use some or every part of CutieWeCast for your own puposes as long as you keep following the terms of any sources you are use.</p>
        </div>
    
    `;
};

mpLinkCoffee.onclick = function () {
  mpopup.style.display = "block";
  document.querySelector(".modal-header h2").innerHTML = "Buy me a coffee";
};

// Close modal once close element is clicked
close.onclick = function () {
  mpopup.style.display = "none";
};

// Close modal when user clicks outside of the modal box
window.onclick = function (event) {
  if (event.target == mpopup) {
    mpopup.style.display = "none";
  }
};
