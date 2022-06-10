let countId1 = 0;
let countId2 = 0;
let countId3 = 0;
let spanValueId = [];
let spanIngredientName = [];
let queryTagContain;
let childTagContainer;
let ingredientRecipes = [];
let spanIngredientRecipes = [];
let spanApplianceRecipes = [];
let spanAppliance = [];
let spanUstensileRecipes = [];

function dishesFactory(data) {
  const { name, servings, ingredients, id, time, description } = data;

  // Affiche chaque plats dans la page d'index
  function getAllDishes() {
    const article = document.createElement("article");
    article.setAttribute("class", "dishes_container");
    const img = document.createElement("div");
    img.setAttribute("class", "dishes_img");
    const title = document.createElement("span");
    title.setAttribute("class", "dishes_title");
    title.innerText = name;
    const dishesIngredients = document.createElement("div");
    dishesIngredients.setAttribute("class", "dishes_ingredients");
    ingredients.forEach((item) => {
      const items = document.createElement("div");
      items.setAttribute("class", "ingredients_items");
      const itemBold = document.createElement("span");
      itemBold.setAttribute("class", "bold");
      itemBold.innerText = item.ingredient;
      const itemSpan = document.createElement("span");
      if (item.unit) {
        itemSpan.innerText = " " + item.quantity + item.unit;
      } else if (!item.quantity && !item.unit){
        itemSpan.innerText = " " ;
      }
      else {
        itemSpan.innerText = " " + item.quantity;
      }
      items.appendChild(itemBold);
      items.appendChild(itemSpan);
      dishesIngredients.appendChild(items);
      article.appendChild(dishesIngredients);
    });
    const disheDescription = document.createElement("div");
    disheDescription.setAttribute("class", "dishes_description");
    disheDescription.innerText = description;
    const timer = document.createElement("div");
    timer.setAttribute("class", "dishes_time");
    const timeIcon = document.createElement("i");
    timeIcon.setAttribute("class", "fa-regular fa-clock");
    const spanTime = document.createElement("span");
    spanTime.innerText = " " + time + " " + "min";
    spanTime.setAttribute("class", "bold");
    timer.appendChild(timeIcon);
    timer.appendChild(spanTime);
    article.appendChild(img);
    article.appendChild(title);
    article.appendChild(timer);
    article.appendChild(disheDescription);
    return article;
  }
  return {
    name,
    servings,
    name,
    ingredients,
    id,
    time,
    description,
    getAllDishes,
  };
}
const ingredientArray = [];
const applianceArray = [];
const ustentilesArray = [];
const ingredientSearch = document.querySelector(".search_ingredient");
const applianceSearch = document.querySelector(".search_appareil");
const ustensilstSearch = document.querySelector(".search_ustenstile");
const dishesSection = document.querySelector(".dishes_section");
let dropdownAppliance;
async function displayData(recipes) {
  recipes.forEach((recipe) => {
    const factory = dishesFactory(recipe);
    const displayDishes = factory.getAllDishes();
    dishesSection.appendChild(displayDishes);
    recipe.ingredients.forEach((item) => {
      ingredientArray.push(item.ingredient);
    });
    recipe.ustensils.forEach((item) => {
      ustentilesArray.push(item);
    });
    applianceArray.push(recipe.appliance);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { recipes } = await getRecipes();
  displayData(recipes);
}

init();


ingredientSearch.addEventListener("click", () => {
 
  const angleUp = document.querySelectorAll(".fa-angle-down")
  angleUp[0].setAttribute("class", "fa-solid fa-angle-up")
  let searchContainer = document.querySelectorAll(
    ".search_container--ingredients"
  );
  let searchIngredient = document.querySelector(".search_ingredient");
  searchContainer[0].setAttribute(
    "class",
    "search_dropdown_container--ingredients"
  );
  searchIngredient.setAttribute("class", "search_dropdown");
  searchIngredient.removeAttribute("value")
  searchIngredient.setAttribute("placeholder", "Ingredients");

  const allIngredient = document.createElement("div");
  allIngredient.setAttribute("class", "all_ingredients");
  const dropdownContainer = document.querySelector(
    ".search_dropdown_container--ingredients"
  );
  dropdownContainer.style.width = "32rem";
  let searchBarContainer = document.querySelector(".search_bar_container")
  if (searchBarContainer.children.length >= 3) {
    if (ingredientRecipes.length <= 10) {
      dropdownContainer.style.width = "9rem";
      allIngredient.style.display = "flex";
      allIngredient.style.flexDirection = "column";
      allIngredient.style.textAlign = "center";
    }
   else {
    dropdownContainer.style.width = "32rem";
    allIngredient.style.display = "grid";
    allIngredient.style.textAlign = "center";
   }
    resultCombined()
    console.log(spanValueId)
    }
    
  dropdownContainer.appendChild(allIngredient);
  

  searchIngredient.addEventListener("keyup", (e) => {
    const currentValue = e.target.value;
    if (currentValue.length >= 3) {
      dropdownContainer.style.width = "9rem";
      allIngredient.style.display = "flex";
      allIngredient.style.flexDirection = "column";
      allIngredient.style.textAlign = "left";
      const itemIngredient = allIngredient.children.length;

      for (let i = 0; i < itemIngredient; i++) {
        const element = allIngredient.firstChild;
        element.remove();
      }

      filteredDropdownArray = filteredingredientArray.filter((element) =>
        element.includes(currentValue)
      );
      filteredDropdownArray.forEach((element) => {
        const tagIngredientContainer = document.createElement("div");
        tagIngredientContainer.setAttribute("class", "tag_container");
        const Span = document.createElement("span");
        Span.innerText = element;
        allIngredient.appendChild(Span);
        Span.addEventListener("click", () => {
          const searchBar = document.querySelector(".search_bar_container");
          const newFilter = document.createElement("div");
          newFilter.setAttribute("class", "item_ingredients");
          newFilter.setAttribute("id", 1);
          const spanFilter = document.createElement("span");
          spanFilter.innerText = Span.innerHTML;
          const iconFilter = document.createElement("icon");
          iconFilter.setAttribute("class", "fa-regular fa-circle-xmark");
          newFilter.appendChild(spanFilter);
          newFilter.appendChild(iconFilter);
          tagIngredientContainer.appendChild(newFilter);
          searchBar.appendChild(tagIngredientContainer);
          const queryTagContainer = document.querySelector(".tag_container");
          if (!queryTagContainer) {
            async function newInit() {
              const { recipes } = await getRecipes();
              const dishesSection = document.querySelector(".dishes_section");
              const dishesLength = dishesSection.children.length;
              for (let i = 0; i < dishesLength; i++) {
                const element = dishesSection.firstChild;
                element.remove();
              }
              const newRecipes = recipes.filter((recipe) => {
                return recipe.ingredients.some(
                  (ingredient) => ingredient.ingredient === Span.innerHTML
                );
              });
              const filteredNewRecipes = newRecipes.filter(function (ele, pos) {
                return newRecipes.indexOf(ele) == pos;
              });
              displayData(filteredNewRecipes);
            }
            newInit();
          } else {
           
            queryTagContain = document.querySelector(".tag_container");
            childTagContainer = queryTagContainer.children;
            queryTagContain.appendChild(newFilter);
            resultCombined();
          }
        });
      });
    }
  });
  const filteredingredientArray = ingredientArray.filter(function (ele, pos) {
    return ingredientArray.indexOf(ele) == pos;
  });
  filteredingredientArray.forEach((element) => {
    const Span = document.createElement("span");
    Span.innerText = element;
    allIngredient.appendChild(Span);
  });
  const spanIngredients = [];
  const itemIngredient = allIngredient.children.length;
  for (let i = 0; i < itemIngredient; i++) {
    const element = allIngredient.children[i];
    spanIngredients.push(element);
  }
  spanIngredients.forEach((item) => {
    item.addEventListener("mouseup", () => {
      const searchBar = document.querySelector(".search_bar_container");
      const newFilter = document.createElement("div");
      newFilter.setAttribute("class", "item_ingredients");
      newFilter.setAttribute("id", 1);
      const spanFilter = document.createElement("span");
      spanFilter.innerText = item.innerHTML;
      const iconFilter = document.createElement("icon");
      iconFilter.setAttribute("class", "fa-regular fa-circle-xmark");
      newFilter.appendChild(spanFilter);
      newFilter.appendChild(iconFilter);
      const queryTagContainer = document.querySelector(".tag_container");
      if (!queryTagContainer) {
        const tagIngredientContainer = document.createElement("div");
        tagIngredientContainer.setAttribute("class", "tag_container");
        tagIngredientContainer.appendChild(newFilter);
        searchBar.appendChild(tagIngredientContainer);
        async function newInit() {
    
          const { recipes } = await getRecipes();
          const dishesSection = document.querySelector(".dishes_section");
          const dishesLength = dishesSection.children.length;
          for (let i = 0; i < dishesLength + 1; i++) {
            const element = dishesSection.firstChild;
            element.remove();
          }
          const RecipesArray = [];
          const newRecipes = recipes.filter((recipe) => {
            return recipe.ingredients.some(
              (ingredient) => ingredient.ingredient === item.innerHTML
            );
          });

          const filteredNewRecipes = newRecipes.filter(function (ele, pos) {
            return newRecipes.indexOf(ele) == pos;
          });
          displayData(filteredNewRecipes);
          
        }
      //newInit();
        item.addEventListener("click", () => {
          const queryTagContainer = document.querySelector(".tag_container");
          childTagContainer = queryTagContainer.children
          resultCombined()
          
        })
           
      } else {
        item.addEventListener("click", () => {
        queryTagContain = document.querySelector(".tag_container");
        childTagContainer = queryTagContainer.children;
        queryTagContain.appendChild(newFilter);
        resultCombined();
        })
      }
    });
   
  });

  window.addEventListener("click", (e) => {
    const all_ingredients = document.querySelector(".all_ingredients")
    const dropdown = document.querySelector(".search_dropdown")
    
    if (e.target === dropdown || e.target === all_ingredients ) {
    }
    else {
      dropdownContainer.style.width = "9rem";
      searchContainer[0].setAttribute(
        "class",
        "search_container--ingredients"
      ); 
      searchIngredient.setAttribute("class", "search_ingredient")
      searchIngredient.value = "Ingredients"
      searchIngredient.addEventListener("click", () => {
      searchIngredient.value = ""
      })   
      all_ingredients.remove()  
  angleUp[0].setAttribute("class", "fa-solid fa-angle-down")
    }
   
  })
});



let filteredRecipesArray = [];
applianceSearch.addEventListener("click", () => {
  const angleUp = document.querySelectorAll(".fa-angle-down")
  angleUp[1].setAttribute("class", "fa-solid fa-angle-up")
  let searchContainerAppliance = document.querySelectorAll(
    ".search_container--appareils"
  );
  let searchAppliance = document.querySelector(".search_appareil");
  searchContainerAppliance[0].setAttribute(
    "class",
    "search_dropdown_container--appareils"
  );
  searchAppliance.setAttribute(
    "class",
    "search_dropdown search_dropdown--appareils"
  );
  searchAppliance.removeAttribute("value")
  searchAppliance.setAttribute("placeholder", "Appareil")
  const allAppliance = document.createElement("div");
  allAppliance.setAttribute("class", "all_appliances");
  const dropdownContainer = document.querySelector(
    ".search_dropdown_container--appareils"
  );
  dropdownContainer.style.width = "32rem";
  let searchBarContainer = document.querySelector(".search_bar_container")
  if (searchBarContainer.children.length >= 3) {
    if (spanApplianceRecipes.length <= 10) {
      dropdownContainer.style.width = "9rem";
      allAppliance.style.display = "flex";
      allAppliance.style.flexDirection = "column";
      allAppliance.style.textAlign = "center";
    }
   else {
    dropdownContainer.style.width = "32rem";
    allAppliance.style.display = "grid";
    allAppliance.style.textAlign = "center";
   }
    resultCombined()
    console.log(spanValueId)
    }
  dropdownContainer.appendChild(allAppliance);
  const filteredApplianceArray = applianceArray.filter(function (ele, pos) {
    return applianceArray.indexOf(ele) == pos;
  });
  let dropdownAppliance = document.querySelector(".search_dropdown--appareils");
  dropdownAppliance.addEventListener("keyup", async (e) => {
    let currentValue = e.target.value;
    if (currentValue.length >= 3) {
      const searBarApplianceContainer = document.querySelector(
        ".search_dropdown_container--appareils"
      );
      const allAppliance = document.querySelector(".all_appliances");
      searBarApplianceContainer.style.width = "9rem";
      allAppliance.style.display = "flex";
      allAppliance.style.flexDirection = "column";
      allAppliance.style.textAlign = "left";

      const newFilter = document.createElement("div");

      const itemAppliance = allAppliance.children.length;
      for (let i = 0; i < itemAppliance; i++) {
        const element = allAppliance.firstChild;
        element.remove();
      }

      filteredRecipesArray = filteredApplianceArray.filter((element) =>
        element.includes(currentValue)
      );
      filteredRecipesArray.forEach((element) => {
        const Span = document.createElement("span");
        Span.innerText = element;
        allAppliance.appendChild(Span);
        Span.addEventListener("mouseup", () => {
          const searchBar = document.querySelector(".search_bar_container");
          newFilter.setAttribute("class", "item_appliance");
          newFilter.setAttribute("id", 2);
          const spanFilter = document.createElement("span");
          spanFilter.innerText = Span.innerHTML;
          const iconFilter = document.createElement("icon");
          iconFilter.setAttribute("class", "fa-regular fa-circle-xmark");
          newFilter.appendChild(spanFilter);
          newFilter.appendChild(iconFilter);
          searchBar.appendChild(newFilter);
          const queryTagContainer = document.querySelector(".tag_container");
          if (!queryTagContainer) {
            newAppliance();
          } else {
            queryTagContain = document.querySelector(".tag_container");
            childTagContainer = queryTagContain.children;
            queryTagContainer.appendChild(newFilter);
            resultCombined();
          }
          async function newAppliance() {
            const { recipes } = await getRecipes();
            const dishesSection = document.querySelector(".dishes_section");
            const dishesLength = dishesSection.children.length;
            for (let i = 0; i < dishesLength + 1; i++) {
              const element = dishesSection.firstChild;
              element.remove();
            }
            const newRecipes = recipes.filter((recipe) => {
              return recipe.appliance.includes(Span.innerHTML);
            });
            const filteredNewRecipes = newRecipes.filter(function (ele, pos) {
              return newRecipes.indexOf(ele) == pos;
            });
            displayData(filteredNewRecipes);
          }
        });
      });
    }
  });
  filteredApplianceArray.forEach((element) => {
    const Span = document.createElement("span");
    Span.innerText = element;
    allAppliance.appendChild(Span);
  });
  const spanAppliance = [];
  const itemAppliance = allAppliance.children.length;
  for (let i = 0; i < itemAppliance; i++) {
    const element = allAppliance.children[i];
    spanAppliance.push(element);
  }
  spanAppliance.forEach((item) => {
    item.addEventListener("mouseup", () => {
      const searchBar = document.querySelector(".search_bar_container");
      const newFilter = document.createElement("div");
      newFilter.setAttribute("class", "item_appliance");
      newFilter.setAttribute("id", 2);
      const spanFilter = document.createElement("span");
      spanFilter.innerText = item.innerHTML;
      const iconFilter = document.createElement("icon");
      iconFilter.setAttribute("class", "fa-regular fa-circle-xmark");
      newFilter.appendChild(spanFilter);
      newFilter.appendChild(iconFilter);
      const queryTagContainer = document.querySelector(".tag_container");
      if (!queryTagContainer) {
        const tagIngredientContainer = document.createElement("div");
        tagIngredientContainer.setAttribute("class", "tag_container");
        tagIngredientContainer.appendChild(newFilter);
        searchBar.appendChild(tagIngredientContainer);
       // newAppliance();
        item.addEventListener("click", () => {
          const queryTagContainer = document.querySelector(".tag_container");
          childTagContainer = queryTagContainer.children
          resultCombined()
        })
      } else {
        queryTagContain = document.querySelector(".tag_container");
        childTagContainer = queryTagContain.children;
        queryTagContainer.appendChild(newFilter);
        resultCombined();
      }
    
      async function newAppliance() {
        const { recipes } = await getRecipes();
        const dishesSection = document.querySelector(".dishes_section");
        const dishesLength = dishesSection.children.length;
        for (let i = 0; i < dishesLength + 1; i++) {
          const element = dishesSection.firstChild;
          element.remove();
        }

        const newRecipes = recipes.filter((recipe) => {
          return recipe.appliance.includes(item.innerHTML);
        });
        const filteredNewRecipes = newRecipes.filter(function (ele, pos) {
          return newRecipes.indexOf(ele) == pos;
        });
        displayData(filteredNewRecipes);
      }
    });
  });
  window.addEventListener("click", (e) => {
    const all_appliances = document.querySelector(".all_appliances")
    const dropdown_appliance = document.querySelector(".search_dropdown--appareils")
    if (e.target === dropdown_appliance || e.target === all_appliances ) {
   
    }
    else {
      searchContainerAppliance[0].style.width = "9rem"
      searchContainerAppliance[0].setAttribute(
        "class",
        "search_container--appareils"
      );
      searchAppliance.setAttribute("class", "search_appareil");    
      searchAppliance.value = "Appareils"
      searchAppliance.addEventListener("click", () => {
        searchAppliance.value = ""
      })   
    all_appliances.remove()
  angleUp[1].setAttribute("class", "fa-solid fa-angle-down")
    }
  })
});

ustensilstSearch.addEventListener("click", () => {
  const angleUp = document.querySelectorAll(".fa-angle-down")
  angleUp[2].setAttribute("class", "fa-solid fa-angle-up")
  let searchUstensileContainer = document.querySelectorAll(
    ".search_container--ustenstiles"
  );
  let searchUstensiles = document.querySelector(".search_ustenstile");
  searchUstensileContainer[0].setAttribute("class", "search_dropdown_container--ustensiles");
  searchUstensiles.setAttribute(
    "class",
    "search_dropdown search_dropdown--ustenstiles"
  );
  const allUstensiles = document.createElement("div");
  allUstensiles.setAttribute("class", "all_ustensiles");
  const dropdownContainer = document.querySelector(
    ".search_dropdown_container"
  );
  searchUstensileContainer[0].appendChild(allUstensiles);
  const filteredUstensilesArray = ustentilesArray.filter(function (ele, pos) {
    return ustentilesArray.indexOf(ele) == pos;
  });
  searchUstensiles.removeAttribute("value")
  searchUstensiles.setAttribute("placeholder", "Ustensiles")

  searchUstensiles.addEventListener("keyup", (e) => {
    let currentValue = e.target.value;
    if (currentValue.length >= 3) {
      const searBarUstensileContainer = document.querySelector(
        ".search_dropdown_container--ustensiles"
      );
      searBarUstensileContainer.style.width = "9rem";
      allUstensiles.style.display = "flex";
      allUstensiles.style.flexDirection = "column";
      allUstensiles.style.textAlign = "left";

      const itemUstensiles = allUstensiles.children.length;
      for (let i = 0; i < itemUstensiles; i++) {
        const element = allUstensiles.firstChild;
        element.remove();
      }
      filteredDropdownArray = filteredUstensilesArray.filter((element) =>
        element.includes(currentValue)
      );
      filteredDropdownArray.forEach((element) => {
        const Span = document.createElement("span");
        Span.innerText = element;
        allUstensiles.appendChild(Span);
        Span.addEventListener("click", () => {
          const searchBar = document.querySelector(".search_bar_container");
          const newFilter = document.createElement("div");
          newFilter.setAttribute("class", "item_ustensile");
          newFilter.setAttribute("id", 3);
          const spanFilter = document.createElement("span");
          spanFilter.innerText = Span.innerHTML;
          const iconFilter = document.createElement("icon");
          iconFilter.setAttribute("class", "fa-regular fa-circle-xmark");
          newFilter.appendChild(spanFilter);
          newFilter.appendChild(iconFilter);

          const queryTagContainer = document.querySelector(".tag_container");
          if (!queryTagContainer) {
            const tagIngredientContainer = document.createElement("div");
            tagIngredientContainer.setAttribute("class", "tag_container");
            tagIngredientContainer.appendChild(newFilter);
            searchBar.appendChild(tagIngredientContainer);

            async function newUstensiles() {
              const { recipes } = await getRecipes();
              const dishesSection = document.querySelector(".dishes_section");
              const dishesLength = dishesSection.children.length;
              for (let i = 0; i < dishesLength + 1; i++) {
                const element = dishesSection.firstChild;
                element.remove();
              }
              const newRecipes = recipes.filter((recipe) => {
                return recipe.ustensils.includes(Span.innerHTML);
              });
              const filteredNewRecipes = newRecipes.filter(function (ele, pos) {
                return newRecipes.indexOf(ele) == pos;
              });
              displayData(filteredNewRecipes);
            }
            newUstensiles();
          } else {
            queryTagContain = document.querySelector(".tag_container");
            childTagContainer = queryTagContainer.children;
            queryTagContain.appendChild(newFilter);
            resultCombined();
          }
        })
      })
    
    }
    
})
  filteredUstensilesArray.forEach((element) => {
    const Span = document.createElement("span");
    Span.innerText = element;
    allUstensiles.appendChild(Span);
  });
  const spanUstensiles = [];
  const itemUstensiles = allUstensiles.children.length;
  for (let i = 0; i < itemUstensiles; i++) {
    const element = allUstensiles.children[i];
    spanUstensiles.push(element);
  }
  spanUstensiles.forEach((item) => {
    item.addEventListener("click", () => {
      const searchBar = document.querySelector(".search_bar_container");
      const newFilter = document.createElement("div");
      newFilter.setAttribute("class", "item_ustensile");
      newFilter.setAttribute("id", 3);
      const spanFilter = document.createElement("span");
      spanFilter.innerText = item.innerHTML;
      const iconFilter = document.createElement("icon");
      iconFilter.setAttribute("class", "fa-regular fa-circle-xmark");
      newFilter.appendChild(spanFilter);
      newFilter.appendChild(iconFilter);
      const queryTagContainer = document.querySelector(".tag_container");
      if (!queryTagContainer) {
        const tagIngredientContainer = document.createElement("div");
        tagIngredientContainer.setAttribute("class", "tag_container");
        tagIngredientContainer.appendChild(newFilter);
        searchBar.appendChild(tagIngredientContainer);

        async function newUstensiles() {
          const { recipes } = await getRecipes();
          const dishesSection = document.querySelector(".dishes_section");
          const dishesLength = dishesSection.children.length;
          for (let i = 0; i < dishesLength + 1; i++) {
            const element = dishesSection.firstChild;
            element.remove();
          }
          const newRecipes = recipes.filter((recipe) => {
            return recipe.ustensils.includes(item.innerHTML);
          });
          const filteredNewRecipes = newRecipes.filter(function (ele, pos) {
            return newRecipes.indexOf(ele) == pos;
          });
          displayData(filteredNewRecipes);
        }
        newUstensiles();
      } else {
        queryTagContain = document.querySelector(".tag_container");
        childTagContainer = queryTagContainer.children;
        queryTagContain.appendChild(newFilter);
        resultCombined();
      }
    });
  });
    
  window.addEventListener("mouseup", (e) => {
   const dropdownUstensiles = document.querySelector(".search_dropdown--ustenstiles")
  
    if (e.target === allUstensiles || e.target === dropdownUstensiles ) {
   
    }
    else {
      searchUstensileContainer[0].setAttribute(
        "class",
        "search_container--ustenstiles"
      );
      searchUstensiles.setAttribute("class", "search_ustenstile");    
      searchUstensiles.value ="Ustensiles"
      searchUstensiles.addEventListener("click", (e) => {
        searchUstensiles.value = ""
      })
      allUstensiles.remove()
  angleUp[2].setAttribute("class", "fa-solid fa-angle-down")
    }
    
  })
});

const searchBar = document.querySelector(".search_bar");
searchBar.addEventListener("keyup", (e) => { 
  const currentValue = e.target.value;
  if (currentValue.length >= 3) {
    async function newAppliance() {
      const { recipes } = await getRecipes();
      const dishesContainer = document.querySelectorAll(".dishes_container");
      dishesContainer.forEach((container) => {
        container.remove();
      });
      const newName = recipes.filter((recipe) => {
        return recipe.name.includes(currentValue);
      });
      const filteredNewName = newName.filter(function (ele, pos) {
        return newName.indexOf(ele) == pos;
      });
      const newDescription = recipes.filter((recipe) => {
        return recipe.description.includes(currentValue);
      });
      const filteredNewDescription = newDescription.filter(function (ele, pos) {
        return newDescription.indexOf(ele) == pos;
      });
      const newIngredient = recipes.filter((recipe) => {
        return recipe.ingredients.some(
          (ingredient) => ingredient.ingredient.startsWith(currentValue)
        );
      
      });
      const filteredNewIngredient = newIngredient.filter(function (ele, pos) {
        return newIngredient.indexOf(ele) == pos;
      });
      if (filteredNewName.length > 0) {
        displayData(filteredNewName);
      } else if (filteredNewDescription.length > 0) {
        displayData(filteredNewDescription);
      } else if (filteredNewIngredient.length > 0) {
        displayData(filteredNewIngredient);
      }
    }
newAppliance()
  }
});


async function resultCombined() {

  for (let i = 0; i < childTagContainer.length; i++) {
    const child = childTagContainer[i];
    const objectValue = {
      id: child.id,
      value: child.children[0].innerHTML,
    };
    spanValueId.push(objectValue);
  }

  if (spanValueId.length > 1) {
    spanValueId.shift()
  }
  console.log(spanValueId)
  async function pushIngredient() {
    const { recipes } = await getRecipes();
    const dishesSection = document.querySelector(".dishes_section");
    const dishesLength = dishesSection.children.length;
    for (let i = 0; i < dishesLength; i++) {
      const element = dishesSection.firstChild;
      element.remove();
    }
    let itemRecipes = [];
    const arrayRecipes = [];

    recipes.forEach((recipe) => {
      spanValueId.forEach((object) => {
        if (object.id === "1") {
          recipe.ingredients.forEach((element) => {
            itemRecipes.push(element.ingredient);
          });
          if (itemRecipes.includes(object.value)) {
            ++countId1;
          }
        }
        if (object.id === "2") {
          if (recipe.appliance.includes(object.value)) {
            ++countId2;
          }
        }
        if (object.id === "3") {
          if (recipe.ustensils.includes(object.value)) {
            ++countId3;
          }
        }
        console.log(countId1 + countId2 + countId3)
        if (countId1 + countId2 + countId3 === spanValueId.length) {
          
          arrayRecipes.push(recipe);
        }
      });
      countId1 = 0;
      countId2 = 0;
      countId3 = 0;
      itemRecipes = [];
    })


    if (document.querySelector(".all_ingredients")) {
      var allIngredients = document.querySelector(".all_ingredients");
      var childIngredientLength = allIngredients.children.length;
      displayIngredient();
    }

    if (document.querySelector(".all_appliances")) {
      var allAppliance = document.querySelector(".all_appliances");
      var childApplianceLength = allAppliance.children.length;
      displayAppliance();
    }

    if (document.querySelector(".all_ustensiles")) {
      var allUstensile = document.querySelector(".all_ustensiles");
      var childUstensileLength = allUstensile.children.length;
      displayUstenstile();
    }

    function displayIngredient() {
    ingredientRecipes = []
      for (let i = 0; i < childIngredientLength; i++) {
        console.log(childIngredientLength)
        const element = allIngredients.firstChild;
        element.remove();
      }
      arrayRecipes.forEach((element) => {
        element.ingredients.forEach((ingredient) => {
          ingredientRecipes.push(ingredient);
        });
      });
      ingredientRecipes.forEach((item) => {
        const Span = document.createElement("span");
        Span.innerText = item.ingredient;
        spanIngredientRecipes.push(Span);
        allIngredients.appendChild(Span);
      });

      console.log(ingredientRecipes)

      spanIngredientRecipes.forEach((item) => {
        item.addEventListener("mouseup", () => {
          const searchBar = document.querySelector(".search_bar_container");
          const newFilter = document.createElement("div");
          newFilter.setAttribute("class", "item_ingredients");
          newFilter.setAttribute("id", 1);
          const spanFilter = document.createElement("span");
          spanFilter.innerText = item.innerHTML;
          const iconFilter = document.createElement("icon");
          iconFilter.setAttribute("class", "fa-regular fa-circle-xmark");
          newFilter.appendChild(spanFilter);
          newFilter.appendChild(iconFilter);
          const queryTagContainer = document.querySelector(".tag_container");
          if (!queryTagContainer) {
            const tagIngredientContainer = document.createElement("div");
            tagIngredientContainer.setAttribute("class", "tag_container");
            tagIngredientContainer.appendChild(newFilter);
            searchBar.appendChild(tagIngredientContainer);
            async function newInit() {
              const { recipes } = await getRecipes();
              const dishesSection = document.querySelector(".dishes_section");
              const dishesLength = dishesSection.children.length;
              for (let i = 0; i < dishesLength; i++) {
                const element = dishesSection.firstChild;
                element.remove();
              }
              const newRecipes = recipes.filter((recipe) => {
                return recipe.ingredients.some(
                  (ingredient) => ingredient.ingredient === item.innerHTML
                );
              });

              const filteredNewRecipes = newRecipes.filter(function (ele, pos) {
                return newRecipes.indexOf(ele) == pos;
              });
              displayData(filteredNewRecipes);
            }
            newInit();
          } else {
              queryTagContain = document.querySelector(".tag_container");
              childTagContainer = queryTagContainer.children;
              queryTagContain.appendChild(newFilter);
              resultCombined()
          }
        });
      });
    
      
const dishesSection = document.querySelector(".dishes_section");
const dishesLength = dishesSection.children.length;
      for (let i = 0; i < dishesLength; i++) {
        const element = dishesSection.firstChild;
        element.remove();
      }
      console.log(arrayRecipes)
      displayData(arrayRecipes);
    }

    function displayAppliance() {
      for (let i = 0; i < childApplianceLength; i++) {
        const element = allAppliance.firstChild;
        element.remove();
      }

      arrayRecipes.forEach((item) => {
        spanAppliance.push(item.appliance);
      });
      const filteredSpanAppliance = spanAppliance.filter(function (ele, pos) {
        return spanAppliance.indexOf(ele) == pos;
      });

      filteredSpanAppliance.forEach(appliance => {
        const Span = document.createElement("span");
        Span.innerText = appliance;
        spanApplianceRecipes.push(Span)
        allAppliance.appendChild(Span);
      });
      console.log(spanApplianceRecipes)
      spanApplianceRecipes.forEach((item) => {
        item.addEventListener("click", () => {
          const searchBar = document.querySelector(".search_bar_container");
          const newFilter = document.createElement("div");
          newFilter.setAttribute("class", "item_ingredients");
          newFilter.setAttribute("id", 2);
          const spanFilter = document.createElement("span");
          spanFilter.innerText = item.innerHTML;
          const iconFilter = document.createElement("icon");
          iconFilter.setAttribute("class", "fa-regular fa-circle-xmark");
          newFilter.appendChild(spanFilter);
          newFilter.appendChild(iconFilter);
          const queryTagContainer = document.querySelector(".tag_container");
          if (!queryTagContainer) {
            const tagIngredientContainer = document.createElement("div");
            tagIngredientContainer.setAttribute("class", "tag_container");
            tagIngredientContainer.appendChild(newFilter);
            searchBar.appendChild(tagIngredientContainer);
            newAppliance();
          } else {
            queryTagContain = document.querySelector(".tag_container");
            childTagContainer = queryTagContain.children;
            queryTagContain.appendChild(newFilter);
            resultCombined();
          }
        });
      });
    
      const dishesSection = document.querySelector(".dishes_section");
      const dishesLength = dishesSection.children.length;
      for (let i = 0; i < dishesLength; i++) {
        const element = dishesSection.firstChild;
        element.remove();
      }
      displayData(arrayRecipes);
    }    

    async function newAppliance() {
      const dishesSection = document.querySelector(".dishes_section");
      const dishesLength = dishesSection.children.length;
      for (let i = 0; i < dishesLength; i++) {
        const element = dishesSection.firstChild;
        element.remove();
      }
     
      displayData(arrayRecipes);
    }

    function displayUstenstile() {
      for (let i = 0; i < childUstensileLength; i++) {
        const element = allUstensile.firstChild;
        element.remove();
      }

      arrayRecipes.forEach((item) => {
        item.ustensils.forEach((ustensil) => {
          const Span = document.createElement("span");
          Span.innerText = ustensil;
          spanUstensileRecipes.push(Span);
          allUstensile.appendChild(Span);
        });
      });

     spanUstensileRecipes.forEach((item) => {
        item.addEventListener("click", () => {
          const searchBar = document.querySelector(".search_bar_container");
          const newFilter = document.createElement("div");
          newFilter.setAttribute("class", "item_ingredients");
          newFilter.setAttribute("id", 3);
          const spanFilter = document.createElement("span");
          spanFilter.innerText = item.innerHTML;
          const iconFilter = document.createElement("icon");
          iconFilter.setAttribute("class", "fa-regular fa-circle-xmark");
          newFilter.appendChild(spanFilter);
          newFilter.appendChild(iconFilter);
          const queryTagContainer = document.querySelector(".tag_container");
          if (!queryTagContainer) {
            const tagIngredientContainer = document.createElement("div");
            tagIngredientContainer.setAttribute("class", "tag_container");
            tagIngredientContainer.appendChild(newFilter);
            searchBar.appendChild(tagIngredientContainer);

          
            newUstensiles();
            async function newUstensiles() {
              const { recipes } = await getRecipes();
              const dishesSection = document.querySelector(".dishes_section");
              const dishesLength = dishesSection.children.length;
              for (let i = 0; i < dishesLength; i++) {
                const element = dishesSection.firstChild;
                element.remove();
              }
            
              const newRecipes = recipes.filter((recipe) => {
                return recipe.ustensils.includes(item.innerHTML);
              });
              const filteredNewRecipes = newRecipes.filter(function (ele, pos) {
                return newRecipes.indexOf(ele) == pos;
              });
            
              displayData(filteredNewRecipes);
            }
          } else {
            queryTagContain = document.querySelector(".tag_container");
            childTagContainer = queryTagContainer.children;
            queryTagContain.appendChild(newFilter);
            resultCombined();
          }
        })
      
    })
    const dishesSection = document.querySelector(".dishes_section");
    const dishesLength = dishesSection.children.length;
    for (let i = 0; i < dishesLength; i++) {
      const element = dishesSection.firstChild;
      element.remove();
    }
        displayData(arrayRecipes);    
  }
  
}
  pushIngredient();
}


