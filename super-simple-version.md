# Zero to Portfolio: A Simple Personal Website with a Blog
## A 6-Week Bootcamp Curriculum for Absolute Beginners (Simplified Version)

---

## What Is Different About This Version

The full project (see `beginner-tutorial.md`) includes a database, a login system, an admin dashboard, and email infrastructure. Those are real professional features, and they are genuinely hard to build from scratch in 6 weeks with no prior experience.

This version builds the same kind of website — a personal portfolio with a working blog — using a fundamentally simpler approach:

| Full Version | This Version |
|---|---|
| PostgreSQL database | Markdown files stored in the project |
| Admin login and CMS | Edit posts directly in VS Code |
| iron-session auth | No auth needed |
| Resend + Upstash | Formspree (free form service, no backend) |
| TypeScript (strict) | JavaScript with light TypeScript hints |
| Prisma ORM | gray-matter (reads markdown files) |

**The result looks nearly identical to the user.** The blog works. The portfolio works. The contact form works. The site is live on the internet. The key difference is that you manage blog posts by editing files in your code editor and pushing to GitHub — the same way thousands of professional developers actually run their blogs.

This is not a "beginner toy." This approach — called a file-based or static site — is how many real developer blogs work, including some of the most widely read ones. It is simpler because it has fewer moving parts, not because it is less professional.

### Accounts to Create on Day 1

| Service | Purpose | Free Plan? |
|---|---|---|
| GitHub | Stores all code, triggers deployments | Yes |
| Vercel | Hosts the live website | Yes |
| Formspree | Handles the contact form submissions | Yes (50/month) |

That is it. No database account. No email API. No Redis. Three accounts instead of five, and the two hardest ones are gone.

---

## Before You Begin: Read This Carefully

### The Learning Contract

Post this on the wall. Every student agrees to it on Day 1:

> 1. I will type every line of code myself. I will not copy-paste from anywhere.
> 2. Before asking for help, I will read the error message out loud, look at the documentation, and try to solve it for 10 minutes.
> 3. When I ask for help, I will explain what I think is happening — not just say "it's broken."
> 4. I will not use any AI tool to generate, complete, or explain code. The discomfort of not understanding is the learning.

### Support Structures

- **Pair programming** every day. Partners rotate weekly.
- **Rubber duck** on every desk. Explain the problem to the duck before asking a human.
- **Error notebook** — students write down every error they hit and how they fixed it. This is their most valuable reference by week 6.
- **Documentation wall** — print and post: MDN Web Docs, Next.js docs, Tailwind docs.
- **15-minute rule** — stuck alone for 15 minutes? Ask your partner. Stuck together for 15 more? Ask the instructor.
- **The instructor breaks things on purpose** in front of the class every day. Errors are normal. Panic is not necessary.

### Format

Full-time, immersive. 6–8 hours per day, 5 days per week. This is not designed for evenings or weekends.

---

## Week 1: How Computers Talk to Each Other

**Goal by end of week:** Students understand what the web is, can use the terminal, write basic HTML and CSS, and have their first webpage on GitHub.

**The central question this week answers:** *When you type a website address and press Enter, what actually happens?*

---

### Day 1 — The Web Is Just Files and Requests

**Morning (3 hours): Mental models before any code**

Start with a physical demonstration, not a computer. Use a restaurant analogy:
- The **browser** is a customer placing an order
- The **internet** is the waiter carrying the order
- The **server** is the kitchen that prepares and sends the response
- The **response** is the plate that arrives

Draw this on a whiteboard. Walk through what happens when you type `google.com`:
1. Your browser asks a DNS server: "What is the address of google.com?"
2. DNS responds with an IP address — a real numerical location, like a street address
3. Your browser connects to that address and says "please give me the homepage"
4. Google's servers respond with HTML, CSS, and JavaScript files
5. Your browser reads those files and draws the page on your screen

Ask students: "Where do those files live?" — On a computer somewhere. Someone wrote them. That is what we are learning to do.

**Setup (2 hours):**

Install together, one item at a time. Wait for the whole group before the next step.

1. **VS Code** — download, install, open. Tour the interface: file explorer left, editor center, terminal bottom.
2. **Node.js** — download v20 LTS from nodejs.org, install, then verify:
   ```
   node --version
   ```
   Version number = success. Error = debug together as a class. First lesson in reading errors.
3. **Git** — download from git-scm.com, install.

**Afternoon (2 hours): Your first file**

Create a folder called `my-website`. Open it in VS Code. Create `index.html`. Type this — do not copy it, type it:

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

Install the "Live Server" VS Code extension. Right-click the file, open with Live Server. Their words appear in the browser.

**Instructor note:** Ask "what happens if I delete the closing tag?" Delete it. Show them. Break things on purpose throughout the course. The computer does exactly what the file says — nothing more, nothing less.

**Homework:** Read MDN's "How the Web Works" article. Write 3 questions.

---

### Day 2 — HTML: The Skeleton

**Goal:** Students can build any page's structure in HTML.

**Morning: HTML elements**

Teach by building a simple personal page together:
- Headings: `h1` through `h6` — what they mean semantically, not just visually
- Paragraph: `p`
- Links: `a href="..."` — absolute URLs vs relative paths
- Images: `img src="..." alt="..."` — why `alt` matters (screen readers, broken images)
- Lists: `ul`, `ol`, `li`
- Divs: containers with no visual meaning — "a box that holds other boxes"
- Semantic elements: `header`, `nav`, `main`, `section`, `footer`, `article` — same as divs but with meaning for search engines

**Critical exercise — Inspect Element:**

Open Chrome DevTools (F12). Show students that every website's HTML is readable. Go to any website they recognize and show them the structure. The message: "This is exactly what we are learning to write."

**Afternoon: Build the page structure**

