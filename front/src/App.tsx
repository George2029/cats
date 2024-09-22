import { useEffect, useState } from 'react';
import { fetchCats, addLike, removeLike, createUser } from './api';

function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [favorites, setFavorites] = useState<Cat[]>([]);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const loadCats = async () => {
      try {
        const fetchedCats = await fetchCats();
        !fetchedCats.length && setCats(fetchedCats);
      } catch (err) {
        console.log(`error loading cats`);
        console.log(err);
      }
    };
      loadCats();
  }, []);

  const handleAddToFavorites = async (cat_id: string) => {
    await addLike(cat_id);
    const newFavorite = cats.find(cat => cat.cat_id === cat_id);
    if (newFavorite) {
      setFavorites([...favorites, newFavorite]);
    }
  };

  const handleRemoveFromFavorites = async (cat_id: string) => {
    await removeLike(cat_id);
    setFavorites(favorites.filter(cat => cat.cat_id !== cat_id));
  };

  const handleCreateUser = async () => {
    await createUser(login, password);
  };

  return (
    <div>
      <h1>All Cats</h1>
      <div>
        {cats.map(cat => (
          <div key={cat.cat_id}>
            <span>{cat.cat_id}</span>
            <button onClick={() => handleAddToFavorites(cat.cat_id)}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>

      <h2>Favorite Cats</h2>
      <div>
        {favorites.map(cat => (
          <div key={cat.cat_id}>
            <span>{cat.cat_id}</span>
            <button onClick={() => handleRemoveFromFavorites(cat.cat_id)}>
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>

      <h3>Create User</h3>
      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={e => setLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
}

export default App;
