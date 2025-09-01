const express = require('express');
const cors = require('cors');
const path = require('path');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your frontend)
app.use(express.static('.'));

// Twilio WhatsApp configuration
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'your-twilio-account-sid';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || 'your-twilio-auth-token';
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'; // Twilio sandbox number
const YOUR_WHATSAPP_NUMBER = process.env.YOUR_WHATSAPP_NUMBER || 'whatsapp:+923107088568'; // Your WhatsApp number

// Initialize Twilio client
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

console.log('📱 Using Twilio WhatsApp API for contact form notifications');

// Contact form submission endpoint
app.post('/submit-contact', async (req, res) => {
    try {
        const { name, email, phone, course, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !course) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and course are required' 
            });
        }

        // Process contact form submission

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
            console.log('📝 Saving to file as backup...');
        }

        // Always save to file as backup
        const fs = require('fs');
        const timestamp = new Date().toISOString();
        const logEntry = `\n=== Contact Form Submission - ${timestamp} ===\n` +
                       `Name: ${name}\n` +
                       `Email: ${email}\n` +
                       `Phone: ${phone || 'Not provided'}\n` +
                       `Course: ${course}\n` +
                       `Message: ${message || 'No message'}\n` +
                       `=======================================\n`;
        
        try {
            fs.appendFileSync('contact-submissions.txt', logEntry);
            console.log('✅ Contact also saved to contact-submissions.txt file');
        } catch (fileError) {
            console.log('❌ File write failed, contact logged to console only');
        }

        console.log('New contact form submission processed:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Course:', course);
        console.log('Message:', message);

        // Send success response
        res.json({
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
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📱 WhatsApp notifications will be sent to: ${YOUR_WHATSAPP_NUMBER}`);
    console.log(`📁 Contact forms will also be saved to: contact-submissions.txt`);
    console.log(`⚙️  Configure your Twilio credentials in server.js or environment variables`);
});
