import React from 'react';

const SERVICES = [
  {
    title: 'Frontend Engineering',
    body: 'React.js, Next.js, JavaScript (ES6+), Tailwind CSS, HTML5, and CSS3 for fast, responsive user interfaces.'
  },
  {
    title: 'Backend & Databases',
    body: 'Node.js, Express.js, REST APIs, MongoDB, MongoDB Atlas, and secure JWT Authentication architectures.'
  },
  {
    title: 'AI Integration',
    body: 'Semantic search, AI auto-tagging, conversational chatbots, and intelligent data retrieval workflows.'
  },
  {
    title: 'Full Stack & Deployment',
    body: 'End-to-end MERN & Next.js apps deployed on Vercel, Netlify, and Render with Git & GitHub.'
  }
];

export default function SubHeader() {
  return (
    <div className='w-full flex flex-col items-start text-left px-4 md:px-0'>
      <div className='w-full text-base md:text-lg lg:text-xl flex flex-col gap-3 leading-relaxed'>
        <p>Hi, I&apos;m Aditya Pallikonda, a Full Stack Developer specializing in React.js, Next.js, Node.js, and MongoDB.</p>
        <p>Currently pursuing my Master of Computer Applications (MCA) in Hyderabad, I build responsive interfaces integrated with scalable backends and AI-powered features like semantic search and conversational chatbots.</p>
      </div>
      <div className='about-inline-services w-full mt-8 md:mt-12'>
        <div className='about-inline-services__head'>
          <span className='about-inline-services__label'>CORE EXPERTISE</span>
        </div>
        <div className='about-inline-services__grid'>
          {SERVICES.map((s) => (
            <article key={s.title} className='about-inline-services__item'>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}