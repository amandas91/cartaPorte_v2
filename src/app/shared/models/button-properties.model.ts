export class ButtonProperties {
  title: string;
  actionType:
    | 'create'
    | 'update'
    | 'none'
    | 'view'
    | 'delete'
    | 'response'
    | 'download'
    | 'upload'
    | 'select'
    | 'readOnly'
    | 'temp'
    | 'status'
    | 'notify'
    | 'canDelete'
    | 'collections'
    | 'payments'
    | 'pdf'
    | 'xml'
    | 'cancel';
  icon: string;
  iconType?: string;
  canDisplay?: string;
  constructor(buttonProperties) {
    this.title = buttonProperties.title;
    this.actionType = buttonProperties.actionType;
    this.icon = buttonProperties.icon;
    this.iconType = buttonProperties.iconType;
    this.canDisplay = buttonProperties.canDisplay;
  }
}
