# Zero to Full-Stack: Personal Portfolio & Blog
## A 6-Week Bootcamp Curriculum for Absolute Beginners

---

## Before You Begin: Read This Carefully

### Honest Assessment of Difficulty

This is a genuinely hard project for beginners. You are asking people with no coding experience to build something that professional developers — with years of experience — would consider a non-trivial application. It includes a database, a login system, an admin dashboard, email sending, and cloud deployment.

**This is achievable, but only under these conditions:**

- **Format:** Full-time, immersive. 6–8 hours per day, 5 days per week. This curriculum is not designed for 2 hours on weekends. At that pace, the project would take 6+ months.
- **Group size:** Maximum 15 students per instructor. Beginners generate errors constantly and need immediate help.
- **Instructor:** Must be a working developer who can debug on the spot without AI assistance. Students will produce errors the instructor has never seen before.
- **No AI rule:** This is the right call. Students who use AI to generate code they don't understand will be completely helpless the moment something breaks — which is constant. However, the no-AI rule requires excellent human support structures (see below).

### The No-AI Learning Contract

Post this on the wall on day one. Every student agrees to it:

> 1. I will type every line of code myself. I will not copy-paste from anywhere.
> 2. Before asking for help, I will read the error message out loud, read the relevant documentation, and try to fix it for 10 minutes.
> 3. When I ask for help, I will explain what I think is happening, not just say "it's broken."
> 4. I will not use any AI tool to generate, complete, or explain code. The discomfort of not understanding is the learning.

### Support Structures to Replace AI

- **Pair programming** every day. Partners rotate weekly so everyone works with everyone.
- **Rubber duck basket** — a literal rubber duck on each desk. Students explain their problem to the duck before asking a human.
- **Error log** — each student keeps a physical notebook of every error they hit and how they fixed it. This becomes their most valuable reference.
- **Documentation wall** — print and post the URLs students will use most: MDN Web Docs, Next.js docs, Prisma docs, Tailwind docs.
- **15-minute rule** — stuck for 15 minutes? Ask your partner. Stuck together for 15 more? Ask the instructor.
- **No shame policy** — the instructor breaks things on purpose in front of the class every day to normalize errors.

### Accounts to Create on Day 1 (Before Any Code)

Have students create these in the first 90 minutes. Walk through each one together:

| Service | Why We Need It | Free Plan Sufficient? |
|---|---|---|
| GitHub | Stores and backs up all code | Yes |
| Vercel | Publishes the website to the internet | Yes |
| Neon | Our database, hosted in the cloud | Yes |
| Resend | Sends email from the contact form | Yes (100 emails/day) |
| Upstash | Protects the login from brute force | Yes |

---

## Week 1: How Computers Talk to Each Other

**Goal by end of week:** Students understand what the web is, can use the terminal, can write basic HTML and CSS, and have their first webpage on GitHub.

**The central question this week answers:** *When you type a website address and press Enter, what actually happens?*

---

### Day 1 — The Web Is Just Files and Requests

**Morning (3 hours): Mental models before any code**

Start with a physical demonstration, not a computer. Use a restaurant analogy:
- The **browser** is a customer who places an order
- The **internet** is the waiter who carries the order
- The **server** is the kitchen that prepares and sends back food
- The **response** is the plate that comes back

Draw this on a whiteboard. Walk through what happens when you type `google.com`:
1. Your browser asks a DNS server "what is the address of google.com?"
2. DNS responds with an IP address (a real numerical address, like a street address)
3. Your browser connects to that IP address and says "please give me the homepage"
4. Google's servers respond with HTML, CSS, and JavaScript files
5. Your browser reads those files and draws the page on your screen

Ask students: "Where do those files live?" — On a computer somewhere. Someone wrote them. That is what we are going to learn to do.

**Setup (2 hours):**

Install everything together, one item at a time. Wait for everyone to catch up before the next step.

1. **VS Code** — download, install, open. Tour the interface: file explorer on the left, editor in the middle, terminal at the bottom.
2. **Node.js** — download v20 LTS from nodejs.org, install, verify:
   ```
   node --version
   ```
   If a version number appears: success. If an error appears: debugging together as a class. This is the first lesson in reading error messages.
3. **Git** — download from git-scm.com, install.

**Afternoon (2 hours): Your first file**

Open VS Code. Create a new folder called `my-website`. Open that folder in VS Code.

Create a file called `index.html`. Type this — do not copy, type it:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Website</title>
  </head>
  <body>
    <h1>Hello, World</h1>
    <p>My name is ____.</p>
  </body>
