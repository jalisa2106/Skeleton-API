# Skeleton API

[![Edge Extension](https://img.shields.io/badge/Browser-Microsoft%20Edge-blue.svg)](https://microsoftedge.microsoft.com/addons)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CS Student](https://img.shields.io/badge/Developer-CS%20Student-indigo.svg)](#-author)

A high-performance developer utility built for the Microsoft Edge Sidebar. Skeleton API instantly transforms raw JSON responses from the active browser tab into clean TypeScript interfaces and ready-to-use Fetch client code.

## The Problem It Solves

During full-stack development, writing TypeScript interfaces for complex, deeply nested JSON APIs is a repetitive and time-consuming process. Existing web-based converters require developers to constantly switch tabs, copy-paste raw data, and manage temporary files. 

Skeleton API solves this by sitting natively in your browser's sidebar. It reads the JSON directly from your active tab and generates the required boilerplate code, allowing you to copy it straight into your project without disrupting your workflow.

## Core Features

* **Deep Type Inference:** Recursively crawls through nested JSON arrays and objects to build a complete, perfectly typed TypeScript tree.
* **API Client Generation:** Automatically generates a boilerplate asynchronous fetch function mapped to the inferred root types.
* **Persistent State:** Utilizes a manual generation trigger. Your generated code remains safely in the sidebar even as you switch tabs to read documentation or browse your project.
* **Native IDE Aesthetic:** Features a permanent dark theme, custom minimal scrollbars, and full TypeScript syntax highlighting powered by Prism.js.
* **Local Processing:** Operates entirely within the browser. No data is collected, stored, or transmitted to external servers.

## Installation (Developer Mode)

To use this extension before it is officially available on the Edge Add-ons Store, you can load it manually:

1. Download or clone this repository to your local machine.
2. Open Microsoft Edge and navigate to `edge://extensions/`.
3. Enable "Developer mode" using the toggle in the bottom left corner.
4. Click "Load unpacked" and select the folder containing the extension files.
5. The extension will now appear in your Edge Sidebar.

## Usage Guide

1. Navigate to any URL displaying a raw JSON response (e.g., a standard API endpoint).
2. Open the Skeleton API Sidebar.
3. Click the "Generate Skeleton" button.
4. The TypeScript interfaces and fetch code will render with full syntax highlighting.
5. Click "Copy to Clipboard" and paste the output directly into your codebase.

## Technical Architecture

* **Platform:** Manifest V3, Microsoft Edge Extension API (SidePanel, Scripting, ActiveTab)
* **Logic:** Native JavaScript (ES6+)
* **Styling:** Custom CSS with CSS Variables (Dark Theme)
* **Syntax Highlighting:** Prism.js

## Author

**Jalisabanu Malik**
Computer Science Student at Charusat University
Full-Stack, AI/ML, and Generative AI Developer

## License

This project is licensed under the MIT License.

Copyright (c) 2026 Jalisabanu Malik

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.