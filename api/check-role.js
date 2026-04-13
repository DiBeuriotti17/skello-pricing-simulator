export default function handler(req, res) {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Missing email parameter' });
    }

    const asEmails = (process.env.AS_EMAILS || '')
        .split(',')
        .map(e => e.trim().toLowerCase())
        .filter(Boolean);

    const role = asEmails.includes(email.toLowerCase()) ? 'as' : 'sales';

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ role });
}
