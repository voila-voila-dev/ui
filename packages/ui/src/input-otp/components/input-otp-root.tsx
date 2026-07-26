import { OTPInput } from "input-otp";
import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function InputOTPRoot({
	className,
	containerClassName,
	...props
}: React.ComponentProps<typeof OTPInput> & {
	containerClassName?: string;
}) {
	return (
		<OTPInput
			data-slot="input-otp"
			containerClassName={cn(
				"flex items-center has-disabled:opacity-50 [&:has(:disabled)_[data-slot=input-otp-slot]]:cursor-not-allowed [&:has(:disabled)_[data-slot=input-otp-slot]]:bg-muted",
				containerClassName,
			)}
			spellCheck={false}
			className={cn("disabled:cursor-not-allowed", className)}
			{...props}
		/>
	);
}
