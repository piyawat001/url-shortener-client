import { useEffect, useState } from 'react';
import { getLinks, createLink, logout } from '../api';

export default function Links({ onLogout }) {
  const [links, setLinks] = useState([]);
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const fetchLinks = async () => {
    const data = await getLinks(1);
    setLinks(data);
  };

  useEffect(() => { fetchLinks(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createLink(longUrl, shortUrl);
    setLongUrl(''); setShortUrl('');
    fetchLinks();
  };

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <div>
      <h2>My Links</h2>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleCreate}>
        <input placeholder="Long URL" value={longUrl} onChange={e => setLongUrl(e.target.value)} />
        <input placeholder="Short URL" value={shortUrl} onChange={e => setShortUrl(e.target.value)} />
        <button type="submit">Create</button>
      </form>
      <ul>
        {links.map(link => (
          <li key={link._id}>
            <a href={link.longUrl} target="_blank">{link.shortUrl}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
