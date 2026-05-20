import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AxiosFilter() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data));
  }, []);

  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="title">User Search</h2>

      <input
        className="searchInput"
        placeholder="Search by name or email..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <p className="count">
        Showing {filtered.length} users
      </p>

      <div className="list">
        {filtered.map(user => (
          <div key={user.id} className="card">
            <strong>{user.name}</strong>
            <div className="email">{user.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}