</html>
```

Open it in a browser by right-clicking and choosing "Open with Live Server" (install the VS Code extension first). Show them their words appear in the browser.

**Instructor note:** Spend time on what each tag does. Ask: "What happens if I delete the closing tag? Let's try." Break things on purpose. The lesson is that the computer is not mysterious — it does exactly what the file says.

**Homework:** Read MDN's "How the Web Works" article. Write 3 questions in their notebook.

---

### Day 2 — HTML: The Skeleton

**Goal:** Students can build any page's structure in HTML.

**Morning: HTML elements**

Teach these elements by building a simple personal page:
- Headings: `h1` through `h6`
- Paragraph: `p`
- Links: `a href="..."` — difference between absolute URLs and relative paths
- Images: `img src="..." alt="..."` — why `alt` matters (accessibility, screen readers)
- Lists: `ul`, `ol`, `li`
- Divs: containers with no visual meaning — "a box that holds other boxes"
- Semantic elements: `header`, `nav`, `main`, `section`, `footer`, `article` — same as divs but with meaning for search engines and screen readers

**Critical exercise — inspect element:**

Open Chrome DevTools (F12). Show students that every website's HTML is readable. Go to a website students recognize and show them the structure. The message: "This is just what we're learning to write."

**Afternoon: Build the page structure**

Students build the HTML skeleton of their personal site. No styling yet — just structure. By end of day each student has:
- A header with their name and navigation links
- An "About" section with a paragraph
- A "Projects" section (empty for now)
- A "Contact" section
- A footer with copyright

**Checkpoint:** Every student can explain what every tag in their file does.

---

### Day 3 — CSS: The Skin

**Goal:** Students understand how CSS rules work and can style a page.

**Morning: How CSS works**

The mental model: HTML is the skeleton, CSS is the skin and clothes. CSS rules follow this pattern:
```
who gets styled {
  what changes: to what value;
}
```

Teach:
- Selectors: element (`h1`), class (`.title`), ID (`#header`)
- The difference between class and ID (class can be used many times, ID is unique per page)
- The box model — every element is a rectangle with content, padding, border, and margin. Draw this on the whiteboard. It is the #1 thing that confuses beginners. Spend 30 minutes on it.
- `display` — block (takes full width, stacks vertically) vs inline (flows with text) vs flex (children line up side by side)
- Flexbox — the tool they will use constantly. Teach `display: flex`, `justify-content`, `align-items`, `gap`.
- Colors: named colors, hex codes, `rgb()`
- Fonts: `font-size`, `font-weight`, `font-family`

**Create a CSS file:**
```css
/* style.css */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f5f5f5;
  color: #333;
}

h1 {
  font-size: 2rem;
  color: #1a1a1a;
}
```

Link it to HTML:
```html
<link rel="stylesheet" href="style.css">
```

**Afternoon: Style their personal page**

Students style the page they built yesterday. Give them freedom but require they use:
- At least 3 different selectors
- Flexbox for the navigation
- The box model (padding and margin intentionally set)

**Instructor note:** Resist the urge to make things pretty for them. Let the pages be ugly. The goal is understanding the mechanism, not the outcome.

---

### Day 4 — The Terminal and Git

**Goal:** Students are comfortable in the terminal and can save their work to GitHub.

**Morning: The terminal**

The terminal is just a way to give the computer instructions by typing instead of clicking. Everything you can do by clicking, you can do by typing — and much more.

Teach these commands. Students type each one and observe the result:
```bash
pwd           # Where am I? (print working directory)
ls            # What's in this folder? (list)
cd Documents  # Go into the Documents folder (change directory)
cd ..         # Go up one level
mkdir hello   # Make a new folder called hello
touch file.txt  # Make a new empty file
cat file.txt  # Print a file's contents to the screen
```

**Instructor demonstration:** Open a Finder/Explorer window and a terminal side by side. Show that `cd Documents` and clicking on Documents are the same thing. Watch the terminal update when you create a file in the GUI.

**Common beginner panic:** The terminal looks broken when it's waiting for input. Teach `Ctrl+C` to cancel any stuck command. Practice it. Students are afraid of the terminal; normalize it.

**Afternoon: Git**

Git is a time machine for your code. Every time you commit, you save a snapshot. You can always go back.

Mental model: Git is like tracked changes in Google Docs, but for any file, and you control when to save a snapshot.

```bash
git init                          # Start tracking this folder
git status                        # What has changed?
git add index.html style.css      # Stage these files for saving
git commit -m "Add homepage"      # Save the snapshot with a description
```

**Push to GitHub:**
1. Go to github.com -> New Repository -> name it `my-website`
2. Copy the commands GitHub shows for "existing repository"
3. Run them:
   ```bash
   git remote add origin https://github.com/YOUR_NAME/my-website.git
   git branch -M main
   git push -u origin main
   ```

Show GitHub. Their code is on the internet. That is a real accomplishment.

**The git workflow mantra:** Students will repeat this aloud every time they commit: "Save, stage, snapshot." (`Ctrl+S`, `git add`, `git commit`)

---

### Day 5 — Review, Catch Up, and Week 1 Project

**Morning: Instructor-led review**

Go back through the week's concepts. Ask students to explain things to each other, not the instructor. Common stumbling blocks to address:
- The box model (draw it again)
- Relative vs absolute file paths
- `git add` vs `git commit` — students often commit without staging
- The difference between HTML structure and CSS style

**Afternoon: Week 1 project**

Each student builds a static, fully styled "About Me" page with:
- Their name and a short bio
- A list of 3 interests
- A simple navigation bar using flexbox
- Styled with CSS they wrote themselves
- Committed and pushed to GitHub

**Deliverable check:** Instructor reviews every student's GitHub repo. Cannot proceed to Week 2 until this is complete and understandable to the student.

---

## Week 2: JavaScript — Making Pages Think

**Goal by end of week:** Students can write JavaScript that reads and changes what is on the page, and handles user actions.

**The central question this week answers:** *How does a webpage respond to what a user does?*

---

### Day 6 — Variables, Values, and the Console

**Morning: What is a program?**

A program is a list of instructions the computer follows in order, top to bottom. A variable is a labeled box that holds a value.

```javascript
let name = "Sarah";
let age = 34;
let isLoggedIn = false;
```

Open the browser console (F12 -> Console tab). This is a live JavaScript environment.

Type each of these and press Enter:
```javascript
1 + 1
"hello" + " " + "world"
let x = 10
x * 3
typeof "hello"
typeof 42
typeof true
```

The console shows the result immediately. This is the fastest feedback loop in programming.

