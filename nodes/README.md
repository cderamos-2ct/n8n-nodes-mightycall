# MightyCall Node

Custom n8n node for integrating with the MightyCall phone system API.

## Features

- **Make Calls**: Initiate outbound calls programmatically
- **Send SMS**: Send text messages to customers
- **Contact Management**: Create, update, and retrieve contacts
- **Call Logs**: Access call history and recordings
- **Voicemail**: Handle voicemail messages

## Files

- `MightyCall.node.ts` - Main node implementation (2,916 lines)
- `mightycall.svg` - Custom branded icon

## Credentials Required

Uses `MightyCallApi` credentials:
- **API Token**: Get from MightyCall dashboard
- **Account Type**: Personal or Business

## API Documentation

https://api.mightycall.com/v4/doc

## Usage Example

```
1. Add MightyCall node to workflow
2. Select operation (Make Call, Send SMS, etc.)
3. Configure parameters
4. Execute workflow
```

## Operations

- Make Call
- Send SMS
- Get Call History
- Manage Contacts
- Access Voicemail
- Retrieve Recordings


