module.exports = function getDate() {
  
  let today = new Date();

    let dateObject = {
      weekday: "long",
      day: "numeric",
      month: "long"
    };

  return today.toLocaleDateString("en-us", dateObject);
}

