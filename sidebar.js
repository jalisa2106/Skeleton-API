/**
 * Skeleton API - Sidebar Logic
 * Features: Deep Type Inference, API Client Gen, Auto-Sync, and Export
 */

// --- 1. DEEP TYPE INFERENCE ENGINE ---
function generateTypes(json, rootName = "RootObject") {
  const interfaces = [];
  const processedObjects = new Set();

  function parseObject(obj, name) {
    // Avoid circular references or redundant parsing
    const objKey = JSON.stringify(obj);
    if (processedObjects.has(objKey)) return;
    processedObjects.add(objKey);
    
    let interfaceStr = `interface ${name} {\n`;
    
    for (const key in obj) {
      const value = obj[key];
      const type = typeof value;

      if (value === null) {
        interfaceStr += `  ${key}?: any;\n`;
      } else if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object') {
          // Recursive call for array of objects
          const subName = capitalize(key.replace(/s$/, '')); // Simple plural to singular
          interfaceStr += `  ${key}: ${subName}[];\n`;
          parseObject(value[0], subName);
        } else {
          // Primitive arrays
          interfaceStr += `  ${key}: ${typeof value[0] || 'any'}[];\n`;
        }
      } else if (type === 'object') {
        // Recursive call for nested objects
        const subName = capitalize(key);
        interfaceStr += `  ${key}: ${subName};\n`;
        parseObject(value, subName);
      } else {
        // Standard primitives (string, number, boolean)
        interfaceStr += `  ${key}: ${type};\n`;
      }
    }
    
    interfaceStr += `}\n`;
    interfaces.push(interfaceStr);
  }

  parseObject(json, rootName);
  // Reverse so the RootObject appears at the bottom (Standard TS practice)
  return interfaces.reverse().join('\n');
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// --- 2. API CLIENT GENERATOR ---
function generateFetchCode(rootName, url) {
  // Cleans the URL to remove sensitive query params if necessary
  const cleanUrl = url.split('?')[0]; 
  return `
/**
 * Auto-generated Fetch Client for ${rootName}
 */
export async function get${rootName}(): Promise<${rootName}> {
  const response = await fetch("${cleanUrl}");
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  return response.json();
}
  `.trim();
}

// --- 3. CORE EXTRACTION LOGIC ---
async function extractAndDisplay() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Safety check: Don't run on internal browser pages
    if (!tab || !tab.url || tab.url.startsWith('edge://') || tab.url.startsWith('chrome://')) {
      updateUI("// Navigate to an API or JSON page...");
      return;
    }

    // Execute script to get page text
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.body.innerText,
    });

    if (!results || !results[0]?.result) return;

    // Attempt to parse text as JSON
    const rawData = JSON.parse(results[0].result);
    const types = generateTypes(rawData);
    const fetchCode = generateFetchCode("RootObject", tab.url);
    
    updateUI(types + "\n\n" + fetchCode);
    console.log("Skeleton API: Types updated.");

  } catch (e) {
    // Fail silently during auto-sync to avoid interrupting user browsing
    updateUI("// No valid JSON detected in this tab.");
  }
}

// Helper to update the DOM
function updateUI(content) {
  const outputElement = document.getElementById('output');
  if (outputElement) {
    outputElement.textContent = content;
  }
}

// --- 4. EVENT LISTENERS ---

// Manual Refresh
document.getElementById('generate-btn')?.addEventListener('click', extractAndDisplay);

// One-Click Export (Feature 4)
document.getElementById('copy-btn')?.addEventListener('click', () => {
  const code = document.getElementById('output').textContent;
  if (code && !code.startsWith("//")) {
    navigator.clipboard.writeText(code);
    const btn = document.getElementById('copy-btn');
    const originalText = btn.textContent;
    btn.textContent = "✓ Copied!";
    setTimeout(() => btn.textContent = originalText, 2000);
  }
});

// AUTO-SYNC LISTENERS
// 1. Trigger when switching tabs
chrome.tabs.onActivated.addListener(extractAndDisplay);

// 2. Trigger when a page finishes loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    extractAndDisplay();
  }
});

// 3. Trigger immediately when sidebar opens
document.addEventListener('DOMContentLoaded', extractAndDisplay);