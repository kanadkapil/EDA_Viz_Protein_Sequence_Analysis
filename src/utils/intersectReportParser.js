
/**
 * Utility to parse the Pandas Profiling HTML report (intersectr.html)
 * and extracting structured data for the React application.
 */

export const fetchAndParseReport = async (url = '/intersectr.html') => {
  try {
    const response = await fetch(url);
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    return {
      overview: extractOverview(doc),
      variables: extractVariables(doc),
      sample: extractSampleTable(doc),
    };
  } catch (error) {
    console.error("Failed to parse report:", error);
    return null;
  }
};

const extractOverview = (doc) => {
  const overview = {};
  
  // Find all tables with class 'stats'
  const statsTables = doc.querySelectorAll('table.stats');
  
  statsTables.forEach(table => {
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
          const th = row.querySelector('th');
          const td = row.querySelector('td');
          
          if (th && td) {
              // Standard format: <th>Label</th><td>Value</td>
              let key = th.textContent.trim();
              let value = td.textContent.trim();
              // Prevent overwriting if multiple tables have same keys (unlikely in overview but possible)
              if (!overview[key]) {
                  overview[key] = value;
              }
          } else {
             // Fallback for td-td structure
             const cells = row.querySelectorAll('td');
             if (cells.length >= 2) {
                 overview[cells[0].textContent.trim()] = cells[1].textContent.trim();
             }
          }
      });
  });

  return overview;
};

const extractVariables = (doc) => {
    const variables = {};
    // iterate over variable sections. Usually they are linked by anchor tags or specific container classes.
    // Based on the file view, we saw ids like 'pp_var_...' and sections for specific variables.
    
    // We will target specific variables we know exist: seq, sst8
    // In a full implementation, we'd scan all.
    
    const varContainers = doc.querySelectorAll('.variable');
    
    varContainers.forEach(container => {
        const titleEl = container.querySelector('p.h4, h4');
        if (!titleEl) return;
        
        const name = titleEl.getAttribute('title') || titleEl.textContent.trim().split('\n')[0];
        
        // Extract basic stats
        const stats = {};
        const statsTable = container.querySelector('table.stats');
        if (statsTable) {
            statsTable.querySelectorAll('tr').forEach(tr => {
                const th = tr.querySelector('th');
                const td = tr.querySelector('td');
                if (th && td) {
                    stats[th.textContent.trim()] = td.textContent.trim();
                }
            });
        }

        // Extract frequency table (standard pandas profiling structure)
        const freqTable = container.querySelector('table.freq, table.mini.freq');
        const frequency = [];
        if (freqTable) {
            const rows = freqTable.querySelectorAll('tr');
            rows.forEach(row => {
                // Determine if it's the full freq table or mini
                const cells = row.querySelectorAll('td, th'); 
                // mini freq table has th for value, full has td for value
                
                if (cells.length >= 2) {
                    // Try to handle both formats. 
                    // Full: Value, Count, Frequency
                    // Mini: Value, Count (bar)
                    
                    let label = cells[0].textContent.trim();
                    if(cells[0].getAttribute('title')) label = cells[0].getAttribute('title');
                    
                    // Count is often in the second cell, sometimes mixed with a bar div
                    let countText = cells[1].textContent.trim();
                    // Remove % if present to just get raw number if possible, or parse logic
                    
                    // Simple heuristic for now
                    frequency.push({ label, value: countText });
                }
            });
        }

        variables[name] = {
            name,
            stats,
            frequency
        };
    });

    return variables;
};

const extractSampleTable = (doc) => {
    // We saw id="sample-container" in the file view
    const sampleContainer = doc.querySelector('#sample-container');
    if (!sampleContainer) return [];

    const table = sampleContainer.querySelector('table.sample');
    if (!table) return [];

    const headers = [];
    table.querySelectorAll('thead th').forEach(th => headers.push(th.textContent.trim()));

    const rows = [];
    table.querySelectorAll('tbody tr').forEach(tr => {
        const rowData = {};
        tr.querySelectorAll('td').forEach((td, index) => {
            if (headers[index]) {
                rowData[headers[index]] = td.textContent.trim();
            }
        });
        rows.push(rowData);
    });

    return { headers, rows };
};
