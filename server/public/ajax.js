$("#FDASubmit").on("submit", getFDAData)

function getFDAData(event){
  event.preventDefault();
  let cityText = $(".cityText").val()
  $.ajax({
    dataType: "json",
    url: `https://api.fda.gov/food/enforcement.json?search=city:"${cityText}"`,
    method: "GET",
    success: function (response) {
      console.log("FULL RESPONSE: ", response);

      let FDAWarning = response.meta.disclaimer;
      console.log("WARNING: ", FDAWarning)
      let FDACity = response.results[0].city;
      console.log("City: ", FDACity);
      let FDAReason = response.results[0].reason_for_recall;
      console.log("Reason: ", FDAReason);
      let FDADescription = response.results[0].product_description;
      console.log("Product: ", FDADescription);
      let FDAQuantity = response.results[0].product_quantity;
      console.log("Quantity: ", FDAQuantity);
      let FDADistribution = response.results[0].distribution_pattern;
      console.log(FDADistribution);
    },
    error: function(response){
      console.log("error: ", response)
    }
  })

}
