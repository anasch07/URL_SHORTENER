export default async function handler(req, res) {

    let result;
    const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.BITLY_TOKEN}`
        },
        body: JSON.stringify({
            long_url: req.body.long_url
        }
        )
    });
    if (response.ok) {
        result = await response.json();
        res.status(200).json(result);
    }
    else {
        result = await response.json();
        throw new Error(result.message);
    }
}
