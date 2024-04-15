import 'express-async-errors'
import express from 'express';
import cors from 'cors';
import { routes } from './routes';

export const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err, req, res, next) => {
    if(err.statusCode !== 500){
        res.status(err.statusCode);
        return res.json( err )
    }
})



/**
 * yarn add express-async-errors
 * 
 * melhor o trabalho do express com requisições assincronas de erros
 */