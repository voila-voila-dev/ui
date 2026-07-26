import type * as React from "react";
import type { ImageUploadShape } from "#/image-upload-field/lib/image-upload-field-types.ts";

export type ImageUploadCropperProps = {
	shape: ImageUploadShape;
	aspectRatio: number;
	isUploading: boolean;
	label: React.ReactNode;
	description: React.ReactNode;
	cancelLabel: string;
	confirmLabel: string;
	outputSize?: { readonly width: number; readonly height: number };
	hasPicked: boolean;
	onPickedChange: (hasPicked: boolean) => void;
	onFileCropped: (blob: Blob) => void;
};
