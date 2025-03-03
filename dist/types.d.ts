import { CSSProperties } from 'react';

export declare type ThemeColor = 'light' | 'dark';
export declare type DockPosition = 'right' | 'left';
export declare type Device = 'desktop' | 'tablet' | 'mobile';

export interface AppearanceConfig {
	theme?: ThemeColor | undefined;
	panels?: {
		tools?: {
			dock: DockPosition;
		} | undefined;
	} | undefined;
}

export interface User {
	id?: number | undefined;
	name?: string | undefined;
	email?: string | undefined;
	signature?: string | undefined;
}

export interface GroupedSpecialLink {
	name: string;
	specialLinks: Array<SimpleSpecialLink | GroupedSpecialLink>;
}

export interface SimpleSpecialLink {
	name: string;
	href: string;
	target: string;
}

export declare type SpecialLink = SimpleSpecialLink | GroupedSpecialLink;

export interface GroupedMergeTag {
	name: string;
	mergeTags: Array<SimpleMergeTag | GroupedMergeTag>;
}

export interface SimpleMergeTag {
	name: string;
	value: string;
	sample?: string;
}

export interface ConditionalMergeTagRule {
	name: string;
	before: string;
	after: string;
}

export interface ConditionalMergeTag {
	name: string;
	rules: ConditionalMergeTagRule[];
	mergeTags?: SimpleMergeTag[] | undefined;
}

export declare type MergeTag = SimpleMergeTag | ConditionalMergeTag | GroupedMergeTag;

export interface DesignTagConfig {
	delimiter: [string, string];
}

export interface DisplayCondition {
	type: string;
	label: string;
	description: string;
	before: string;
	after: string;
}

export declare type EmptyDisplayCondition = object;

export interface ToolPropertiesConfig {
	[key: string]: {
		value: string;
	};
}

export interface ToolConfig {
	enabled?: boolean | undefined;
	position?: number | undefined;
	properties?: ToolPropertiesConfig | StringList | undefined;
}

export interface ToolsConfig {
	[key: string]: ToolConfig;
}

export interface EditorConfig {
	minRows?: number | undefined;
	maxRows?: number | undefined;
}

declare type AiFeatures = {
	smartButtons?: boolean;
	smartHeadings?: boolean;
	magicImage?: boolean;
	smartText?: boolean;
};

export interface Features {
	audit?: boolean | undefined;
	preview?: boolean | undefined;
	imageEditor?: boolean | undefined;
	undoRedo?: boolean | undefined;
	stockImages?: boolean | undefined;
	textEditor?: TextEditor | undefined;
	ai?: boolean | AiFeatures;
}

export interface TextEditor {
	spellChecker?: boolean | undefined;
	tables?: boolean | undefined;
	cleanPaste?: boolean | undefined;
	emojis?: boolean | undefined;
}

export declare type Translations = Record<string, Record<string, string>>;
export declare type DisplayMode = 'email' | 'web';

export interface UnlayerOptions {
	id?: string | undefined;
	displayMode?: DisplayMode | undefined;
	projectId?: number | undefined;
	locale?: string | undefined;
	appearance?: AppearanceConfig | undefined;
	user?: User | undefined;
	mergeTags?: MergeTag[] | undefined;
	specialLinks?: SpecialLink[] | undefined;
	designTags?: StringList | undefined;
	designTagsConfig?: DesignTagConfig | undefined;
	tools?: ToolsConfig | undefined;
	blocks?: object[] | undefined;
	editor?: EditorConfig | undefined;
	safeHtml?: boolean | undefined;
	customJS?: string[] | undefined;
	customCSS?: string[] | undefined;
	features?: Features | undefined;
	translations?: Translations | undefined;
	displayConditions?: DisplayCondition[] | undefined;
}

export interface EmailEditorProps {
	editorId?: string | undefined;
	style?: CSSProperties | undefined;
	minHeight?: number | string | undefined;
	options?: UnlayerOptions | undefined;
	tools?: ToolsConfig | undefined;
	appearance?: AppearanceConfig | undefined;
	projectId?: number | undefined;
	scriptUrl?: string | undefined;
	locale?: string | undefined;

	/** @deprecated Use **onReady** instead */
	onLoad?(): void;

	onReady?(): void;
}

export interface HtmlExport {
	design: Design;
	html: string;
}

export interface ImageExport {
	design: Design;
	url: string;
}

export interface HtmlOptions {
	cleanup: boolean;
	minify: boolean;
}

export interface FileInfo {
	accepted: File[];
	attachments: File[];
}

export interface FileUploadDoneData {
	progress: number;
	url?: string | undefined;
}

export interface Design {
	counters?: object | undefined;
	body: {
		rows: object[];
		values?: object | undefined;
	};
}

export declare type SaveDesignCallback = (data: Design) => void;
export declare type ExportHtmlCallback = (data: HtmlExport) => void;
export declare type ExportImageCallback = (data: ImageExport) => void;
export declare type EventCallback = (data: object) => void;
export declare type FileUploadCallback = (file: FileInfo, done: FileUploadDoneCallback) => void;
export declare type FileUploadDoneCallback = (data: FileUploadDoneData) => void;
export declare type DisplayConditionDoneCallback = (data: DisplayCondition | null) => void;
export declare type DisplayConditionCallback = (data: DisplayCondition | EmptyDisplayCondition, done: DisplayConditionDoneCallback) => void;
export declare type RegisterCallback = {
	(type: 'image', callback: FileUploadCallback): void;
	(type: 'displayCondition', callback: DisplayConditionCallback): void;
};
export declare type AddEventListener = (type: string, callback: EventCallback) => void;
export declare type RemoveEventListener = (type: string, callback: EventCallback) => void;
export declare type LoadBlank = (options: object) => void;
export declare type LoadDesign = (design: Design) => void;
export declare type SaveDesign = (callback: SaveDesignCallback) => void;
export declare type ExportHtml = (callback: ExportHtmlCallback, options?: HtmlOptions) => void;
export declare type ExportImage = (callback: ExportImageCallback) => void;
export declare type SetMergeTags = (mergeTags: Array<MergeTag>) => void;

export interface EditorMethods {
	saveDesign: SaveDesign;
	exportHtml: ExportHtml;
	setMergeTags: SetMergeTags;
	loadDesign: LoadDesign;
	registerCallback: RegisterCallback;
	addEventListener: AddEventListener;
	loadBlank: LoadBlank;
	removeEventListener: RemoveEventListener;
	exportImage: ExportImage;
}

export interface Editor extends EditorMethods {
	hidePreview: () => void;
	showPreview: (device: Device) => void;
}

export interface EditorRef extends EditorMethods {
	editor: Editor | null;
}

export {};

interface StringList {
	[key: string]: string;
}

declare global {
	const unlayer: {
		createEditor: (options: UnlayerOptions & {
			source: {
				name: string;
				version: string;
			};
		}) => Editor;
	};
}
