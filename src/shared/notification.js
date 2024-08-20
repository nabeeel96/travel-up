import { notification } from "antd";

export const openNotificationWithIcon = (type, content) => {
    notification[type]({
        message: type === 'error' ? 'Error' : 'Success',
        description: content,
    })
}