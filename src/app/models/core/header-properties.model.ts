export class HeaderProperties {
  header: boolean;
  search?: boolean;
  filterColumns?: boolean;
  addButton?: boolean;
  addTitle?: string;
  refreshButton?: boolean;
  refreshTitle?: string;
  actionButtonTitle?: string;
  actionExtButtonTitle?: string;
  updateButton?:boolean;

  constructor(headerProperties) {
    this.header = headerProperties.header;
    this.search = headerProperties.search;
    this.filterColumns = headerProperties.filterColumns;
    this.addButton = headerProperties.addButton;
    this.addTitle = headerProperties.addTitle;
    this.refreshButton = headerProperties.refreshButton;
    this.refreshTitle = headerProperties.refreshTitle;
    this.actionButtonTitle = headerProperties.acctionButtonTitle;
    this.actionExtButtonTitle = headerProperties.acctionExtButtonTitle;
    this.updateButton = headerProperties.updateButton;
  }
}
