interface Cat {
  cat_id: string;
  created_at?: string;
}

type LikeResponse = Cat[];

interface User {
  login: string;
  password: string;
}
