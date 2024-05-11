import { createClient } from 'redis';
import { promisify } from 'util';

// Below class represents a Redis client
class RedisClient {
  // Constructor creates a new class instance
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: ${error}`);
        });
  }

  /**
   * Checks if client connection to redis server is alive
   * @returns {boolean}
   */
  isAlive() {
    if (this.client.connected) {
      return true;
        }
    return false;
  }

  /**
   * Gets the value of a given key.
   * @param {String} key: the key of the item to get
   * @returns {String | Object}
   */
  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    const value = await getAsync(key);
    return value;
  }

  /**
   * Stores a key and value along with expiration time
   * @param {String} key: The key of the item to store
   * @param {String | Number | Boolean} value: The item to store
   * @param {Number} duration: Expiration time of the item in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    const setAsync = promisify(this.client.set).bind(this.client);
    await setAsync(key, value);
    await this.client.expire(key, time);
  }

  /**
   * Deletes the value of a given key.
   * @param {String} key: The key of the item to remove
   * @returns {Promise<void>}
   */
  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
