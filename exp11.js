const fs = require('fs');

// Define the file path
const filePath = 'myFile.txt';

// Read the file contents
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Append the new line to the file contents
  const newLine = '\nI shall give respect to my parents, teachers and elders and treat everyone with courtesy.';
  const updatedContent = data + newLine;

  // Write the updated contents back to the file
  fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('File updated successfully!');
  });
});
