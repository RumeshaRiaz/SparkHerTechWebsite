# 📱 Twilio WhatsApp Setup Guide

## 🎯 Overview
Your contact form now sends WhatsApp messages directly to your phone using Twilio's API. This is much more reliable than email!

## 📋 Step-by-Step Setup

### 1. Create Twilio Account
1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up for a free account
3. Verify your phone number

### 2. Get Your Twilio Credentials
After signing up, you'll see your dashboard with:
- **Account SID** (starts with "AC...")
- **Auth Token** (click the eye icon to reveal)

### 3. Set Up WhatsApp Sandbox
1. In Twilio Console, go to **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Follow the instructions to join the sandbox:
   - Send a message like "join <your-sandbox-code>" to the Twilio WhatsApp number
   - Example: Send "join able-shadow" to +1 415 523 8886
3. Your sandbox WhatsApp number will be: **whatsapp:+14155238886**

### 4. Configure Your Server
Update the credentials in `server.js`:

```javascript
// Replace these with your actual Twilio credentials
const TWILIO_ACCOUNT_SID = 'your-actual-account-sid';
const TWILIO_AUTH_TOKEN = 'your-actual-auth-token';
const TWILIO_WHATSAPP_FROM = 'whatsapp:+14155238886'; // Twilio sandbox number
const YOUR_WHATSAPP_NUMBER = 'whatsapp:+923107088568'; // Your WhatsApp number
```

**Important:** Your WhatsApp number must include:
- Country code (92 for Pakistan)
- No spaces or dashes
- Format: `whatsapp:+923107088568`

### 5. Environment Variables (Recommended)
For better security, create a `.env` file:

```env
TWILIO_ACCOUNT_SID=your-actual-account-sid
TWILIO_AUTH_TOKEN=your-actual-auth-token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
YOUR_WHATSAPP_NUMBER=whatsapp:+923107088568
```

## 🧪 Testing

1. Start your server: `npm start`
2. Fill out the contact form on your website
3. You should receive a WhatsApp message instantly!

## 📱 Message Format
You'll receive messages like this:

```
🎓 *New Contact Form Submission - SparkHer Tech Academy*

👤 *Name:* Student Name
📧 *Email:* student@email.com  
📱 *Phone:* 03001234567
🎯 *Course Interest:* Web Design

💬 *Message:*
When do classes start?

---
Sent from SparkHer Tech Academy website
Time: 1/15/2024, 2:30:45 PM
```

## 🚀 For Production Deployment

### Upgrade to Paid Plan
- Free tier: $15 credit (good for testing)
- Paid: $0.005 per WhatsApp message
- No monthly fees, pay per message

### Get Approved WhatsApp Number
- Apply for your own WhatsApp Business number
- No more sandbox limitations
- Professional sender name

## 🔧 Troubleshooting

**Message not received?**
- Check if you joined the sandbox correctly
- Verify your WhatsApp number format
- Check Twilio console for error logs

**Sandbox expired?**
- Rejoin by sending the join message again
- Sandbox expires after 3 days of inactivity

## 📊 Benefits

✅ **Instant notifications** - Get messages immediately  
✅ **No email issues** - No SMTP or spam problems  
✅ **Mobile-first** - Perfect for business owners  
✅ **Reliable delivery** - 99% delivery rate  
✅ **Professional** - Branded messages  
✅ **Global reach** - Works worldwide  

Your contact form is now enterprise-grade! 🎉
