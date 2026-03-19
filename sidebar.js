// Feature 1: Deep Type Inference Engine
function generateTypes(json, rootName = "RootObject") {
  const interfaces = [];
  const processedObjects = new Set();

  function parseObject(obj, name) {
    if (processedObjects.has(JSON.stringify(obj))) return;
    
    let interfaceStr = `interface ${name} {\n`;
    
    for (const key in obj) {
      const value = obj[key];
      const type = typeof value;

      if (value === null) {
        interfaceStr += `  ${key}?: any;\n`;
      } else if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object') {
          const subName = capitalize(key.slice(0, -1)); // projects -> Project
          interfaceStr += `  ${key}: ${subName}[];\n`;
          parseObject(value[0], subName);
        } else {
          interfaceStr += `  ${key}: ${typeof value[0] || 'any'}[];\n`;
        }
      } else if (type === 'object') {
        const subName = capitalize(key);
        interfaceStr += `  ${key}: ${subName};\n`;
        parseObject(value, subName);
      } else {
        interfaceStr += `  ${key}: ${type};\n`;
      }
    }
    
    interfaceStr += `}\n`;
    interfaces.push(interfaceStr);
  }

  parseObject(json, rootName);
  return interfaces.reverse().join('\n');
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Feature 2: API Client Gen
function generateFetchCode(rootName, url) {
  return `
export async function get${rootName}(): Promise<${rootName}> {
  const response = await fetch("${url}");
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}
  `.trim();
}

// Sidebar UI Interaction
document.getElementById('generate-btn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => document.body.innerText,
  }, (results) => {
    try {
      const rawData = JSON.parse(results[0].result);
      const types = generateTypes(rawData);
      const fetchCode = generateFetchCode("RootObject", tab.url);
      
      document.getElementById('output').textContent = types + "\n\n" + fetchCode;
    } catch (e) {
      alert("No valid JSON found on this page!");
    }
  });
});

// Feature 4: Export (Clipboard)
document.getElementById('copy-btn').addEventListener('click', () => {
  const code = document.getElementById('output').textContent;
  navigator.clipboard.writeText(code);
  alert("Code copied to clipboard!");
});