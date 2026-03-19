# Skeleton API - Edge Sidebar Extension

[![Edge Extension](https://img.shields.io/badge/Browser-Microsoft%20Edge-blue.svg)](https://microsoftedge.microsoft.com/addons)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CS Student](https://img.shields.io/badge/Developer-CS%20Student-indigo.svg)](#-author)

**Skeleton API** is a high-performance productivity tool for full-stack developers. It lives in your Microsoft Edge Sidebar and instantly transforms raw JSON API responses into clean **TypeScript Interfaces** and **ready-to-use Fetch Client code**.

---

## The "Out of the Blue" Problem
Most developers waste 15–30 minutes per project manually typing out interfaces for nested JSON data. Existing web-based converters require constant tab-switching and copy-pasting. 

**Skeleton API solves this by:**
- **Staying Open:** Living in the Edge Sidebar for a side-by-side workflow.
- **Auto-Syncing:** Automatically detecting JSON when you switch tabs or refresh a page.
- **Deep Inference:** Recursively mapping nested objects and arrays into a full type system.

---

## Features

- **[Feature 1] Deep Type Inference:** Recursively crawls through complex, nested JSON to build a complete TypeScript type tree.
- **[Feature 2] API Client Generation:** Automatically generates boilerplate `async/await` fetch functions mapped to your root types.
- **[Feature 4] One-Click Export:** Instantly copy the entire generated file to your clipboard, ready for your Next.js or TypeScript project.
- **Auto-Detect Mode:** The sidebar updates in real-time as you browse different API endpoints.

---

## Tech Stack

- **Core:** JavaScript (ES6+), Manifest V3
- **UI:** Tailwind CSS (Minimalist/Pastel Theme)
- **APIs:** Chrome/Edge Extension API (SidePanel, Scripting, Tabs)

---

## Installation (Developer Mode)

Since this is currently an open-source tool, you can load it manually:

1. Download or clone this repository.
2. Open Microsoft Edge and navigate to `edge://extensions/`.
3. Toggle **Developer mode** (bottom left).
4. Click **Load unpacked** and select the folder containing these files.
5. Open any JSON URL (e.g., [GitHub API](https://api.github.com/users/octocat)) and open the Sidebar!

---

## Usage Example

1. Navigate to a JSON endpoint.
2. Open the **Skeleton API** Sidebar.
3. The types and fetch code appear **instantly**.
4. Click **Copy to Clipboard** and paste directly into your `types.ts` or `api.ts` file.

---

## Author

**Jalisabanu Malik** *Computer Science Student @ Charusat University* *Full-Stack Developer & AI Enthusiast*

- **GitHub:** [https://github.com/jalisa2106]
- **LinkedIn:** [https://www.linkedin.com/in/jalisa-malik-8b0308333?utm_source=share_via&utm_content=profile&utm_medium=member_android]

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.