**Types:** Everything in JavaScript has a type.
- `string` — text in quotes: `"hello"`
- `number` — any number: `42`, `3.14`, `-7`
- `boolean` — only two values: `true` or `false`
- `null` — nothing, intentionally empty
- `undefined` — nothing, unintentionally empty (not yet given a value)
- `array` — a list: `["apple", "banana", "orange"]`
- `object` — a labeled collection: `{ name: "Sarah", age: 34 }`

**Afternoon: Functions**

A function is a named set of instructions you can run later, as many times as you want.

```javascript
function greet(name) {
  return "Hello, " + name + "!";
}

greet("Maria");    // "Hello, Maria!"
greet("James");    // "Hello, James!"
```

Teach: `function`, `parameters` (the inputs), `return` (the output), calling vs defining.

Have students write 5 functions:
1. One that takes a name and returns a greeting
2. One that takes two numbers and returns their sum
3. One that takes a name and age and returns a sentence about that person
4. One that takes a number and returns whether it is greater than 10
5. One that takes an array and returns how many items are in it (`.length`)

**Checkpoint:** Every student can write a function from scratch without looking at notes.

---

### Day 7 — Making Decisions and Repeating Things

**Morning: Conditionals**

```javascript
let temperature = 28;

if (temperature > 30) {
  console.log("It's hot outside.");
} else if (temperature > 20) {
  console.log("It's nice outside.");
} else {
  console.log("It's cold outside.");
}
```

Comparison operators: `===` (equal), `!==` (not equal), `>`, `<`, `>=`, `<=`

Logical operators: `&&` (and), `||` (or), `!` (not)

**Common beginner mistake:** Using `=` instead of `===` in a condition. Demonstrate what goes wrong and why — `=` assigns, `===` compares.

**Afternoon: Loops and Arrays**

```javascript
let fruits = ["apple", "banana", "orange", "mango"];

// Loop through every item
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Cleaner syntax for the same thing
fruits.forEach(function(fruit) {
  console.log(fruit);
});
```

Teach array methods that will be used constantly in this project:
- `.length` — how many items
- `.push(item)` — add to the end
- `.filter(fn)` — keep only items where the function returns true
- `.map(fn)` — transform every item, return a new array
- `.find(fn)` — get the first item where the function returns true

Practice exercises: given an array of numbers, use `.filter` to keep only the ones greater than 10. Use `.map` to double every number.

---

### Day 8 — Objects and the DOM

**Morning: Objects**

An object holds multiple related values, each with a name (called a key):

```javascript
let person = {
  name: "Maria",
  age: 34,
  city: "Tokyo",
  isStudent: true,
};

console.log(person.name);    // "Maria"
console.log(person["age"]);  // 34

// Add a property
person.email = "maria@example.com";

// Objects in arrays (the most common pattern in web dev)
let people = [
  { name: "Maria", age: 34 },
  { name: "James", age: 28 },
  { name: "Yuki", age: 41 },
];

people.forEach(function(person) {
  console.log(person.name + " is " + person.age + " years old.");
});
```

**Afternoon: The DOM**

The DOM (Document Object Model) is the browser's representation of your HTML as a JavaScript object tree. When you write `document.querySelector("h1")`, you get a reference to the actual `h1` element on the page, and you can change it with JavaScript.

```javascript
// Select an element
let heading = document.querySelector("h1");

// Read its content
console.log(heading.textContent);

// Change its content
heading.textContent = "New Heading!";

// Change its style
heading.style.color = "red";

// Listen for a click
heading.addEventListener("click", function() {
  alert("You clicked the heading!");
});
```

**Exercise:** Students add a button to their Week 1 page. Clicking the button changes the background color of the page. This requires: selecting the button, adding an event listener, and changing `document.body.style.backgroundColor`.

---

### Day 9 — Async JavaScript and Fetch

**Goal:** Understand why JavaScript has special tools for waiting, and use them to get data from the internet.

**Morning: The problem with waiting**

JavaScript runs one instruction at a time. If one instruction takes 5 seconds (like downloading a file from the internet), everything else is frozen — the whole page stops responding. Async tools prevent this.

Analogy: you don't stand at the coffee shop counter staring until your coffee is ready. You give your name, sit down, and they call you when it's ready. You're doing other things while you wait. `async/await` is exactly that.

```javascript
// This fetches data from a public API (a server that responds with JSON)
async function getWeather() {
  let response = await fetch("https://wttr.in/Tokyo?format=j1");
  let data = await response.json();
  console.log(data);
}

getWeather();
```

Teach: `fetch` makes an HTTP request (like a browser tab visiting a URL, but in code). The result is a `Response`. `.json()` reads the response body and parses it from JSON text into a JavaScript object. Both steps take time, so both need `await`.

**JSON** — JavaScript Object Notation. A text format for data that looks almost identical to a JavaScript object. This is how servers and browsers communicate.

**Afternoon: Error handling**

Every async operation can fail. Network is down. Server is overloaded. Wrong URL. Handle it:

```javascript
async function getWeather() {
  try {
    let response = await fetch("https://wttr.in/Tokyo?format=j1");

    if (!response.ok) {
      throw new Error("Server returned: " + response.status);
    }

    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Failed to get weather:", error.message);
  }
}
```

`try/catch` is a safety net. If anything inside `try` throws an error, execution jumps to `catch` instead of crashing.

**Exercise:** Use `fetch` to get data from a public API (instructor provides a simple one — `https://jsonplaceholder.typicode.com/posts` is free and always available). Display the first 3 post titles in the console.

---

### Day 10 — Review and Week 2 Project

**Morning: Code reading practice**

Take a piece of JavaScript students have not seen before and have them read it out loud, line by line, explaining what each line does. This is a critical skill — professionals read much more code than they write.

**Afternoon: Week 2 project**

