/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#9333EA',
        neutral: {
          100: '#F5F5F5',
          200: '#E5E5E5',
          500: '#888888',
          900: '#333333',
        },
        success: '#28A745',
        error: '#DC3545',
        'profile-page-bg': '#f3f5fa',
        'profile-card-bg': '#ffffff',
        'profile-primary': '#4f46e5',
        'profile-primary-hover': '#4338ca',
        'profile-text-main': '#111827',
        'profile-text-muted': '#6b7280',
        'profile-icon-bg': '#eef2ff',
        'profile-icon': '#4f46e5',
      },

      borderRadius: {
        card: '1.25rem',
        pill: '9999px',
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1025px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
};
