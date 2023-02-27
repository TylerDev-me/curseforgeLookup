const { Curseforge } = require("node-curseforge");
const fs = require("fs");
const { curseforgeApiKey } = require("./config.json");
let { filePath } = require("./config.json");

let cf = new Curseforge(curseforgeApiKey);

let mods = [];

let manifest = require(filePath);
let projectIds = manifest.files.map((file) => file.projectID);

// get the latest file for each project id
let promises = projectIds.map((id) => cf.get_mod(id));
Promise.all(promises).then((results) => {
  results.forEach((result) => {
    result.categories = result.categories.map((category) => category.name);
    result.name = result.name.replace(/,/g, " ");

    // for each mod, store the id and category names in a new object and push it to an array
    let mod = {
      id: result.name,
      categories: result.categories,
    };
    mods.push(mod);
  });

  // write the array to a json file
  let fs = require("fs");
  fs.writeFile("mods.json", JSON.stringify(mods), function (err) {
    if (err) return console.log(err);
    console.log("mods.json was created");
  });

  // using the json file, create a new json file that includes the mod name and the list of categories with values being true or false
  let mods2 = [];
  let categories = [];
  mods.forEach((mod) => {
    let mod2 = {
      id: mod.id,
    };
    mod.categories.forEach((category) => {
      if (!categories.includes(category)) {
        categories.push(category);
      }
      mod2[category] = true;
      mods2.forEach((mod) => {
        if (!mod[category]) {
          mod[category] = false;
        }
      });
    });
    mods2.push(mod2);
  });

  fs.writeFile("mods2.json", JSON.stringify(mods2), function (err) {
    if (err) return console.log(err);
    console.log("mods2.json was created");
  });

  // using the mods2.json file, create a csv file that includes the mod name and the list of categories with values being true or false
  let csv = "id," + categories.join(",") + "\n";
  mods2.forEach((mod) => {
    csv += mod.id + ",";
    categories.forEach((category) => {
      csv += mod[category] + ",";
    });
    csv += "\n";
  });

  fs.writeFile("mods.csv", csv, function (err) {
    if (err) return console.log(err);
    console.log("mods.csv was created");
  });
});

// wait for 2 seconds before deleting the json files so that they can be used
setTimeout(() => {
  fs.unlink("mods.json", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  fs.unlink("mods2.json", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}, 2000);