Each student adds JavaScript to their personal page:
1. A button that toggles between light and dark background
2. A project list that is rendered by JavaScript from a JavaScript array of objects (not hardcoded HTML) — they write a function that takes the array and creates HTML elements

**Deliverable check:** Students explain their project list code out loud. Can they add a new project to the array and explain how it appears on the page?

---

## Week 3: React and Next.js — Building in Components

**Goal by end of week:** Students understand component-based thinking, can build a multi-page Next.js app, and have a running local version of the project homepage.

**The central question this week answers:** *How do modern web apps organize code that needs to change?*

---

### Day 11 — Why React Exists

**Morning: The problem React solves**

In plain JavaScript, updating the page when data changes is tedious:
```javascript
// Every time something changes, you have to manually:
// 1. Find the element
// 2. Update its content
// 3. Sometimes re-create entire sections of HTML
```

React's idea: describe what the page should look like given the current data. When the data changes, React figures out the minimum set of changes to make to the DOM. You just update the data.

**Components:** Everything is a function that returns HTML-like syntax (JSX). You compose big things out of small things.

```jsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

function Header({ username }) {
  return (
    <header>
      <h1>Welcome, {username}</h1>
      <Button label="Log Out" onClick={() => console.log("logged out")} />
    </header>
  );
}
```

Teach: JSX looks like HTML but is actually JavaScript. `{}` lets you put any JavaScript expression inside. Components start with capital letters. Props are how parent components pass data to children.

**Afternoon: useState**

React components track data using "state." When state changes, React automatically re-renders (redraws) the component.

```jsx
import { useState } from "react";

function Counter() {
  let [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

Exercise: students build a simple to-do list component with `useState`. Items are stored in a state array. A form adds new items. A button removes items.

---

### Day 12 — Next.js: React with Superpowers

**Morning: Create the project**

```bash
npx create-next-app@latest my-portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd my-portfolio
npm run dev
```

Open `http://localhost:3000`. The app is running.

Teach the App Router file system:
- Every `page.tsx` file in `src/app/` is a page
- The file path becomes the URL: `src/app/blog/page.tsx` -> `yourdomain.com/blog`
- `layout.tsx` wraps all pages in its directory
- `route.ts` files (no `page`) handle API requests

**TypeScript:** Introduce as "JavaScript with labels." The compiler tells you about mistakes before you even run the code.

```typescript
// Without TypeScript — no error until runtime
function greet(name) {
  return "Hello, " + name.toUpperCase();
}
greet(42);  // crashes: numbers don't have toUpperCase()

// With TypeScript — error immediately in VS Code
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}
greet(42);  // red underline: "number is not assignable to string"
```

**Afternoon: Tailwind CSS**

Tailwind replaces writing CSS files with utility classes directly in HTML/JSX:

```jsx
// Instead of writing a CSS file with:
// .container { max-width: 1024px; margin: 0 auto; padding: 0 24px; }

// Tailwind puts it directly on the element:
<div className="max-w-4xl mx-auto px-6">
```

Walk students through the naming conventions:
- `text-lg` = font-size large
- `font-bold` = font-weight: 700
- `p-4` = padding: 1rem (4 x 0.25rem)
- `mt-8` = margin-top: 2rem
- `flex`, `items-center`, `justify-between` = flexbox
- `bg-gray-100` = background-color: light gray
- `hover:bg-gray-200` = gray background on mouse hover
- `md:flex` = only use flex on medium+ screens (responsive)

Students spend the afternoon converting their Week 1/2 personal page into a Next.js component using Tailwind classes.

---

### Day 13 — Server Components and Data Flow

**Morning: Two kinds of components**

This is the most important and most confusing concept in the project. Spend the whole morning on it.

**Server Components** (default in Next.js App Router):
- Run only on the server
- Can read from databases, files, and APIs
- Their HTML is sent to the browser already built
- Cannot use `useState`, `useEffect`, or any browser API
- The user never sees this code

**Client Components** (add `'use client'` at the top):
- Run in the browser
- Can respond to user actions (`onClick`)
- Can use `useState`, `useEffect`
- Cannot directly access the database

Analogy: A server component is like a chef who cooks in the kitchen and sends out finished plates. A client component is like a waiter who interacts with the customer at the table. They have different jobs. The chef does the complex preparation; the waiter handles real-time interaction.

The rule: **use server components by default. Only add `'use client'` when you need interactivity.**

```typescript
// Server Component — no 'use client', runs on server
// src/app/page.tsx
export default async function HomePage() {
  // This runs on the server — can access files, databases, etc.
  let data = await getSomeData();
  return <ClientComponent data={data} />;
}

// Client Component — needs browser APIs
// src/components/ClientComponent.tsx
"use client";
import { useState } from "react";

export function ClientComponent({ data }) {
  let [count, setCount] = useState(0);
  return <div>{/* interactive stuff here */}</div>;
}
```

**Afternoon: Build the homepage**

Students build the homepage server component and pass data to a client component. Use a simple hardcoded data object first — no database yet:

```typescript
// src/app/page.tsx
const projects = [
  { id: 1, title: "My First Project", description: "A website I built." },
  { id: 2, title: "My Second Project", description: "A to-do app." },
];

export default function HomePage() {
  return <HomePageClient projects={projects} />;
}
```

---

### Day 14 — Dynamic Routes and Navigation

**Morning: Dynamic routes**

`[slug]` in a folder name means "this part of the URL is a variable."

```
src/app/portfolio/page.tsx          ->  /portfolio
src/app/portfolio/[slug]/page.tsx   ->  /portfolio/anything
```

```typescript
// src/app/portfolio/[slug]/page.tsx
export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  // params.slug is the URL segment
  // e.g., if URL is /portfolio/my-app, params.slug is "my-app"
  return <h1>Project: {params.slug}</h1>;
}
```

