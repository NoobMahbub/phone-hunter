const submit = document.getElementById("submit");


submit.addEventListener("click", () => {
    const phoneInput = document.getElementById('phoneInput');
    const searchText = phoneInput.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`).then(response => response.json())
        .then(response => displaySearch(response.data))

});

const searchResult = document.getElementById('search-result');
displaySearch = phone => {
    console.log(phone);
    phone.forEach(phone => {
 
        const div = document.createElement('div');
        div.classList.add('col', 'col-md-4');
        div.innerHTML = `
    <div onclick="" class="card p-3 rounded-3">
    <img src="${phone.image}"class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${phone.phone_name}</h5>
    <p class="card-text">Brand: ${phone.brand}</p>
    </div>
    </div>
    `;
        searchResult.appendChild(div);       
    });
   
}

let themeToggler = document.getElementById('theme-toggler');

themeToggler.onclick = () => {
  themeToggler.classList.toggle('fa-sun');
  if (themeToggler.classList.contains('fa-sun')) {
    document.body.classList.add('active');
  } else {
    document.body.classList.remove('active');
  }
}