import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600', '700'], display: 'swap' });

export const metadata = {
  title: 'Aditya Pallikonda | Full Stack Developer (MERN, Next.js & AI)',
  description: 'Portfolio of Aditya Pallikonda — Full Stack Developer specializing in React.js, Next.js, Node.js, MongoDB, and AI integration.',
};

const themeBootstrap = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} data-theme="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}