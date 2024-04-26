import { config } from 'dotenv';

export default async function() {
  config({
    path: '.env.test',
  });
}

/**com este config do dotenv nos dizemos a nosso teste para usar
 *  o dotenv de test para assim usar o banco de teste */