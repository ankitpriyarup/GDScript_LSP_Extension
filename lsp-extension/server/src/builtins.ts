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
				{ documentation: "parameter s", order: 0, label: "float s" }
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
				{ documentation: "parameter s", order: 0, label: "float s" }
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
				{ documentation: "parameter s", order: 0, label: "float s" }
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
				{ documentation: "parameter s", order: 0, label: "float s" }
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
				{ documentation: "parameter y", order: 0, label: "float y" }
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
				{ documentation: "bytes to decode", order: 0, label: "PoolByteArray bytes" }
			],
			label: "Variant bytes2var (PoolByteArray bytes)"
		}
	},
	{
		detailed: "",
		return: "Vector2",
		name: "cartesian2polar",
		text: "Vector2 cartesian2polar (float x, float y)",
		brief: "Converts a 2D point expressed in the cartesian coordinate system (x and y axis) to the polar coordinate system (a distance from the origin and an angle).",
		signature: {
			documentation: "Converts a 2D point expressed in the cartesian coordinate system (x and y axis) to the polar coordinate system (a distance from the origin and an angle).",
			parameters: [
				{ documentation: "x coordinate", order: 0, label: "float x" },
				{ documentation: "x coordinate", order: 0, label: "float y" }
			],
			label: "Vector2 cartesian2polar (float x, float y)"
		}
	},
	{
		detailed: "",
		return: "float",
		name: "ceil",
		text: "float ceil (float s)",
		brief: "Rounds s upward, returning the smallest integral value that is not less than s.",
		signature: {
			documentation: "Rounds s upward, returning the smallest integral value that is not less than s.",
			parameters: [
				{ documentation: "parameter s", order: 0, label: "float s" }
			],
			label: "float ceil (float s)"
		}
	},
	{
		detailed: "",
		return: "float",
		name: "clamp",
		text: "float clamp (float value, float min, float max)",
		brief: "Clamps value and returns a value not less than min and not more than max.",
		signature: {
			documentation: "Clamps value and returns a value not less than min and not more than max.",
			parameters: [
				{ documentation: "value to clamp", order: 0, label: "float value" },
				{ documentation: "min clamp constraint", order: 0, label: "float min" },
				{ documentation: "max clamp constraint", order: 0, label: "float max" }
			],
			label: "float clamp (float value, float min, float max)"
		}
	},
	{
		detailed: "",
		return: "Object",
		name: "convert",
		text: "Object convert (Variant what, int type)",
		brief: "Converts from a type to another in the best way possible. The type parameter uses the enum TYPE_* in @GlobalScope.",
		signature: {
			documentation: "Converts from a type to another in the best way possible. The type parameter uses the enum TYPE_* in @GlobalScope.",
			parameters: [
				{ documentation: "object to convert", order: 0, label: "Object what" },
				{ documentation: "convert type", order: 0, label: "int type" },
			],
			label: "Object convert (Variant what, int type)"
		}
	},
	{
		detailed: "",
		return: "float",
		name: "cos",
		text: "float cos (float s)",
		brief: "Returns the cosine of angle s in radians.",
		signature: {
			documentation: "Returns the cosine of angle s in radians.",
			parameters: [
				{ documentation: "parameter s", order: 0, label: "float s" }
			],
			label: "float cos (float s)"
		}
	},
	{
		detailed: "",
		return: "float",
		name: "cosh",
		text: "float cosh (float s)",
		brief: "Returns the hyperbolic cosine of s in radians.",
		signature: {
			documentation: "Returns the hyperbolic cosine of s in radians.",
			parameters: [
				{ documentation: "parameter s", order: 0, label: "float s" }
			],
			label: "float cosh (float s)"
		}
	},
	{
		detailed: "",
		return: "float",
		name: "db2linear",
		text: "float db2linear (float db)",
		brief: "Converts from decibels to linear energy (audio).",
		signature: {
			documentation: "Converts from decibels to linear energy (audio).",
			parameters: [
				{ documentation: "decibles required", order: 0, label: "float db" }
			],
			label: "float db2linear (float db)"
		}
	}
];
