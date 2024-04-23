import bc from "bcrypt";

export const compare = (password: string, toComparePassoword:string)=>{
   return bc.compare(
    password,
    toComparePassoword
   )
}

export const bcrypt ={
    compare,
}

/**
 * o ideal é que em testes unitarios testemos só codigo, não libs ou ...
 * por isso criamos o nosso proprio compare.
 * 
 * Além de que agora eu encapsulei esta função do bcrypt e posso tbm complementa-la 
 * se eu quiser 
 * 
 * como log.info , ....
 */