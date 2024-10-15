import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLikes, deleteLike } from "./api";

function Favourites() {
  const [likes, setLikes] = useState<Like[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load_likes = async () => {
      try {
        const fetche_likes: Like[] | null = await fetchLikes(navigate);
        if (fetche_likes) {
          setLikes(fetche_likes);
        }
      } catch (err) {
        console.log(`error loading cats`, err);
      }
    };
    load_likes();
  }, []);

  return (
    <div className="mx-6 my-4 xl:mx-14 xl:my-10">
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {likes.map((like) => (
          <div key={like.cat_id} className="group">
            <div className="aspect-square group-hover:scale-110 transition-transform relative hover:rounded-sm hover:shadow-xl">
              <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="#ef4444"
                  className="size-12 fill-red-500"
                  onClick={async () => {
                    await deleteLike(like.cat_id, navigate);
                    console.log(like.cat_id);
                    console.log(
                      likes.filter((item) => item.cat_id !== like.cat_id),
                    );
                    setLikes(
                      likes.filter((item) => item.cat_id !== like.cat_id),
                    );
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </div>
              <img
                className="w-full h-full object-cover"
                alt="cat"
                src={like.url}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;