**Next.js Link component:**

```jsx
import Link from "next/link";

// Use Link instead of <a> for internal navigation
// Link does client-side navigation (no full page reload)
<Link href="/portfolio">See my work</Link>
<Link href={`/portfolio/${project.slug}`}>View project</Link>
```

**Afternoon: Build the portfolio page**

Students build:
- `src/app/portfolio/page.tsx` — lists all projects as cards
- `src/app/portfolio/[slug]/page.tsx` — shows details for one project
- The data comes from a JSON file they create: `src/data/portfolio.json`

**The portfolio.json pattern:** Explain that not all data needs a database. Data that changes rarely (like a portfolio) can live in a JSON file. This is simpler and faster.

---

### Day 15 — Review and Week 3 Project

**Morning: Component map exercise**

Students draw a diagram of their app on paper:
- Which files are server components?
- Which are client components?
- What data does each component receive as props?
- Where does the data come from?

This "component map" is a design skill. Professional developers design before they code.

**Afternoon: Week 3 project**

Students have a running Next.js app with:
- A homepage with their name, bio, and project list
- A portfolio page with cards
- Individual portfolio project pages
- Tailwind styling
- Working navigation

**Deliverable check:** Students can add a new project to the JSON file and explain every step of how it appears on the portfolio page.

---

## Week 4: Databases — Storing Data That Lasts

**Goal by end of week:** Students have a PostgreSQL database connected to their app, the blog schema is running, and they can read blog posts from the database on the public blog page.

**The central question this week answers:** *Where does data live after the page closes?*

---

### Day 16 — What Is a Database?

**Morning: Tables, rows, and columns**

A database stores data in tables. A table is like a spreadsheet. Each row is one record. Each column is one piece of information about that record.

Draw on the whiteboard:

| id | title | status | author_id | created_at |
|---|---|---|---|---|
| abc123 | My First Post | PUBLISHED | xyz789 | 2024-01-15 |
| def456 | Draft Ideas | DRAFT | xyz789 | 2024-01-20 |

**Relationships:** Tables connect to each other. A `BlogPost` has an `author_id` that points to a row in the `User` table. This is called a foreign key.

Draw the relationship:
```
User ---- (has many) ---- BlogPost
BlogPost ---- (has many) ---- Tag
Tag ---- (belongs to many) ---- BlogPost
```

**SQL:** The language used to talk to databases. Show 3 minutes of raw SQL to build intuition:
```sql
-- Get all published posts
SELECT * FROM BlogPost WHERE status = 'PUBLISHED';

-- Get a post by its slug
SELECT * FROM BlogPost WHERE slug = 'my-first-post';
```

Then immediately say: "We will not write SQL by hand. We will use a tool called Prisma that writes it for us."

**Afternoon: Neon setup**

Walk through Neon setup together:
1. Log in to neon.tech
2. Create a new project
3. Copy the connection string — it looks like `postgresql://user:password@host/dbname`
4. Create `.env` file in the project root
5. Add: `DATABASE_URL="paste-the-connection-string-here"`
6. Create `.gitignore` file and add `.env` to it — **this is security critical**

**Why `.gitignore`?** Simulate the danger: if a password is on GitHub (a public website), anyone in the world can see it, log into your database, and delete everything. Show a real news story about a developer who accidentally committed credentials. This lands.

---

### Day 17 — Prisma: A Map for the Database

**Morning: Install Prisma and write the schema**

```bash
npm install prisma @prisma/client
npx prisma init
```

Prisma creates `prisma/schema.prisma`. This file is a blueprint that describes what your database looks like in a human-readable format.

Walk through the schema line by line. Do not rush this. Students need to understand every piece:

```prisma
// The database we're using
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// The shape of a user
model User {
  id           String     @id @default(cuid())  // unique ID, auto-generated
  email        String     @unique               // no two users can share an email
  passwordHash String                           // never store real passwords
  name         String?                          // ? means optional
  role         UserRole   @default(EDITOR)      // admin or editor
  createdAt    DateTime   @default(now())       // set automatically
  updatedAt    DateTime   @updatedAt            // updated automatically on every change
  blogPosts    BlogPost[]                       // a user has many posts
}

// The shape of a blog post
model BlogPost {
  id        String     @id @default(cuid())
  slug      String     @unique
  title     String
  content   String     @db.Text  // unlimited length text
  status    PostStatus @default(DRAFT)
  authorId  String
  author    User       @relation(fields: [authorId], references: [id])
  tags      Tag[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

enum PostStatus {
  DRAFT
  PUBLISHED
}
```

**Afternoon: Run the migration**

A migration is a change to the database structure. Running `migrate dev` takes our schema and creates the actual tables in Neon.

```bash
npx prisma migrate dev --name initial-setup
```

Watch what happens: Prisma generates a SQL file and runs it against Neon. Students open Neon's dashboard and see their tables.

**Prisma Studio:**
```bash
npx prisma studio
```

A visual interface to browse and edit database data. Students manually add a test blog post here. They can see it in the table. This makes the database feel real.

---

### Day 18 — The Prisma Client

**Morning: Querying the database**

Install the singleton client pattern and explain why it's needed:

```typescript
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

Explain: in development, Next.js restarts the code on every file change. Without this pattern, it would create hundreds of database connections and the database would run out of available connections and stop working.

**Reading from the database:**

```typescript
// Get all published posts, newest first
const posts = await prisma.blogPost.findMany({
  where: { status: "PUBLISHED" },
  orderBy: { publishedAt: "desc" },
  include: {
    author: true,  // also load the author's data
    tags: true,    // also load the tags
  },
});

