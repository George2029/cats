interface Cat {
  cat_id: string;
  created_at?: string;
}

interface LikeResponse {
  data: Cat[];
}

interface User {
  login: string;
  password: string;
}
