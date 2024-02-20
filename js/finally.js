let row = document.querySelector(".data");
let searchcontainer = document.querySelector(".searchcontainer");
let box_width = $(".left_side .nav-tab").outerWidth();
let someMeal = [];

function openLeftside() {
  $(".left_side").animate({ left: 0 }, 1000);

  $(".open .open-close-icon").removeClass("fa-align-justify");
  $(".open  .open-close-icon").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".sidenav li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 200);
  }
}
function closeLeftside() {
  $(".left_side").animate({ left: -box_width }, 1000);
  $(".sidenav li").animate({ top: 400 }, 1000);
  $(".open .open-close-icon").addClass("fa-align-justify");
  $(".open  .open-close-icon").removeClass("fa-x");
}
closeLeftside();
$(".open").click(() => {
  if ($(".left_side").css("left") == "0px") {
    closeLeftside();
  } else {
    openLeftside();
  }
});
// Welcome Pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
async function welcome_Meal() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  someMeal = await response.json();
  console.log(someMeal);
  ALL_SpecMeal(someMeal.meals);
}
welcome_Meal();

// Category Pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
$(".getcat").click(2000, async function () {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const categories = await response.json();
  console.log(categories);

  All_Category(categories.categories);
});
function All_Category(arr) {
  closeLeftside();
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    const cat = arr[i];
    const para = cat.strCategoryDescription.slice(0, 115);
    cartoona += `
      <div class="col-md-3 meal ">
        <div class="position-relative card_content overflow-hidden rounded-3">
          <img src="${cat.strCategoryThumb}" alt="${cat.strCategoryThumb}" class="w-100 ">
          <div class="meal-layer position-absolute d-flex align-items-center text-black w-100 h-100 flex-wrap text-center">
            <h3>${cat.strCategory}</h3>
            <p class="mt-0 para_cat">${para}</p>
          </div>
        </div>
      </div>
    `;
  }

  row.innerHTML = cartoona;
  $(".meal").click(function () {
    const category = $(this).find("h3").text();
    fillterCatmeal(category);
  });
}
async function fillterCatmeal(category) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const meals = await response.json();
  ALL_SpecMeal(meals.meals);
  console.log(meals);
}
//Area Pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
$(".getArea").click(2000, async function () {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const area = await response.json();
  console.log(area);
  All_Area(area.meals);
});
function All_Area(arr) {
  closeLeftside();
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    const ar = arr[i];
    cartoona += `
        <div class="col-md-3 meal ">
          <div class="position-relative card_content overflow-hidden rounded-3 ">
           <i class="fa-solid fa-house-laptop fa-5x" style="color: #ffffff;"></i>
              <h3 class="text-light">${ar.strArea}</h3>
          </div>
        </div>
      `;
  }
  row.innerHTML = cartoona;
  $(".meal").click(function () {
    const arr = $(this).find("h3").text();
    fillterArea(arr);
  });
}
async function fillterArea(area) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const meals = await response.json();
  ALL_SpecMeal(meals.meals);
  console.log(meals);
}
//Ingredients Pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
$(".getngredients").click(2000, async function () {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  integ = await response.json();
  All_Ingredients(integ.meals);
});
function All_Ingredients(arr) {
  closeLeftside();
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    const int = arr[i];

    if (int.strDescription != null && int.strDescription !== "") {
      const IntDescription = int.strDescription.slice(0, 100);
      cartoona += `
    <div class="col-md-3 text-center meal ">
      <div class="card_content overflow-hidden rounded-3 ">
        <i class="fa-solid fa-drumstick-bite fa-4x justify-content-center align-items-center" style="color: #ffffff;"></i>
        <h3 style="font-size: 24px;" class="text-light">${int.strIngredient}</h3>
        <p class="text-light">${IntDescription}</p>
      </div>
    </div>
  `;
    }
  }

  row.innerHTML = cartoona;
  $(".meal").click(function () {
    const arr = $(this).find("h3").text();
    fillterIngredients(arr);
  });
}
async function fillterIngredients(Ingredients) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`
  );
  const meals = await response.json();
  ALL_SpecMeal(meals.meals);
  console.log(meals);
}
// Search Pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

$(".getsearch").click(function () {
  closeLeftside();
  let cartoona = `
    <div class="container mt-5">
    <div class="d-flex justify-content-between search">
            <input onkeyup="searchname(this.value)"  class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
            <input onkeyup="searchletter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>
        </div> `;

  searchcontainer.innerHTML = cartoona;
});
async function searchname(name) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  someMeal = await response.json();
  console.log(someMeal);
  ALL_SpecMeal(someMeal.meals);
}
async function searchletter(letter) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  someMeal = await response.json();
  ALL_SpecMeal(someMeal.meals);
  console.log(someMeal.meals);
}

//SpecMeal Pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
function ALL_SpecMeal(arr) {
  closeLeftside();
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-md-3 ">
        <div onclick="getDetails(${arr[i].idMeal})"  class="meal position-relative overflow-hidden rounded-2 ">
          <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
            <h3>${arr[i].strMeal}</h3>
          </div>
        </div>
      </div>
    `;
  }

  row.innerHTML = cartoona;
}
//Details Pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
async function getDetails(id) {
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const meals = await respone.json();

  getRecip(meals.meals[0]);
}
function getRecip(meal) {
  closeLeftside();
  let recip = " ";
  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info me-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }
  let tags = meal.strTags?.split(",") || [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  recip += `<div class="container">
            <div class="row text-light ">
                <div class="col-md-4 defin ">
                    <img src="${meal.strMealThumb}" alt="${meal.strTags}" class="w-100 rounded">
                    <h2>${meal.strMeal}</h2>
                </div>
                <div class="col-md-8  defin">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="  d-flex  flex-wrap  ">
                        ${ingredients}
                    </ul>
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap ">
                         ${tagsStr}

                    </ul>

                    <a target=" _blank" href="${meal.strSource}"
                        class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal.strYoutube}"
                        class="btn btn-danger">Youtube</a>
                </div>
            </div>
        </div>
`;
  row.innerHTML = recip;
}
//Contact Pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
let submit;
$(".getncontact").click(function () {
  let cartoona = `<div class="contact vh-100 d-flex justify-content-center align-items-center">
                    <div class="container w-75 text-center">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <input type="text" class="form-control input-contact" id="nameId"
                                    placeholder="Enter Your Name">
                                <div class="alert alert-danger w-100 mt-2 d-none" id="nameAlert">
                                    Special characters and numbers not allowed
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input type="email" class="form-control input-contact" id="emailId"
                                    placeholder="Enter Your Email">
                                <div class="alert alert-danger w-100 mt-2 d-none" id="emailAlert">

                                    Email not valid *exemple@yyy.zzz

                                </div>
                            </div>
                            <div class="col-md-6">
                                <input type="text" class="form-control input-contact" id="phoneId"
                                    placeholder="Enter Your Phone">
                                <div class="alert alert-danger w-100 mt-2 d-none" id="phoneAlert">

                                    Enter valid Phone Number
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input type="number" class="form-control input-contact" id="ageId"
                                    placeholder="Enter Your Age">
                                <div class="alert alert-danger w-100 mt-2 d-none" id="ageAlert">

                                    Enter valid age
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input type="password" class="form-control input-contact" id="passwordId"
                                    placeholder="Enter Your Password">
                                <div class="alert alert-danger w-100 mt-2 d-none" id="passwordAlert">

                                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input type="password" class="form-control input-contact" id="repassword"
                                    placeholder="Repassword">
                                <div class="alert alert-danger w-100 mt-2 d-none" id="repwordAlert">
                                    Enter valid repassword
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-danger px-2 mt-3 submit " disabled id="subbtn">Submit</button>
                    </div>
                </div> `;

  $("#row").html(cartoona);
  submit = document.getElementById("subbtn");
  closeLeftside();
  document.querySelector("#nameId").addEventListener("keyup", function () {
    let name_Input = document.querySelector("#nameId");
    let check = nameValid();
    checkAllinput(name_Input, check, "#nameAlert");
  });

  document.querySelector("#emailId").addEventListener("keyup", function () {
    let email_Input = document.querySelector("#emailId");
    let check = emailValid();
    checkAllinput(email_Input, check, "#emailAlert");
  });

  document.querySelector("#phoneId").addEventListener("keyup", function () {
    let phone_Input = document.querySelector("#phoneId");
    let check = phoneValid();
    checkAllinput(phone_Input, check, "#phoneAlert");
  });

  document.querySelector("#ageId").addEventListener("keyup", function () {
    let age_Input = document.querySelector("#ageId");
    let check = ageValid();
    checkAllinput(age_Input, check, "#ageAlert");
  });

  document.querySelector("#passwordId").addEventListener("keyup", function () {
    let password_Input = document.querySelector("#passwordId");
    let check = passwordValid();
    checkAllinput(password_Input, check, "#passwordAlert");
  });
  document.querySelector("#repassword").addEventListener("keyup", function () {
    let repassword_Input = document.querySelector("#repassword");
    let check = repasswordValid();
    checkAllinput(repassword_Input, check, "#repwordAlert");
  });
});
function checkAllinput(input, check, alertId) {
  if (check) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    $(alertId).addClass("d-none");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    $(alertId).removeClass("d-none");
  }
  if (
    nameValid() &&
    emailValid() &&
    ageValid() &&
    phoneValid() &&
    passwordValid() &&
    repasswordValid()
  ) {
    submit.removeAttribute("disabled");
  } else {
    console.log("joy");
    submit.setAttribute("disabled", true);
  }
}
function nameValid() {
  return /^[a-zA-Z ]+$/.test(document.querySelector("#nameId").value);
}
function emailValid() {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    document.querySelector("#emailId").value
  );
}
function phoneValid() {
  return /^(02)?(?:\+?20|0)?1[0-9]{9}$/.test(
    document.querySelector("#phoneId").value
  );
}
function ageValid() {
  return /^\b(?:[1-9][0-9]|100)\b/.test(document.querySelector("#ageId").value);
}
function passwordValid() {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(
    document.querySelector("#passwordId").value
  );
}
function repasswordValid() {
  return (
    document.querySelector("#repassword").value ==
    document.querySelector("#passwordId").value
  );
}
