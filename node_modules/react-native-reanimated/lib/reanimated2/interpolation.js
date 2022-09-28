// @ts-ignore JS file
import interpolateNode from '../reanimated1/derived/interpolate';
export var Extrapolation;
(function (Extrapolation) {
    Extrapolation["IDENTITY"] = "identity";
    Extrapolation["CLAMP"] = "clamp";
    Extrapolation["EXTEND"] = "extend";
})(Extrapolation || (Extrapolation = {}));
function isNode(x) {
    'worklet';
    return x.__nodeId !== undefined;
}
function getVal(type, coef, val, leftEdgeOutput, rightEdgeOutput, x) {
    'worklet';
    switch (type) {
        case Extrapolation.IDENTITY:
            return x;
        case Extrapolation.CLAMP:
            if (coef * val < coef * leftEdgeOutput) {
                return leftEdgeOutput;
            }
            return rightEdgeOutput;
        case Extrapolation.EXTEND:
        default:
            return val;
    }
}
function isExtrapolate(value) {
    'worklet';
    return (value === Extrapolation.EXTEND ||
        value === Extrapolation.CLAMP ||
        value === Extrapolation.IDENTITY);
}
// validates extrapolations type
// if type is correct, converts it to ExtrapolationConfig
function validateType(type) {
    'worklet';
    // initialize extrapolationConfig with default extrapolation
    const extrapolationConfig = {
        extrapolateLeft: Extrapolation.EXTEND,
        extrapolateRight: Extrapolation.EXTEND,
    };
    if (!type) {
        return extrapolationConfig;
    }
    if (typeof type === 'string') {
        if (!isExtrapolate(type)) {
            throw new Error(`Reanimated: not supported value for "interpolate" \nSupported values: ["extend", "clamp", "identity", Extrapolatation.CLAMP, Extrapolatation.EXTEND, Extrapolatation.IDENTITY]\n Valid example:
        interpolate(value, [inputRange], [outputRange], "clamp")`);
        }
        extrapolationConfig.extrapolateLeft = type;
        extrapolationConfig.extrapolateRight = type;
        return extrapolationConfig;
    }
    // otherwise type is extrapolation config object
    if ((type.extrapolateLeft && !isExtrapolate(type.extrapolateLeft)) ||
        (type.extrapolateRight && !isExtrapolate(type.extrapolateRight))) {
        throw new Error(`Reanimated: not supported value for "interpolate" \nSupported values: ["extend", "clamp", "identity", Extrapolatation.CLAMP, Extrapolatation.EXTEND, Extrapolatation.IDENTITY]\n Valid example:
      interpolate(value, [inputRange], [outputRange], {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.IDENTITY
      }})`);
    }
    Object.assign(extrapolationConfig, type);
    return extrapolationConfig;
}
function internalInterpolate(x, narrowedInput, extrapolationConfig) {
    'worklet';
    const { leftEdgeInput, rightEdgeInput, leftEdgeOutput, rightEdgeOutput, } = narrowedInput;
    if (rightEdgeInput - leftEdgeInput === 0)
        return leftEdgeOutput;
    const progress = (x - leftEdgeInput) / (rightEdgeInput - leftEdgeInput);
    const val = leftEdgeOutput + progress * (rightEdgeOutput - leftEdgeOutput);
    const coef = rightEdgeOutput >= leftEdgeOutput ? 1 : -1;
    if (coef * val < coef * leftEdgeOutput) {
        return getVal(extrapolationConfig.extrapolateLeft, coef, val, leftEdgeOutput, rightEdgeOutput, x);
    }
    else if (coef * val > coef * rightEdgeOutput) {
        return getVal(extrapolationConfig.extrapolateRight, coef, val, leftEdgeOutput, rightEdgeOutput, x);
    }
    return val;
}
// TODO: support default values in worklets:
// e.g. function interpolate(x, input, output, type = Extrapolatation.CLAMP)
export function interpolate(x, input, output, type) {
    'worklet';
    if (input.length < 2 || output.length < 2) {
        throw Error('Interpolation input and output should contain at least two values.');
    }
    const extrapolationConfig = validateType(type);
    if (isNode(x)) {
        console.warn(`interpolate() was renamed to interpolateNode() in Reanimated 2. Please use interpolateNode() instead`);
        return interpolateNode(x, {
            inputRange: input,
            outputRange: output,
            extrapolateLeft: extrapolationConfig.extrapolateLeft,
            extrapolateRight: extrapolationConfig.extrapolateRight,
        });
    }
    const length = input.length;
    const narrowedInput = {
        leftEdgeInput: input[0],
        rightEdgeInput: input[1],
        leftEdgeOutput: output[0],
        rightEdgeOutput: output[1],
    };
    if (length > 2) {
        if (x > input[length - 1]) {
            narrowedInput.leftEdgeInput = input[length - 2];
            narrowedInput.rightEdgeInput = input[length - 1];
            narrowedInput.leftEdgeOutput = output[length - 2];
            narrowedInput.rightEdgeOutput = output[length - 1];
        }
        else {
            for (let i = 1; i < length; ++i) {
                if (x <= input[i]) {
                    narrowedInput.leftEdgeInput = input[i - 1];
                    narrowedInput.rightEdgeInput = input[i];
                    narrowedInput.leftEdgeOutput = output[i - 1];
                    narrowedInput.rightEdgeOutput = output[i];
                    break;
                }
            }
        }
    }
    return internalInterpolate(x, narrowedInput, extrapolationConfig);
}
