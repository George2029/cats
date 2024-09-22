import { useEffect, useState } from 'react';
import { fetchCats } from './api';

function App() {
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    const loadCats = async () => {
      try {
        const fetchedCats: Cat[] = await fetchCats();
        console.log(fetchedCats);
        fetchedCats.length && setCats(fetchedCats);
      } catch (err) {
        console.log(`error loading cats`);
        console.log(err);
      }
    };
      loadCats();
  }, []);


  return (

    <div>
      <h1>All Cats</h1>
      <div>
        {cats.map(cat => (
          <div key={cat.id}>
            <img width={cat.width} height={cat.height} alt="" src={cat.url} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
