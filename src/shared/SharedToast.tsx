import Toast from "react-native-root-toast";

export const SharedToast=(msg:string,color:string)=>{    
    Toast.show(msg,{
        backgroundColor:color,
        position: 60,
        animation: true,
        hideOnPress: true,
        opacity:1,
        delay: 0,
    })
}