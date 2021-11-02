import { Dimensions } from "react-native";

const containerWidth = Dimensions.get("window").width;
const containerHeight = Dimensions.get("window").height;
const initialScale = Math.min(containerWidth, containerHeight) / 375;

const unit = {
	scale: (multi: number) => (multi ? initialScale * multi : initialScale)
};

export default unit;
