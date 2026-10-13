
import { useState } from 'react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setStatus('');
    setBusy(true);

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');

      setStatus(data.message);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus(err.message || 'Could not connect to the backend.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <header>
        <div className="wrap nav">
          <strong>Karunya Ahire · Portfolio</strong>
          <nav className="navlinks">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a href="http://localhost:5000/api-docs" target="_blank" rel="noreferrer">API docs</a>
          </nav>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <div className="hero-text">
            <span className="tag">BE Computer · MERN Stack Developer</span>
            <h1>Building useful things for the web.</h1>
            <p>
              Hi, I'm Karunya Nalinchandra Ahire. I build responsive
              interfaces and full-stack web applications using React,
              Node.js, Express, and MongoDB.
            </p>
            <div className="hero-buttons">
              <a href="#projects"><button>View projects</button></a>
              <a href="#contact">Contact me ↗</a>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="/profile.jpeg"
              alt="Karunya Ahire"
              className="profile-photo"
            />
          </div>
        </section>

        <section id="about" className="card">
          <h2>About Me</h2>
          <p>
            I'm a final-year BE Computer Engineering student interested
            in practical web development, clean interfaces, and building
            useful applications through hands-on projects.
          </p>
          <p className="muted">
            Education: BE Computer Engineering · Current focus: MERN stack
          </p>
        </section>

        <section id="skills">
          <h2>Skills</h2>
          <div className="grid">
            {[
              'HTML & CSS',
              'JavaScript',
              'React',
              'Node.js',
              'Express.js',
              'MongoDB',
              'Git & GitHub'
            ].map(skill => (
              <div className="card" key={skill}>
                <strong>{skill}</strong>
                <p className="muted">Practicing through projects</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <div className="grid">
            {[
              ['Personal Portfolio', 'Responsive portfolio and contact API.'],
              ['Task Management System', 'Task tracking application.'],
              ['E-commerce Platform', 'Products, cart, and order management.']
            ].map(([title, description]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-grid">
          <div className="card">
            <h2>Let's work together</h2>
            <p>Have an opportunity or project idea? Send me a message.</p>
            <p>Email: karunyaahire18@gmail.com</p>
            <p>Location: Maharashtra, India</p>
          </div>

          <form className="card" onSubmit={submit}>
            <h2>Send a message</h2>
            {status && <div className="notice">{status}</div>}

            <label>
              Name
              <input
                required
                maxLength="100"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </label>

            <label>
              Email
              <input
                required
                type="email"
                maxLength="254"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </label>

            <label>
              Message
              <textarea
                required
                rows="5"
                maxLength="3000"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </label>

            <button disabled={busy}>
              {busy ? 'Sending…' : 'Send message ↗'}
            </button>
          </form>
        </section>
      </main>

      <footer>
        <div className="wrap">
          © {new Date().getFullYear()} Karunya Ahire · Portfolio
        </div>
      </footer>
    </>
  );
}
