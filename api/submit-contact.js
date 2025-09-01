// Vercel Serverless Function for Contact Form Submission
const twilio = require('twilio');

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { name, email, phone, course, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !course) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and course are required' 
            });
        }

        // Twilio WhatsApp configuration from environment variables
        const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
        const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
        const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
        const YOUR_WHATSAPP_NUMBER = process.env.YOUR_WHATSAPP_NUMBER || 'whatsapp:+923107088568';

        if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
            console.error('Missing Twilio credentials');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            });
        }

        // Initialize Twilio client
        const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

        // Send WhatsApp message via Twilio
        const whatsappMessage = `🎓 *New Contact Form Submission - SparkHer Tech Academy*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone || 'Not provided'}
🎯 *Course Interest:* ${course}

💬 *Message:*
${message || 'No additional message'}

---
Sent from SparkHer Tech Academy website
Time: ${new Date().toLocaleString()}`;

        try {
            const whatsappResponse = await client.messages.create({
                body: whatsappMessage,
                from: TWILIO_WHATSAPP_FROM,
                to: YOUR_WHATSAPP_NUMBER
            });
            
            console.log('✅ WhatsApp message sent successfully:', whatsappResponse.sid);
        } catch (whatsappError) {
            console.error('❌ WhatsApp sending failed:', whatsappError.message);
            // Continue anyway - don't fail the whole request
        }

        console.log('New contact form submission processed:', {
            name,
            email,
            phone,
            course,
            message
        });

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Message sent successfully! We will contact you soon.'
        });

    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
}
