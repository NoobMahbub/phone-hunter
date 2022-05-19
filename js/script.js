//Hide preloader after loading js...
const preloader = document.querySelector(".loading").style.display = "none";
// add event listener on enter button 
document
  .getElementById("phoneInput")
  .addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      document.getElementById("submit").click();
    }
  });

const submit = document.getElementById("submit");


submit.addEventListener("click", () => {
  const phoneInput = document.getElementById('phoneInput');
  const searchText = phoneInput.value;

  if (phoneInput.value == '') {
    alert("Please type a phone name");
  }
  phoneInput.value = '';
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`).then(response => response.json())
    .then(response => displaySearch(response.data))
});



//showing phone details

const showDetails = (phoneID) => {

  fetch(`https://openapi.programming-hero.com/api/phone/${phoneID}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data);
      //scrole to top
      document.getElementById("details").scrollIntoView();
      //create element
      const div = document.createElement("div");
      div.classList.add(
        "row",
        "d-flex",
        "align-items-center",
        "justify-content-center",
        "main-info"
      );
      div.innerHTML = `
      <div class="col-md-3">
        <h2>${data.data.name}</h2>
        <hr />
        <h4>${data.data.brand}</h4>
        <hr />
        <ul>
          <li>
            <i class="bi bi-calendar3"></i>
            <span>Released</span>
            <strong>${data.data.releaseDate != ""
          ? data.data.releaseDate
          : "Not Found!"
        }</strong>
          </li>
          <li>
            <i class="bi bi-phone"></i>
            <span>Display Size</span>
            <strong>${data.data.mainFeatures?.displaySize
          ? data.data.mainFeatures.displaySize
          : "Not Available"
        }</strong>
          </li>
        </ul>
      </div>
      <div class="col-md-3">
        <ul>
          <li>
            <i class="bi bi-cpu"></i>
            <span>Chip Set</span>
            <strong>${data.data.mainFeatures?.chipSet
          ? data.data.mainFeatures.chipSet
          : "Not Available"
        }</strong>
          </li>
          <li>
            <i class="bi bi-sd-card"></i>
            <span>Memory</span>
            <strong>${data.data.mainFeatures?.memory
          ? data.data.mainFeatures.memory
          : "Not Available"
        }</strong>
          </li>
          <li>
            <i class="bi bi-eye"></i>
            <span>Sensors</span>
            <strong>${data.data.mainFeatures?.sensors.join(", ")}</strong>
          </li>
          <li>
            <i class="bi bi-wifi"></i>
            <span>WiFi</span>
            <strong>${data.data.others?.WLAN ? data.data.others.WLAN : "Not Available"
        }</strong>
          </li>
        </ul>
      </div>
      <div class="col-md-3">
        <img
          src="${data.data.image}"
          alt="" class="details-img"
        />
      </div>
      <div class="col-md-3">
        <ul>
          <li>
            <i class="bi bi-bluetooth"></i>
            <span>Bluetooth</span>
            <strong>${data.data.others?.Bluetooth
          ? data.data.others.Bluetooth
          : "Not Available"
        }</strong>
          </li>
          <li>
            <i class="bi bi-geo-alt"></i>
            <span>GPS</span>
            <strong>${data.data.others?.GPS ? data.data.others.GPS : "Not Available"
        }</strong>
          </li>
          <li>
            <i>N</i>
            <span>NFC</span>
            <strong>${data.data.others?.NFC ? data.data.others.NFC : "Not Available"
        }</strong>
          </li>
          <li>
            <i class="bi bi-broadcast"></i>
            <span>Radio</span>
            <strong>${data.data.others?.Radio ? data.data.others.Radio : "Not Available"
        }</strong>
          </li>
          <li>
            <i class="bi bi-usb-symbol"></i>
            <span>USB</span>
            <strong>${data.data.others?.USB ? data.data.others.USB : "Not Available"
        }</strong>
          </li>
        </ul>
      </div>
      <i class="bi bi-x-square" id="close-btn" onClick="closeBtn()"></i>
            `;
      phoneDetails.innerHTML = "";
      document.getElementById("details").style.display = "block";
      phoneDetails.appendChild(div);
      btnClose = document.querySelector("#close-btn");
    });
}

const closeBtn = (e) => {
  //   console.log(1);
  document.getElementById("details").style.display = "none";
};


// Showing phone search result

const searchResult = document.getElementById('search-result');
const phoneDetails = document.getElementById('details');
displaySearch = phone => {
  if (phone[0] == undefined) {
    const nullResult = document.getElementById("null-result");
    nullResult.classList.add("d-flex",
      "align-items-center",
      "justify-content-center",
      "text-danger",
      "fw-bold");
    nullResult.innerHTML = `<p>Phone not found. Please search for another phone.`;

  }

  phone.forEach(phone => {
    const div = document.createElement('div');
    div.classList.add('col', 'col-md-4');
    div.innerHTML = `
    <div onclick="" class="card p-3 rounded-3">
    <img src="${phone.image}"class="img-fluid card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${phone.phone_name}</h5>
    <p class="card-text">Brand: ${phone.brand}</p>
    <a onClick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</a>
    </div>
    </div>
    `;

    searchResult.appendChild(div);
  });

}



/*Dark Mode*/

let themeToggler = document.getElementById('theme-toggler');

themeToggler.onclick = () => {
  themeToggler.classList.toggle('fa-sun');
  if (themeToggler.classList.contains('fa-sun')) {
    document.body.classList.add('active');
  } else {
    document.body.classList.remove('active');
  }
}