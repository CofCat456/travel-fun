import { apiAdminUploadImage } from './api';
import { imageTransformHandler } from './global';

function MyUploadAdapter(loader: any) {
  const upload = async () => {
    const file = await loader.file;
    const imageFormData = imageTransformHandler(file);
    const res = await apiAdminUploadImage(imageFormData);
    return { default: res?.data?.imageUrl ?? '' };
  };

  return { upload };
}

function MyAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return MyUploadAdapter(loader);
  };
}

export { MyAdapterPlugin };
