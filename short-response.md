# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use the exact terms and concepts from the lesson.

Your responses will each be evaluated out of 6 points. You can earn 3 points for writing quality and 3 points for the accuracy and precision of the technical content per question.

---

## Question 1:

Why is it unsafe to make requests to a third-party API (like Giphy) directly from frontend JavaScript code? What specific risk does this create, and how can a malicious user exploit it?

**Your answer here**: Sites like Giphy require an API Key to make requests to their servers. If we expose the API Key in the frontend, users can access it through the browser developer tools in the _Sources_ tab or _Network_ tab. It's unsafe because there might be costs associated with the API key or quota and the user could exploit this by impersonating us through making excessive requests. This could be costly and get us banned from the third party APIs.

---

## Question 2:

What is the proxy server strategy? How does it help avoid exposing API Keys in client-side code while still providing access to APIs that require keys?

**Your answer here**: A proxy server strategy allows us to safely secure the API key in the server side. The client (browser) makes a request to one of our server's endpoints, then the server makes a request with the API key to the third party API, and sends the data back to the frontend. This ensures that clients can safely make requests without exposing the API key, as server side code is not visible to the user.

---

## Question 3:

What is an environment variable, and why do we store API keys in a .env file instead of directly in source code? What role does .gitignore play in this setup, and what could go wrong if the .env file were accidentally committed to GitHub?

**Your answer here**: An environment variable is a hidden variable that lives in the host's machine (local computer or server like Render). We store sensitive data like API keys in a .env file because the `key="value"` data is accessible in Node through the `process.env` object. We must list the .env file in the .gitignore file so that .env gets ignored when we commit and push our code to GitHub. If this is not done, the API key can be pushed and will live in our commit history even if we try to delete it, making it accessible to anyone on the internet.

---
