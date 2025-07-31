// Google Apps Script for Sassy Poonam Website Data Collection
// Deploy this as a web app to capture user data from your website

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (automatically detects current spreadsheet)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('CustomerData') || spreadsheet.insertSheet('CustomerData');
    
    // Set up headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 12).setValues([[
        'Timestamp',
        'Customer Name',
        'Phone Number',
        'Item Type',
        'Item Name',
        'Amount',
        'UPI ID',
        'Payment Status',
        'Transaction ID',
        'Additional Info',
        'User Agent',
        'IP Address'
      ]]);
      
      // Format headers
      sheet.getRange(1, 1, 1, 12).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
    }
    
    // Prepare data for insertion
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.customerName || '',
      data.phoneNumber || '',
      data.itemType || '', // 'video-call' or 'recorded-video'
      data.itemName || '',
      data.amount || '',
      data.upiId || 'bobbyrex555@okicici',
      data.paymentStatus || 'Pending',
      data.transactionId || '',
      data.additionalInfo || '',
      data.userAgent || e.parameter.userAgent || '',
      data.ipAddress || e.parameter.ipAddress || ''
    ];
    
    // Insert the data
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 12);
    
    // Add some formatting
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      // Format timestamp
      sheet.getRange(lastRow, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
      
      // Format amount
      sheet.getRange(lastRow, 6).setNumberFormat('₹#,##0');
      
      // Color code payment status
      const statusCell = sheet.getRange(lastRow, 8);
      if (data.paymentStatus === 'Completed') {
        statusCell.setBackground('#d4edda').setFontColor('#155724');
      } else if (data.paymentStatus === 'Failed') {
        statusCell.setBackground('#f8d7da').setFontColor('#721c24');
      } else {
        statusCell.setBackground('#fff3cd').setFontColor('#856404');
      }
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully',
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Failed to save data'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'Service is running',
      message: 'Use POST method to send data',
      timestamp: new Date()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to create summary dashboard
function createDashboard() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const dataSheet = spreadsheet.getSheetByName('CustomerData');
  const dashboardSheet = spreadsheet.getSheetByName('Dashboard') || spreadsheet.insertSheet('Dashboard');
  
  if (!dataSheet) {
    throw new Error('CustomerData sheet not found');
  }
  
  // Clear existing dashboard
  dashboardSheet.clear();
  
  // Get all data
  const data = dataSheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  // Calculate statistics
  const totalCustomers = rows.length;
  const totalRevenue = rows.reduce((sum, row) => sum + (parseFloat(row[5]) || 0), 0);
  const videoCalls = rows.filter(row => row[3] === 'video-call').length;
  const recordedVideos = rows.filter(row => row[3] === 'recorded-video').length;
  const completedPayments = rows.filter(row => row[7] === 'Completed').length;
  const pendingPayments = rows.filter(row => row[7] === 'Pending').length;
  
  // Create dashboard
  dashboardSheet.getRange('A1:B1').setValues([['Sassy Poonam - Business Dashboard', '']]);
  dashboardSheet.getRange('A1:B1').setFontWeight('bold').setFontSize(16);
  
  dashboardSheet.getRange('A3:B8').setValues([
    ['Total Customers', totalCustomers],
    ['Total Revenue', `₹${totalRevenue.toLocaleString()}`],
    ['Video Calls', videoCalls],
    ['Recorded Videos', recordedVideos],
    ['Completed Payments', completedPayments],
    ['Pending Payments', pendingPayments]
  ]);
  
  // Format dashboard
  dashboardSheet.getRange('A3:A8').setFontWeight('bold');
  dashboardSheet.getRange('B3:B8').setFontWeight('bold').setFontColor('#4285f4');
  dashboardSheet.getRange('B4').setNumberFormat('₹#,##0');
  
  // Auto-resize columns
  dashboardSheet.autoResizeColumns(1, 2);
  
  // Create recent transactions table
  dashboardSheet.getRange('A10').setValue('Recent Transactions (Last 10)');
  dashboardSheet.getRange('A10').setFontWeight('bold').setFontSize(14);
  
  if (rows.length > 0) {
    const recentRows = rows.slice(-10).reverse();
    const recentHeaders = ['Date', 'Customer', 'Phone', 'Item', 'Amount', 'Status'];
    
    dashboardSheet.getRange('A11:F11').setValues([recentHeaders]);
    dashboardSheet.getRange('A11:F11').setFontWeight('bold').setBackground('#f8f9fa');
    
    recentRows.forEach((row, index) => {
      dashboardSheet.getRange(12 + index, 1, 1, 6).setValues([[
        new Date(row[0]).toLocaleDateString(),
        row[1],
        row[2],
        row[4],
        `₹${row[5]}`,
        row[7]
      ]]);
    });
    
    // Format recent transactions
    dashboardSheet.getRange(12, 5, recentRows.length, 1).setNumberFormat('₹#,##0');
    dashboardSheet.autoResizeColumns(1, 6);
  }
}

// Function to set up triggers
function setupTriggers() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create dashboard update trigger (runs every hour)
  ScriptApp.newTrigger('createDashboard')
    .timeBased()
    .everyHours(1)
    .create();
} 