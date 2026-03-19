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
          const subName = capitalize(key.replace(/s$/, '')); 
          interfaceStr += `  ${key}: ${subName}[];\n`;
          parseObject(value[0], subName);
        } else {
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
      updateUI("// Please navigate to a valid web page containing JSON.");
      return; 
    }

    // Execute script to get page text
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.body.innerText,
    });

    if (!results || !results[0]?.result) {
      updateUI("// No content found on this page.");
      return;
    }

    // Attempt to parse text as JSON
    const rawData = JSON.parse(results[0].result);
    const types = generateTypes(rawData);
    const fetchCode = generateFetchCode("RootObject", tab.url);
    
    updateUI(types + "\n\n" + fetchCode);

  } catch (e) {
    // If it fails to parse JSON, give a clear error message.
    updateUI("// Error: No valid JSON detected in the active tab.\n// Make sure you are viewing a raw JSON response.");
  }
}

// Helper to update the DOM and trigger syntax highlighting
function updateUI(content) {
  const outputElement = document.getElementById('output');
  if (outputElement) {
    outputElement.textContent = content;
    outputElement.className = 'language-javascript'; // Enforce the built-in JS highlighter
    
    if (window.Prism) {
      Prism.highlightElement(outputElement);
    }
  }
}

// --- 4. EVENT LISTENERS ---

// 1. Manual Generate Button
document.getElementById('generate-btn')?.addEventListener('click', () => {
  updateUI("// Extracting..."); // Gives the user immediate feedback that the button was clicked
  extractAndDisplay();
});

// 2. One-Click Export
document.getElementById('copy-btn')?.addEventListener('click', () => {
  const code = document.getElementById('output').textContent;
  // Ensure we don't just copy the placeholder text
  if (code && !code.startsWith("//")) {
    navigator.clipboard.writeText(code);
    const btn = document.getElementById('copy-btn');
    const originalText = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => btn.textContent = originalText, 2000); // Resets button text after 2 seconds
  }
});

// 3. Initial Setup
document.addEventListener('DOMContentLoaded', () => {
  updateUI("// Navigate to a JSON response and click 'Generate Skeleton'.");
});