import axios from 'axios';
import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import {z} from 'zod';

const cache = new NodeCache({ stdTTL: 300});
const mySchema = z.object({
  restaurantId: z.string().regex(/^[0-9]+$/),
})

const getRestaurant = async (req: Request, res: Response) => {

  try {
    const restaurantId:string = req.params.restaurantId;
    mySchema.parse(req.params)

    if (cache.has(restaurantId)) {
      console.log('cache hit');
      return res.status(200).json(cache.get(restaurantId));
    }
    const response = await axios.get(
      `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}.json`
      );

    const promise = response.data.menus.map(async (menu:any) => {
      let response = await axios.get(
        `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}/menus/${menu}/short.json`
        );
        return response.data;
    })
    const menuResult = await Promise.all(promise);

    //sort menuResult by sold
    menuResult.sort((a:any, b:any) => {
      return b.sold - a.sold;
    })

    const data = {
      ...response.data,
      menus: menuResult
    }

    // return res.status(200).send(data);
    console.log('cache miss');
    cache.set(restaurantId, data);
    return res.status(200).json(data);
  }
  catch (err) {
    const error = err as Error
    return res.status(400).send(error.message)
  }
};

export default getRestaurant;