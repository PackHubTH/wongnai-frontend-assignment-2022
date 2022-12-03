import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300});

export default cache;
