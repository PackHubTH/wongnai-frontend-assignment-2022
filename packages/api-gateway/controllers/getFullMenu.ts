import axios from 'axios';
import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import {z} from 'zod';

const cache = new NodeCache({ stdTTL: 300});
const mySchema = z.object({
  restaurantId: z.string().regex(/^[0-9]+$/),
  menuName: z.string()
})

const getFullMenu = async (req: Request, res: Response) => {
  try {
    const {restaurantId, menuName} = req.params;
    mySchema.parse({restaurantId, menuName});
    if (cache.has(`${restaurantId}/${menuName}`)) {
      console.log('cache hit');
      const data = cache.get(`${restaurantId}/${menuName}`);
      // const nextCursor = cursor + 1;
      return res.status(200).json(data);
    }
    const response = await axios.get(
      `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}/menus/${menuName}/full.json`
      );
      console.log('full menu fetch data', response.data);
      cache.set(`${restaurantId}/${menuName}`, response.data);
    return res.status(200).json(response.data);
  }
  catch (err) {
    const error = err as Error
    return res.status(400).send(error.message)
  }
};

export default getFullMenu;