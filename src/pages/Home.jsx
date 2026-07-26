function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <header>
        <h1>Student Portfolio</h1>
        <h2>Name: Sirf Vadukiya</h2>
      </header>

      <hr />

      <main>
        <section>
          <h3>About Me</h3>
          <p>
            I am a B.Tech Information Technology student at CHARUSAT
            University. I am passionate about web development, software
            engineering, machine learning, photography, and cinematography.
            I enjoy building real-world projects and learning new technologies.
          </p>
        </section>

        <hr />

        <section>
          <h3>Core Technical Skills</h3>

          <dl>
            <dt><strong>Frontend Development</strong></dt>
            <dd>HTML, CSS, JavaScript, React</dd>

            <br />

            <dt><strong>Programming Languages</strong></dt>
            <dd>Python, Java, C++</dd>

            <br />

            <dt><strong>Databases & Tools</strong></dt>
            <dd>MySQL, Git, GitHub</dd>
          </dl>
        </section>
      </main>

      <hr />

      <footer>
        <p>&copy; 2026 Student Portfolio</p>
      </footer>
    </div>
  );
}

export default Home;