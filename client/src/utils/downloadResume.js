/**
 * downloadResume.js
 * Utilities for downloading a resume as PDF or DOCX.
 */

/**
 * Download the resume element as a single-page PDF using html2pdf.js
 * @param {HTMLElement} element - The rendered resume DOM element
 * @param {string} filename - Output filename (without extension)
 */
export async function downloadAsPDF(element, filename = 'resume') {
  const html2pdf = (await import('html2pdf.js')).default;

  // Preserve original inline styles to restore later
  const originalWidth = element.style.width;
  const originalMaxWidth = element.style.maxWidth;
  const originalTransform = element.style.transform;

  // Force strict A4 pixel width (794px at 96 DPI) for consistent capture regardless of user screen size
  element.style.width = '794px';
  element.style.minWidth = '794px';
  element.style.maxWidth = '794px';
  element.style.transform = 'none';

  // --- POLYFILL: html2canvas has spotty support for CSS `gap`.
  // We dynamically convert all `gap` properties on flex elements to standard sibling margins
  // before PDF snapshot, so templates look perfectly spaced on export.
  const gapElements = [];
  const allElements = element.querySelectorAll('*');

  allElements.forEach((el) => {
    const computed = window.getComputedStyle(el);
    if (computed.display === 'flex' && computed.gap && computed.gap !== 'normal' && computed.gap !== '0px') {
      const parts = computed.gap.split(' ');
      const rowGap = parseFloat(parts[0]) || 0;
      const colGap = parseFloat(parts[1] || parts[0]) || 0;
      
      const isCol = computed.flexDirection.includes('column');
      const children = Array.from(el.children);
      
      const childOriginals = children.map(child => ({
        el: child,
        marginRight: child.style.marginRight,
        marginBottom: child.style.marginBottom
      }));

      gapElements.push({ el, originalGap: el.style.gap, children: childOriginals });

      children.forEach((child, idx) => {
        // Apply spacing to all except the last item in the flex line
        if (idx !== children.length - 1) {
          if (isCol) {
            const currentMb = parseFloat(window.getComputedStyle(child).marginBottom) || 0;
            child.style.marginBottom = `${currentMb + rowGap}px`;
          } else {
            const currentMr = parseFloat(window.getComputedStyle(child).marginRight) || 0;
            child.style.marginRight = `${currentMr + colGap}px`;
          }
        }
      });
      // Temporarily hide the actual gap so html2canvas doesn't double-dip if it partially supports it
      el.style.gap = '0px'; 
    }
  });

  const opt = {
    margin:       0,
    filename:     `${filename}.pdf`,
    image:        { type: 'jpeg', quality: 1 },
    html2canvas:  {
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true,
      allowTaint: true,
      windowWidth: 794,
    },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } finally {
    // Revert original styles immediately after capture so the UI doesn't break
    element.style.width = originalWidth;
    element.style.minWidth = '';
    element.style.maxWidth = originalMaxWidth;
    element.style.transform = originalTransform;

    // Revert flex gap polyfills
    gapElements.forEach(item => {
      item.el.style.gap = item.originalGap;
      item.children.forEach(child => {
        child.el.style.marginRight = child.marginRight;
        child.el.style.marginBottom = child.marginBottom;
      });
    });
  }
}

/**
 * Download the resume as a DOC file using native Blob
 * @param {HTMLElement} element - The rendered resume DOM element
 * @param {string} filename - Output filename (without extension)
 */
export async function downloadAsDOC(element, filename = 'resume') {
  // Capture the inner HTML of the resume and inline all computed styles
  const htmlContent = `
    <!DOCTYPE html>
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8">
        <style>
          @page { size: A4; margin: 0; }
          body { font-family: Calibri, Arial, sans-serif; margin: 0; padding: 0; width: 21cm; }
          * { box-sizing: border-box; }
          a { color: inherit; text-decoration: none; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>`;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
