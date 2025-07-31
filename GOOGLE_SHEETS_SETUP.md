# Google Sheets Integration Setup Guide

## 📋 Overview
This guide will help you set up Google Sheets integration to automatically capture all customer data from your Sassy Poonam website.

## 🚀 Step-by-Step Setup

### 1. Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Sassy Poonam - Customer Data"
4. Copy the Spreadsheet ID from the URL (the long string between /d/ and /edit)

### 2. Set Up Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Name it "Sassy Poonam Data Collection"
4. Replace the default code with the content from `google-sheets-integration.js`
5. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual spreadsheet ID
6. Replace `your-email@gmail.com` with your email address

### 3. Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set "Execute as" to "Me"
4. Set "Who has access" to "Anyone"
5. Click "Deploy"
6. Copy the Web App URL

### 4. Update Website Code
1. Open `src/components/RecordedVideosSection.tsx`
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL` with your Web App URL
3. Save the file

### 5. Set Up Automated Features
1. In Google Apps Script, run the `setupTriggers()` function once
2. This will create:
   - Daily summary emails at 9 PM
   - Hourly dashboard updates

## 📊 Data Collected

### Customer Information
- **Name**: Customer's full name
- **Phone**: WhatsApp/contact number
- **Item Type**: Video call or recorded video
- **Item Name**: Specific package/video name
- **Amount**: Payment amount in ₹
- **UPI ID**: Payment UPI ID
- **Payment Status**: Pending/Completed/Failed/Verification Submitted
- **Transaction ID**: Optional transaction reference
- **Additional Info**: Any extra notes
- **User Agent**: Browser/device info
- **IP Address**: Customer's IP (if available)
- **Timestamp**: Date and time of entry

## 📈 Features Included

### 1. CustomerData Sheet
- Automatic data capture
- Color-coded payment status
- Formatted timestamps and amounts
- Auto-resizing columns

### 2. Dashboard Sheet
- Total customers and revenue
- Video calls vs recorded videos breakdown
- Payment completion rates
- Recent transactions table
- Auto-updates every hour

### 3. Daily Email Reports
- Daily summary sent to your email
- Total orders and revenue
- Customer breakdown
- Recent customer list

## 🔧 Customization

### Change Email Frequency
Edit the `setupTriggers()` function:
```javascript
// For weekly reports instead of daily
ScriptApp.newTrigger('sendDailySummary')
  .timeBased()
  .everyWeeks(1)
  .create();
```

### Add More Data Fields
1. Update the headers array in `doPost()`
2. Add new fields to the `rowData` array
3. Update the website code to send the new data

### Custom Dashboard
Modify the `createDashboard()` function to add:
- Charts and graphs
- Date range filters
- Custom calculations

## 🛠️ Troubleshooting

### Data Not Appearing
1. Check the webhook URL is correct
2. Verify spreadsheet ID is correct
3. Check browser console for errors
4. Ensure Google Apps Script has permission

### Permission Errors
1. Make sure the web app is deployed with "Anyone" access
2. Check that your Google account has edit access to the spreadsheet
3. Verify the script is running as "Me"

### Email Not Receiving
1. Check spam folder
2. Verify email address in the script
3. Ensure triggers are set up correctly

## 📱 Telegram Integration
- **Telegram ID**: `@payment_hub_verifier`
- Customers can send payment screenshots directly
- Manual verification process available

## 🔒 Security Notes
- Data is stored securely in Google Sheets
- Only you have access to the spreadsheet
- User data is only used for transaction purposes
- No sensitive payment information is stored

## 📞 Support
If you need help:
1. Check the troubleshooting section
2. Verify all URLs and IDs are correct
3. Test with a small amount of data first
4. Check Google Apps Script logs for errors

## 🎯 Next Steps
1. Test the integration with a few sample entries
2. Set up your email preferences
3. Customize the dashboard as needed
4. Monitor the data collection for a few days
5. Adjust any settings based on your needs

## 💡 Tips
- Keep the spreadsheet organized
- Regularly backup your data
- Monitor the dashboard for insights
- Use the daily emails to track performance
- Consider adding more analytics as your business grows 