// Get one post by its slug
const post = await prisma.blogPost.findUnique({
  where: { slug: "my-first-post" },
});
```

**The Prisma pattern:** Every query follows the same shape: `prisma.ModelName.operation({ options })`. The names match the model names in the schema exactly.

**Afternoon: Build the public blog**

Students build:
- `src/app/blog/page.tsx` — a server component that fetches all published posts and displays them as a list
- `src/app/blog/[slug]/page.tsx` — a server component that fetches one post by its slug

They seed the database with 2-3 test posts using Prisma Studio, then see them appear on the page. This is the first time the frontend and database are talking to each other.

---

### Day 19 — Seed Script and Markdown

**Morning: The seed script**

A seed script populates the database with initial data. Students write one that creates their admin user:

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("choose-a-password", 12);

  await prisma.user.upsert({
    where: { email: "you@example.com" },
    update: {},
    create: {
      email: "you@example.com",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Add to `package.json`:
```json
"seed": "tsx prisma/seed.ts"
```

Run: `npm run seed`

**Why bcrypt?** Spend 20 minutes on this. Passwords must never be stored as plain text — if the database is ever stolen, all passwords are exposed. Bcrypt is a one-way function: it can turn a password into a hash, but you cannot reverse a hash back into a password. When a user logs in, you hash what they typed and compare it to the stored hash.

**Afternoon: Markdown rendering**

The blog content is stored as Markdown text. Install the renderer:

```bash
npm install react-markdown remark-gfm rehype-sanitize
```

```tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeSanitize]}
>
  {post.content}
</ReactMarkdown>
```

**Why rehype-sanitize?** Critical security lesson: if someone stores `<script>alert('hacked')</script>` as blog content, without sanitization, that script runs in every visitor's browser. This is called an XSS attack. `rehype-sanitize` strips dangerous HTML before it reaches the browser.

---

### Day 20 — Review and Week 4 Project

**Morning: Mental model consolidation**

Students draw the full data flow on paper for a blog post page load:
1. User types `/blog/my-first-post` in browser
2. Browser sends GET request to Next.js server
3. Next.js matches the URL to `src/app/blog/[slug]/page.tsx`
4. The server component runs, calls `prisma.blogPost.findUnique({ where: { slug: "my-first-post" } })`
5. Prisma sends a SQL query to Neon (in the cloud)
6. Neon returns the row data
7. The server component renders the HTML with that data
8. The server sends the HTML to the browser
9. The browser displays it

**Afternoon: Week 4 project**

Students have:
- A working public blog that reads from a real database
- A blog post page that renders Markdown
- A seed script that creates their admin user
- At least 2 posts in the database visible on the blog

---

## Week 5: Authentication and the Admin Panel

**Goal by end of week:** Students have a working admin login and can create, edit, and delete blog posts through the CMS.

**The central question this week answers:** *How does a website know who you are and only show you what you're allowed to see?*

---

### Day 21 — How Login Works

**Morning: The full login flow**

Draw this on the whiteboard step by step:

```
1. User fills in email + password, clicks "Log In"
2. Browser sends POST request to /api/auth/login with { email, password }
3. Server looks up the email in the database
4. If found: runs bcrypt.compare(password, storedHash)
5. If password matches:
   - Creates a session (a small object: { userId, email, isLoggedIn: true })
   - Encrypts the session into a cookie
   - Sends the cookie to the browser with the response
6. Browser stores the cookie
7. Every future request automatically includes the cookie
8. Server reads the cookie, decrypts it, and knows who the user is
```

**What is a cookie?** A small piece of text the browser saves and sends automatically with every request to that domain. Like a wristband at a concert that proves you paid to get in — you don't need to re-buy a ticket every time you visit the bathroom.

**What is a session?** The data inside the cookie. In this project: the user's ID and whether they're logged in.

**Why encrypt the cookie?** If it weren't encrypted, someone could manually write a cookie that says `{ isLoggedIn: true, userId: "anyone" }` and pretend to be any user. Encryption makes the cookie tamper-proof.

**Afternoon: Install iron-session**

```bash
npm install iron-session bcryptjs
npm install -D @types/bcryptjs
```

Students write `src/lib/session.ts` from scratch, explaining each option as they type it:

```typescript
import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  userId?: string;
  email?: string;
  role?: "ADMIN" | "EDITOR";
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "my_session",
  cookieOptions: {
    httpOnly: true,   // JavaScript in the browser cannot read this
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,  // 7 days in seconds
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
```

Students generate a SESSION_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Add it to `.env`.

---

### Day 22 — API Routes: The Backend

**Morning: What is an API route?**

In Next.js, files named `route.ts` (not `page.tsx`) handle HTTP requests directly. They don't render pages — they receive data, process it, and send data back.

```typescript
// src/app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Read the request body
  const { email, password } = await request.json();

  // Do some work...

  // Send a response
  return NextResponse.json({ success: true }, { status: 200 });
}
```

Every exported function name corresponds to an HTTP method: `GET`, `POST`, `PUT`, `DELETE`.

**Build the login route:**

```typescript
// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // IMPORTANT: return the same error whether email or password is wrong
  // Never tell an attacker which one was incorrect
  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const session = await getSession();
  session.isLoggedIn = true;
  session.userId = user.id;
  session.email = user.email;
  session.role = user.role;
  await session.save();

  return NextResponse.json({ success: true });
}
```

**Test it with the browser's fetch in the console:**
```javascript
fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "you@example.com", password: "wrong" })
}).then(r => r.json()).then(console.log)
```

Students see `{ error: "Invalid email or password" }`. Then try with the right password and see `{ success: true }`.

**Afternoon: Build the login page**

`src/app/login/page.tsx` — a Client Component with a form. When submitted, it calls the login API, and on success redirects to `/admin`.

---

### Day 23 — Middleware: The Gatekeeper

**Morning: What is middleware?**

Middleware runs before a request reaches any page or API route. It's the first thing the server does with every incoming request. This is where we check if the user is logged in before showing them the admin panel.

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "./lib/session";

export async function middleware(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(
      request,
      response,
      sessionOptions
    );

    if (!session.isLoggedIn || !session.userId) {
      // Not logged in — send them to the login page
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Logged in — let them through
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

**Test it:** Try to visit `/admin` while logged out. It should redirect to `/login`. Log in. Try again — it should let you through.

**Afternoon: The admin layout and dashboard**

Build:
- `src/app/admin/layout.tsx` — wraps all admin pages with a nav sidebar
- `src/app/admin/page.tsx` — a simple dashboard with links to posts and portfolio

---

### Day 24 — The Blog CMS: Create and Read

**Morning: The posts list**

```typescript
// src/app/admin/posts/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPostsPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div>
      <div>
        <h1>Blog Posts</h1>
        <Link href="/admin/posts/new">New Post</Link>
      </div>
      <table>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.title}</td>
            <td>{post.status}</td>
            <td>
              <Link href={`/admin/posts/${post.id}`}>Edit</Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
