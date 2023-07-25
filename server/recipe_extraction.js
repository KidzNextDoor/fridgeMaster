const query = require('./db_sql.js');
const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, '../data.json'));

const dataStr = JSON.parse(data.toString());

// console.log(data.toString());

async function insert() {
  for await (const recipe of dataStr.results) {
    // console.log(recipe)
    // build the instructions string
    let string = '';
    for (const step of recipe.instructions) {
      string += `${step['position']} ${step['display_text']}\n`;
    }
    // insert into recipes
    let sql = `INSERT INTO recipes (name, type, instructions, description) VALUES ($1, $2, $3, $4) RETURNING recipeid;`;
    console.log(sql);
    const result = await query(sql, [
      recipe.name,
      recipe.keywords,
      string,
      recipe.description,
    ]);
    console.log(result);
    const recipeID = result.rows[0].recipeid;
    // iterate through the ingredients
    for await (let el of recipe.sections[0].components) {
      let sql = `INSERT INTO ingredients (recipeID, name, quantity) VALUES ($1, $2, $3);`;
      await query(sql, [
        recipeID,
        el.ingredient.name,
        `${el.measurements[0].quantity} ${el.measurements[0].unit.name}`,
      ]);
      console.log('ran insert ingredient statement');
    }

    console.log('ran insert recipe statement');
  }
}

insert();
