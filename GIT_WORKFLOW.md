# 🚀 Team Git Workflow & Branching Guide

To make sure we get maximum marks for the **Project Management** and **Technical Progress** sections of our A3/A4/A5 reports, we need screenshot evidence of Pull Requests and Code Reviews.

To keep this as simple and fast as possible, we are using a **Sprint-Based Branching** strategy.

## 📁 1. The Golden Rule: Folder Isolation

To guarantee we NEVER get merge conflicts, we must stick to our folders:

- **Amir (Next.js):** Only works inside the `/client` folder.
- **Saad (Express):** Only works inside the `/server` folder.
- **Sami (MongoDB):** Only works inside the `/server` folder (coordinating with Saad).
- **Never push directly to `main`.**

---

## 🌿 2. How to work (The Step-by-Step Guide)

Whenever we start a new sprint, follow these exact steps.

### Step 1: Get the latest code

Before you start working, make sure your local `main` branch is up to date:

```bash
git checkout main
git pull origin main
```
