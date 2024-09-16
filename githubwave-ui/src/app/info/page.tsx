'use client';
import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash, FaWaveSquare } from 'react-icons/fa';
import styles from './page.module.css';

type User = {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  location: string;
  twitter_username: string;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
};

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
};

const GithubUser = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(6); // Default per page

  const fetchUser = async () => {
    setLoading(true);
    try {
      const userResponse = await fetch(`http://localhost:8080/api/gitwave/v1/github/user/${username}`);
      const userData = await userResponse.json();
      setUser(userData);

      const reposResponse = await fetch(`http://localhost:8080/api/gitwave/v1/github/repos/?page=${page}&perPage=${perPage}&username=${username}`);
      const reposData = await reposResponse.json();

      // Ordena repos por descrição e exibe os que têm descrição primeiro
      const sortedRepos = reposData.sort((a: Repo, b: Repo) => (b.description ? 1 : -1));
      setRepos(sortedRepos);
    } catch (error) {
      console.error('Error fetching data', error);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setPage(1); // Reset page to 1 when a new search is made
      fetchUser();
    }
  };

  const handleRepoClick = (url: string) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (page > 1 && username) {
      fetchUser(); // Refetch repos when page changes
    }
  }, [page]);

  return (
    <div className={styles.container}>
      <form className={styles.searchContainer} onSubmit={handleSearch}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className={styles.searchButton} type="submit">
          <FaSearch size={20} />
        </button>
        <button className={styles.clearButton} onClick={() => setUsername('')}>
          <FaTrash size={20} />
        </button>
      </form>

      {loading ? (
        <div className={styles.spinner}></div> // Spinner no lugar do Skeleton
      ) : (
        user && (
          <div className={styles.userCard}>
            <img src={user.avatar_url} alt="User avatar" className={styles.avatar} />
            <h2 className={styles.username}>{user.name || user.login}</h2>
            <p className={styles.bio}>{user.bio || 'No bio available'}</p>
            <p className={styles.location}>{user.location || 'No location'}</p>
            {user.twitter_username && (
              <p className={styles.twitter}>
                Twitter: <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">@{user.twitter_username}</a>
              </p>
            )}
            {user.blog && (
              <p className={styles.blog}>
                Blog: <a href={user.blog} target="_blank" rel="noopener noreferrer">{user.blog}</a>
              </p>
            )}
            <p className={styles.stats}>
              <span>Repos: {user.public_repos}</span> | <span>Followers: {user.followers}</span> | <span>Following: {user.following}</span>
            </p>
          </div>
        )
      )}

      <div className={styles.repoGrid}>
        {loading ? (
          Array(perPage).fill(0).map((_, index) => (
            <div key={index} className={styles.repoCardLoading}>
              <div className={styles.spinner}></div>
            </div>
          ))
        ) : (
          repos.map((repo) => (
            <div
              key={repo.id}
              className={styles.repoCard}
              onClick={() => handleRepoClick(repo.html_url)}
            >
              <div className={styles.repoLabel}>
                <FaWaveSquare className={styles.repoIcon} size={20} />
                <span className={styles.repoLabelText}>GitWave</span>
              </div>
              <h3>{repo.name}</h3>
              <p>{repo.description || 'No description available'}</p>
            </div>
          ))
        )}
      </div>

      {!loading && repos.length > 0 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            className={styles.pageButton}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

      <div className={styles.perPageContainer}>
        <span className={styles.perPageLabel}>Items per page:</span>
        <select
          className={styles.perPageSelect}
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
        </select>
      </div>
    </div>
  );
};

export default GithubUser;
