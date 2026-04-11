# Reason Magazine 🧠

A professional, dynamic magazine-style blogging platform focused on atheism activism, rational discourse, secular advocacy, and science. Built with modern web technologies for high performance and excellent SEO.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-Firestore_%26_Auth-FFCA28?style=for-the-badge&logo=firebase)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript)

## ✨ Key Features

* **Modern Tech Stack:** Built with Next.js 15 (App Router) and React 19.
* **Secure Admin Dashboard:** Protected routes for content management using Firebase Authentication (Google Login).
* **Rich Content Creation:** Markdown-supported article editor with auto-saving and draft/publish states.
* **Advanced SEO:** 
  * Dynamic `sitemap.xml` and `robots.txt`.
  * Auto-generated JSON-LD structured data (Schema Markup) for articles.
  * Canonical URLs and OpenGraph/Twitter card metadata.
* **Multilingual URL Support:** Custom slug generation that fully supports Bengali (Bangla) Unicode characters.
* **Beautiful UI/UX:** Fully responsive design with Dark/Light mode support, styled with Tailwind CSS v4 and animated with Framer Motion.
* **Serverless Backend:** Powered by Firebase Firestore for real-time database capabilities.

## 🚀 Getting Started (Local Development)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Install dependencies
code
Bash
npm install
3. Set up Environment Variables
Create a .env.local file in the root directory and add your production URL (for SEO purposes):
code
Env
NEXT_PUBLIC_APP_URL=http://localhost:3000
(Note: Your Firebase configuration is safely stored in firebase-applet-config.json and lib/firebase.ts)
4. Run the development server
code
Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.
🌐 Deployment
This project is optimized for deployment on Vercel.
Push your code to GitHub.
Import the repository into Vercel.
In Vercel's Environment Variables settings, add:
NEXT_PUBLIC_APP_URL = https://your-actual-vercel-domain.vercel.app
Deploy!
Important Firebase Note for Production
After deploying to a new domain (like Vercel or a custom domain), you must add that domain to your Firebase Authorized Domains list so the Admin Login works:
Go to the Firebase Console.
Navigate to Authentication -> Settings -> Authorized domains.
Add your new Vercel or custom domain (without https://).
📄 License
This project is licensed under the MIT License.
code
Code
### How to add this to GitHub:
1. Go to your repository on GitHub.
2. If you don't have a `README.md` file yet, click the green **Add a README** button. (If you do have one, click the pencil icon ✏️ to edit it).
3. Paste the text from the block above.
4. *(Optional)* Change the `your-username/your-repo-name.git` link in the "Clone the repository" section to your actual GitHub link.
5. Click **Commit changes**!
