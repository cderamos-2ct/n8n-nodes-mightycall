import { ICredentialType, INodeProperties, Icon } from 'n8n-workflow';
export declare class MightyCallApi implements ICredentialType {
    name: string;
    displayName: string;
    icon: Icon;
    documentationUrl: string;
    properties: INodeProperties[];
}
