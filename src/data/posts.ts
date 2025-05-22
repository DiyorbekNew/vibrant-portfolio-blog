
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  views: number;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    excerpt: "A comprehensive guide to understanding and implementing React Hooks in your projects.",
    content: `
      <p>React Hooks have revolutionized how we write React components, allowing us to use state and other React features without writing a class.</p>
      
      <h2>What are React Hooks?</h2>
      <p>Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 as a way to use state and other React features without writing a class.</p>
      
      <h2>The useState Hook</h2>
      <p>The useState hook is the most fundamental hook in React. It allows you to add state to functional components.</p>
      
      <pre><code>
      import React, { useState } from 'react';
      
      function Counter() {
        const [count, setCount] = useState(0);
        
        return (
          &lt;div&gt;
            &lt;p&gt;You clicked {count} times&lt;/p&gt;
            &lt;button onClick={() => setCount(count + 1)}&gt;
              Click me
            &lt;/button&gt;
          &lt;/div&gt;
        );
      }
      </code></pre>
      
      <h2>The useEffect Hook</h2>
      <p>The useEffect hook allows you to perform side effects in your function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.</p>
      
      <pre><code>
      import React, { useState, useEffect } from 'react';
      
      function Example() {
        const [count, setCount] = useState(0);
        
        useEffect(() => {
          document.title = \`You clicked \${count} times\`;
        });
        
        return (
          &lt;div&gt;
            &lt;p&gt;You clicked {count} times&lt;/p&gt;
            &lt;button onClick={() => setCount(count + 1)}&gt;
              Click me
            &lt;/button&gt;
          &lt;/div&gt;
        );
      }
      </code></pre>
      
      <h2>Custom Hooks</h2>
      <p>One of the most powerful features of Hooks is the ability to create custom hooks. Custom hooks allow you to extract component logic into reusable functions.</p>
      
      <p>In conclusion, React Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. They offer a more ergonomic solution without changing your components hierarchy.</p>
    `,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    date: "May 15, 2023",
    views: 1250,
    tags: ["React", "JavaScript", "Web Development"],
    featured: true
  },
  {
    id: 2,
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "Learn how to create beautiful, responsive user interfaces using the utility-first CSS framework Tailwind CSS.",
    content: `
      <p>Tailwind CSS has changed the way developers approach styling in web applications by providing low-level utility classes that let you build completely custom designs.</p>
      
      <h2>What is Tailwind CSS?</h2>
      <p>Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. It's different from frameworks like Bootstrap or Bulma, as it doesn't provide pre-designed components.</p>
      
      <h2>Getting Started with Tailwind</h2>
      <p>To get started with Tailwind, you can install it via npm:</p>
      
      <pre><code>npm install tailwindcss</code></pre>
      
      <p>Then, create a configuration file:</p>
      
      <pre><code>npx tailwindcss init</code></pre>
      
      <h2>Building a Responsive Layout</h2>
      <p>Tailwind makes it incredibly easy to create responsive designs with its built-in responsive modifiers.</p>
      
      <pre><code>
      &lt;div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"&gt;
        &lt;div class="bg-white p-4 rounded shadow"&gt;Item 1&lt;/div&gt;
        &lt;div class="bg-white p-4 rounded shadow"&gt;Item 2&lt;/div&gt;
        &lt;div class="bg-white p-4 rounded shadow"&gt;Item 3&lt;/div&gt;
      &lt;/div&gt;
      </code></pre>
      
      <p>This simple example creates a layout that transitions from 1 column on small screens, to 2 columns on medium screens, and 3 columns on large screens.</p>
      
      <h2>Customizing Your Theme</h2>
      <p>Tailwind is highly customizable. You can modify colors, spacing, breakpoints, and more in your tailwind.config.js file:</p>
      
      <pre><code>
      module.exports = {
        theme: {
          extend: {
            colors: {
              brand: '#3182ce',
            },
            spacing: {
              '128': '32rem',
            }
          }
        }
      }
      </code></pre>
      
      <p>In conclusion, Tailwind CSS is a powerful tool that allows developers to quickly build custom interfaces without writing traditional CSS. Its utility-first approach might feel verbose at first, but the productivity gains and consistency it provides make it well worth considering for your next project.</p>
    `,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    date: "June 22, 2023",
    views: 843,
    tags: ["CSS", "Tailwind", "Frontend"],
    featured: true
  },
  {
    id: 3,
    title: "Introduction to TypeScript for JavaScript Developers",
    excerpt: "Discover the benefits of TypeScript and how it can improve your JavaScript development experience.",
    content: `
      <p>TypeScript has gained significant popularity among JavaScript developers for its ability to add static typing to JavaScript projects, helping to catch errors early in the development process.</p>
      
      <h2>What is TypeScript?</h2>
      <p>TypeScript is a strongly typed programming language that builds on JavaScript. It adds static types, which can help identify errors during development instead of at runtime.</p>
      
      <h2>Getting Started with TypeScript</h2>
      <p>To start using TypeScript in your project, you'll first need to install it:</p>
      
      <pre><code>npm install typescript --save-dev</code></pre>
      
      <p>Next, create a tsconfig.json file to configure TypeScript:</p>
      
      <pre><code>
      {
        "compilerOptions": {
          "target": "ES2015",
          "module": "commonjs",
          "strict": true,
          "esModuleInterop": true,
          "skipLibCheck": true,
          "forceConsistentCasingInFileNames": true
        }
      }
      </code></pre>
      
      <h2>Basic Types in TypeScript</h2>
      <p>TypeScript supports several basic types:</p>
      
      <pre><code>
      // Basic types
      let isDone: boolean = false;
      let decimal: number = 6;
      let color: string = "blue";
      let list: number[] = [1, 2, 3];
      
      // Object type
      interface Person {
        firstName: string;
        lastName: string;
        age?: number; // Optional property
      }
      
      let user: Person = {
        firstName: "John",
        lastName: "Doe"
      };
      </code></pre>
      
      <h2>Function Types</h2>
      <p>TypeScript allows you to specify the types of function parameters and return values:</p>
      
      <pre><code>
      function add(x: number, y: number): number {
        return x + y;
      }
      
      // Arrow function with type
      const multiply = (x: number, y: number): number => x * y;
      </code></pre>
      
      <p>In conclusion, TypeScript provides a great way to enhance your JavaScript code with type safety. It can help catch common errors during development and provide better tooling support through features like auto-completion and refactoring. While there is a learning curve, the benefits of TypeScript often outweigh the initial investment, especially for larger projects.</p>
    `,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    date: "July 10, 2023",
    views: 621,
    tags: ["TypeScript", "JavaScript", "Programming"],
    featured: true
  },
  {
    id: 4,
    title: "Optimizing React Performance",
    excerpt: "Learn techniques and best practices for improving the performance of your React applications.",
    content: `
      <p>Performance optimization is a crucial aspect of building React applications. In this post, we'll explore various techniques to enhance your app's performance.</p>
      
      <h2>1. Use React.memo for Component Memoization</h2>
      <p>React.memo is a higher-order component that memoizes your component, preventing unnecessary re-renders:</p>
      
      <pre><code>
      const MyComponent = React.memo(function MyComponent(props) {
        // Your component logic
      });
      </code></pre>
      
      <h2>2. Virtual List with React-Window</h2>
      <p>When rendering large lists, use a virtualization library like react-window:</p>
      
      <pre><code>
      import { FixedSizeList as List } from 'react-window';
      
      const Row = ({ index, style }) => (
        &lt;div style={style}&gt;Row {index}&lt;/div&gt;
      );
      
      const Example = () => (
        &lt;List
          height={150}
          itemCount={1000}
          itemSize={35}
          width={300}
        &gt;
          {Row}
        &lt;/List&gt;
      );
      </code></pre>
      
      <h2>3. Lazy Loading Components</h2>
      <p>Use React.lazy and Suspense to load components only when needed:</p>
      
      <pre><code>
      const OtherComponent = React.lazy(() => import('./OtherComponent'));
      
      function MyComponent() {
        return (
          &lt;React.Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
            &lt;OtherComponent /&gt;
          &lt;/React.Suspense&gt;
        );
      }
      </code></pre>
      
      <h2>4. Using useCallback and useMemo</h2>
      <p>Memoize expensive computations and callback functions:</p>
      
      <pre><code>
      const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
      
      const memoizedCallback = useCallback(() => {
        doSomething(a, b);
      }, [a, b]);
      </code></pre>
      
      <h2>5. Avoid Inline Function Definitions</h2>
      <p>Inline functions in render methods can cause performance issues:</p>
      
      <pre><code>
      // Instead of this
      return &lt;button onClick={() => handleClick(id)}&gt;Click me&lt;/button&gt;
      
      // Do this
      const handleButtonClick = useCallback(() => {
        handleClick(id);
      }, [id, handleClick]);
      
      return &lt;button onClick={handleButtonClick}&gt;Click me&lt;/button&gt;
      </code></pre>
      
      <p>By implementing these techniques, you can significantly improve your React application's performance. Remember that premature optimization is the root of all evil, so always measure performance before and after optimization to ensure your changes are having a positive impact.</p>
    `,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    date: "August 5, 2023",
    views: 495,
    tags: ["React", "Performance", "Optimization"],
    featured: false
  },
  {
    id: 5,
    title: "Modern JavaScript Features You Should Know",
    excerpt: "Explore the latest JavaScript features that can help you write cleaner, more efficient code.",
    content: `
      <p>JavaScript has evolved significantly over the years. Let's explore some modern features that can improve your code quality and developer experience.</p>
      
      <h2>1. Optional Chaining (?.)</h2>
      <p>Optional chaining makes it easier to work with nested objects without having to check each level:</p>
      
      <pre><code>
      // Instead of
      const streetName = user && user.address && user.address.street && user.address.street.name;
      
      // You can do
      const streetName = user?.address?.street?.name;
      </code></pre>
      
      <h2>2. Nullish Coalescing (??)</h2>
      <p>The nullish coalescing operator provides a way to specify a default value when dealing with null or undefined:</p>
      
      <pre><code>
      // Returns right-side operand when the left is null or undefined
      const foo = null ?? 'default';  // 'default'
      const bar = 0 ?? 'default';     // 0 (not null or undefined)
      </code></pre>
      
      <h2>3. Logical Assignment Operators</h2>
      <p>Logical assignment operators combine logical operations with assignment:</p>
      
      <pre><code>
      // OR assignment
      x ||= y;  // x = x || y
      
      // AND assignment
      x &&= y;  // x = x && y
      
      // Nullish assignment
      x ??= y;  // x = x ?? y
      </code></pre>
      
      <h2>4. Array Flat and FlatMap</h2>
      <p>Simplifying working with nested arrays:</p>
      
      <pre><code>
      const arr = [1, 2, [3, 4, [5, 6]]];
      arr.flat();     // [1, 2, 3, 4, [5, 6]]
      arr.flat(2);    // [1, 2, 3, 4, 5, 6]
      
      // flatMap combines map and flat
      const arr2 = [1, 2, 3];
      arr2.flatMap(x => [x, x * 2]);  // [1, 2, 2, 4, 3, 6]
      </code></pre>
      
      <h2>5. Private Class Fields</h2>
      <p>ES2022 introduced truly private class fields using the # prefix:</p>
      
      <pre><code>
      class Person {
        #age = 30;  // Private field
        
        getAge() {
          return this.#age;
        }
      }
      
      const person = new Person();
      console.log(person.getAge());  // 30
      console.log(person.#age);      // Error: Private field
      </code></pre>
      
      <p>Keeping up with modern JavaScript features can help you write more concise, readable, and maintainable code. These features are well-supported in modern browsers and can be transpiled for older browsers using tools like Babel.</p>
    `,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: "September 12, 2023",
    views: 378,
    tags: ["JavaScript", "ES6+", "Web Development"],
    featured: false
  },
  {
    id: 6,
    title: "Building a REST API with Node.js and Express",
    excerpt: "A step-by-step guide to creating a robust REST API using Node.js, Express, and MongoDB.",
    content: `
      <p>RESTful APIs are the backbone of modern web applications. In this tutorial, we'll build a complete API using Node.js, Express, and MongoDB.</p>
      
      <h2>Setting Up the Project</h2>
      <p>First, initialize your project and install dependencies:</p>
      
      <pre><code>
      mkdir api-project
      cd api-project
      npm init -y
      npm install express mongoose dotenv
      npm install --save-dev nodemon
      </code></pre>
      
      <h2>Creating the Express Server</h2>
      <p>Let's create our main server file (app.js):</p>
      
      <pre><code>
      const express = require('express');
      const mongoose = require('mongoose');
      require('dotenv').config();
      
      const app = express();
      
      // Middleware
      app.use(express.json());
      
      // Connect to MongoDB
      mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
      
      // Routes
      app.use('/api/users', require('./routes/users'));
      
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
      </code></pre>
      
      <h2>Creating a User Model</h2>
      <p>Let's define our user model using Mongoose:</p>
      
      <pre><code>
      // models/User.js
      const mongoose = require('mongoose');
      
      const UserSchema = new mongoose.Schema({
        name: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true,
          unique: true
        },
        password: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        }
      });
      
      module.exports = mongoose.model('User', UserSchema);
      </code></pre>
      
      <h2>Implementing CRUD Routes</h2>
      <p>Let's create routes for our user resource:</p>
      
      <pre><code>
      // routes/users.js
      const express = require('express');
      const router = express.Router();
      const User = require('../models/User');
      
      // Get all users
      router.get('/', async (req, res) => {
        try {
          const users = await User.find().select('-password');
          res.json(users);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      });
      
      // Get single user
      router.get('/:id', async (req, res) => {
        try {
          const user = await User.findById(req.params.id).select('-password');
          if (!user) return res.status(404).json({ message: 'User not found' });
          res.json(user);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      });
      
      // Create user
      router.post('/', async (req, res) => {
        try {
          const user = new User(req.body);
          const savedUser = await user.save();
          res.status(201).json(savedUser);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      });
      
      // Update user
      router.put('/:id', async (req, res) => {
        try {
          const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!user) return res.status(404).json({ message: 'User not found' });
          res.json(user);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      });
      
      // Delete user
      router.delete('/:id', async (req, res) => {
        try {
          const user = await User.findByIdAndDelete(req.params.id);
          if (!user) return res.status(404).json({ message: 'User not found' });
          res.json({ message: 'User deleted' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      });
      
      module.exports = router;
      </code></pre>
      
      <p>This is just a basic implementation of a RESTful API. In a production environment, you would want to add authentication, validation, error handling, and testing. However, this provides a solid foundation that you can build upon.</p>
    `,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    date: "October 8, 2023",
    views: 287,
    tags: ["Node.js", "Express", "API", "Backend"],
    featured: false
  }
];