Students build the HTML skeleton of their personal site. No styling yet — structure only. By end of day:
- Header with their name and navigation links
- An "About" section with a paragraph about themselves
- A "Projects" section (empty for now)
- A "Blog" section (empty for now)
- A footer with copyright

**Checkpoint:** Every student explains every tag in their file out loud.

---

### Day 3 — CSS: The Skin

**Goal:** Students understand CSS rules and can style a page.

**Morning: How CSS works**

HTML is the skeleton. CSS is the skin and clothes. CSS rules follow this shape:
```
who gets styled {
  what changes: to what value;
}
```

Teach:
- Selectors: element (`h1`), class (`.title`), ID (`#header`)
- The difference between class and ID — class reusable, ID unique per page
- The box model — every element is a rectangle: content, padding, border, margin. Draw this on the whiteboard. Spend 30 minutes on it. It is the most common source of confusion for the entire course.
- `display: block` vs `inline` vs `flex`
- Flexbox: `display: flex`, `justify-content`, `align-items`, `gap` — this is what they will use constantly
- Colors: named, hex, `rgb()`
- Fonts: `font-size`, `font-weight`, `font-family`

**Create and link a CSS file:**
```css
/* style.css */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f5f5f5;
  color: #333333;
}

h1 {
  font-size: 2rem;
  color: #1a1a1a;
}
```

```html
<link rel="stylesheet" href="style.css">
```

**Afternoon: Style their page**

Students style their Day 2 skeleton. Freedom on choices, but requirements:
- At least 3 different selector types
- Flexbox for navigation
- Intentional padding and margin (not 0 everywhere)

**Instructor note:** Resist fixing ugly pages. Ugly pages with understood code are better than pretty pages with copied code.

---

### Day 4 — The Terminal and Git

**Goal:** Students are comfortable in the terminal and can back up their work on GitHub.

**Morning: The terminal**

The terminal gives the computer instructions by typing instead of clicking. Everything you do by clicking, you can do by typing — and much more.

Students type each command and observe the result:
```bash
pwd             # Where am I?
ls              # What files are here?
cd Documents    # Go into Documents
cd ..           # Go up one level
mkdir hello     # Make a new folder
touch file.txt  # Make a new empty file
cat file.txt    # Print a file's contents
```

**Demonstration:** Open Finder/Explorer and the terminal side by side. `cd Documents` and clicking Documents are the same thing. Watch both update together.

**Common panic:** The terminal looks frozen when it's waiting. Teach `Ctrl+C` to cancel. Practice it several times. Fear of the terminal is normal and temporary.

**Afternoon: Git**

Git is a time machine for code. Every commit saves a snapshot. You can always go back.

Mental model: Git is like tracked changes in Google Docs — but for any file, and you control when to save a snapshot.

```bash
git init                    # Start tracking this folder
git status                  # What has changed?
git add index.html          # Choose what to include in the snapshot
git commit -m "Add homepage" # Save the snapshot with a description
```

**Push to GitHub:**
1. Create a new repository on github.com named `my-website`
2. Copy the commands GitHub shows and run them:
   ```bash
   git remote add origin https://github.com/YOUR_NAME/my-website.git
   git branch -M main
   git push -u origin main
   ```

Their code is on the internet. That is real. Celebrate it.

**The mantra:** Students say this aloud every time they commit — "Save, stage, snapshot." (`Ctrl+S`, `git add`, `git commit`)

---

### Day 5 — Review and Week 1 Project

**Morning: Review**

Students explain concepts to each other, not the instructor. Revisit:
- The box model (draw it again without looking at notes)
- Relative vs absolute file paths
- `git add` vs `git commit`
- The difference between HTML and CSS

**Afternoon: Week 1 project**

Each student builds a styled "About Me" static page:
- Their name and a short bio
- A list of 3 interests or hobbies
- A navigation bar styled with flexbox
- All CSS written by hand (no frameworks yet)
- Committed and pushed to GitHub

**Deliverable check:** Instructor reviews each student's GitHub. Cannot move to Week 2 until complete and explainable by the student.

---

## Week 2: JavaScript — Making Pages Think

**Goal by end of week:** Students can write JavaScript that reads and changes what's on the page and responds to user actions.

**The central question this week answers:** *How does a webpage respond to what a user does?*

---

### Day 6 — Variables, Values, and the Console

**Morning: What is a program?**

A program is a list of instructions the computer follows from top to bottom. A variable is a labeled container that holds a value.

```javascript
let name = "Sarah";
let age = 34;
let isStudent = true;
```

Open the browser console (F12 -> Console). Type each and press Enter:
```javascript
1 + 1
"hello" + " " + "world"
let x = 10
x * 3
typeof "hello"
typeof 42
typeof true
```

The console shows results immediately. This is the fastest feedback loop in programming.

**Data types — everything in JavaScript has a type:**
- `string` — text in quotes: `"hello"`
- `number` — any number: `42`, `3.14`, `-7`
- `boolean` — only `true` or `false`
- `null` — intentionally empty
- `undefined` — not yet given a value
- `array` — a list: `["apple", "banana", "orange"]`
- `object` — labeled collection: `{ name: "Sarah", age: 34 }`

**Afternoon: Functions**

A function is a named set of instructions you can run later, as many times as you want.

```javascript
function greet(name) {
  return "Hello, " + name + "!";
}

greet("Maria");   // "Hello, Maria!"
greet("James");   // "Hello, James!"
```

Students write 5 functions:
1. Takes a name, returns a greeting
2. Takes two numbers, returns their sum
3. Takes a name and age, returns a sentence about the person
4. Takes a number, returns whether it is greater than 10
5. Takes an array, returns how many items are in it

**Checkpoint:** Every student writes a function from scratch without looking at notes.

---

