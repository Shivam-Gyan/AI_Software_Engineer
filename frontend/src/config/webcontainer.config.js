import { WebContainer } from '@webcontainer/api';

let webcontainerInstance = null;

export const getWebContainerInstance = async() => {
    if(webcontainerInstance==null){
        webcontainerInstance = await WebContainer.boot();
    }
    return webcontainerInstance;

}
