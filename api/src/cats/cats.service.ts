import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  async getCats() {
    let url = `https://api.thecatapi.com/v1/images/search?limit=10`;
    try {
      let res = await fetch(url, {
        headers: {
          'x-api-key': process.env.CAT_API_KEY
        }
      })
      let json = await res.json()
      console.log(`json:`, json);
      return json;
    } catch (err) {
      console.log(`getCats:`, err);
      throw err;
    }
  }
}
