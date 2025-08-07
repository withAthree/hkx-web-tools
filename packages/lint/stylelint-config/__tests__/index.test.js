const path = require("path");
const stylelint = require("stylelint")
const config = require("../index.js")

test('validate default', async () => {
  const filePath = path.join(__dirname, "./fixture/index.css")

  const result = await stylelint.lint({
    files: [filePath],
    config,
    fix: true,
  })
  
  if (result) {
    const reports = JSON.parse(result.report || '[]')
    const warnings = reports[0].warnings
    expect(warnings.length).not.toBe(0)
  } else {
    throw new Error('stylelint lint failed')
  }
})