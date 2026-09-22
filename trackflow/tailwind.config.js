/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: { colors: { ink:'#183C3B', muted:'#718482', cream:'#F5F8F5', line:'#DCE6E2', mint:'#CFE9DF', yellow:'#F4C95D' }, fontFamily: { sans:['DM Sans','sans-serif'], serif:['Fraunces','serif'], mono:['DM Mono','monospace'] }, boxShadow: { soft:'0 8px 25px rgba(24,60,59,.05)', card:'0 6px 20px rgba(24,60,59,.08)' } } },
  plugins: []
}
