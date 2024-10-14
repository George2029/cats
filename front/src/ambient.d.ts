interface Cat {
  breeds: string[];
  id: string;
  url: string;
  width: number;
  height: number;
}

type CatsResponse = Cat[];

interface User {
  login: string;
  password: string;
}

type Like = {
  user_id: number;
  cat_id: string;
  url: string;
  created_at: string;
};
