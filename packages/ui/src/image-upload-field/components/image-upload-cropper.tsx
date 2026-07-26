import { ImageCropper } from "#/image-cropper/components/image-cropper.tsx";
import { CropControls } from "#/image-upload-field/components/crop-controls.tsx";
import type { ImageUploadCropperProps } from "#/image-upload-field/components/image-upload-field-cropper.tsx";
import { Progress } from "#/progress/components/progress.tsx";

type Props = ImageUploadCropperProps;
/** The dropzone → crop → confirm flow itself, minus the surrounding chrome. */
export function ImageUploadCropper({
	shape,
	aspectRatio,
	isUploading,
	label,
	description,
	cancelLabel,
	confirmLabel,
	outputSize,
	hasPicked,
	onPickedChange,
	onFileCropped,
}: Props) {
	const isCircle = shape === "circle";
	// The dropzone renders its own chrome around plain text, so a rich node has
	// no slot to go in and the dropzone falls back to its built-in copy.
	const dropzoneLabel = typeof label === "string" ? label : undefined;
	const dropzoneDescription =
		typeof description === "string" ? description : undefined;
	return (
		<ImageCropper.Root
			aspectRatio={aspectRatio}
			disabled={isUploading}
			onImageChange={(file) => onPickedChange(file !== null)}
		>
			<ImageCropper.Dropzone
				label={dropzoneLabel}
				description={dropzoneDescription}
				className={isCircle ? "mx-auto size-40 rounded-full" : undefined}
			/>
			<ImageCropper.Area shape={isCircle ? "circle" : "rectangle"} />
			{isUploading ? (
				<Progress.Root value={null} data-slot="image-upload-field-progress" />
			) : null}
			<CropControls
				hasPicked={hasPicked}
				isUploading={isUploading}
				cancelLabel={cancelLabel}
				confirmLabel={confirmLabel}
				outputSize={outputSize}
				onCropped={onFileCropped}
			/>
		</ImageCropper.Root>
	);
}
