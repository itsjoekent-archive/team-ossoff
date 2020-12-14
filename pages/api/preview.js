export default function handler(req, res) {
  if (process.env.NEXT_PUBLIC_DRAFT_MODE) {
    res.setPreviewData({ maxAge: Math.Infinity });
    res.redirect('/');
    return;
  }

  res.redirect('/');
}
