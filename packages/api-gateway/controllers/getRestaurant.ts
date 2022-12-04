import axios from 'axios';
import { Request, Response } from 'express';
import {z} from 'zod';
import cache from '../cache/RestaurantCache';

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
      const data = cache.get(`${restaurantId}?${cursor}`);
      return res.status(200).json(data);
    }
    const response = await axios.get(
      `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}.json`
      );

    const promise = response.data.menus
    .slice((cursor - 1) * 10, ((cursor - 1) * 10) + 10)
    .map(async (menu:any) => {
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
    if (menuResult.length < 10)
      cache.set("isGetAll", true);

    if (menuResult.length > 0) {
      const sortMenu = menuResult.sort((a:any, b:any) => {
        return b.sold - a.sold;
      })
      if (cache.has("popular")) 
      {
        const temp: any = cache.get("popular");
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

    cache.set(`${restaurantId}?${cursor}`, data);

    return res.status(200).json(data);
  }
  catch (err) {
    const error = err as Error
    if (error.message === "Request failed with status code 404")
      return res.status(404).send(error.message)
    return res.status(400).send(error.message)
  }
};

export default getRestaurant;