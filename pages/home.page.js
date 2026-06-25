class HomePage {
  constructor(page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "QA Cucumber Interview" });
  }

  async open() {
    await this.page.setContent(`
      <!doctype html>
      <html lang="en">
        <head>
          <title>QA Cucumber Interview</title>
        </head>
        <body>
          <main>
            <h1>QA Cucumber Interview</h1>
            <p>Cucumber-first automation foundation is ready.</p>
          </main>
        </body>
      </html>
    `);
  }
}

module.exports = { HomePage };
