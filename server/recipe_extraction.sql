INSERT INTO ingredients (recipeID, name, quantity) VALUES (recipeID, recipe.sections[0].components[i].ingredient.name, recipe.sections[0].component[i].measurements.quantity + ' ' + recipe.sections[0].component[i].measurements.unit.name);


for (let el of components) {
    let sql = `INSERT INTO ingredients (recipeID, name, quantity) VALUES (${recipeID}, '${el.ingredient.name}', '${el.measurements.quantity} ${el.measurements.unit.name})';`;
}


model.query(sql)

INSERT INTO recipes (name, type, instructions, description) VALUES (....)

for await (const recipe of results) {
    // build the instructions string
    let string = ''
    for (const step of instructions) {
        string += `${step['position']} ${step['display text']}\n`
    }
    // insert into recipes
    let sql = `INSERT INTO recipes (name, type, instructions, description) VALUES ('${recipe.name}', '${recipe.keywords}', '${string}', '${recipe.description}') RETURNING recipeid;`;
    const result = await model.query(sql)
    const recipeID = result.rows[0].recipeid
    // iterate through the ingredients
    for await (let el of recipe.sections[0].components) {
        let sql = `INSERT INTO ingredients (recipeID, name, quantity) VALUES (${recipeID}, '${el.ingredient.name}', '${el.measurements.quantity} ${el.measurements.unit.name})';`;
        await model.query(sql)
    }
}