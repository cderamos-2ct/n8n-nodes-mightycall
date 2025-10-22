# n8n-nodes-mightycall

This is an n8n community node for MightyCall phone system integration.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation) | [Operations](#operations) | [Credentials](#credentials) | [Compatibility](#compatibility) | [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install a community node**
3. Enter `n8n-nodes-mightycall`
4. Click **Install**
5. Restart n8n

### Manual Installation

```bash
npm install n8n-nodes-mightycall
```

## Operations

### Call Management
- **Get Calls**: Retrieve active calls
- **Get Call Details**: Get information about a specific call
- **Make Call**: Initiate outbound call
- **Transfer Call**: Transfer active call
- **End Call**: Terminate active call

### Contact Management
- **List Contacts**: Get all contacts
- **Get Contact**: Retrieve contact details
- **Create Contact**: Add new contact
- **Update Contact**: Modify contact information
- **Delete Contact**: Remove contact

### Journal (Call History)
- **List Journal**: Get call history
- **Get Journal Entry**: Get specific call record
- **Search Journal**: Search call history

### Number Management
- **List Numbers**: Get phone numbers
- **Get Number**: Get number details
- **Update Number**: Modify number settings

### Queue Operations
- **List Queues**: Get call queues
- **Get Queue**: Queue details
- **Get Queue Stats**: Queue statistics

## Credentials

You need a MightyCall API key and API login.

Get them from:
1. Log into your MightyCall account
2. Go to **Settings > API**
3. Generate API credentials

Required fields:
- **API Key**: Your MightyCall API key
- **API Login**: Your MightyCall API login

## Compatibility

Tested with:
- n8n v1.0.0+
- Node.js 18+

## Usage Example

### Making a Call

1. Add **MightyCall** node to workflow
2. Select **Resource**: Call
3. Select **Operation**: Make Call
4. Set **Phone Number**: +1234567890
5. Execute workflow

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [MightyCall API Documentation](https://api.mightycall.com/docs)
- [GitHub Repository](https://github.com/cderamos-2ct/n8n-nodes-mightycall)

## Version History

### 1.0.0
- Initial release
- Full API coverage
- All major operations supported

## License

[MIT](LICENSE)

## Author

Created by cderamos-2ct

