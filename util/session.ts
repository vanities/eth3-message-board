export const password = 'cc41594387e4f9afd86c46ceafc308516a93c7c330a12ba390227beacfe1ff9a';

export const Session = {
  cookieName: 'printer',
  password,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