```

**Morning: The POST API route**

```typescript
// src/app/api/admin/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content, status } = await request.json();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const post = await prisma.blogPost.create({
    data: {
      title,
      slug,
      content: content || "",
      status: status || "DRAFT",
      authorId: session.userId!,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
```

**Afternoon: The new post form**

`src/app/admin/posts/new/page.tsx` — a Client Component form. Cover:
- Controlled inputs with `useState`
- Submitting with `fetch`
- Showing loading state while request is pending
- Showing errors if the request fails
- Redirecting to the posts list on success

---

### Day 25 — Blog CMS: Update and Delete

**Morning: Edit and delete API routes**

```typescript
// src/app/api/admin/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

// GET — fetch one post for editing
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

// PUT — update a post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content, status } = await request.json();

  const post = await prisma.blogPost.update({
    where: { id: params.id },
    data: { title, content, status },
  });

  return NextResponse.json(post);
}

// DELETE — delete a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.blogPost.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
```

**Afternoon: Edit page and delete button**

- `src/app/admin/posts/[id]/page.tsx` — edit form that pre-fills with the current post data
- `src/components/admin/DeletePostButton.tsx` — a Client Component button that calls the DELETE endpoint and refreshes the list

**Week 5 deliverable:** Students can log in, create a post, edit it, publish it, and delete it. The published post appears on the public blog.

---

## Week 6: Contact Form, Deployment, and Polish

**Goal by end of week:** The website is live on the internet with a working contact form, and students can deploy updates by pushing code to GitHub.

---

### Day 26 — The Contact Form and Email

**Morning: Build the contact form**

`src/app/api/contact/route.ts` — validate the input and send an email.

Install Resend:
```bash
npm install resend
```

Add to `.env`: `RESEND_API_KEY="re_..."`

```typescript
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  await resend.emails.send({
    from: "contact@yourdomain.com",
    to: "you@yourdomain.com",
    subject: `Message from ${name}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
  });

  return NextResponse.json({ success: true });
}
```

Teach: before sending any email, validate the input on the server. The client-side form can be bypassed — always validate on the server.

**Afternoon: Wire up the contact form UI**

Students already built a contact section in the homepage. Wire the form to the API. Handle loading state, success state ("Your message was sent!"), and error state.

---

### Day 27 — Deployment to Vercel

**Morning: How deployment works**

Draw the pipeline:
```
You push code to GitHub
         |
         v
Vercel detects the push
         |
         v
Vercel runs "npm run build" on its servers
         |
         v
Build succeeds -> code goes live
Build fails    -> you get an error email, nothing changes
         |
         v
Your domain points to Vercel
         |
         v
Visitors hit Vercel's servers, which run your code
```

**Connect Vercel to GitHub:**
1. Log in to vercel.com
2. New Project -> Import Git Repository -> select your repo
3. **Stop before clicking Deploy** — environment variables must come first

**Add environment variables in Vercel:**

Go to Project -> Settings -> Environment Variables. Add every variable from `.env`:
- `DATABASE_URL`
- `SESSION_SECRET`
- `RESEND_API_KEY`

**The critical lesson:** Your `.env` file never goes to GitHub (it's in `.gitignore`). Vercel needs its own copy of these secrets. You enter them manually in Vercel's dashboard. They are kept encrypted and injected into your app at runtime.

**Now deploy:**
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

Watch the Vercel dashboard. The deployment log shows every step. When it goes green, click the URL.

**Seed the production database:** Run the seed script once with the production database URL to create the admin user.

**Afternoon: Verify everything works in production**

Checklist students work through together:
- [ ] Homepage loads
- [ ] Portfolio page loads
- [ ] Blog page loads
- [ ] A blog post page loads with Markdown rendered
- [ ] Visiting `/admin` redirects to `/login`
- [ ] Login works
- [ ] Creating a post works
- [ ] Contact form sends email (check the Resend dashboard)

---

### Day 28 — The Deployment Loop and Fixing Production Bugs

**Morning: The real development workflow**

From now on, every change follows this loop:
1. Make the change locally
2. Test it at `localhost:3000`
3. `git add . && git commit -m "describe what changed" && git push`
4. Wait for Vercel to deploy (usually 1-2 minutes)
5. Verify it works in production

**Reading Vercel build logs:**

Intentionally introduce a bug (a TypeScript error or a missing import), push it, and walk through how to read the build failure log. The lesson: the error message tells you exactly what went wrong and which file/line.

**Environment variable bugs:** A common production-only bug is a missing environment variable. The app works locally but crashes in production. Show how to diagnose this: check the Vercel logs, check the environment variables dashboard.

**Afternoon: Free debugging and polish time**

Students fix any remaining bugs in their personal app. Instructor circulates.

---

### Day 29 — SEO Basics and Custom Domain

**Morning: Why search engines matter**

Search engines crawl websites and index their content so people can find them. Three files help significantly:

**robots.txt** — tells crawlers what to index:
```typescript
// src/app/robots.txt/route.ts
export async function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /admin/\n`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
```

**sitemap.xml** — lists every public URL so crawlers can find them:
```typescript
// src/app/sitemap.xml/route.ts
import prisma from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });

  const postUrls = posts
    .map((p) => `<url><loc>https://yourdomain.com/blog/${p.slug}</loc></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://yourdomain.com/</loc></url>
      <url><loc>https://yourdomain.com/blog</loc></url>
      ${postUrls}
    </urlset>`,
    { headers: { "Content-Type": "application/xml" } }
  );
}
```

**Metadata:** The title and description that appear in search results and social media link previews:

```typescript
// src/app/layout.tsx
export const metadata = {
  title: { default: "Your Name", template: "%s | Your Name" },
  description: "Your professional website description here.",
};
```

**Afternoon: Custom domain (optional)**

For students who want a custom domain:
1. Buy a domain (Namecheap, Porkbun, etc.) — ~$10-15/year
2. Vercel Project -> Settings -> Domains -> Add domain
3. Copy the DNS records Vercel provides
4. Add them in the registrar's DNS settings
5. Wait for propagation (5 minutes to several hours)
6. HTTPS certificate is automatic

---

### Day 30 — Final Projects and Presentations

**Morning: Personal customization**

Each student personalizes their site to reflect who they actually are:
- Replace placeholder content with real bio and projects
- Adjust colors and typography in Tailwind to match their style
- Add their real photo and links

**Afternoon: Presentations**

Each student presents their live site to the group:
1. Show the homepage and explain what each section is for
2. Show the blog with a real post they wrote
3. Show the admin panel — create a post live
4. Explain one thing that was hard and how they figured it out
5. Explain one thing they want to add next

Presentations are not about the site looking impressive. They are about the student being able to explain what their code does in plain language.

---

## Concepts Students Must Be Able to Explain (Final Assessment)

These are not multiple-choice questions. Instructors ask them conversationally. If a student cannot explain a concept in plain language without help, they have not learned it yet.

| Concept | What a correct answer sounds like |
|---|---|
| What happens when you type a URL and press Enter | "The browser asks a DNS server for the server's address, connects to that server, and asks for the page. The server responds with HTML, CSS, and JavaScript files that the browser uses to draw the page." |
| What a Server Component is | "It runs on the server before the page reaches the browser. It can read from the database. It cannot respond to user clicks." |
| What a Client Component is | "It runs in the browser. It can respond to user clicks and use `useState`. It cannot directly touch the database." |
| Why we use `.gitignore` for `.env` | "The `.env` file has passwords and secret keys. GitHub is public. If those passwords are on GitHub, anyone can use them to access our database or send emails from our account." |
| Why passwords are hashed | "You can turn a password into a hash but you cannot reverse a hash back into a password. So even if someone steals the database, they cannot log in with the hashed data." |
| What a cookie is | "A small piece of text the browser saves and sends automatically with every request to that domain. It's how the server knows who you are between requests." |
| What a migration is | "When you change the database schema (add a column, create a new table), you run a migration. It applies the change to the actual database to match the schema file." |
| What rate limiting is | "It limits how many requests one person (identified by their IP address) can make in a period of time. It prevents automated attacks that try thousands of passwords in seconds." |
| What an API route is | "A URL that returns data instead of a page. When the frontend needs to read or write data, it sends a request to an API route. The route handler processes it and responds with JSON." |
| What the middleware does | "It runs before every request reaches a page. In this project it checks if the user has a valid session cookie. If they don't and they're trying to reach `/admin`, it redirects them to the login page." |

---

## What to Do When a Student Is Stuck

Post this process on the wall:

1. **Read the error message out loud.** Every character. Many errors tell you exactly what went wrong and where.
2. **Look at the line number.** Open that file, find that line.
3. **Read the code around it.** What was the code supposed to do? Is there a typo? A missing import?
4. **Check your recent changes.** Run `git diff` to see what you changed since the last working commit.
5. **Search the error message.** Copy the core error (not the file paths) and search it on MDN or the relevant documentation.
6. **Ask your pair.** Show them the error message and what you have tried.
7. **Ask the instructor.** Show the error message, the code, and the 3 things you tried.

The goal is to make students capable debuggers, not students who produce working code through luck. The ability to methodically solve problems is the actual skill being taught.

---

## What This Course Does Not Cover (and Why)

Be honest with students about what they do and do not know by the end:

- **Rate limiting** — not covered in depth to keep scope manageable. The concept is introduced in the login security lesson.
- **Testing** — automated tests are a separate course. Students should know they exist.
- **TypeScript advanced features** — students use TypeScript but do not master it. That takes months of daily use.
- **Accessibility (a11y)** — introduced briefly but not deeply covered.
- **Performance optimization** — `next/image`, caching strategies, and server-side rendering nuances are beyond this scope.
- **CSS animation** — only basic Tailwind transitions.

Students who finish this course are beginners who have shipped a real product. That is genuinely impressive. They are not junior developers yet — that requires 6-12 more months of daily practice. Be clear about this so they have accurate expectations for job applications and continued learning.
