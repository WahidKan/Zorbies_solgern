export class Content {
  constructor(blocks, fields) {
    this.blocks = blocks;
    this.fields = fields;
  }
  blocks: ContentItem[] = [];
  fields: ContentItem[] = [];
}

export class ContentItem {
  constructor(type, name, keyCode, icon, contentId, classList) {
    this.type = type;
    this.name = name;
    this.keyCode = keyCode;
    this.icon = icon;
    this.contentId = contentId;
    this.classList = classList;
  }

  type: string;
  name: string;
  keyCode: string;
  icon: string;
  contentId: number;
  status: string;
  classList: string;
}
