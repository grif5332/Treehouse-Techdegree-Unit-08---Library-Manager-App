# Treehouse-Techdegree-Unit-08---Library-Manager-App
Status: Should meet the "Exceeds" grade.

Use 'npm start' to initiate nodemon in the command line

### Project:
This project uses the following:
1) Express
2) Sequelize
3) Sequelize CLI
4) Pug
5) SQLite3
6) animate.css (not currently used; for future animation implementation.)

### About the Project:
This project is a Library Manager.  Initially, the page loads a paginated list of books using the whole collection.  The pagination is set to 10 books per page.  This can be changed in the books.js route (the variable being named pagesPerPage).  Later, a possible update to the limiting of books per page could be done with limit and offset.  Searching sort through ALL the column of the library.db.  The search is case insesitive and will also search partial strings.  i.e a search for 'arr' will return results with carrie and harry.  A empty search will return ALL the books on one page.  The new book and update book section has validation letting you know when the user leaves a required field empty.  I also added some astricks and text letting the user know what fields are required.

### The Non-Treehouse Additions:
1) Red box and text error validation
2) Astricks and italisized text on form
3) A fixed header with colored background.  Added a new, complementary color to the site color palette. (for possible menu implementation)
4) "back to home" links with conditional visibility. When you are on the home page, it disappears.
5) Search bar and button
6) Added many more books to the library.  For testing purposes.
