import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1>Delicious Discoveries</h1>
        <p>Explore, create, and savor healthy recipes from around the world</p>
      </Link>
    </header>
  );
}