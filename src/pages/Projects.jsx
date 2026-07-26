import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/facebook/repos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch repositories");
        }
        return res.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>GitHub Repositories</h1>

      {repos.map((repo) => (
        <div
          key={repo.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            margin: "15px"
          }}
        >
          <h3>{repo.name}</h3>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
          >
            {repo.html_url}
          </a>
        </div>
      ))}
    </div>
  );
}

export default Projects;