# Frontend Mentor - In-browser markdown editor solution

This is a solution to the [In-browser markdown editor challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9).

Users should be able to:

- Create, Read, Update, and Delete markdown documents
- Name and save documents to be accessed as needed
- Edit the markdown of a document and see the formatted preview of the content
- View a full-page preview of the formatted content
- View the optimal layout for the app depending on their device's screen size
- All user data is saved on localStorage - purely frontend solution

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

This project was a great way to incorporate the React Context API. The current file state had to be in 2 different components, one in the navbar component (edit title name) and one in the editor component (main content). I decided to create a context for the markdown data which consisted of 2 states (All files and currentFile). To update the current file title and content without creating too many states, I decided to use the below method:

```js
const updateMarkdownFile = (event) => {
  const { name, value } = event.currentTarget;
  setCurrentFile({ ...currentFile, [name]: value });
};
```

Whenever the user types and changes either the title name or content (onChange), the current file will be updated with those changes. Once the user is ready to save, those changes will be implemented and saved into storage for the user.

