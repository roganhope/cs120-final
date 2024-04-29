const axios = require('axios');

async function translateTextToEnglish(req, res, next) {
    const { text } = req.body; // Extract text to translate from request body

    const encodedParams = new URLSearchParams();
    encodedParams.set('from', 'auto');
    encodedParams.set('to', 'en');
    encodedParams.set('text', text);

    const options = {
        method: 'POST',
        url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '6452f0cc25mshcc6433f37aac7adp1e8259jsn5c0c8e5f9abd',
            'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        // Attach the translated text to the request object
        req.translatedText = response.data;
        // Send the translated text as the response
        res.json({ translatedText: response.data });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ error: 'An error occurred while translating text' });
    }
}

async function translateTextToSpanish(req, res, next) {
    const { text } = req.body; // Extract text to translate from request body

    const encodedParams = new URLSearchParams();
    encodedParams.set('from', 'auto');
    encodedParams.set('to', 'es');
    encodedParams.set('text', text);

    const options = {
        method: 'POST',
        url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '6452f0cc25mshcc6433f37aac7adp1e8259jsn5c0c8e5f9abd',
            'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        // Attach the translated text to the request object
        req.translatedText = response.data;
        // Send the translated text as the response
        res.json({ translatedText: response.data });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ error: 'An error occurred while translating text' });
    }
}

module.exports = {translateTextToEnglish, translateTextToSpanish};
