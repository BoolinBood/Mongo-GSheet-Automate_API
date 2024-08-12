const Hint = require('../models/hint.model'); // Adjust the path as necessary
const accessSpreadsheet = require('../utils/sheets'); // Adjust the path to your accessSpreadsheet function

const sheetNames = ['Aquacean', 'Seraphina', 'Citrinziar', 'Topaz', 'Rubiana', 'Jadeliny'];

async function addAllHintToDB() {
  try {
    for (const houseName of sheetNames) {
      console.log(`Processing house: ${houseName}`);

      // Access the spreadsheet for this houseName
      const response = await accessSpreadsheet(houseName, 'A1', 'B100'); // Adjust the range as necessary

      // Check if response and data are valid
      const rows = response.data.values || [];
      if (rows.length === 0) {
        console.log(`No data found for ${houseName}`);
        continue;
      }

      // Process the rows
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row && row[0]) { // Ensure row and row[0] are defined
          const [code, hint1, hint2, hint3, hint4] = row;
          
          // Create or update hint document
          await Hint.updateOne(
            { code },
            { code, house_name: houseName, hint_1: hint1, hint_2: hint2, hint_3: hint3, hint_4: hint4 },
            { upsert: true } // Insert if not found
          );
        } else {
          console.log(`Row ${i} is invalid or missing data.`);
        }
      }
    }
    console.log('All hints have been successfully added to the database.');
  } catch (error) {
    console.error(`Error adding hints to the database: ${error.message}`);
  }
}

module.exports = { addAllHintToDB };