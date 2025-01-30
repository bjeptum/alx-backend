import express from 'express';
import { createClient } from 'redis';  // Correct import for Redis v4.x
import { promisify } from 'util';

const app = express();
const port = 1245;

const redisClient = createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

redisClient.connect().catch(console.error);

const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

app.get('/list_products', (req, res) => {
  const products = listProducts.map(product => ({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock
  }));
  res.json(products);
});

app.get('/list_products/:itemId', async (req, res) => {
  const productId = parseInt(req.params.itemId);
  const product = getItemById(productId);

  if (!product) {
    return res.status(404).json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(productId);
  res.json({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
    currentQuantity: product.stock - reservedStock
  });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const productId = parseInt(req.params.itemId);
  const product = getItemById(productId);

  if (!product) {
    return res.status(404).json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(productId);

  if (reservedStock >= product.stock) {
    return res.status(400).json({ status: 'Not enough stock available', itemId: product.id });
  }

  await reserveStockById(productId, reservedStock + 1);
  res.json({ status: 'Reservation confirmed', itemId: product.id });
});

function getItemById(id) {
  return listProducts.find(product => product.id === id);
}

async function getCurrentReservedStockById(itemId) {
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock) : 0;
}

async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
