const Hint = require('../models/hint.model');
const accessSpreadsheet = require('../utils/sheets');

const sheetNames = ['Aquacean', 'Seraphina', 'Citrinziar', 'Topaz', 'Rubiana', 'Jadeliny'];

async function addAllHintToDB(req, res) {
  try {
    for (const houseName of sheetNames) {
      console.log(`Processing house: ${houseName}`);

      const response = await accessSpreadsheet(houseName, 'A1', 'B100');

      const rows = response.data.values || [];
      if (rows.length === 0) {
        console.log(`No data found for ${houseName}`);
        continue;
      }

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const code = row[0] && row[0].trim();
        const hint = row[1] && row[1].trim();

        if (!code || code.includes(houseName)) {
          continue;
        }

        const existingHint = await Hint.findOne({ code });

        if (existingHint) {
          if (!existingHint.hint_2) {
            existingHint.hint_2 = hint;
          } else if (!existingHint.hint_3) {
            existingHint.hint_3 = hint;
          } else if (!existingHint.hint_4) {
            existingHint.hint_4 = hint;
          } else {
            continue;
          }

          await existingHint.save().then(() => res.json(data));;
        } else {
          const newHint = new Hint({
            code,
            house_name: houseName,
            hint_1: hint
          });

          await newHint.save();
        }
      }
    }
    console.log('All hints have been successfully added to the database.');
    res.json({ message: "add success" });
  } catch (error) {
    console.error(`Error adding hints to the database: ${error.message}`);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
}

module.exports = { addAllHintToDB };
