import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  async getCats() {
    let url = `https://api.thecatapi.com/v1/images/search?limit=15`;
    try {
      let res = await fetch(url, {
        headers: {
          'x-api-key': process.env.CAT_API_KEY,
        },
      });
      return res.json();
    } catch (err) {
      console.log(`getCats:`, err);
      throw err;
    }
  }
}