### Day 7 — Decisions and Repetition

**Morning: Conditionals**

```javascript
let temperature = 28;

if (temperature > 30) {
  console.log("It's hot.");
} else if (temperature > 20) {
  console.log("It's nice.");
} else {
  console.log("It's cold.");
}
```

Comparison operators: `===`, `!==`, `>`, `<`, `>=`, `<=`
Logical operators: `&&` (and), `||` (or), `!` (not)

**Most common beginner mistake:** Using `=` instead of `===` in a condition. Demonstrate what breaks. Explain why: `=` assigns a value, `===` compares two values.

**Afternoon: Loops and Arrays**

```javascript
let fruits = ["apple", "banana", "orange", "mango"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Cleaner version
fruits.forEach(function(fruit) {
  console.log(fruit);
});
```

Array methods used constantly in this project:
- `.length` — how many items
- `.push(item)` — add to the end
- `.filter(fn)` — return only items where function returns true
- `.map(fn)` — transform every item, return a new array
- `.find(fn)` — return the first matching item

Practice: filter an array of numbers to keep only those greater than 10. Map an array to double every value.

---

### Day 8 — Objects and the DOM

**Morning: Objects**

```javascript
let post = {
  title: "My First Blog Post",
  date: "2024-01-15",
  published: true,
};

console.log(post.title);      // "My First Blog Post"
console.log(post["date"]);    // "2024-01-15"

// Array of objects — the pattern used everywhere
let posts = [
  { title: "Post One", date: "2024-01-15" },
  { title: "Post Two", date: "2024-02-01" },
];

posts.forEach(function(post) {
  console.log(post.title + " — " + post.date);
});
```

**Afternoon: The DOM**

The DOM (Document Object Model) is the browser's JavaScript representation of your HTML. When you select an element, you can read and change it.

```javascript
let heading = document.querySelector("h1");

console.log(heading.textContent);       // read it
heading.textContent = "New Heading!";   // change it
heading.style.color = "blue";           // style it

heading.addEventListener("click", function() {
  alert("You clicked the heading!");
});
```

**Exercise:** Students add a button to their Week 1 page. Clicking it changes the page's background color. Requires: selecting the button, adding an event listener, changing `document.body.style.backgroundColor`.

---

### Day 9 — Async JavaScript and Fetch

**Morning: Why JavaScript needs async tools**

JavaScript runs one instruction at a time. If it had to wait 5 seconds for a network response, the whole page would freeze. Async tools let it start a task and continue working until the result is ready.

Analogy: at a coffee shop, you don't stand frozen at the counter until your order is ready. You give your name, sit down, and they call you. `async/await` works the same way.

```javascript
async function getPosts() {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  let posts = await response.json();
  console.log(posts);
}

getPosts();
```

`fetch` makes an HTTP request. `.json()` parses the response body. Both take time, so both use `await`.

**JSON** — JavaScript Object Notation. A text format for data that looks almost identical to a JavaScript object. This is how servers and browsers exchange information.

**Afternoon: Error handling**

```javascript
async function getPosts() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    let posts = await response.json();
    console.log(posts);
  } catch (error) {
    console.error("Failed:", error.message);
  }
}
```

`try/catch` is a safety net. If anything in `try` fails, execution jumps to `catch` instead of crashing.

**Exercise:** Fetch posts from `jsonplaceholder.typicode.com/posts` and display the first 5 titles on the page using `document.createElement` and `document.appendChild`.

---

### Day 10 — Review and Week 2 Project

**Morning: Code reading practice**

Give students a short JavaScript file they have not seen. Have them read it aloud line by line and explain what each line does. Professionals read far more code than they write. This skill is as important as writing.

**Afternoon: Week 2 project**

Students add two JavaScript features to their personal page:
1. A button that toggles between light and dark background
2. A "Projects" section built entirely by JavaScript from an array of objects — they write a function that takes the array and generates the HTML elements

**Deliverable check:** Students add a new project to the array and explain every step of how it appears on the page.

---

## Week 3: React and Next.js — Building in Components

**Goal by end of week:** Students understand component-based thinking, have a running Next.js project, and have built the homepage and portfolio page.

**The central question this week answers:** *How do modern web apps organize code so it is easy to update?*

---

### Day 11 — Why React Exists

**Morning: The problem React solves**

In plain JavaScript, when data changes, you manually hunt down every element that needs updating and change it. In a big app this becomes unmanageable. React's solution: you describe what the page should look like given the current data, and React handles all the DOM updates automatically.

**Components:** A component is a function that returns HTML-like syntax called JSX. Big interfaces are built from small components composed together.

```jsx
function ProjectCard({ title, description }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ProjectList({ projects }) {
  return (
    <div>
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
        />
      ))}
    </div>
  );
}
```

JSX looks like HTML but is JavaScript. `{}` lets you put any JavaScript expression inside. Component names start with a capital letter. Props are how a parent passes data to a child.

**Afternoon: useState**

When data inside a component changes, React re-renders it automatically. State is the mechanism that tracks changing data.

```jsx
import { useState } from "react";

function DarkModeToggle() {
  let [isDark, setIsDark] = useState(false);

  return (
    <button onClick={() => setIsDark(!isDark)}>
      {isDark ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}
```

Exercise: students build a small "Favorite Things" list component. `useState` holds an array of strings. A text input and button let the user add new items. The list re-renders automatically.

---

### Day 12 — Next.js: React with a Server

**Morning: Create the project**

```bash
npx create-next-app@latest my-portfolio \
  --javascript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd my-portfolio
npm run dev
```

Open `http://localhost:3000`. The app is running.

**Note:** This version uses JavaScript (`--javascript`) rather than TypeScript to reduce complexity. Students will see `.jsx` instead of `.tsx`.

**App Router file system — the most important concept of this week:**

