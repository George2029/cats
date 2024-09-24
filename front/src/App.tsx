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
    <div className="mx-3 my-2 xl:mx-10 xl:my-4">
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {cats.map(cat => (
          <div key={cat.id} className="aspect-square">
            <img className="w-full h-full" alt="cat" src={cat.url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
