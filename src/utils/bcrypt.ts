import bc from 'bcrypt';

export const compare = (password: string, toComparePassword: string) => {
  return bc.compare(
    password,
    toComparePassword,
  );
}

export const bcrypt = {
  compare,
}
