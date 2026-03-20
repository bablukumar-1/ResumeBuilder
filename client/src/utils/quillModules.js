export const quillModules = {
  toolbar: [
    [{ 'size': ['small', false, 'large', 'huge'] }], // Font sizes
    [{ 'header': [1, 2, 3, 4, false] }],           // Header sizes
    ['bold', 'italic', 'underline', 'strike'],     // Toggles
    [{ 'color': [] }, { 'background': [] }],       // Colors
    [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
    [{ 'align': [] }],                             // Alignment
    ['link', 'clean']                              // Link & Clean styling
  ]
};

export const quillFormats = [
  'size', 'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'list', 'bullet',
  'align',
  'link'
];
