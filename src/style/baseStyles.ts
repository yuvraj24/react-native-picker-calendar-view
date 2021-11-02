import { StyleSheet } from "react-native";
import Res from "../style/Res";

export const baseStyles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: "center",
		alignSelf: "center"
	},
	row: {
		flex: 1,
		flexDirection: "row"
	},
	column: {
		// flex: 1,
		flexDirection: "column"
	},
	textCenter: {
		justifyContent: "center"
	},
	iosShadow: {
		shadowRadius: 0,
		shadowOpacity: 1,
		shadowOffset: { width: 0, height: 2 },
		shadowColor: "#CFCFCF"
	},
	androidShadow: {
		elevation: 4
	},
	viewGrid: {
		borderBottomWidth: Res.unit.scale(1),
		borderTopWidth: Res.unit.scale(1),
		borderRightWidth: Res.unit.scale(1),
		borderColor: Res.color.gridColor
	}
});
