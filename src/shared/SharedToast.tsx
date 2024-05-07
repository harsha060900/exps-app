import Toast from "react-native-root-toast";

export const SharedToast = (msg: string, color: string, txtCol: string) => {
  Toast.show(msg, {
    backgroundColor: color,
    position: Toast.positions.BOTTOM,
    animation: true,
    hideOnPress: true,
    opacity: 1,
    delay: 0,
    duration: 4500,
    textColor: txtCol,
    containerStyle: {
      borderColor: txtCol,
      borderWidth: 2
    }
  });
};
