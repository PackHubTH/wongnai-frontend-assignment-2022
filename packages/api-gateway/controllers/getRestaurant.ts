import axios from 'axios';
import { Request, Response } from 'express';
// import NodeCache from 'node-cache';
import {z} from 'zod';
import cache from '../cache/RestaurantCache';

// const cache = new NodeCache({ stdTTL: 300});
const mySchema = z.object({
  restaurantId: z.string().regex(/^[0-9]+$/),
  cursor: z.number().int().min(0)
})

const getRestaurant = async (req: Request, res: Response) => {

  try {
    const restaurantId:string = req.params.restaurantId;
    const cursor: number = Number(req.query.cursor) || 0;
    mySchema.parse({restaurantId, cursor});

    if (cache.has(`${restaurantId}?${cursor}`)) {
      console.log('cache hit');
      const data = cache.get(`${restaurantId}?${cursor}`);
      // const nextCursor = cursor + 1;
      return res.status(200).json(data);
    }
    const response = await axios.get(
      `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}.json`
      );
      // console.log('data', response.data.menus.length);

    const promise = response.data.menus
    .slice((cursor - 1) * 10, ((cursor - 1) * 10) + 10)
    .map(async (menu:any) => {
      // console.log('fetching menu', menu);
      try {
      let response = await axios.get(
        `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}/menus/${menu}/short.json`
        );
        return response.data;
      }
      catch (err) {
        const error = err as Error
        return res.status(400).send(error.message)
      }
    })
    const menuResult = await Promise.all(promise);
    // console.log('menuResult', menuResult.length);
    // console.log('menuResult', menuResult[0]);
    if (menuResult.length < 10)
      cache.set("isGetAll", true);

    //sort menuResult by sold
    if (menuResult.length > 0) {
      const sortMenu = menuResult.sort((a:any, b:any) => {
        return b.sold - a.sold;
      })
      console.log(sortMenu[0])
      if (cache.has("popular")) 
      {
        const temp: any = cache.get("popular");
        console.log('temp', temp);
        if (sortMenu[0].sold > temp.sold) 
          cache.set("popular", sortMenu[0]);
      }
      else
        cache.set("popular", sortMenu[0]);
    }

    

    const data = {
      ...response.data,
      menus: menuResult
    }

    // return res.status(200).send(data);
    console.log('cache miss', cursor);
    cache.set(`${restaurantId}?${cursor}`, data);

    // const nextCursor = cursor < Math.ceil(response.data.menus.length / 16) ? cursor + 1 : undefined;
    // console.log('nextCursor', nextCursor);

    // console.log('fetch data', data);

    return res.status(200).json(data);
  }
  catch (err) {
    const error = err as Error
    return res.status(400).send(error.message)
  }
};

export default getRestaurant;