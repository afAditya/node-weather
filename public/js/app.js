const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const meassageOne = document.querySelector("#message-1");
const meassageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  meassageTwo.textContent = "Loading...";
  meassageTwo.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        meassageOne.textContent = data.location;
        meassageTwo.textContent = data.forecast;
      }
    });
  });
});
