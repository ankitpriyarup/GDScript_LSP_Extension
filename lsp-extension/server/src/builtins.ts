export default [
	{
		detailed: "",
		return: "float",
		name: "abs",
		text: "float abs (float s)",
		brief: "Returns the absolute value of parameter s (i.e. unsigned value, works for integer and float).",
		signature: {
			documentation: "Returns the absolute value of parameter s (i.e. unsigned value, works for integer and float).",
			parameters: [
				{ documentation: "parameter s", order: 0, label: "float s" },
			],
			label: "float abs (float s)"
		}
	},
	{
		detailed: "",
		return: "float",
		name: "acos",
		text: "float acos (float s)",
		brief: "Returns the arc cosine of s in radians. Use to get the angle of cosine s.",
		signature: {
			documentation: "Returns the arc cosine of s in radians. Use to get the angle of cosine s.",
			parameters: [
				{ documentation: "parameter s", order: 0, label: "float s" },
			],
			label: "float acos (float s)"
		}
	},
	{
		detailed: "",
		return: "float",
		name: "asin",
		text: "float asin (float s)",
		brief: "Returns the arc sine of s in radians. Use to get the angle of sine s.",
		signature: {
			documentation: "Returns the arc sine of s in radians. Use to get the angle of sine s.",
			parameters: [
				{ documentation: "parameter s", order: 0, label: "float s" },
			],
			label: "float asin (float s)"
		}
	},
	{
		detailed: "",
		return: "float",
		name: "atan",
		text: "float atan (float s)",
		brief: "Returns the arc tangent of s in radians. Use it to get the angle from an angle’s tangent in trigonometry: atan(tan(angle)) == angle.",
		signature: {
			documentation: "Returns the arc tangent of s in radians. Use it to get the angle from an angle’s tangent in trigonometry: atan(tan(angle)) == angle.",
			parameters: [
				{ documentation: "parameter s", order: 0, label: "float s" },
			],
			label: "float atan (float s)"
		}
	},
	{
		detailed: "",
		return: "float",
		name: "atan2",
		text: "float atan2 (float x, float y)",
		brief: "Returns the arc tangent of y/x in radians. Use to get the angle of tangent y/x. To compute the value, the method takes into account the sign of both arguments in order to determine the quadrant.",
		signature: {
			documentation: "Returns the arc tangent of y/x in radians. Use to get the angle of tangent y/x. To compute the value, the method takes into account the sign of both arguments in order to determine the quadrant.",
			parameters: [
				{ documentation: "parameter x", order: 0, label: "float x" },
				{ documentation: "parameter y", order: 0, label: "float y" },
			],
			label: "float atan2 (float x, float y)"
		}
	},
	{
		detailed: "",
		return: "Variant",
		name: "bytes2var",
		text: "Variant bytes2var (PoolByteArray bytes)",
		brief: "Decodes a byte array back to a value.",
		signature: {
			documentation: "Decodes a byte array back to a value.",
			parameters: [
				{ documentation: "bytes to decode", order: 0, label: "PoolByteArray bytes" },
			],
			label: "Variant bytes2var (PoolByteArray bytes)"
		}
	},
];
