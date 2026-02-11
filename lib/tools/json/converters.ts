import yaml from 'js-yaml';
import TOML from 'smol-toml';

export function jsonToYaml(jsonString: string): string {
  const jsonObj = JSON.parse(jsonString);
  return yaml.dump(jsonObj, { indent: 2, lineWidth: -1 });
}

export function yamlToJson(yamlString: string): string {
  const jsonObj = yaml.load(yamlString);
  return JSON.stringify(jsonObj, null, 2);
}

export function jsonToToml(jsonString: string): string {
  const jsonObj = JSON.parse(jsonString);
  return TOML.stringify(jsonObj);
}

export function formatJson(jsonString: string, indent: number = 2): string {
  const jsonObj = JSON.parse(jsonString);
  return JSON.stringify(jsonObj, null, indent);
}

export function minifyJson(jsonString: string): string {
  const jsonObj = JSON.parse(jsonString);
  return JSON.stringify(jsonObj);
}

export function validateJson(jsonString: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON' 
    };
  }
}

export function csvToJson(csvString: string): string {
  const lines = csvString.trim().split('\n');
  if (lines.length === 0) {
    throw new Error('Empty CSV');
  }

  const headers = lines[0].split(',').map(h => h.trim());
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const obj: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    
    result.push(obj);
  }

  return JSON.stringify(result, null, 2);
}

export function jsonDiff(json1: string, json2: string): string {
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);
  
  const differences: string[] = [];
  
  function compare(o1: any, o2: any, path: string = '') {
    const keys1 = Object.keys(o1 || {});
    const keys2 = Object.keys(o2 || {});
    const allKeys = new Set([...keys1, ...keys2]);
    
    allKeys.forEach(key => {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (!(key in o1)) {
        differences.push(`+ Added: ${currentPath} = ${JSON.stringify(o2[key])}`);
      } else if (!(key in o2)) {
        differences.push(`- Removed: ${currentPath} = ${JSON.stringify(o1[key])}`);
      } else if (typeof o1[key] === 'object' && typeof o2[key] === 'object') {
        compare(o1[key], o2[key], currentPath);
      } else if (o1[key] !== o2[key]) {
        differences.push(`~ Changed: ${currentPath}\n  Old: ${JSON.stringify(o1[key])}\n  New: ${JSON.stringify(o2[key])}`);
      }
    });
  }
  
  compare(obj1, obj2);
  
  return differences.length > 0 
    ? differences.join('\n\n') 
    : 'No differences found';
}
