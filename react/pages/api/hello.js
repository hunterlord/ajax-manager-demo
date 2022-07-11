// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'POST') {
    setTimeout(() => {
      res.status(200).json({ name: req.body.username });
    }, 2000);
  }
}
