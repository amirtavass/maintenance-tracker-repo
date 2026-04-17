# 🚀 Team Git Workflow & Branching Guide

To make sure we get maximum marks for the **Project Management** and **Technical Progress** sections of our A3/A4/A5 reports, we need screenshot evidence of Pull Requests and Code Reviews.

To keep this as simple and fast as possible, we are using a **Sprint-Based Branching** strategy.

## 1. The Golden Rule: Folder Isolation

To guarantee we NEVER get merge conflicts, we must stick to our folders:

- **Never push directly to `main`.**

---

## 2. How to work (The Step-by-Step Guide)

Whenever we start a new sprint, follow these exact steps.

### Step 1: Get the latest code

Before you start working, make sure your local `main` branch is up to date:

```bash
git checkout main
git pull origin main
```

## 3. Branch Naming Rules

To keep our repository organized and make sure the tutor can easily see who did what for our A3, A4, and A5 Sprint Reports, we are using a strict naming format for our branches:

**Format:** `sprint[number]-[feature-or-role]`

**Exact Branches to use for Sprint 1:**

- Amir (Next.js setup): `sprint1-frontend`
- Saad (Express setup): `sprint1-express`
- Sami (MongoDB setup): `sprint1-mongo`

**Examples for Future Sprints:**

- Amir: `sprint2-login-ui`
- Saad: `sprint2-auth-routes`
- Sami: `sprint2-user-schema`

## 4. Setting up the Database (Seed Data)

To prepare for our demo, we need realistic data (users and tickets) in our database so the frontend team can build the dashboards without looking at empty screens.

**Whenever you pull the latest code or need to reset your database, follow these steps:**

1. Open your terminal and navigate to the server folder:
   ```bash
   cd server
   ```
2. Install the dependencies first
   ```bash
   npm install
   ```
3. Run the seed script:
   npm run seed

   Note: If the npm command fails, you can also run node seed.js directly

What this does:
It will wipe the current database and instantly generate:

1 Admin (admin@thecube.com)

2 Staff (bob@thecube.com, charlie@thecube.com)

3 Students (david@student.com, emma@student.com, frank@student.com)

10 Dummy Tickets with randomized priorities and statuses.

Demo Login Credentials:
All seeded accounts use the exact same password for testing purposes:

Password: password123
