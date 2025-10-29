import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeOperationError,
} from 'n8n-workflow';

export class MightyCall implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MightyCall',
		name: 'mightyCall',
		icon: 'file:mightycall.svg',
		group: ['transform'],
		version: 2.1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with MightyCall API. Note: Communication and Interaction resources require Contact Center accounts.',
		defaults: {
			name: 'MightyCall',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'mightyCallApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Call',
						value: 'call',
						description: 'Active calls and call operations',
					},
					{
						name: 'Contact',
						value: 'contact',
						description: 'Contact management',
					},
					{
						name: 'Journal',
						value: 'journal',
						description: 'Call history and records',
					},
					{
						name: 'Voicemail',
						value: 'voicemail',
						description: 'Voicemail management',
					},
					{
						name: 'Business Number',
						value: 'businessNumber',
						description: 'Business phone numbers',
					},
					{
						name: 'User',
						value: 'user',
						description: 'User management',
					},
					{
						name: 'Message',
						value: 'message',
						description: 'SMS/MMS messaging',
					},
					{
						name: 'Team',
						value: 'team',
						description: 'Team members and groups',
					},
					{
						name: 'Profile',
						value: 'profile',
						description: 'User profile information',
					},
					{
						name: 'Ping',
						value: 'ping',
						description: 'API health check',
					},
					{
						name: '⚠️ Communication (Contact Center Only)',
						value: 'communication',
						description: '⚠️ REQUIRES CONTACT CENTER ACCOUNT - Communication thread management',
					},
					{
						name: '⚠️ Interaction (Contact Center Only)',
						value: 'interaction',
						description: '⚠️ REQUIRES CONTACT CENTER ACCOUNT - View interactions',
					},
				],
				default: 'journal',
			},
			// Call Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['call'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get call history with filters',
						action: 'Get call history',
					},
					{
						name: 'Get Active Calls',
						value: 'getActive',
						description: 'Get currently active calls',
						action: 'Get active calls',
					},
					{
						name: 'Make Call',
						value: 'make',
						description: 'Initiate a new call',
						action: 'Make a call',
					},
					{
						name: 'Hang Up',
						value: 'hangUp',
						description: 'Hang up a call',
						action: 'Hang up a call',
					},
				],
				default: 'getActive',
			},
			// Journal Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['journal'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get call history records',
						action: 'Get call history',
					},
					{
						name: 'Get Count',
						value: 'getCount',
						description: 'Get total count of requests',
						action: 'Get requests count',
					},
					{
						name: 'Get by ID',
						value: 'getById',
						description: 'Get specific request by ID',
						action: 'Get request by ID',
					},
					{
						name: 'Delete Messages',
						value: 'deleteMessages',
						description: 'Delete existing messages',
						action: 'Delete messages',
					},
					{
						name: 'Add/Update Comment',
						value: 'addComment',
						description: 'Add or update request comment',
						action: 'Add comment',
					},
					{
						name: 'Delete Comment',
						value: 'deleteComment',
						description: 'Delete existing comment for the request',
						action: 'Delete comment',
					},
					{
						name: 'Delete Voicemail',
						value: 'deleteVoicemail',
						description: 'Delete existing voicemail for the requests',
						action: 'Delete voicemail',
					},
					{
						name: 'Set Workflow State',
						value: 'setWorkflowState',
						description: 'Set workflow state of requests',
						action: 'Set workflow state',
					},
					{
						name: 'Set Flags',
						value: 'setFlags',
						description: 'Set flags of requests',
						action: 'Set flags',
					},
					{
						name: 'Remove Flags',
						value: 'removeFlags',
						description: 'Remove flags of requests',
						action: 'Remove flags',
					},
					{
						name: 'Get Block List Count',
						value: 'getBlockListCount',
						description: 'Count of available numbers in block list',
						action: 'Get block list count',
					},
					{
						name: 'Get VIP List Count',
						value: 'getVipListCount',
						description: 'Count of available numbers in VIP list',
						action: 'Get VIP list count',
					},
					{
						name: 'Add to Block List',
						value: 'addToBlockList',
						description: 'Add number to block list',
						action: 'Add to block list',
					},
					{
						name: 'Remove from Block List',
						value: 'removeFromBlockList',
						description: 'Remove number from block list',
						action: 'Remove from block list',
					},
					{
						name: 'Restore Message',
						value: 'restoreMessage',
						description: 'Restore deleted message',
						action: 'Restore message',
					},
					{
						name: 'Get Message Attachments',
						value: 'getMessageAttachments',
						description: 'Get message attachments',
						action: 'Get attachments',
					},
				],
				default: 'getAll',
			},
			// Contact Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many contacts',
						action: 'Get many contacts',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new contact',
						action: 'Create a contact',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an existing contact',
						action: 'Update a contact',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a contact',
						action: 'Delete a contact',
					},
				],
				default: 'getAll',
			},
			// Voicemail Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['voicemail'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many voicemails',
						action: 'Get many voicemails',
					},
					{
						name: 'Get Single',
						value: 'get',
						description: 'Get a specific voicemail',
						action: 'Get a voicemail',
					},
				],
				default: 'getAll',
			},
			// Business Number Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['businessNumber'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get all business phone numbers',
						action: 'Get all business numbers',
					},
					{
						name: 'Get Single',
						value: 'get',
						description: 'Get a specific phone number',
						action: 'Get a phone number',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete one or more phone numbers',
						action: 'Delete phone numbers',
					},
				],
				default: 'getAll',
			},
			// User Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get Status',
						value: 'getStatus',
						description: 'Get user status',
						action: 'Get user status',
					},
					{
						name: 'Set Status',
						value: 'setStatus',
						description: 'Set user status',
						action: 'Set user status',
					},
					{
						name: 'Get Info',
						value: 'getInfo',
						description: 'Get user information',
						action: 'Get user info',
					},
				],
				default: 'getStatus',
			},
			// Message Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Send',
						value: 'send',
						description: 'Send SMS/MMS message',
						action: 'Send a message',
					},
				],
				default: 'send',
			},
			// Team Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['team'],
					},
				},
				options: [
					{
						name: 'Get Team',
						value: 'get',
						description: 'Get team members and groups',
						action: 'Get team',
					},
				],
				default: 'get',
			},
			// Profile Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['profile'],
					},
				},
				options: [
					{
						name: 'Get Profile',
						value: 'get',
						description: 'Get current user profile',
						action: 'Get profile',
					},
					{
						name: 'Get by Extension',
						value: 'getByExtension',
						description: 'Get profile by extension number',
						action: 'Get profile by extension',
					},
				],
				default: 'get',
			},
			// Ping Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['ping'],
					},
				},
				options: [
					{
						name: 'Ping',
						value: 'ping',
						description: 'Check API status',
						action: 'Ping API',
					},
				],
				default: 'ping',
			},
			// Communication Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['communication'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get communications',
						action: 'Get communications',
					},
					{
						name: 'Add Comment',
						value: 'addComment',
						description: 'Add comment to communication',
						action: 'Add comment',
					},
					{
						name: 'Delete Comment',
						value: 'deleteComment',
						description: 'Delete comment from communication',
						action: 'Delete comment',
					},
					{
						name: 'Delete Voicemails',
						value: 'deleteVoicemails',
						description: 'Delete voicemails (bulk)',
						action: 'Delete voicemails',
					},
				],
				default: 'getAll',
			},
			// Interaction Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['interaction'],
					},
				},
				options: [
					{
						name: 'Get Interactions',
						value: 'getAll',
						description: 'Get interactions by tab',
						action: 'Get interactions',
					},
				],
				default: 'getAll',
			},
			// Make Call Parameters
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['make'],
					},
				},
				default: '',
				description: 'The phone number or extension to call from',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['make'],
					},
				},
				default: '',
				description: 'The phone number to call',
			},
			// Hang Up Parameters
			{
				displayName: 'Call ID',
				name: 'callId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['hangUp'],
					},
				},
				default: '',
				description: 'The ID of the call to hang up',
			},
			// Contact Parameters
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the contact',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'First name of the contact',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Last name of the contact',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Phone number of the contact',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Email address of the contact',
			},
			// Voicemail Parameters
			{
				displayName: 'Voicemail ID',
				name: 'voicemailId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['voicemail'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the voicemail',
			},
			// User Parameters
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['setStatus'],
					},
				},
				options: [
					{
						name: 'Available',
						value: 'available',
					},
					{
						name: 'Away',
						value: 'away',
					},
					{
						name: 'Busy',
						value: 'busy',
					},
					{
						name: 'Do Not Disturb',
						value: 'dnd',
					},
				],
				default: 'available',
				description: 'User status to set',
			},
			// Journal Query Parameters - Get All Pages
			{
				displayName: 'Get All Pages',
				name: 'getAllPages',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['getAll'],
					},
				},
				description: 'Whether to automatically fetch all pages until complete',
			},
			// Journal Query Parameters - Pagination
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 1000,
				},
				default: 100,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['getAll'],
					},
				},
				description: 'Maximum number of records per page (max: 1000)',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['getAll'],
						getAllPages: [false],
					},
				},
				description: 'The page number to retrieve (only used when Get All Pages is false)',
			},
			// Contact Resolution
			{
				displayName: 'Resolve Contacts',
				name: 'resolveContacts',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['getAll'],
					},
				},
				description: 'Whether to resolve contact information in the results',
			},
			{
				displayName: 'Show Users',
				name: 'showUsers',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['getAll'],
					},
				},
				description: 'Whether to show user information in the results',
			},
			// Optional Filters Collection
			{
				displayName: 'Additional Filters',
				name: 'additionalFilters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['getAll', 'getCount'],
					},
				},
				options: [
					// Call Classification
					{
						displayName: 'Origin',
						name: 'origin',
						type: 'options',
						options: [
							{
								name: 'All',
								value: 'All',
							},
							{
								name: 'Inbound',
								value: 'Inbound',
							},
							{
								name: 'Outbound',
								value: 'Outbound',
							},
							{
								name: 'Callback',
								value: 'Callback',
							},
							{
								name: 'Internal',
								value: 'Internal',
							},
							{
								name: 'Unspecified',
								value: 'Unspecified',
							},
						],
						default: 'All',
						description: 'Specifies from where request coming from',
					},
					{
						displayName: 'State',
						name: 'state',
						type: 'options',
						options: [
							{
								name: 'All',
								value: 'All',
							},
							{
								name: 'Missed',
								value: 'Missed',
							},
							{
								name: 'Connected',
								value: 'Connected',
							},
							{
								name: 'VoiceMail',
								value: 'VoiceMail',
							},
							{
								name: 'Dropped',
								value: 'Dropped',
							},
							{
								name: 'NoAnswer',
								value: 'NoAnswer',
							},
							{
								name: 'Scheduled',
								value: 'Scheduled',
							},
							{
								name: 'Message',
								value: 'Message',
							},
						],
						default: 'All',
						description: 'Specifies the result state of the request',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'All',
								value: 'All',
							},
							{
								name: 'Call',
								value: 'Call',
							},
							{
								name: 'Message',
								value: 'Message',
							},
							{
								name: 'MessageThread',
								value: 'MessageThread',
							},
							{
								name: 'Task',
								value: 'Task',
							},
							{
								name: 'CallbackRequest',
								value: 'CallbackRequest',
							},
							{
								name: 'Service',
								value: 'Service',
							},
							{
								name: 'Default',
								value: 'Default',
							},
							{
								name: 'Unspecified',
								value: 'Unspecified',
							},
						],
						default: 'All',
						description: 'Specifies type of request',
					},
					// Date Filtering
					{
						displayName: 'From Date',
						name: 'from',
						type: 'dateTime',
						default: '',
						description: 'The start date and time in UTC of the period to get records from (ISO 8601 format)',
					},
					{
						displayName: 'To Date',
						name: 'to',
						type: 'dateTime',
						default: '',
						description: 'The end date and time in UTC of the period to get records from (ISO 8601 format)',
					},
					// Contact Filtering
					{
						displayName: 'Phone',
						name: 'phone',
						type: 'string',
						default: '',
						description: 'One or several client phone numbers, comma separated if multiple',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						description: 'Filter by email address',
					},
					{
						displayName: 'Business Number',
						name: 'businessNumber',
						type: 'string',
						default: '',
						description: 'One or more business phone numbers without a plus sign, comma separated if multiple',
					},
					// Advanced Filtering
					{
						displayName: 'Is Read',
						name: 'isRead',
						type: 'boolean',
						default: false,
						description: 'Filter read voicemails and unread voicemails (only works with inbound=voiceMail)',
					},
					{
						displayName: 'Group ID',
						name: 'groupId',
						type: 'string',
						default: '',
						description: 'Comma separated sequence of Guid',
					},
					{
						displayName: 'User ID',
						name: 'userId',
						type: 'string',
						default: '',
						description: 'Comma separated sequence of Guid',
					},
					{
						displayName: 'VM Box ID',
						name: 'vmBoxId',
						type: 'string',
						default: '',
						description: 'Comma separated sequence of Guid',
					},
					{
						displayName: 'Workflow State',
						name: 'wfState',
						type: 'options',
						options: [
							{
								name: 'All',
								value: 'All',
							},
							{
								name: 'Open',
								value: 'Open',
							},
							{
								name: 'Finished',
								value: 'Finished',
							},
							{
								name: 'Resolved',
								value: 'Resolved',
							},
						],
						default: 'All',
						description: 'Specifies the workflow state of requests',
					},
					{
						displayName: 'Search Property',
						name: 'searchProperty',
						type: 'options',
						options: [
							{
								name: 'Do Not Send',
								value: '',
							},
							{
								name: 'Client',
								value: 'Client',
							},
							{
								name: 'BusinessNumber',
								value: 'BusinessNumber',
							},
							{
								name: 'Comment',
								value: 'Comment',
							},
							{
								name: 'VTT',
								value: 'VTT',
							},
						],
						default: '',
						description: 'Property to search within (select "Do Not Send" to skip search)',
					},
					{
						displayName: 'Search Text',
						name: 'searchText',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								searchProperty: ['Client', 'BusinessNumber', 'Comment', 'VTT'],
							},
						},
						description: 'Text to search for in the selected property',
					},
				],
			},
			// Journal Get Count Parameters
			{
				displayName: 'From Date (Required)',
				name: 'fromDateRequired',
				type: 'dateTime',
				required: true,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['getCount'],
					},
				},
				default: '',
				description: 'The start date and time in UTC - REQUIRED for Get Count operation',
			},
			{
				displayName: 'Request ID',
				name: 'requestId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['getById', 'addComment', 'deleteComment', 'deleteVoicemail', 'setWorkflowState', 'setFlags', 'removeFlags', 'restoreMessage', 'getMessageAttachments'],
					},
				},
				default: '',
				description: 'The ID of the request',
			},
			// Journal Comment Parameters
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['addComment'],
					},
				},
				default: '',
				description: 'Comment text to add or update',
			},
			// Journal Workflow State Parameters
			{
				displayName: 'Workflow State',
				name: 'workflowState',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['setWorkflowState'],
					},
				},
				options: [
					{
						name: 'Open',
						value: 'open',
					},
					{
						name: 'Finished',
						value: 'finished',
					},
					{
						name: 'Resolved',
						value: 'resolved',
					},
				],
				default: 'open',
				description: 'Workflow state to set',
			},
			// Journal Flags Parameters
			{
				displayName: 'Flags',
				name: 'flags',
				type: 'multiOptions',
				required: true,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['setFlags', 'removeFlags'],
					},
				},
				options: [
					{
						name: 'Favorite',
						value: 'favorite',
					},
					{
						name: 'Important',
						value: 'important',
					},
					{
						name: 'Follow Up',
						value: 'followup',
					},
				],
				default: ['favorite'],
				description: 'Flags to set or remove',
			},
			// Journal Block List Parameters
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['addToBlockList', 'removeFromBlockList'],
					},
				},
				default: '',
				description: 'Phone number to add to or remove from block list (E.164 format)',
			},
			// Journal Message Parameters
			{
				displayName: 'Message IDs',
				name: 'messageIds',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['deleteMessages'],
					},
				},
				default: '',
				placeholder: 'id1,id2,id3',
				description: 'Comma-separated list of message IDs to delete',
			},
			{
				displayName: 'Request IDs',
				name: 'requestIds',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['journal'],
						operation: ['deleteVoicemail'],
					},
				},
				default: '',
				placeholder: 'id1,id2,id3',
				description: 'Comma-separated list of request IDs to delete voicemails for',
			},
			// Contact Query Parameters
			{
				displayName: 'Query Parameters',
				name: 'queryParameters',
				type: 'collection',
				placeholder: 'Add Parameter',
				default: {},
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 100,
						},
						default: 50,
						description: 'Max number of results to return',
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'Number of results to skip',
					},
				],
			},
			// Voicemail Parameters
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 2147483647,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: ['voicemail'],
						operation: ['getAll'],
					},
				},
				description: 'Number of voicemails to return (1-2147483647)',
			},
			{
				displayName: 'Skip',
				name: 'skip',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 2147483647,
				},
				default: 0,
				displayOptions: {
					show: {
						resource: ['voicemail'],
						operation: ['getAll'],
					},
				},
				description: 'Number of voicemails to skip for pagination (0-2147483647)',
			},
			{
				displayName: 'Start UTC',
				name: 'startUtc',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: ['voicemail'],
						operation: ['getAll'],
					},
				},
				description: 'Start of the date/time voicemails interval in yyyy-MM-ddThh:mm:ss format',
			},
			{
				displayName: 'End UTC',
				name: 'endUtc',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: ['voicemail'],
						operation: ['getAll'],
					},
				},
				description: 'End of date/time voicemails interval in yyyy-MM-ddThh:mm:ss format',
			},
			{
				displayName: 'Voicemail Filter',
				name: 'voicemailFilter',
				type: 'multiOptions',
				options: [
					{
						name: 'Read',
						value: 'Read',
					},
					{
						name: 'UnRead',
						value: 'UnRead',
					},
					{
						name: 'ReadAndUnRead',
						value: 'ReadAndUnRead',
					},
					{
						name: 'CallerName',
						value: 'CallerName',
					},
					{
						name: 'CallerAddress',
						value: 'CallerAddress',
					},
					{
						name: 'CalledName',
						value: 'CalledName',
					},
					{
						name: 'CalledAddress',
						value: 'CalledAddress',
					},
					{
						name: 'StartTime',
						value: 'StartTime',
					},
					{
						name: 'StartDate',
						value: 'StartDate',
					},
					{
						name: 'Duration',
						value: 'Duration',
					},
					{
						name: 'TextFields',
						value: 'TextFields',
					},
				],
				default: [],
				displayOptions: {
					show: {
						resource: ['voicemail'],
						operation: ['getAll'],
					},
				},
				description: 'Voicemails filter types (multiple values supported - leave empty for no filters)',
			},
			{
				displayName: 'Custom Filter',
				name: 'customFilter',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['voicemail'],
						operation: ['getAll'],
					},
				},
				description: 'Voicemails search string (used with specific voicemailFilter types)',
			},
			{
				displayName: 'Voicemail ID',
				name: 'voicemailId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['voicemail'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the voicemail to retrieve',
			},
			// Business Number Parameters
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['businessNumber'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The phone number or subsequence of digits (1-11 digits, without + sign). Example: 555 or 17775550078',
			},
			{
				displayName: 'Phone IDs',
				name: 'phoneIds',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['businessNumber'],
						operation: ['delete'],
					},
				},
				default: '',
				placeholder: '+15551112233,+15550152729',
				description: 'Comma-separated list of phone numbers to delete (with + sign). Example: +15551112233,+15550152729',
			},
			// Message Parameters
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
					},
				},
				default: '',
				description: 'Source phone number (E.164 format, e.g. +12345678910)',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
					},
				},
				default: '',
				placeholder: '+12345678901,+12345678902',
				description: 'Comma-separated list of destination phone numbers (E.164 format)',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
					},
				},
				default: '',
				description: 'Message text',
			},
			// Profile Parameters
			{
				displayName: 'Extension',
				name: 'extension',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['profile'],
						operation: ['getByExtension'],
					},
				},
				default: '',
				description: 'Extension number (e.g. 100)',
			},
			// Communication Parameters
			{
				displayName: 'Request ID',
				name: 'requestId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['communication'],
						operation: ['addComment', 'deleteComment'],
					},
				},
				default: '',
				description: 'Request ID of the communication',
			},
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['communication'],
						operation: ['addComment'],
					},
				},
				default: '',
				description: 'Comment text',
			},
			{
				displayName: 'Request IDs',
				name: 'requestIds',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['communication'],
						operation: ['deleteVoicemails'],
					},
				},
				default: '',
				placeholder: 'id1,id2',
				description: 'Comma-separated list of request IDs',
			},
			{
				displayName: 'Remove Text',
				name: 'removeText',
				type: 'boolean',
				required: true,
				displayOptions: {
					show: {
						resource: ['communication'],
						operation: ['deleteVoicemails'],
					},
				},
				default: false,
				description: 'Whether to remove transcribed text',
			},
			// Interaction Parameters
			{
				displayName: 'Tab',
				name: 'tab',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['interaction'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						name: 'Recent',
						value: 'Recent',
					},
					{
						name: 'Internal',
						value: 'Internal',
					},
					{
						name: 'Recent with Internal',
						value: 'RecentWithInternal',
					},
					{
						name: 'Clients',
						value: 'Clients',
					},
					{
						name: 'Colleagues',
						value: 'Colleagues',
					},
				],
				default: 'Recent',
				description: 'Tab to filter interactions',
			},
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['interaction'],
						operation: ['getAll'],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Number of interactions to return',
			},
			{
				displayName: 'Page Number',
				name: 'pageNumber',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['interaction'],
						operation: ['getAll'],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				description: 'Page number',
			},
			{
				displayName: 'Latest',
				name: 'latest',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['interaction'],
						operation: ['getAll'],
					},
				},
				default: '',
				description: 'Latest date/time (ISO 8601)',
			},
			{
				displayName: 'Earliest',
				name: 'earliest',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['interaction'],
						operation: ['getAll'],
					},
				},
				default: '',
				description: 'Earliest date/time (ISO 8601)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Get credentials and determine base URL
		const credentials = await this.getCredentials('mightyCallApi');
		const accountType = credentials.accountType as string;
		const baseUrl = accountType === 'contactCenter' 
			? 'https://ccapi.mightycall.com/v4' 
			: 'https://api.mightycall.com/v4';

		// Validate Contact Center-only resources
		const contactCenterOnlyResources = ['communication', 'interaction'];
		if (contactCenterOnlyResources.includes(resource) && accountType !== 'contactCenter') {
			throw new NodeOperationError(
				this.getNode(),
				`⚠️ The '${resource}' resource is only available for Contact Center accounts. ` +
				`Your current credentials are set to 'Standard Account'. ` +
				`Please either:\n` +
				`1. Change your credentials to use a Contact Center account type, or\n` +
				`2. Select a different resource (Call, Contact, Journal, Voicemail, etc.)`
			);
		}

		// Get access token
		const authMethod = credentials.authMethod as string;
		const clientSecret = authMethod === 'userKey' 
			? credentials.userKey as string 
			: credentials.extension as string;

		const tokenResponse = await this.helpers.request({
			method: 'POST',
			url: `${baseUrl}/auth/token`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'x-api-key': credentials.apiKey as string,
			},
			body: new URLSearchParams({
				client_id: credentials.apiKey as string,
				client_secret: clientSecret,
				grant_type: 'client_credentials',
			}).toString(),
			json: true,
		});

		const accessToken = tokenResponse.access_token;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				// ==================== JOURNAL OPERATIONS ====================
				if (resource === 'journal') {
					if (operation === 'getAll') {
						// Get main parameters
						const getAllPages = this.getNodeParameter('getAllPages', i) as boolean;
						const pageSize = this.getNodeParameter('pageSize', i) as number;
						const resolveContacts = this.getNodeParameter('resolveContacts', i) as boolean;
						const showUsers = this.getNodeParameter('showUsers', i) as boolean;
						const additionalFilters = this.getNodeParameter('additionalFilters', i) as IDataObject;

						// Build query parameters
						const buildQueryParams = (currentPage: number): IDataObject => {
							const qs: IDataObject = {};

							// Pagination
							qs.pageSize = pageSize;
							qs.page = currentPage;

							// Contact resolution
							if (resolveContacts !== undefined) {
								qs.resolveContacts = resolveContacts;
							}
							if (showUsers !== undefined) {
								qs.showUsers = showUsers;
							}

							// Additional filters from collection
							if (additionalFilters.origin && additionalFilters.origin !== 'All') {
								qs.origin = additionalFilters.origin;
							}
							if (additionalFilters.state && additionalFilters.state !== 'All') {
								qs.state = additionalFilters.state;
							}
							if (additionalFilters.type && additionalFilters.type !== 'All') {
								qs.type = additionalFilters.type;
							}

							// Date filtering (ISO 8601 format)
							if (additionalFilters.from) {
								const fromDate = new Date(additionalFilters.from as string);
								qs.from = fromDate.toISOString();
							}
							if (additionalFilters.to) {
								const toDate = new Date(additionalFilters.to as string);
								qs.to = toDate.toISOString();
							}

							// Contact filtering
							if (additionalFilters.phone) {
								qs.phone = additionalFilters.phone;
							}
							if (additionalFilters.email) {
								qs.email = additionalFilters.email;
							}
							if (additionalFilters.businessNumber) {
								qs.businessNumber = additionalFilters.businessNumber;
							}

							// Voicemail filtering
							if (additionalFilters.isRead !== undefined && additionalFilters.isRead !== '') {
								qs.isRead = additionalFilters.isRead;
							}

							// ID filtering
							if (additionalFilters.groupId) {
								qs.groupId = additionalFilters.groupId;
							}
							if (additionalFilters.userId) {
								qs.userId = additionalFilters.userId;
							}
							if (additionalFilters.vmBoxId) {
								qs.vmBoxId = additionalFilters.vmBoxId;
							}

							// Workflow state
							if (additionalFilters.wfState && additionalFilters.wfState !== 'All') {
								qs.wfState = additionalFilters.wfState;
							}

							// Search
							if (additionalFilters.searchProperty && additionalFilters.searchProperty !== '') {
								qs.searchProperty = additionalFilters.searchProperty;
							}
							if (additionalFilters.searchText) {
								qs.searchText = additionalFilters.searchText;
							}

							return qs;
						};

						if (getAllPages) {
							// Get all pages
							let allRequests: IDataObject[] = [];
							let currentPage = 1;
							let hasMorePages = true;
							const maxPages = 100; // Safety limit

							while (hasMorePages && currentPage <= maxPages) {
								const qs = buildQueryParams(currentPage);

								const pageResponse = await this.helpers.request({
									method: 'GET',
									url: `${baseUrl}/api/journal/requests`,
									headers: {
										'Authorization': `Bearer ${accessToken}`,
									},
									qs,
									json: true,
								});

								// Extract requests from response
								let pageRequests: IDataObject[] = [];
								if (Array.isArray(pageResponse) && pageResponse.length > 0 && pageResponse[0].requests) {
									pageRequests = pageResponse[0].requests as IDataObject[];
								} else if (pageResponse.requests) {
									pageRequests = pageResponse.requests as IDataObject[];
								}

								allRequests = allRequests.concat(pageRequests);

								// Check if there are more pages
								hasMorePages = pageRequests.length === pageSize;
								currentPage++;

								// Small delay to avoid rate limiting
								if (hasMorePages) {
									await new Promise(resolve => setTimeout(resolve, 50));
								}
							}

							// Return all collected requests
							responseData = {
								requests: allRequests,
								currentPage: 'all',
								totalPages: currentPage - 1,
								totalRecords: allRequests.length,
							};
						} else {
							// Single page request
							const page = this.getNodeParameter('page', i) as number;
							const qs = buildQueryParams(page);

							responseData = await this.helpers.request({
								method: 'GET',
								url: `${baseUrl}/api/journal/requests`,
								headers: {
									'Authorization': `Bearer ${accessToken}`,
								},
								qs,
								json: true,
							});
						}
					}

					if (operation === 'getCount') {
						// Get count of requests with same filters as getAll
						const fromDateRequired = this.getNodeParameter('fromDateRequired', i) as string;
						const additionalFilters = this.getNodeParameter('additionalFilters', i) as IDataObject;
						
						const buildQueryParams = (): IDataObject => {
							const qs: IDataObject = {};

							// Required from date
							const fromDate = new Date(fromDateRequired);
							qs.from = fromDate.toISOString();

							// Additional filters from collection (same as getAll)
							if (additionalFilters.origin && additionalFilters.origin !== 'All') {
								qs.origin = additionalFilters.origin;
							}
							if (additionalFilters.state && additionalFilters.state !== 'All') {
								qs.state = additionalFilters.state;
							}
							if (additionalFilters.type && additionalFilters.type !== 'All') {
								qs.type = additionalFilters.type;
							}

							// Optional to date
							if (additionalFilters.to) {
								const toDate = new Date(additionalFilters.to as string);
								qs.to = toDate.toISOString();
							}

							// Contact filtering
							if (additionalFilters.phone) {
								qs.phone = additionalFilters.phone;
							}
							if (additionalFilters.email) {
								qs.email = additionalFilters.email;
							}
							if (additionalFilters.businessNumber) {
								qs.businessNumber = additionalFilters.businessNumber;
							}

							// Voicemail filtering
							if (additionalFilters.isRead !== undefined && additionalFilters.isRead !== '') {
								qs.isRead = additionalFilters.isRead;
							}

							// ID filtering
							if (additionalFilters.groupId) {
								qs.groupId = additionalFilters.groupId;
							}
							if (additionalFilters.userId) {
								qs.userId = additionalFilters.userId;
							}
							if (additionalFilters.vmBoxId) {
								qs.vmBoxId = additionalFilters.vmBoxId;
							}

							// Workflow state
							if (additionalFilters.wfState && additionalFilters.wfState !== 'All') {
								qs.wfState = additionalFilters.wfState;
							}

							// Search
							if (additionalFilters.searchProperty && additionalFilters.searchProperty !== '') {
								qs.searchProperty = additionalFilters.searchProperty;
							}
							if (additionalFilters.searchText) {
								qs.searchText = additionalFilters.searchText;
							}

							return qs;
						};

						const qs = buildQueryParams();

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/journal/requests/counts`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
							qs,
							json: true,
						});
					}

					if (operation === 'getById') {
						const requestId = this.getNodeParameter('requestId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/journal/requests/${requestId}`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
							json: true,
						});
					}

					if (operation === 'deleteMessages') {
						const messageIds = this.getNodeParameter('messageIds', i) as string;
						const messageIdsArray = messageIds.split(',').map(id => id.trim());

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/journal/messages`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'Content-Type': 'application/json',
							},
							body: messageIdsArray,
							json: true,
						});
					}

					if (operation === 'addComment') {
						const requestId = this.getNodeParameter('requestId', i) as string;
						const comment = this.getNodeParameter('comment', i) as string;

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/journal/requests/${requestId}/comment`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'Content-Type': 'text/plain',
							},
							body: comment,
							json: true,
						});
					}

					if (operation === 'deleteComment') {
						const requestId = this.getNodeParameter('requestId', i) as string;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/journal/requests/${requestId}/comment`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
							json: true,
						});
					}

					if (operation === 'deleteVoicemail') {
						const requestIds = this.getNodeParameter('requestIds', i) as string;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/journal/requests/voicemail`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
							qs: {
								requestIds,
							},
							json: true,
						});
					}

					if (operation === 'setWorkflowState') {
						const requestId = this.getNodeParameter('requestId', i) as string;
						const workflowState = this.getNodeParameter('workflowState', i) as string;

						responseData = await this.helpers.request({
							method: 'PUT',
							url: `${baseUrl}/api/journal/requests/wfstate`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'Content-Type': 'application/json',
							},
							qs: {
								requestId,
							},
							body: {
								state: workflowState,
							},
							json: true,
						});
					}

					if (operation === 'setFlags') {
						const requestId = this.getNodeParameter('requestId', i) as string;
						const flags = this.getNodeParameter('flags', i) as string[];

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/journal/requests/flags`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'Content-Type': 'application/json',
							},
							qs: {
								requestId,
							},
							body: {
								flags,
							},
							json: true,
						});
					}

					if (operation === 'removeFlags') {
						const requestId = this.getNodeParameter('requestId', i) as string;
						const flags = this.getNodeParameter('flags', i) as string[];

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/journal/requests/flags`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'Content-Type': 'application/json',
							},
							qs: {
								requestId,
							},
							body: {
								flags,
							},
							json: true,
						});
					}

					if (operation === 'getBlockListCount') {
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/journal/blocklist/availableNumbers`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
							json: true,
						});
					}

					if (operation === 'getVipListCount') {
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/journal/viplist/availableNumbers`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
							json: true,
						});
					}

					if (operation === 'addToBlockList') {
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/journal/blocklist/add`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'Content-Type': 'application/json',
							},
							body: {
								phoneNumber,
							},
							json: true,
						});
					}

					if (operation === 'removeFromBlockList') {
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/journal/blocklist/remove`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'Content-Type': 'application/json',
							},
							body: {
								phoneNumber,
							},
							json: true,
						});
					}

					if (operation === 'restoreMessage') {
						const requestId = this.getNodeParameter('requestId', i) as string;

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/journal/requests/message`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
							qs: {
								requestId,
							},
							json: true,
						});
					}

					if (operation === 'getMessageAttachments') {
						const requestId = this.getNodeParameter('requestId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/journal/requests/${requestId}/mmsAttachments`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
							json: true,
						});
					}
				}

				// ==================== CALL OPERATIONS ====================
				if (resource === 'call') {
					if (operation === 'getAll') {
						// Call history - use same logic as journal for now
					const qs: IDataObject = {};

						// Get all individual parameters
						const pageSize = this.getNodeParameter('pageSize', i) as number;
						const page = this.getNodeParameter('page', i) as number;
						const resolveContacts = this.getNodeParameter('resolveContacts', i) as boolean;
						const showUsers = this.getNodeParameter('showUsers', i) as boolean;
						const origin = this.getNodeParameter('origin', i) as string;
						const state = this.getNodeParameter('state', i) as string;
						const type = this.getNodeParameter('type', i) as string;
						const from = this.getNodeParameter('from', i) as string;
						const to = this.getNodeParameter('to', i) as string;
						const phone = this.getNodeParameter('phone', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const businessNumber = this.getNodeParameter('businessNumber', i) as string;
						const isRead = this.getNodeParameter('isRead', i) as string;
						const groupId = this.getNodeParameter('groupId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						const vmBoxId = this.getNodeParameter('vmBoxId', i) as string;
						const wfState = this.getNodeParameter('wfState', i) as string;
						const searchProperty = this.getNodeParameter('searchProperty', i) as string;
						const searchText = this.getNodeParameter('searchText', i) as string;

						// Pagination
						if (pageSize) {
							qs.pageSize = pageSize;
						}
						if (page) {
							qs.page = page;
						}

						// Contact resolution
						if (resolveContacts !== undefined) {
							qs.resolveContacts = resolveContacts;
						}
						if (showUsers !== undefined) {
							qs.showUsers = showUsers;
						}

						// Filtering
						if (origin && origin !== 'All') {
							qs.origin = origin;
						}
						if (state && state !== 'All') {
							qs.state = state;
						}
						if (type && type !== 'All') {
							qs.type = type;
						}

						// Date filtering (ISO 8601 format)
						if (from) {
							const fromDate = new Date(from);
							qs.from = fromDate.toISOString();
						}
						if (to) {
							const toDate = new Date(to);
							qs.to = toDate.toISOString();
						}

						// Contact filtering
						if (phone) {
							qs.phone = phone;
						}
						if (email) {
							qs.email = email;
						}
						if (businessNumber) {
							qs.businessNumber = businessNumber;
						}

						// Voicemail filtering
						if (isRead !== undefined && isRead !== '') {
							qs.isRead = isRead === 'true';
						}

						// ID filtering
						if (groupId) {
							qs.groupId = groupId;
						}
						if (userId) {
							qs.userId = userId;
						}
						if (vmBoxId) {
							qs.vmBoxId = vmBoxId;
						}

						// Workflow state
						if (wfState && wfState !== 'All') {
							qs.wfState = wfState;
						}

						// Search
						if (searchProperty) {
							qs.searchProperty = searchProperty;
						}
						if (searchText) {
							qs.searchText = searchText;
					}

					responseData = await this.helpers.request({
						method: 'GET',
						url: `${baseUrl}/api/calls`,
						headers: {
							'Authorization': `Bearer ${accessToken}`,
						},
						qs,
						json: true,
					});
				}

					if (operation === 'getActive') {
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/calls/active`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
							json: true,
						});
					}

					if (operation === 'make') {
						const from = this.getNodeParameter('from', i) as string;
						const to = this.getNodeParameter('to', i) as string;

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/calls`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'Content-Type': 'application/json',
							},
							body: {
								from,
								to,
							},
							json: true,
						});
					}

					if (operation === 'hangUp') {
						const callId = this.getNodeParameter('callId', i) as string;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/calls/${callId}`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
							json: true,
						});
					}
				}

				// ==================== CONTACT OPERATIONS ====================
				if (resource === 'contact') {
					if (operation === 'getAll') {
					const queryParameters = this.getNodeParameter('queryParameters', i) as IDataObject;
					const qs: IDataObject = {};

					if (queryParameters.limit) {
						qs.limit = queryParameters.limit;
					}
					if (queryParameters.offset) {
						qs.offset = queryParameters.offset;
					}

					responseData = await this.helpers.request({
						method: 'GET',
						url: `${baseUrl}/api/contacts`,
						headers: {
							'Authorization': `Bearer ${accessToken}`,
						},
						qs,
						json: true,
					});
					}

					if (operation === 'create') {
						const firstName = this.getNodeParameter('firstName', i) as string;
						const lastName = this.getNodeParameter('lastName', i) as string;
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
						const email = this.getNodeParameter('email', i) as string;

						const body: IDataObject = {
							firstName,
							phoneNumber,
						};

						if (lastName) {
							body.lastName = lastName;
						}
						if (email) {
							body.email = email;
						}

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/contacts`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'Content-Type': 'application/json',
							},
							body,
							json: true,
						});
					}

					if (operation === 'update') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						const lastName = this.getNodeParameter('lastName', i) as string;
						const email = this.getNodeParameter('email', i) as string;

						const body: IDataObject = {};

						if (lastName) {
							body.lastName = lastName;
						}
						if (email) {
							body.email = email;
						}

						responseData = await this.helpers.request({
							method: 'PUT',
							url: `${baseUrl}/api/contacts/${contactId}`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'Content-Type': 'application/json',
							},
							body,
							json: true,
						});
					}

					if (operation === 'delete') {
						const contactId = this.getNodeParameter('contactId', i) as string;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/contacts/${contactId}`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
							json: true,
						});
					}
				}

				// ==================== VOICEMAIL OPERATIONS ====================
				if (resource === 'voicemail') {
				if (operation === 'getAll') {
					// Get voicemail parameters according to actual API spec
					const pageSize = this.getNodeParameter('pageSize', i) as number;
					const skip = this.getNodeParameter('skip', i) as number;
					const startUtc = this.getNodeParameter('startUtc', i) as string;
					const endUtc = this.getNodeParameter('endUtc', i) as string;
					const voicemailFilter = this.getNodeParameter('voicemailFilter', i) as string[];
					const customFilter = this.getNodeParameter('customFilter', i) as string;

					// Build query parameters according to actual API
					const qs: IDataObject = {};
					
					if (pageSize) {
						qs.pageSize = pageSize;
					}
					
					if (skip) {
						qs.skip = skip;
					}
					
					if (startUtc) {
						// Convert to yyyy-MM-ddThh:mm:ss format
						const startDate = new Date(startUtc);
						qs.startUtc = startDate.toISOString().replace(/\.\d{3}Z$/, '');
					}
					
					if (endUtc) {
						// Convert to yyyy-MM-ddThh:mm:ss format
						const endDate = new Date(endUtc);
						qs.endUtc = endDate.toISOString().replace(/\.\d{3}Z$/, '');
					}
					
					if (voicemailFilter && voicemailFilter.length > 0) {
						// Handle multiple filter values - join with commas as per API spec
						qs.voicemailFilter = voicemailFilter.join(',');
					}
					
					if (customFilter) {
						qs.customFilter = customFilter;
					}

					// Use the dedicated voicemails endpoint with correct parameters
					responseData = await this.helpers.request({
						method: 'GET',
						url: `${baseUrl}/api/voicemails`,
						headers: {
							'Authorization': `Bearer ${accessToken}`,
						},
						qs,
						json: true,
					});
				}

					if (operation === 'get') {
						const voicemailId = this.getNodeParameter('voicemailId', i) as string;

						// Use the dedicated voicemails endpoint for specific voicemail
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/voicemails/${voicemailId}`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
							json: true,
						});
					}
				}

				// ==================== BUSINESS NUMBER OPERATIONS ====================
				if (resource === 'businessNumber') {
					if (operation === 'getAll') {
						// Get all business phone numbers
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/phonenumbers`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'x-api-key': credentials.apiKey as string,
							},
							json: true,
						});
					}

					if (operation === 'get') {
						// Get specific phone number by number or subsequence
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/phonenumbers/${phoneNumber}`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'x-api-key': credentials.apiKey as string,
							},
							json: true,
						});
					}

					if (operation === 'delete') {
						// Delete one or more phone numbers
						const phoneIds = this.getNodeParameter('phoneIds', i) as string;
						const phoneIdsArray = phoneIds.split(',').map(id => id.trim());

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/phonenumbers`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'x-api-key': credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
							body: phoneIdsArray,
							json: true,
						});
					}
				}

				// ==================== USER OPERATIONS ====================
				if (resource === 'user') {
					if (operation === 'getStatus') {
						// Try different possible endpoints for user status
						try {
							responseData = await this.helpers.request({
								method: 'GET',
								url: `${baseUrl}/api/user/status`,
								headers: {
									'Authorization': `Bearer ${accessToken}`,
								},
								json: true,
							});
						} catch (error: any) {
							if (error.statusCode === 404) {
								// Try alternative endpoint
								try {
									responseData = await this.helpers.request({
										method: 'GET',
										url: `${baseUrl}/api/users/me`,
										headers: {
											'Authorization': `Bearer ${accessToken}`,
										},
										json: true,
									});
								} catch (error2: any) {
									if (error2.statusCode === 404) {
										// Return a placeholder response since endpoint doesn't exist
										responseData = {
											message: 'User status endpoint not available in this API version',
											status: 'unknown'
										};
									} else {
										throw error2;
									}
								}
							} else {
								throw error;
							}
						}
					}

					if (operation === 'setStatus') {
						const status = this.getNodeParameter('status', i) as string;

						// Try different possible endpoints for setting user status
						try {
							responseData = await this.helpers.request({
								method: 'PUT',
								url: `${baseUrl}/api/user/status`,
								headers: {
									'Authorization': `Bearer ${accessToken}`,
									'Content-Type': 'application/json',
								},
								body: {
									status,
								},
								json: true,
							});
						} catch (error: any) {
							if (error.statusCode === 404) {
								// Return a placeholder response since endpoint doesn't exist
								responseData = {
									message: 'User status setting not available in this API version',
									requestedStatus: status
								};
							} else {
								throw error;
							}
						}
					}

					if (operation === 'getInfo') {
						// Try different possible endpoints for user info
						try {
							responseData = await this.helpers.request({
								method: 'GET',
								url: `${baseUrl}/api/user/info`,
								headers: {
									'Authorization': `Bearer ${accessToken}`,
								},
								json: true,
							});
						} catch (error: any) {
							if (error.statusCode === 404) {
								// Try alternative endpoint
								try {
									responseData = await this.helpers.request({
										method: 'GET',
										url: `${baseUrl}/api/users/me`,
										headers: {
											'Authorization': `Bearer ${accessToken}`,
										},
										json: true,
									});
								} catch (error2: any) {
									if (error2.statusCode === 404) {
										// Return a placeholder response since endpoint doesn't exist
										responseData = {
											message: 'User info endpoint not available in this API version'
										};
									} else {
										throw error2;
									}
								}
							} else {
								throw error;
							}
						}
					}
				}

				// ==================== MESSAGE OPERATIONS ====================
				if (resource === 'message' && operation === 'send') {
					const from = this.getNodeParameter('from', i) as string;
					const to = this.getNodeParameter('to', i) as string;
					const message = this.getNodeParameter('message', i) as string;

					const toArray = to.split(',').map(num => num.trim());

					const body: IDataObject = {
						from,
						to: toArray,
					};

					if (message) {
						body.message = message;
					}

					responseData = await this.helpers.request({
						method: 'POST',
						url: `${baseUrl}/api/messages/send`,
						headers: {
							'Authorization': `Bearer ${accessToken}`,
							'x-api-key': credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					});
				}

				// ==================== TEAM OPERATIONS ====================
				if (resource === 'team' && operation === 'get') {
					responseData = await this.helpers.request({
						method: 'GET',
						url: `${baseUrl}/api/team`,
						headers: {
							'Authorization': `Bearer ${accessToken}`,
							'x-api-key': credentials.apiKey as string,
						},
						json: true,
					});
				}

				// ==================== PROFILE OPERATIONS ====================
				if (resource === 'profile') {
					if (operation === 'get') {
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/profile`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'x-api-key': credentials.apiKey as string,
							},
							json: true,
						});
					}

					if (operation === 'getByExtension') {
						const extension = this.getNodeParameter('extension', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/profile/${extension}`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'x-api-key': credentials.apiKey as string,
							},
							json: true,
						});
					}
				}

				// ==================== PING OPERATIONS ====================
				if (resource === 'ping' && operation === 'ping') {
					responseData = await this.helpers.request({
						method: 'GET',
						url: `${baseUrl}/api/ping`,
						headers: {
							'x-api-key': credentials.apiKey as string,
						},
						json: true,
					});
				}

				// ==================== COMMUNICATION OPERATIONS ====================
				if (resource === 'communication') {
					if (operation === 'getAll') {
						// Get all individual parameters (similar to Journal)
						const qs: IDataObject = {};
						const pageSize = this.getNodeParameter('pageSize', i) as number;
						const page = this.getNodeParameter('page', i) as number;
						const resolveContacts = this.getNodeParameter('resolveContacts', i) as boolean;
						const showUsers = this.getNodeParameter('showUsers', i) as boolean;
						const origin = this.getNodeParameter('origin', i) as string;
						const state = this.getNodeParameter('state', i) as string;
						const type = this.getNodeParameter('type', i) as string;
						const from = this.getNodeParameter('from', i) as string;
						const to = this.getNodeParameter('to', i) as string;
						const phone = this.getNodeParameter('phone', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const businessNumber = this.getNodeParameter('businessNumber', i) as string;
						const isRead = this.getNodeParameter('isRead', i) as string;
						const groupId = this.getNodeParameter('groupId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						const vmBoxId = this.getNodeParameter('vmBoxId', i) as string;
						const wfState = this.getNodeParameter('wfState', i) as string;
						const searchProperty = this.getNodeParameter('searchProperty', i) as string;
						const searchText = this.getNodeParameter('searchText', i) as string;

						// Pagination
						if (pageSize) qs.pageSize = pageSize;
						if (page) qs.page = page;

						// Contact resolution
						if (resolveContacts !== undefined) qs.resolveContacts = resolveContacts;
						if (showUsers !== undefined) qs.showUsers = showUsers;

						// Filtering
						if (origin && origin !== 'All') qs.origin = origin;
						if (state && state !== 'All') qs.state = state;
						if (type && type !== 'All') qs.type = type;

						// Date filtering
						if (from) {
							const fromDate = new Date(from);
							qs.from = fromDate.toISOString();
						}
						if (to) {
							const toDate = new Date(to);
							qs.to = toDate.toISOString();
						}

						// Contact filtering
						if (phone) qs.phone = phone;
						if (email) qs.email = email;
						if (businessNumber) qs.businessNumber = businessNumber;

						// Voicemail filtering
						if (isRead !== undefined && isRead !== '') qs.isRead = isRead === 'true';

						// ID filtering
						if (groupId) qs.groupId = groupId;
						if (userId) qs.userId = userId;
						if (vmBoxId) qs.vmBoxId = vmBoxId;

						// Workflow state
						if (wfState && wfState !== 'All') qs.wfState = wfState;

						// Search
						if (searchProperty) qs.searchProperty = searchProperty;
						if (searchText) qs.searchText = searchText;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/contactCenter/communications`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'x-api-key': credentials.apiKey as string,
							},
							qs,
							json: true,
						});
					}

					if (operation === 'addComment') {
						const requestId = this.getNodeParameter('requestId', i) as string;
						const comment = this.getNodeParameter('comment', i) as string;

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/contactCenter/communications/${requestId}/comment`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'x-api-key': credentials.apiKey as string,
								'Content-Type': 'text/plain',
							},
							body: comment,
							json: true,
						});
					}

					if (operation === 'deleteComment') {
						const requestId = this.getNodeParameter('requestId', i) as string;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/contactCenter/communications/${requestId}/comment`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'x-api-key': credentials.apiKey as string,
							},
							json: true,
						});
					}

					if (operation === 'deleteVoicemails') {
						const requestIds = this.getNodeParameter('requestIds', i) as string;
						const removeText = this.getNodeParameter('removeText', i) as boolean;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/contactCenter/communications/voicemails`,
							headers: {
								'Authorization': `Bearer ${accessToken}`,
								'x-api-key': credentials.apiKey as string,
							},
							qs: {
								requestIds,
								removeText,
							},
							json: true,
						});
					}
				}

				// ==================== INTERACTION OPERATIONS ====================
				if (resource === 'interaction' && operation === 'getAll') {
					const tab = this.getNodeParameter('tab', i) as string;
					const pageSize = this.getNodeParameter('pageSize', i) as number;
					const pageNumber = this.getNodeParameter('pageNumber', i) as number;
					const latest = this.getNodeParameter('latest', i) as string;
					const earliest = this.getNodeParameter('earliest', i) as string;

					const qs: IDataObject = {};

					if (tab) qs.tab = tab;
					if (pageSize) qs.pageSize = pageSize;
					if (pageNumber) qs.pageNumber = pageNumber;

					if (latest) {
						const latestDate = new Date(latest);
						qs.latest = latestDate.toISOString();
					}
					if (earliest) {
						const earliestDate = new Date(earliest);
						qs.earliest = earliestDate.toISOString();
					}

					responseData = await this.helpers.request({
						method: 'GET',
						url: `${baseUrl}/api/contactcenter/interactions`,
						headers: {
							'Authorization': `Bearer ${accessToken}`,
							'x-api-key': credentials.apiKey as string,
						},
						qs,
						json: true,
					});
				}

				if (responseData) {
					// Handle Journal, Call, and Communication responses (has special structure with requests array)
					if ((resource === 'journal' && operation === 'getAll') || 
						(resource === 'call' && operation === 'getAll') ||
						(resource === 'communication' && operation === 'getAll')) {
						// Returns: [{ currentPage: 1, requests: [...] }]
						if (Array.isArray(responseData) && responseData.length > 0 && responseData[0].requests) {
							const requests = responseData[0].requests as IDataObject[];
							requests.forEach((request: IDataObject) => {
								returnData.push({ 
									json: {
										...request,
										_pagination: {
											currentPage: responseData[0].currentPage,
										},
									},
								});
							});
						} else if (responseData.requests) {
							// Single object with requests array
							const requests = responseData.requests as IDataObject[];
							requests.forEach((request: IDataObject) => {
								returnData.push({ 
									json: {
										...request,
										_pagination: {
											currentPage: responseData.currentPage,
										},
									},
								});
							});
						} else {
							// Fallback: return as-is
							returnData.push({ json: responseData });
						}
					} else {
						// Handle standard array/object responses for other operations
					if (Array.isArray(responseData)) {
						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					} else {
						// Handle object response
						returnData.push({ json: responseData });
						}
					}
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error);
			}
		}

		return [returnData];
	}
}
