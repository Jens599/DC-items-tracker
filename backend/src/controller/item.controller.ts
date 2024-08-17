import { Request, Response } from 'express';
import Item from '../model/item.model';
import { isValidObjectId } from 'mongoose';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    if (items.length === 0)
      return res.status(404).json({ message: 'No items present in database.' });

    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const addItem = async (req: Request, res: Response) => {
  const { name, description, owner, powers, origin } = req.body;

  try {
    const item = await Item.create({
      name,
      description,
      owner,
      powers,
      origin,
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).json({ error: 'Invalid ID' });

  try {
    const result = await Item.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res
      .status(200)
      .json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).json({ error: 'Invalid ID' });

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) return res.status(404).json({ error: 'Item not found.' });

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