The folder structure IS the routing system:
```
src/app/page.jsx                    ->  /
src/app/blog/page.jsx               ->  /blog
src/app/blog/[slug]/page.jsx        ->  /blog/any-post-slug
src/app/portfolio/page.jsx          ->  /portfolio
src/app/portfolio/[slug]/page.jsx   ->  /portfolio/any-project
```

Creating a new page means creating a new file. There is no separate "router configuration" file.

**Afternoon: Tailwind CSS**

Tailwind replaces writing CSS files. Utility classes go directly on elements:

```jsx
// Old way: write CSS in a separate file, give elements class names, link the file
// Tailwind way: the class IS the style
<div className="max-w-4xl mx-auto px-6 py-12">
  <h1 className="text-4xl font-bold text-gray-900">Hello</h1>
  <p className="mt-4 text-lg text-gray-600">Welcome to my site.</p>
</div>
```

Key conventions to memorize:
- `text-sm / text-base / text-lg / text-xl / text-2xl` — font sizes
- `font-normal / font-medium / font-semibold / font-bold` — font weights
- `p-4 / px-6 / py-8` — padding (all sides, horizontal, vertical)
- `m-4 / mx-auto / mt-8 / mb-4` — margin
- `flex / items-center / justify-between / gap-4` — flexbox
- `bg-gray-100 / bg-white / bg-black` — backgrounds
- `text-gray-600 / text-gray-900 / text-white` — text colors
- `hover:text-blue-600` — apply style on hover
- `md:flex / lg:text-xl` — apply style at medium/large screen sizes

Students convert their Week 1/2 personal page into a Next.js component with Tailwind.

---

### Day 13 — Server Components and the Portfolio Data File

**Morning: Two kinds of components**

This is the most conceptually important lesson of the whole course. Spend the entire morning on it.

**Server Components** (the default in Next.js):
- Run on the server before the page is sent to the browser
- Can read files from the filesystem
- Cannot use `useState` or respond to clicks
- The browser never downloads this code — it only gets the finished HTML

**Client Components** (add `'use client'` at the top of the file):
- Run in the browser
- Can use `useState`, `useEffect`, event listeners
- Cannot read files from the server's filesystem

Analogy: A server component is a chef who cooks in the kitchen and sends a finished plate. A client component is a waiter who interacts with the customer at the table. Different jobs, different tools, different locations.

The rule: **default to server components. Add `'use client'` only when you need interactivity.**

**Afternoon: portfolio.json**

Not everything needs a database. Static or rarely-changing data can live in a JSON file right in the project. The portfolio is perfect for this.

Create `src/data/portfolio.json`:
```json
[
  {
    "slug": "my-first-project",
    "title": "My First Project",
    "description": "A brief description of what it does and why you built it.",
    "category": "Web App",
    "techStack": ["HTML", "CSS", "JavaScript"],
    "githubUrl": "https://github.com/your-username/repo",
    "demoUrl": "",
    "featured": true
  }
]
```

Build `src/app/portfolio/page.jsx` — a server component that imports the JSON and renders the portfolio cards. Because this is a server component, it can import the file directly. No fetch, no database, no loading state.

```jsx
// src/app/portfolio/page.jsx
import portfolioData from "@/data/portfolio.json";

export default function PortfolioPage() {
  return (
    <main>
      <h1>Portfolio</h1>
      <div>
        {portfolioData.map(project => (
          <article key={project.slug}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
```

---

### Day 14 — Dynamic Routes and Navigation

**Morning: Dynamic routes**

`[slug]` in a folder name is a variable. Whatever appears in the URL at that position becomes available to the page as `params.slug`.

```
URL: /portfolio/my-first-project
params.slug = "my-first-project"
```

```jsx
// src/app/portfolio/[slug]/page.jsx
import portfolioData from "@/data/portfolio.json";

export default function ProjectPage({ params }) {
  let project = portfolioData.find(p => p.slug === params.slug);

  if (!project) {
    return <h1>Project not found</h1>;
  }

  return (
    <main>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <ul>
        {project.techStack.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </main>
  );
}
```

**Next.js Link:**

```jsx
import Link from "next/link";

// Use Link for internal navigation, not <a>
// Link navigates without a full page reload
<Link href="/portfolio">See my work</Link>
<Link href={`/portfolio/${project.slug}`}>View details</Link>
```

**Afternoon: The shared layout**

`src/app/layout.jsx` wraps every page automatically. This is where the navigation header and footer live. Students build a simple `Header` component with their name and nav links, and a `Footer` with copyright.

```jsx
// src/app/layout.jsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

### Day 15 — Review and Week 3 Project

**Morning: Component map exercise**

Students draw their app on paper:
- Which files are server components?
- Which are client components?
- What data does each component receive as props?
- Where does that data come from?

Design before coding. Professional developers plan before writing.

**Afternoon: Week 3 project**

Each student has a running Next.js app with:
- A styled homepage with their name, bio, and links
- A portfolio page listing their projects from JSON
- Individual project detail pages
- A shared header/footer on every page
- Tailwind styling throughout

**Deliverable check:** Students add a new project to the JSON file and explain every step of how it appears on the page.

---

## Week 4: The Blog — Markdown Files as Posts

**Goal by end of week:** Students have a fully working blog where new posts are created by writing a markdown file and pushing to GitHub.

**The central question this week answers:** *How can we build a blog without a database?*

---

### Day 16 — Markdown and the File System

**Morning: What is Markdown?**

Markdown is a simple way to write formatted content using plain text symbols. It is how many developers write documentation, README files, and blog posts.

```markdown
# This is a heading

## This is a smaller heading

This is a paragraph. You can make text **bold** or *italic*.

- This is a list item
- Another item

