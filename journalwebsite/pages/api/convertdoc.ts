//requires libreoffice to be installed on the server
import { NextApiRequest, NextApiResponse } from 'next'
const libre = require('libreoffice-convert');

libre.convertAsync = require('util').promisify(libre.convert);
const fs = require('fs');
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let file = req.body.file;
    let buffer = Buffer.from(file, 'base64');
    const result = await libre.convertAsync(buffer, '.pdf', undefined);
    res.send(result.toString('base64'));
}
