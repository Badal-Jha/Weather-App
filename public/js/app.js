console.log("client side js file is loaded");
const form = document.querySelector("form");
const search = document.querySelector("#location");
const massege1 = document.querySelector("#massege-1");
const massege2 = document.querySelector("#massege-2");
const imgContainer = document.querySelector("#image");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  massege1.textContent = "Searching...";
  massege2.textContent = "";
  imgContainer.innerHTML = "";
  const address = search.value;
  console.log(address);
  if (!address) {
    massege1.textContent = "Please Provide a Location";
    return;
  }
  //fetch data from http://localhost:3000/Weather?address=boston
  //now as we depoy it on heroku remove local host address
  fetch(`/Weather?address=${address}`)
    .then((res) => {
      if (res.status != 200) {
        massege1.appendChild(`<span>There is something wrong</span>`);
        return;
      }
      return res.json();
    })
    .then((res) => {
      if (res.image) {
        imgContainer.innerHTML = `<img src=${res.image} alt=" " class="img_icon"/>`;
      }
      massege1.textContent = res.location;
      massege2.textContent = res.forcast;
    });
});