[This is a link](https://example.com)

> This is a blockquote

    This is a code block (indent with 4 spaces)
```

The browser cannot render Markdown directly — it needs to be converted to HTML first. A library called `react-markdown` does that conversion.

**Frontmatter:** Blog posts need metadata — title, date, author, excerpt. Frontmatter is a block of structured data at the very top of a Markdown file, surrounded by `---`:

```markdown
---
title: My First Blog Post
date: 2024-01-15
excerpt: A short summary of what this post is about.
published: true
---

This is where the actual post content starts. Everything above the second `---` is metadata.
```

A library called `gray-matter` reads both the frontmatter and the content separately.

**Install the tools:**
```bash
npm install gray-matter react-markdown remark-gfm
```

**Afternoon: Create the posts folder and first posts**

Create a folder: `posts/` in the root of the project.

Create `posts/my-first-post.md`:
```markdown
---
title: My First Blog Post
date: 2024-01-15
excerpt: This is the post I wrote to learn how the blog works.
published: true
---

## Why I Started This Blog

This is my first post. I am learning web development and building this site from scratch.

## What I've Learned So Far

- HTML gives a page structure
- CSS makes it look good
- JavaScript makes it interactive

I'm excited to keep writing as I learn more.
```

Students each write 2 real posts about their experience in the course so far. These will be visible on the live site.

---

### Day 17 — Reading Markdown Files in Next.js

**Morning: The blog library file**

Create `src/lib/blog.js`. This file contains the functions for reading posts from the filesystem.

```javascript
// src/lib/blog.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// The folder where all markdown posts live
const postsDirectory = path.join(process.cwd(), "posts");

// Get all post slugs (filenames without .md)
export function getAllPostSlugs() {
  let files = fs.readdirSync(postsDirectory);
  return files
    .filter(file => file.endsWith(".md"))
    .map(file => file.replace(/\.md$/, ""));
}

// Get the data and content for one post by its slug
export function getPostBySlug(slug) {
  let fullPath = path.join(postsDirectory, slug + ".md");
  let fileContents = fs.readFileSync(fullPath, "utf8");
  let { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt || "",
    published: data.published !== false,  // default to true
    content,
  };
}

// Get all published posts, sorted newest first
export function getAllPosts() {
  let slugs = getAllPostSlugs();
  let posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}
```

Walk through every line. Teach:
- `fs` — Node.js built-in for reading and writing files
- `path.join` — builds a file path correctly on any operating system
- `process.cwd()` — the current working directory (where `npm run dev` was started)
- `matter(fileContents)` — splits the markdown file into `data` (frontmatter) and `content` (body)

**Afternoon: The blog list page**

```jsx
// src/app/blog/page.jsx
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  let posts = getAllPosts();

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <h2>{post.title}</h2>
            </Link>
            <time>{new Date(post.date).toLocaleDateString()}</time>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

This is a server component. It reads the filesystem at request time. The browser gets plain HTML back — no JavaScript bundle for this page.

---

### Day 18 — The Blog Post Page

**Morning: Rendering Markdown**

```jsx
// src/app/blog/[slug]/page.jsx
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PostPage({ params }) {
  let post = getPostBySlug(params.slug);

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <time>{new Date(post.date).toLocaleDateString()}</time>
      </header>

      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
```

`remark-gfm` adds GitHub Flavored Markdown support: tables, strikethrough, task lists, and autolinks.

**The "prose" class:** Tailwind resets all HTML element styling by default (so headings look like body text, lists have no bullets). The `prose` class from the `@tailwindcss/typography` plugin restores beautiful default styles for blocks of rendered Markdown text.

```bash
npm install @tailwindcss/typography
```

Add to `tailwind.config.js`:
```javascript
plugins: [require("@tailwindcss/typography")],
```

**Afternoon: generateStaticParams**

This tells Next.js to pre-build every blog post at build time instead of at request time. The result is a static HTML file for each post — served instantly with no server work needed.

```jsx
// Add this to src/app/blog/[slug]/page.jsx
export function generateStaticParams() {
  let slugs = getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}
```

Teach: when Next.js builds the project, it calls `generateStaticParams`, gets the list of slugs, and generates an HTML file for each one. When a visitor requests the page, the server just sends that pre-built HTML file instantly — no filesystem reads, no Markdown processing, just a file.

---

### Day 19 — Adding a New Post

**Morning: The full publishing workflow**

The entire process for adding a new blog post:

1. Create a new `.md` file in the `posts/` folder
2. Write the frontmatter and content
3. Save the file
4. `git add . && git commit -m "Add new blog post" && git push`
5. Vercel rebuilds the site (takes about 1 minute)
6. The post appears on the live blog

No database. No admin panel. No login. The blog is updated the same way the code is updated — by editing files and pushing to GitHub.

**Discuss the tradeoffs openly:**

This approach is simpler but has real limitations:
- You must have VS Code and Git to publish a post
- You cannot write posts from your phone or a library computer
- Non-technical collaborators cannot add posts
- The full project from `beginner-tutorial.md` solves all of these with the database and admin CMS

For a personal developer blog, these limitations are acceptable. You are always near your development environment. Acknowledge when you would need a more complex system.

**Afternoon: Style the blog**

Students style the blog list and post pages. Requirements:
- Posts list has cards with a hover effect
- Post page has readable line length (max around 70 characters per line) — use `max-w-prose` in Tailwind
- Publication date is formatted readably
- Navigation back to the blog list from any post page

---

### Day 20 — Review and Week 4 Project

**Morning: Data flow diagram**

Students draw on paper how a blog post page loads:
1. User types `/blog/my-first-post`
2. Next.js matches the URL to `src/app/blog/[slug]/page.jsx`
3. The server component calls `getPostBySlug("my-first-post")`
4. `getPostBySlug` reads `posts/my-first-post.md` from the filesystem
5. `gray-matter` parses the frontmatter and content
6. `ReactMarkdown` converts Markdown to HTML
7. The server sends the complete HTML to the browser
8. The browser displays it

No network request to a database. No API call. Just a file read.

**Afternoon: Week 4 project**

Each student has:
- A working blog with at least 3 real posts they wrote themselves
- Blog list page with excerpts and dates
- Individual post pages with Markdown rendered and styled
- `generateStaticParams` generating static pages

---

## Week 5: Contact Form, Dark Mode, and the Homepage

**Goal by end of week:** Students have a complete, polished website with a working contact form and dark mode.

**The central question this week answers:** *How do I make my site feel professional and finished?*

---

### Day 21 — The Contact Form with Formspree

**Morning: The problem with contact forms**

A contact form needs to:
1. Receive the form data (name, email, message)
2. Send it somewhere the site owner can read it (email)

In the full version, this requires building an API route and integrating with an email service. In this version, we use Formspree — a free service that provides a URL you point the form at. Formspree receives the submission and emails it to you.

**Setup:**
1. Go to formspree.io and create an account
2. Create a new form
3. Copy the form endpoint URL (looks like `https://formspree.io/f/abcdefgh`)

**The contact form:**

```jsx
// src/components/ContactForm.jsx
"use client";
import { useState } from "react";

export function ContactForm() {
  let [status, setStatus] = useState("idle"); // "idle" | "sending" | "sent" | "error"

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    let formData = new FormData(e.target);

    try {
      let response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("sent");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" name="name" required />
      </label>
      <label>
        Email
        <input type="email" name="email" required />
      </label>
      <label>
        Message
        <textarea name="message" required rows={5} />
      </label>

      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "sent" && <p>Message sent! I'll be in touch soon.</p>}
      {status === "error" && <p>Something went wrong. Please try again.</p>}
    </form>
  );
}
```

This is a Client Component (`'use client'`) because it uses `useState` and an event handler.

**Afternoon: Add the contact section**

Add a contact section to the homepage and a dedicated `/contact` page. Test: submit the form and verify the email arrives in the Formspree dashboard and in the inbox.

---

### Day 22 — Dark Mode

**Morning: How dark mode works**

Dark mode works by adding a CSS class called `dark` to the `<html>` element. Tailwind's dark mode classes (`dark:bg-gray-900`, `dark:text-white`) only activate when that class is present. Toggling dark mode means toggling that class on the `<html>` element.

`localStorage` saves the user's preference between visits. On load, read the saved preference and apply it immediately.

**Build a ThemeProvider:**

```jsx
// src/components/ThemeProvider.jsx
"use client";
import { useState, useEffect, createContext, useContext } from "react";

let ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  let [isDark, setIsDark] = useState(false);

  // On first load, read the saved preference
  useEffect(() => {
    let saved = localStorage.getItem("theme");
    let prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(saved === "dark" || (!saved && prefersDark));
  }, []);

  // Apply the class and save the preference whenever isDark changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

Wrap the root layout:
```jsx
// src/app/layout.jsx
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Teach `createContext` and `useContext`:**

Context is a way to share data between components without passing props through every layer. The `ThemeProvider` puts `isDark` and `toggle` into context. Any component anywhere in the tree can call `useTheme()` to get them.

**Afternoon: Add dark mode styles**

Students add `dark:` variants to their existing Tailwind classes:
```jsx
// Light: white background, dark text
// Dark: dark background, light text
<main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

Add a toggle button to the header that calls `useTheme().toggle()`.

---

### Day 23 — The Homepage

**Morning: Bringing it all together**

The homepage is the most important page — it is what every visitor sees first. Build it with clear sections:
1. **Hero** — name, tagline, primary call to action
2. **About** — short bio, photo
3. **Featured Projects** — 2–3 cards from portfolio.json (filter where `featured: true`)
4. **Recent Posts** — 3 most recent blog posts from `getAllPosts().slice(0, 3)`
5. **Contact** — the `ContactForm` component

The homepage server component fetches the data:

```jsx
// src/app/page.jsx
import { getAllPosts } from "@/lib/blog";
import portfolioData from "@/data/portfolio.json";
import { HomePageContent } from "@/components/HomePageContent";

export default function HomePage() {
  let recentPosts = getAllPosts().slice(0, 3);
  let featuredProjects = portfolioData.filter(p => p.featured);

  return (
    <HomePageContent
      recentPosts={recentPosts}
      featuredProjects={featuredProjects}
    />
  );
}
```

`HomePageContent` is a Client Component that handles the dark mode toggle and any interactive elements.

**Afternoon: Polish**

Students apply consistent spacing, typography, and color throughout. Requirements:
- All section headings use the same style
- Cards (project and post) have consistent padding and border radius
- Hover states on all links and buttons
- Mobile navigation collapses behind a menu button on small screens

---

### Day 24 — SEO and Metadata

**Morning: Why metadata matters**

Metadata is information about the page that search engines and social media use to display previews. The `<title>` tag is what appears in browser tabs and search results. The `og:image` tag is what appears when you share a link on Twitter or LinkedIn.

Next.js has a built-in Metadata API that handles all the `<head>` tags automatically:

```jsx
// src/app/layout.jsx
export const metadata = {
  title: {
    default: "Your Name | Developer",
    template: "%s | Your Name",
  },
  description: "Personal website and blog of Your Name.",
  openGraph: {
    type: "website",
    url: "https://yoursite.com",
  },
};
```

The `template` means each page only needs to set its own title. Next.js formats it as `"Blog | Your Name"` automatically.

**Per-page metadata:**
```jsx
// src/app/blog/[slug]/page.jsx
export function generateMetadata({ params }) {
  let post = getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

**robots.txt:** Tells search engines which pages to index and which to skip:

```jsx
// src/app/robots.txt/route.js
export function GET() {
  return new Response(
    "User-agent: *\nAllow: /\n",
    { headers: { "Content-Type": "text/plain" } }
  );
}
```

**Sitemap:** Lists every public URL so search engines can discover them:

```jsx
// src/app/sitemap.xml/route.js
import { getAllPosts } from "@/lib/blog";

export function GET() {
  let posts = getAllPosts();
  let baseUrl = "https://yoursite.com";

  let postUrls = posts
    .map(p => `<url><loc>${baseUrl}/blog/${p.slug}</loc></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>${baseUrl}/</loc></url>
      <url><loc>${baseUrl}/blog</loc></url>
      <url><loc>${baseUrl}/portfolio</loc></url>
      ${postUrls}
    </urlset>`,
    { headers: { "Content-Type": "application/xml" } }
  );
}
```

**Afternoon: Add metadata to every page**

Students add appropriate metadata to every page in their site. Check: share a page URL in Slack/Discord and confirm the link preview shows the correct title and description.

---

### Day 25 — Review and Week 5 Project

**Morning: Full site review**

Students audit their site against a checklist:
- [ ] Homepage has all 5 sections (hero, about, projects, posts, contact)
- [ ] Portfolio has at least 2 real projects
- [ ] Blog has at least 3 real posts
- [ ] Dark mode toggle works and preference is remembered
- [ ] Contact form submits and sends an email
- [ ] All internal links work (no broken links)
- [ ] Every page has a title in the browser tab

**Afternoon: Week 5 project**

Students fix everything on the checklist and style the site to their personal taste.

**Deliverable check:** Each student demos the full site to their pair. The pair asks: "What happens when I click this?" and "Where does this data come from?"

---

## Week 6: Deployment and Launch

**Goal by end of week:** The site is live on the internet at a public URL. Students can push updates and watch them appear within minutes.

**The central question this week answers:** *How does code on my laptop become a website anyone can visit?*

---

### Day 26 — How Deployment Works

**Morning: The pipeline**

Draw this diagram:

```
Your laptop
     |   (git push)
     v
GitHub
     |   (Vercel detects new commit)
     v
Vercel runs "npm run build"
     |
     |-- Build succeeds --> new version goes live
     |-- Build fails    --> old version stays, you get an error email
     v
Vercel's servers around the world serve your site
     |
     v
Visitors hit the nearest server, which sends HTML/CSS/JS
```

Key points:
- You never manually upload files
- The push to GitHub triggers everything automatically
- If the build breaks, nothing changes for visitors
- Vercel runs servers in multiple cities simultaneously — visitors get served from the closest one

**Morning: Connect Vercel to GitHub**

1. Log in to vercel.com
2. New Project -> Import Git Repository -> select `my-portfolio`
3. Vercel detects Next.js automatically — no configuration needed
4. Click Deploy

**No environment variables for this version** — unlike the full project, there are no database credentials or API keys to configure. The only optional one is the Formspree form ID, which is not a secret (it is public in the form action).

Watch the build log together. When the URL turns green, click it. The site is live.

**Afternoon: The update loop**

From this point forward, every change follows this loop. Students practice it 5 times:

1. Make a small change locally (update a portfolio description, fix a typo, add a Tailwind class)
2. Verify it looks right at `localhost:3000`
3. `git add . && git commit -m "describe the change" && git push`
4. Watch the Vercel dashboard — a new deployment starts automatically
5. Wait 60–90 seconds for the build
6. Verify the change is live at the production URL

Repeat until the loop feels automatic.

---

### Day 27 — Reading Build Errors

**Morning: Breaking things on purpose**

Learning to read build errors is as important as writing code. The instructor demonstrates each of these errors and walks through how to diagnose and fix them:

**Syntax error:** Remove a closing `}` in a JSX file. The build fails with "unexpected token" and the exact line number.

**Missing import:** Delete an import line. The build fails with "cannot find module" and the file that tried to import it.

**Wrong file path:** Rename a component file but forget to update the import. The build fails with the exact import path that couldn't be resolved.

**Missing `key` prop:** Map over an array in JSX without providing a `key`. This is a warning, not a build error, but show how to read it in the browser console.

**The diagnosis process:**
1. Open the Vercel build log
2. Find the first red line — build errors cascade, so the first one is usually the real problem
3. Read the error message — it contains the file path and line number
4. Open that file, go to that line
5. The fix is usually on that line or the few lines above it

**Afternoon: Students break their own sites**

Students introduce an intentional bug, push it, watch the build fail, diagnose the error from the build log, fix it, and push again. Do this 3 times with different types of errors.

---

### Day 28 — Custom Domain (Optional)

**Morning: How domains work**

A domain name is a human-readable alias for an IP address. When someone types `yoursite.com`, their browser asks a DNS server for the IP address that corresponds to `yoursite.com`. The DNS server returns the address. The browser connects to that address.

DNS records are how you tell the DNS system where to point. When you add a domain to Vercel, Vercel gives you records to add at your domain registrar (the company you bought the domain from). Once those records propagate (update globally), traffic to your domain goes to Vercel.

**Adding a domain to Vercel:**
1. Buy a domain — Porkbun and Namecheap are student-friendly, ~$10-15/year for `.com`
2. Vercel -> Project -> Settings -> Domains -> Add domain
3. Copy the DNS records Vercel shows (usually an A record and a CNAME record)
4. Log in to the registrar, find DNS settings, add those records
5. Wait 5 minutes to several hours for propagation
6. HTTPS is automatic — Vercel provisions a certificate

**Afternoon: Free time**

Students who have their domain working continue polishing. Students who don't yet have a domain clean up their Tailwind styles, fix remaining issues, and write a fourth blog post about their experience in the course.

---

### Day 29 — The Workflow of a Working Developer

**Morning: What happens after the course**

Be honest about where students are and what comes next.

**What they can now do:**
- Build and deploy a complete, real website from scratch
- Add pages, portfolio projects, and blog posts
- Read error messages and debug their own code
- Use the terminal, Git, and GitHub confidently
- Understand how the web works at a meaningful level

**What takes more time:**
- TypeScript — adds type safety, required at most professional jobs
- Automated testing — how professionals verify code works
- More advanced React patterns — `useReducer`, custom hooks, Suspense
- Backend development — databases, authentication, APIs (covered in the full version)
- CSS beyond Tailwind — animations, complex layouts, design systems

**The continued learning path:**
1. Keep this project alive — post to the blog every week
2. Add one new feature per month (add a tags system, add a search bar, add an RSS feed)
3. Read other developers' open source code on GitHub
4. Build 2–3 more projects from scratch using the skills from this course

**Afternoon: Build something new**

Students pick one new thing to add to their site that is not in the curriculum. Some options:
- An RSS feed (`/rss.xml` using the same pattern as `sitemap.xml`)
- A `/uses` page listing tools and gear they use
- A tags system for blog posts (filter posts by tag in the frontmatter)
- An animated hero section using CSS transitions
- A reading time estimate for each post (`Math.ceil(content.split(" ").length / 200)` minutes)

Students work independently. The instructor provides guidance but not solutions.

---

### Day 30 — Presentations and Celebration

**Morning: Prepare**

Each student prepares a 5-minute presentation. They practice with their pair first.

Presentation structure:
1. Share screen, show the live site at its public URL
2. Walk through each section and explain what it does
3. Open VS Code, show the code for one feature, and explain how it works
4. Open the terminal, add a new blog post, commit, and push — show the Vercel deployment happening live
5. Share one thing that was very hard and how you eventually figured it out
6. Share one thing you want to build next

**Afternoon: Presentations**

Every student presents. Audience asks one question each.

**The assessment is not the website. It is the explanation.** A student with an ugly site who can explain every line of code has learned more than a student with a beautiful site who cannot.

---

## Concepts Students Must Be Able to Explain (Final Assessment)

Instructors ask these conversationally. A student who cannot explain a concept in plain language without help has not learned it — regardless of whether their code works.

| Concept | What a correct answer sounds like |
|---|---|
| What happens when you type a URL | "The browser asks DNS for the server's address, connects to it, and requests the page. The server responds with files the browser uses to draw the page." |
| What a server component is | "It runs on the server. It can read files. It cannot respond to clicks. The browser only gets the finished HTML." |
| What a client component is | "It runs in the browser. It can respond to user actions and use useState. It cannot read files from the server." |
| Why `.gitignore` exists | "It tells Git which files to never track or push. We use it for the `.env` file because it contains secrets that must not go on GitHub." |
| What `gray-matter` does | "It reads a Markdown file and separates the frontmatter (the metadata at the top between the dashes) from the post content below it." |
| What `generateStaticParams` does | "It tells Next.js which pages to pre-build at build time. For the blog, it returns a list of all post slugs so Next.js can generate a static HTML file for each one." |
| What a dynamic route is | "A folder with brackets like `[slug]` in its name. Whatever appears in the URL at that position is available as `params.slug` inside the page." |
| How dark mode works | "Toggling dark mode adds or removes a `dark` CSS class on the `<html>` element. Tailwind's `dark:` classes only activate when that class is present. The preference is saved in localStorage so it persists between visits." |
| How the contact form sends email without a backend | "The form submits to Formspree's URL. Formspree receives the data and emails it to the address you set up in your Formspree account. We don't write any server code." |
| What happens when you push to GitHub | "Vercel detects the new commit, runs the build command, and if the build succeeds, deploys the new version. The update is live in about 60 seconds." |

---

## What to Do When a Student Is Stuck

Post this process on the wall. Students follow it before asking the instructor:

1. **Read the error message out loud.** Every word. Many errors state exactly what is wrong and which file and line number.
2. **Look at the line number.** Open the file, go to that line.
3. **Read the code around it.** What was this supposed to do? Is there a typo? A missing bracket? A wrong file name?
4. **Check your recent changes.** Run `git diff` to see every line you changed since the last working commit.
5. **Search the error message.** Copy the core error (remove file paths and line numbers) and search it on MDN or the Next.js docs.
6. **Ask your pair.** Show them the error message and what you have already tried.
7. **Ask the instructor.** Show the error, the code, and the three things you tried. Never just say "it's broken."

The goal is to build students who can solve their own problems — not students who produce working code only when an instructor is standing next to them.

---

## What This Course Does Not Cover (and Why)

Be honest with students:

- **Databases** — covered in the full version (`beginner-tutorial.md`). Without a database, there is no admin panel, no login, and posts are managed by editing files.
- **Authentication** — requires a database. Not in scope for this version.
- **TypeScript** — this version uses JavaScript to reduce cognitive load. TypeScript is the professional standard and should be learned next.
- **Automated testing** — a separate discipline. Students should know it exists and matters.
- **CSS animations beyond transitions** — Tailwind's `transition` and `duration` utilities are covered. Complex keyframe animations are not.
- **Performance optimization** — `next/image` is mentioned but not deeply covered. Caching strategies are out of scope.
- **Accessibility** — introduced through semantic HTML in week 1, but not covered in depth.

Students who complete this course have built and deployed a real website with a working blog from scratch using no AI. That is a genuine achievement. They are not junior developers yet — that requires many more months of daily practice and building. Be clear about this so expectations are accurate.

The next step is the full version in `beginner-tutorial.md` — adding a database, authentication, and an admin CMS. Everything in this course is a foundation for that.
