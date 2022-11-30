import axios from 'axios';
import { Request, Response } from 'express';

const getFullMenu = async (req: Request, res: Response) => {
  const {restaurantId, menuName} = req.params;
  try {
    const restaurant = await axios.get(
      `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}/menus/${menuName}/full.json`
      );
    return res.status(200).json(restaurant.data);
  }
  catch (err) {
    const error = err as Error
    return res.status(400).send(error.message)
  }
};

export default getFullMenu;