# Skeleton API

[![Edge Extension](https://img.shields.io/badge/Browser-Microsoft%20Edge-blue.svg)](https://microsoftedge.microsoft.com/addons)
[![CS Student](https://img.shields.io/badge/Developer-CS%20Student-indigo.svg)](#-author)

**[Download from the Microsoft Edge Add-ons Store](https://microsoftedge.microsoft.com/addons/detail/jjjfflokojljcagdnfgmeibojganklgb)**

A high-performance developer utility built for the Microsoft Edge Sidebar. Skeleton API instantly transforms raw JSON responses from the active browser tab into clean TypeScript interfaces and ready-to-use Fetch client code.

*Note: This repository serves as a portfolio showcase of the extension's source code. To use the tool, please install the official published version from the link above.*

## The Problem It Solves

During full-stack development, writing TypeScript interfaces for complex, deeply nested JSON APIs is a repetitive and time-consuming process. Existing web-based converters require developers to constantly switch tabs, copy-paste raw data, and manage temporary files. 

Skeleton API solves this by sitting natively in your browser's sidebar. It reads the JSON directly from your active tab and generates the required boilerplate code, allowing you to copy it straight into your project without disrupting your workflow.

## Core Features

* **Deep Type Inference:** Recursively crawls through nested JSON arrays and objects to build a complete, perfectly typed TypeScript tree.
* **API Client Generation:** Automatically generates a boilerplate asynchronous fetch function mapped to the inferred root types.
* **Persistent State:** Utilizes a manual generation trigger. Your generated code remains safely in the sidebar even as you switch tabs.
* **Native IDE Aesthetic:** Features a permanent dark theme, custom minimal scrollbars, and full TypeScript syntax highlighting powered by Prism.js.
* **100% Local Processing:** Operates entirely within the browser. No data is collected, stored, or transmitted to external servers.

## Usage Guide

1. Install Skeleton API from the Edge Add-ons Store.
2. Navigate to any URL displaying a raw JSON response (e.g., a standard API endpoint).
3. Open the Skeleton API Sidebar.
4. Click the "Generate Skeleton" button.
5. The TypeScript interfaces and fetch code will render with full syntax highlighting.
6. Click "Copy to Clipboard" and paste the output directly into your codebase.

## Technical Architecture

* **Platform:** Manifest V3, Microsoft Edge Extension API (SidePanel, Scripting, ActiveTab)
* **Logic:** Native JavaScript (ES6+)
* **Styling:** Custom CSS with CSS Variables (Dark Theme)
* **Syntax Highlighting:** Prism.js

## Author

**Jalisa Malik**
Computer Science Student at Charusat University
Full-Stack, AI/ML, and Generative AI Developer