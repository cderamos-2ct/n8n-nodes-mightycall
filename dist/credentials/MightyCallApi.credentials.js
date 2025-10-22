"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MightyCallApi = void 0;
class MightyCallApi {
    constructor() {
        this.name = 'mightyCallApi';
        this.displayName = 'MightyCall API';
        this.icon = 'file:mightycall.svg';
        this.documentationUrl = 'https://api.mightycall.com/v4/doc#tag/Authentication/Auth-POST-authtoken';
        this.properties = [
            {
                displayName: 'Account Type',
                name: 'accountType',
                type: 'options',
                options: [
                    {
                        name: 'Standard Account',
                        value: 'standard',
                        description: 'Standard MightyCall account (api.mightycall.com)',
                    },
                    {
                        name: 'Contact Center Account',
                        value: 'contactCenter',
                        description: 'Contact Center account (ccapi.mightycall.com)',
                    },
                ],
                default: 'standard',
                required: true,
                description: 'Select your MightyCall account type',
            },
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                default: '',
                required: true,
                description: 'Your MightyCall API Key',
                placeholder: 'your-api-key-here',
            },
            {
                displayName: 'Authentication Method',
                name: 'authMethod',
                type: 'options',
                options: [
                    {
                        name: 'User Key (Secret Key)',
                        value: 'userKey',
                        description: 'Use your User Key (also called Secret Key) from MightyCall account settings',
                    },
                    {
                        name: 'Extension Number',
                        value: 'extension',
                        description: 'Use your extension number for authentication',
                    },
                ],
                default: 'userKey',
                required: true,
                description: 'Choose which authentication method to use with your API Key',
            },
            {
                displayName: 'User Key',
                name: 'userKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                displayOptions: {
                    show: {
                        authMethod: ['userKey'],
                    },
                },
                default: '',
                required: true,
                description: 'Your MightyCall User Key (also called Secret Key). Used as client_secret for authentication.',
                placeholder: 'your-user-key-here',
            },
            {
                displayName: 'Extension Number',
                name: 'extension',
                type: 'string',
                displayOptions: {
                    show: {
                        authMethod: ['extension'],
                    },
                },
                default: '',
                required: true,
                description: 'Your MightyCall extension number. Used as client_secret for authentication.',
                placeholder: '1001',
            },
        ];
    }
}
exports.MightyCallApi = MightyCallApi;
